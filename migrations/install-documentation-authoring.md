# Install Documentation Authoring Skill

This prompt installs the Documentation Authoring skill in your project.

> **Note**: Commands shown are Unix-style. Adapt to your OS if needed (e.g., PowerShell on Windows).

## Step 1 - Check for Existing Installation

Search for an existing `documentation-authoring` skill directory. Look for any directory containing `documentation-authoring/SKILL.md`.

**Important**: Ignore directories inside dependencies (`node_modules/`, `vendor/`, `venv/`, `.venv/`, `target/`, `build/`, `dist/`, etc.).

- If found, **STOP NOW** and tell the user:

  > "Documentation Authoring is already installed at `{PATH}`. To update it, use the update prompt instead:
  >
  > <https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/update-skills.md>"

- If not found, continue to Step 2.

## Step 2 - Detect Skills Directory

Search for existing `skills/` directories in the repository root:

- `.claude/skills/`
- `.codex/skills/`
- `.github/skills/`
- `.cursor/skills/`

**Decision:**

- **If none exists**: Determine the installation directory based on the current agent:
  - Claude Code → `.claude/skills/`
  - Codex → `.codex/skills/`
  - GitHub Copilot → `.github/skills/`
  - Cursor → `.cursor/skills/`
  - Other/unknown → `.claude/skills/`

- **If exactly one exists**: Use that directory.

- **If multiple exist**: **STOP** and ask the user which one to use.

Set **SKILLS_DIR** to the chosen directory (e.g., `.claude/skills/`).

## Step 3 - Download Documentation Authoring Skill

Create the skill directory and sub-directory:

```bash
mkdir -p {SKILLS_DIR}/documentation-authoring/references
```

Use `curl -o "filename"` or `wget -O "filename"` to fetch the following files into `{SKILLS_DIR}/documentation-authoring/`:

- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/documentation-authoring/SKILL.md)
- [references/bootstrapping-skills.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/skills/documentation-authoring/references/bootstrapping-skills.md)

## Done

Tell the user that Documentation Authoring has been installed successfully.
