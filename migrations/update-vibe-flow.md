# Update Vibe Flow Skill

This prompt updates an existing Vibe Flow skill installation to the latest version.

> **Note**: Commands shown are Unix-style. Adapt to your OS if needed (e.g., PowerShell on Windows).

## Step 1 - Check for Legacy Installation

Search for a `_docs/vibe-flow/` directory in the codebase.

- If it exists, **STOP NOW** and tell the user:

  > "You have a legacy Vibe Flow installation (`_docs/vibe-flow/`). Please use the migration prompt instead:
  >
  > <https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/migrations/upgrade-to-agent-skills.md>"

- If it does not exist, continue to Step 2.

## Step 2 - Find Existing Installation

Search for an existing `vibe-flow` skill directory. Look for any directory containing `vibe-flow/SKILL.md`.

**Important**: Ignore directories inside dependencies (`node_modules/`, `vendor/`, `venv/`, `.venv/`, `target/`, `build/`, `dist/`, etc.).

- If not found, **STOP NOW** and tell the user:

  > "No Vibe Flow installation found. To install it, use the install prompt instead:
  >
  > <https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/migrations/install-vibe-flow.md>"

- If found, continue to Step 3.

## Step 3 - Download Fresh Files

Delete all existing files in the vibe-flow directory, then fetch the latest versions.

Use `curl -o "filename"` or `wget -O "filename"` to fetch the following files:

- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/skills/vibe-flow/SKILL.md) → `.claude/skills/vibe-flow/SKILL.md`
- [README.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/skills/vibe-flow/README.md) → `.claude/skills/vibe-flow/README.md`
- [spec-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/skills/vibe-flow/spec-protocol.md) → `.claude/skills/vibe-flow/spec-protocol.md`
- [plan-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/skills/vibe-flow/plan-protocol.md) → `.claude/skills/vibe-flow/plan-protocol.md`
- [dtdp-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/skills/vibe-flow/dtdp-protocol.md) → `.claude/skills/vibe-flow/dtdp-protocol.md`
- [pr-message-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/skills/vibe-flow/pr-message-protocol.md) → `.claude/skills/vibe-flow/pr-message-protocol.md`

## Step 4 - Update Claude/Cursor Commands (Optional)

If `.claude/commands/` exists, update the command files:

- [spec.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/spec.md) → `.claude/commands/spec.md`
- [plan.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/plan.md) → `.claude/commands/plan.md`
- [dtdp.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/dtdp.md) → `.claude/commands/dtdp.md`
- [pr-message.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/pr-message.md) → `.claude/commands/pr-message.md`

## Done

Tell the user that Vibe Flow has been updated successfully.
