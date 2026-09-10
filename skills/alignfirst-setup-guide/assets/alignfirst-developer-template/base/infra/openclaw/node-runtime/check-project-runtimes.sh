#!/bin/bash
set -uo pipefail

fixture_root=
runtime_bin=
stub_paths=()
failures=0

main() {
  validate_environment || return 1
  prepare_fixtures
  trap cleanup EXIT

  run_check "independent shell selections" check_independent_shells
  run_check "recursive declarations and cd reselection" check_recursive_selection
  run_check "missing declared version aborts startup" check_missing_version
  run_check "unparseable declaration keeps the default" check_unparseable_declaration
  run_check "profile output stays silent" check_silent_profile
  run_check "audited commands resist runtime shadows" check_command_precedence
  run_check "developer CLIs execute" check_cli_commands
  run_check "background Node owns its process" check_background_process

  return "$failures"
}

validate_environment() {
  local name
  for name in PROJECT_SHELL DEFAULT_NODE PINNED_NODE ALIGNFIRST_CODE_AGENT; do
    if [ -z "${!name:-}" ]; then
      printf 'FAIL environment: %s is required\n' "$name"
      return 1
    fi
  done
  case "$ALIGNFIRST_CODE_AGENT" in
    claude|codex) ;;
    *) printf 'FAIL environment: ALIGNFIRST_CODE_AGENT must be claude or codex\n'; return 1 ;;
  esac
  if [ ! -x "$PROJECT_SHELL" ]; then
    printf 'FAIL environment: PROJECT_SHELL is not executable\n'
    return 1
  fi
}

prepare_fixtures() {
  fixture_root=$(mktemp -d)
  mkdir -p "$fixture_root/default" "$fixture_root/pinned/nested" \
    "$fixture_root/missing" "$fixture_root/garbage"
  printf '%s\n' "$PINNED_NODE" > "$fixture_root/pinned/.node-version"
  printf '%s\n' '999.999.999' > "$fixture_root/missing/.node-version"
  printf '%s\n' 'not-a-node-version' > "$fixture_root/garbage/.nvmrc"
}

run_check() {
  local label=$1
  shift
  if "$@"; then
    printf 'ok %s\n' "$label"
  else
    printf 'FAIL %s\n' "$label"
    failures=$((failures + 1))
  fi
}

check_independent_shells() {
  local pinned_output="$fixture_root/pinned-output" default_output="$fixture_root/default-output"
  local pinned_status default_status
  (
    cd "$fixture_root/default" || exit 1
    PINNED_NODE="$PINNED_NODE" "$PROJECT_SHELL" -c \
      'fnm use "$PINNED_NODE" >/dev/null && bash -c "node -p process.versions.node"' \
      > "$pinned_output" 2>/dev/null
  ) &
  local pinned_pid=$!
  (
    cd "$fixture_root/default" || exit 1
    "$PROJECT_SHELL" -c 'node -p process.versions.node' > "$default_output" 2>/dev/null
  ) &
  local default_pid=$!
  wait "$pinned_pid"
  pinned_status=$?
  wait "$default_pid"
  default_status=$?
  [ "$pinned_status" -eq 0 ] && [ "$default_status" -eq 0 ] || return 1
  [ "$(cat "$pinned_output")" = "${PINNED_NODE#v}" ] &&
    [ "$(cat "$default_output")" = "${DEFAULT_NODE#v}" ]
}

