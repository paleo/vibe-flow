# Update Skills

This prompt updates installed skills to the latest version.

> **Note**: Commands shown are Unix-style. Adapt to your OS if needed (e.g., PowerShell on Windows).

## Step 1 - Find Installed Skills

Search for installed skills. Look for directories containing:

- `.claude/skills/vibe-flow/SKILL.md`
- `.claude/skills/documentation-authoring/SKILL.md`

**Important**: Ignore directories inside dependencies (`node_modules/`, `vendor/`, `venv/`, `.venv/`, `target/`, `build/`, `dist/`, etc.).

Note which skills are installed and their paths. If neither is found, tell the user and stop.

## Step 2 - Update Vibe Flow (if installed)

If `vibe-flow/SKILL.md` was found:

Delete all existing files in the vibe-flow directory, then fetch the latest versions.

Use `curl -o "filename"` or `wget -O "filename"` to fetch the following files:

- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/vibe-flow/SKILL.md) → `.claude/skills/vibe-flow/SKILL.md`
- [README.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/vibe-flow/README.md) → `.claude/skills/vibe-flow/README.md`
- [spec-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/vibe-flow/spec-protocol.md) → `.claude/skills/vibe-flow/spec-protocol.md`
- [plan-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/vibe-flow/plan-protocol.md) → `.claude/skills/vibe-flow/plan-protocol.md`
- [dtdp-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/vibe-flow/dtdp-protocol.md) → `.claude/skills/vibe-flow/dtdp-protocol.md`
- [pr-message-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/vibe-flow/pr-message-protocol.md) → `.claude/skills/vibe-flow/pr-message-protocol.md`

## Step 3 - Update Documentation Authoring (if installed)

If `documentation-authoring/SKILL.md` was found:

Delete all existing files in the documentation-authoring directory, then fetch the latest versions.

Create the references directory if it doesn't exist:

```bash
mkdir -p .claude/skills/documentation-authoring/references
```

Use `curl -o "filename"` or `wget -O "filename"` to fetch the following files:

- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/documentation-authoring/SKILL.md) → `.claude/skills/documentation-authoring/SKILL.md`
- [bootstrapping-skills.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/documentation-authoring/references/bootstrapping-skills.md) → `.claude/skills/documentation-authoring/references/bootstrapping-skills.md`

## Step 4 - Update Claude/Cursor Commands (Optional)

If `.claude/commands/` exists, update the command files:

- [spec.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/spec.md) → `.claude/commands/spec.md`
- [plan.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/plan.md) → `.claude/commands/plan.md`
- [dtdp.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/dtdp.md) → `.claude/commands/dtdp.md`
- [pr-message.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/pr-message.md) → `.claude/commands/pr-message.md`

## Done

Tell the user which skills were updated successfully.
