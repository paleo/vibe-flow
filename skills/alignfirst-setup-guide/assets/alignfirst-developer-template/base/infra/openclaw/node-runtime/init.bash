export FNM_DIR=/home/{{SERVICE_USER}}/.local/share/fnm
unset NPM_CONFIG_PREFIX npm_config_prefix
export PATH="/opt/{{SERVICE_USER}}/bin:/usr/local/bin:$PATH:/home/{{SERVICE_USER}}/.npm-system-global/bin"
# Developer children use plain Bash, while OpenClaw keeps project-shell in its own environment.
export SHELL=/bin/bash
shopt -s expand_aliases
eval "$(/usr/local/bin/fnm env --shell bash --use-on-cd \
  --version-file-strategy=recursive --resolve-engines=true)"
# Discard captured status and install prompts; failure aborts before a command uses the wrong runtime.
/usr/local/bin/fnm use --silent-if-unchanged > /dev/null || exit 1
# Keep the audited launchers and protected CLIs ahead of the writable fnm runtime.
export PATH="/opt/{{SERVICE_USER}}/bin:/home/{{SERVICE_USER}}/.npm-system-global/bin:$PATH"
