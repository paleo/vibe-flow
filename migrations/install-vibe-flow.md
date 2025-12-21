# Install Vibe Flow Skill

This prompt installs the Vibe Flow skill in a new project.

> **Note**: Commands shown are Unix-style. Adapt to your OS if needed (e.g., PowerShell on Windows).

## Step 1 - Check for Legacy Installation

Search for a `_docs/vibe-flow/` directory in the codebase.

- If it exists, **STOP NOW** and tell the user:

  > "You have a legacy Vibe Flow installation (`_docs/vibe-flow/`). Please use the migration prompt instead:
  >
  > <https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/upgrade-to-agent-skills.md>"

- If it does not exist, continue to Step 2.

## Step 2 - Check for Existing Installation

Search for an existing `vibe-flow` skill directory. Look for any directory containing `vibe-flow/SKILL.md`.

**Important**: Ignore directories inside dependencies (`node_modules/`, `vendor/`, `venv/`, `.venv/`, `target/`, `build/`, `dist/`, etc.).

- If found, **STOP NOW** and tell the user:

  > "Vibe Flow is already installed at `{PATH}`. To update it, use the update prompt instead:
  >
  > <https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/update-vibe-flow.md>"

- If not found, continue to Step 3.

## Step 3 - Determine Skills Location

Look for an existing skills directory at the root of the project:

- `_skills/`
- `skills/`
- `.skills/`

### If Standard Directory Found

If `_skills/`, `skills/`, or `.skills/` exists at the project root, use it (e.g., `_skills/vibe-flow/`).

Proceed to **Step 4**.

### If Non-Standard Directory Found

If you find a directory containing `*/SKILL.md` files but it's not one of the standard names above, ask the user:

> "I found skills in `{FOUND_DIR}/`. Should I install vibe-flow there, or would you prefer a different location?"

**Wait for user response**, then proceed to **Step 4**.

### If Not Found

Ask the user:

> "No skills directory found. Is it okay to create a `_skills/` directory for Agent Skills?
>
> - **Yes**: I'll create `_skills/vibe-flow/`
> - **Custom path**: Tell me where you'd like skills installed"

**Wait for user response.** If the user declines or doesn't respond, **STOP**.

Once confirmed, create the directory and proceed to **Step 4**.

## Step 4 - Download Vibe Flow Skill

Create the skill directory if it doesn't exist:

```bash
mkdir -p {SKILLS_DIR}/vibe-flow
```

Use `curl -o "filename"` or `wget -O "filename"` to fetch the following files:

- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/SKILL.md) → `{SKILLS_DIR}/vibe-flow/SKILL.md`
- [README.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/README.md) → `{SKILLS_DIR}/vibe-flow/README.md`
- [spec-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/spec-protocol.md) → `{SKILLS_DIR}/vibe-flow/spec-protocol.md`
- [plan-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/plan-protocol.md) → `{SKILLS_DIR}/vibe-flow/plan-protocol.md`
- [dtdp-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/dtdp-protocol.md) → `{SKILLS_DIR}/vibe-flow/dtdp-protocol.md`
- [pr-message-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/pr-message-protocol.md) → `{SKILLS_DIR}/vibe-flow/pr-message-protocol.md`

Replace `{SKILLS_DIR}` with the actual path (e.g., `_skills`).

## Step 5 - Post-Install Setup

1. Look at git branches (`git branch -a`) to detect the ticket ID format (e.g., `ABC-###`, `PROJ-###`, or numeric like `123`).

2. Check if `AGENTS.md` (or `CLAUDE.md`) exists:

   - If it exists, ensure it contains: _"Always ignore the `_plans` directory when searching the codebase."_
   - If it doesn't exist, create `AGENTS.md` with:

     ```markdown
     # AI Agent Instructions

     Always ignore the `_plans` directory when searching the codebase.

     ## For AI Assistants

     _Ticket ID_: Format is `{DETECTED_FORMAT}`. When not provided, deduce it from the branch name if possible—no need to confirm.
     ```

     If no ticket format was detected, ask the user for their format or skip the "For AI Assistants" section.

3. Create `_plans/.gitkeep` if it doesn't exist:

   ```bash
   mkdir -p _plans && touch _plans/.gitkeep
   ```

4. Add to `.gitignore` if not already present:

   ```text
   _plans/*
   !_plans/.gitkeep
   ```

## Step 6 - Download Claude/Cursor Commands (Optional)

If Claude Code or Cursor is detected (presence of `.claude/` directory, `CLAUDE.md` file, `.cursor/` directory, or `.cursorrules` file):

1. Create the commands directory:

   ```bash
   mkdir -p .claude/commands
   ```

2. Fetch the command files:

   - [spec.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/spec.md) → `.claude/commands/spec.md`
   - [plan.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/plan.md) → `.claude/commands/plan.md`
   - [dtdp.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/dtdp.md) → `.claude/commands/dtdp.md`
   - [pr-message.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/pr-message.md) → `.claude/commands/pr-message.md`

## Done

Tell the user that Vibe Flow has been installed successfully, and point them to `{SKILLS_DIR}/vibe-flow/README.md` for usage instructions.
