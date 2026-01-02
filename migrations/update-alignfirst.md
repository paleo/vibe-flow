# Update AlignFirst

This migration script updates an existing AlignFirst installation, or upgrades from the legacy Vibe Flow installation.

## Initial Checks

First, determine the current installation state:

1. Check if `_docs/alignfirst/` directory exists → **AlignFirst is installed** → Go to "Update AlignFirst"
2. Check if `_docs/vibe-flow/` directory exists → **Legacy Vibe Flow is installed** → Go to "Upgrade from Vibe Flow"
3. Neither directory exists → **Not installed** → STOP. Tell the user AlignFirst is not set up. Suggest running the [bootstrap script](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/bootstrap.md) instead.

---

## Update AlignFirst

If `_docs/alignfirst/` exists, proceed with updating to the latest version.

### Step 1 - Overwrite AlignFirst Core Documents

Use `curl -o "filename"` or `wget -O "filename"` to fetch and overwrite the following files with their latest versions:

- [How to Write a Technical Specification.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/How%20to%20Write%20a%20Technical%20Specification.md) → `_docs/alignfirst/How to Write a Technical Specification.md`
- [How to Write Implementation Plans.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/How%20to%20Write%20Implementation%20Plans.md) → `_docs/alignfirst/How to Write Implementation Plans.md`
- [Align-and-Do Protocol.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/Align-and-Do%20Protocol.md) → `_docs/alignfirst/Align-and-Do Protocol.md`
- [How to Write a Description.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/How%20to%20Write%20a%20Description.md) → `_docs/alignfirst/How to Write a Description.md`
- [AlignFirst Guide.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/AlignFirst%20Guide.md) → `_docs/alignfirst/AlignFirst Guide.md`

Do not chain the commands with `&&`. Run them carefully one by one.

### Step 2 - Update the "AlignFirst" section in `AGENTS.md`

Here is the actualized version of the "AlignFirst" section:

```markdown
AlignFirst:

- `_docs/alignfirst/How to Write a Technical Specification.md` - To design a **spec**
- `_docs/alignfirst/How to Write Implementation Plans.md` - To design **plan(s)**
- `_docs/alignfirst/Align-and-Do Protocol.md` - **AAD** is a collaborative process for any task except writing a spec or plan: bug fixes, features, design decisions, refactoring, etc.
- `_docs/alignfirst/How to Write a Description.md` - To write a **description** summarizing implemented work
- `_docs/alignfirst/AlignFirst Guide.md` - Where to save specifications and plans
```

Ensure all the documents are referenced, and update the descriptions if needed. If there is a mention to "Vibe Flow", replace it with "AlignFirst".

### Step 3 - Add Writing Documentation Guide

Check if `_docs/Writing Documentation.md` exists:

- If it **does not exist**:
  1. Fetch [this file](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/Writing%20Documentation.md) to `_docs/Writing Documentation.md` using `curl -o` or `wget -O`.
  2. Add a reference to this document in `AGENTS.md` under the "Additional documentation" section. Use this format: `- _docs/Writing Documentation.md - Guidelines for writing documents in the _docs directory`
- If it **already exists**: Skip this step.

### Step 4 - Update Claude Code / Cursor Commands

If Claude Code or Cursor is detected (presence of `.claude/` directory, `CLAUDE.md` file, `.cursor/` directory, or `.cursorrules` file):

1. Create the `.claude/commands/` directory if it does not exist.
2. Fetch and overwrite these files:
   - [alspec.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/alspec.md) → `.claude/commands/alspec.md`
   - [alplan.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/alplan.md) → `.claude/commands/alplan.md`
   - [al.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/al.md) → `.claude/commands/al.md`
   - [aldescription.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/aldescription.md) → `.claude/commands/aldescription.md`
   - [doc.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/doc.md) → `.claude/commands/doc.md`

### Step 5 - Add "For AI Assistants" Section

Check if `AGENTS.md` contains a "For AI Assistants" section:

- If it **already exists**: Skip this step.
- If it **does not exist**:
  1. Run `git branch -a` to list all branch names. Look for a common ticket ID pattern (e.g., `feat/ABC-123-...`, `fix/PROJ-456`, `feature/123-...`).
  2. If a pattern is found, note it as **TICKET_FORMAT**. If not, ask the user: "What is your ticket ID format? (e.g., `ABC-###`, `PROJ-###`, or numeric). You can also skip this."
  3. If the user chooses to skip, do not add this section.
  4. Otherwise, add the following section at the end of `AGENTS.md`:

     ```markdown
     ## For AI Assistants

     _Ticket ID_: Format is `{TICKET_FORMAT}`. When not provided, deduce it from the branch name if possible—no need to confirm.
     ```

**Update complete.** Report to the user that AlignFirst has been updated.

---

## Upgrade from Vibe Flow