check_recursive_selection() {
  local output
  output=$(DEFAULT_DIR="$fixture_root/default" PINNED_DIR="$fixture_root/pinned/nested" \
    "$PROJECT_SHELL" -c '
      cd "$PINNED_DIR"
      printf "%s\n" "$(node -p process.versions.node)"
      cd "$DEFAULT_DIR"
      printf "%s\n" "$(node -p process.versions.node)"
    ' 2>/dev/null) || return 1
  [ "$output" = "${PINNED_NODE#v}
${DEFAULT_NODE#v}" ]
}

check_missing_version() {
  local output
  if output=$(cd "$fixture_root/missing" && \
    "$PROJECT_SHELL" -c 'printf should-not-run' 2>/dev/null); then
    return 1
  fi
  [ -z "$output" ]
}

check_unparseable_declaration() {
  local output
  output=$(cd "$fixture_root/garbage" && "$PROJECT_SHELL" -c 'node -p process.versions.node' \
    2>/dev/null) || return 1
  [ "$output" = "${DEFAULT_NODE#v}" ]
}

check_silent_profile() {
  local output
  output=$(cd "$fixture_root/default" && "$PROJECT_SHELL" -c 'printf profile-is-silent' \
    2>/dev/null) || return 1
  [ "$output" = profile-is-silent ]
}

check_command_precedence() {
  local expected_agent output
  expected_agent="/home/{{SERVICE_USER}}/.npm-system-global/bin/$ALIGNFIRST_CODE_AGENT"
  output=$(cd "$fixture_root/default" && "$PROJECT_SHELL" -c '
    printf "%s\n" "$FNM_MULTISHELL_PATH/bin" "$(dirname "$(command -v node)")" \
      "$(dirname "$(command -v npm)")" "$(command -v openclaw)" \
      "$(command -v alcode)" "$(command -v "$ALIGNFIRST_CODE_AGENT")"
  ' 2>/dev/null) || return 1
  runtime_bin=$(printf '%s\n' "$output" | sed -n '1p')
  [ "$(printf '%s\n' "$output" | sed -n '2p')" = "$runtime_bin" ] || return 1
  [ "$(printf '%s\n' "$output" | sed -n '3p')" = "$runtime_bin" ] || return 1
  [ "$(printf '%s\n' "$output" | sed -n '4p')" = /opt/{{SERVICE_USER}}/bin/openclaw ] || return 1
  [ "$(printf '%s\n' "$output" | sed -n '5p')" = /home/{{SERVICE_USER}}/.npm-system-global/bin/alcode ] || return 1
  [ "$(printf '%s\n' "$output" | sed -n '6p')" = "$expected_agent" ] || return 1
  install_runtime_stubs || return 1
  output=$(cd "$fixture_root/default" && "$PROJECT_SHELL" -c '
    command -v openclaw
    command -v alcode
    command -v "$ALIGNFIRST_CODE_AGENT"
  ' 2>/dev/null) || return 1
  [ "$output" = "/opt/{{SERVICE_USER}}/bin/openclaw
/home/{{SERVICE_USER}}/.npm-system-global/bin/alcode
$expected_agent" ]
}

install_runtime_stubs() {
  local name path
  for name in openclaw alcode "$ALIGNFIRST_CODE_AGENT"; do
    path="$runtime_bin/$name"
    [ ! -e "$path" ] || return 1
    printf '#!/bin/sh\nexit 99\n' > "$path"
    chmod 755 "$path"
    stub_paths+=("$path")
  done
}

check_cli_commands() {
  (cd "$fixture_root/default" && "$PROJECT_SHELL" -c '
    pnpm --version >/dev/null &&
      "$ALIGNFIRST_CODE_AGENT" --version >/dev/null &&
      alcode --help >/dev/null &&
      alignfirst --version >/dev/null &&
      alproject --version >/dev/null &&
      openclaw --version >/dev/null
  ' >/dev/null 2>&1)
}

check_background_process() {
  local expected_executable process_executable process_pid
  expected_executable=$(cd "$fixture_root/pinned/nested" && \
    "$PROJECT_SHELL" -c 'readlink -f "$(command -v node)"' 2>/dev/null) || return 1
  (
    cd "$fixture_root/pinned/nested" || exit 1
    exec "$PROJECT_SHELL" -c "exec node -e 'setInterval(() => {}, 1000)'"
  ) >/dev/null 2>&1 &
  process_pid=$!
  if ! wait_for_process "$process_pid"; then
    kill "$process_pid" 2>/dev/null || true
    wait "$process_pid" 2>/dev/null || true
    return 1
  fi
  process_executable=$(readlink -f "/proc/$process_pid/exe")
  kill "$process_pid"
  wait "$process_pid" 2>/dev/null || true
  [ "$process_executable" = "$expected_executable" ] && ! kill -0 "$process_pid" 2>/dev/null
}

wait_for_process() {
  local process_pid=$1 attempt
  for attempt in 1 2 3 4 5; do
    [ -e "/proc/$process_pid/exe" ] && return 0
    sleep 0.1
  done
  return 1
}

cleanup() {
  local path
  for path in "${stub_paths[@]}"; do rm -f -- "$path"; done
  if [ -n "$fixture_root" ]; then rm -rf -- "$fixture_root"; fi
}

main "$@"