If `_docs/vibe-flow/` exists (but not `_docs/alignfirst/`), proceed with upgrading from the legacy Vibe Flow installation.

### Step 1 - Replace the old folder with a fresh one

1. Delete the old folder: `rm -rf _docs/vibe-flow/`
2. Create the new folder: `mkdir -p _docs/alignfirst/`

### Step 2 - Download AlignFirst documents

Fetch all core documents (same as "Update AlignFirst" Step 1):

- [How to Write a Technical Specification.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/How%20to%20Write%20a%20Technical%20Specification.md) → `_docs/alignfirst/How to Write a Technical Specification.md`
- [How to Write Implementation Plans.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/How%20to%20Write%20Implementation%20Plans.md) → `_docs/alignfirst/How to Write Implementation Plans.md`
- [Align-and-Do Protocol.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/Align-and-Do%20Protocol.md) → `_docs/alignfirst/Align-and-Do Protocol.md`
- [How to Write a Description.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/How%20to%20Write%20a%20Description.md) → `_docs/alignfirst/How to Write a Description.md`
- [AlignFirst Guide.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/alignfirst/AlignFirst%20Guide.md) → `_docs/alignfirst/AlignFirst Guide.md`

Do not chain the commands with `&&`. Run them carefully one by one.

### Step 3 - Update `AGENTS.md`

1. Replace all references to `_docs/vibe-flow/` with `_docs/alignfirst/`
2. Replace all references to `Vibe Flow` with `AlignFirst`
3. Replace all references to `DTDP` with `AAD`
4. Replace `Discuss-Then-Do Protocol.md` with `Align-and-Do Protocol.md`
5. Replace `Vibe Flow Guide.md` with `AlignFirst Guide.md`
6. Update the section header from "Vibe Flow:" to "AlignFirst:"

Here is the actualized version of the "AlignFirst" section:

```markdown
AlignFirst:

- `_docs/alignfirst/How to Write a Technical Specification.md` - To design a **spec**
- `_docs/alignfirst/How to Write Implementation Plans.md` - To design **plan(s)**
- `_docs/alignfirst/Align-and-Do Protocol.md` - **AAD** is a collaborative process for any task except writing a spec or plan: bug fixes, features, design decisions, refactoring, etc.
- `_docs/alignfirst/How to Write a Description.md` - To write a **description** summarizing implemented work
- `_docs/alignfirst/AlignFirst Guide.md` - Where to save specifications and plans
```

### Step 4 - Add Writing Documentation Guide

Check if `_docs/Writing Documentation.md` exists:

- If it **does not exist**:
  1. Fetch [this file](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/_docs/Writing%20Documentation.md) to `_docs/Writing Documentation.md` using `curl -o` or `wget -O`.
  2. Add a reference to this document in `AGENTS.md` under the "Additional documentation" section.
- If it **already exists**: Skip this step.

### Step 5 - Delete old Claude Code / Cursor commands

If the `.claude/commands/` directory exists, delete these old command files:

- `.claude/commands/spec.md`
- `.claude/commands/plan.md`
- `.claude/commands/dtdp.md`

### Step 6 - Download new Claude Code / Cursor commands

If Claude Code or Cursor is detected (presence of `.claude/` directory, `CLAUDE.md` file, `.cursor/` directory, or `.cursorrules` file):

1. Create the `.claude/commands/` directory if it does not exist.
2. Fetch these files:
   - [alspec.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/alspec.md) → `.claude/commands/alspec.md`
   - [alplan.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/alplan.md) → `.claude/commands/alplan.md`
   - [al.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/al.md) → `.claude/commands/al.md`
   - [aldescription.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/aldescription.md) → `.claude/commands/aldescription.md`
   - [doc.md](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/.claude/commands/doc.md) → `.claude/commands/doc.md`

### Step 7 - Add "For AI Assistants" Section

Check if `AGENTS.md` contains a "For AI Assistants" section:

- If it **already exists**: Skip this step.
- If it **does not exist**:
  1. Run `git branch -a` to list all branch names. Look for a common ticket ID pattern.
  2. If a pattern is found, note it as **TICKET_FORMAT**. If not, ask the user.
  3. If the user chooses to skip, do not add this section.
  4. Otherwise, add the section at the end of `AGENTS.md`:

     ```markdown
     ## For AI Assistants

     _Ticket ID_: Format is `{TICKET_FORMAT}`. When not provided, deduce it from the branch name if possible—no need to confirm.
     ```

**Upgrade complete.** Report to the user that they have been upgraded from Vibe Flow to AlignFirst. Mention:

- The folder has been renamed from `_docs/vibe-flow/` to `_docs/alignfirst/`
- The commands have changed: `/spec` → `/alspec`, `/plan` → `/alplan`, `/dtdp` → `/al`
- The protocol is now called "Align-and-Do Protocol" (AAD)
