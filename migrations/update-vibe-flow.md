# Updade Vibe Flow

**In order to determine if Vibe Flow is already set up, look for the `_docs/vibe-flow/` directory. If it doesn't exist, then Vibe Flow is not set up and you must stop now. DO NOT PROCEED WITHOUT CONFIRMATION IF VIBE FLOW IS NOT SET UP.**

If Vibe Flow is set up, proceed with the following steps:

## Step 1 - Overwrite Vibe Flow Core Documents

Use `curl` or `wget` to fetch and overwrite the following files with their latest versions:

- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/How%20to%20Write%20a%20Technical%20Specification.md) to `_docs/vibe-flow/How to Write a Technical Specification.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/How%20to%20Write%20Implementation%20Plans.md) to `_docs/vibe-flow/How to Write Implementation Plans.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/Discuss-Then-Do%20Protocol.md) to `_docs/vibe-flow/Discuss-Then-Do Protocol.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/Vibe%20Flow%20Guide.md) to `_docs/vibe-flow/Vibe Flow Guide.md`

Important: Use `curl -o "filename"` or `wget -O "filename"` to set the exact output filename and avoid URL-encoded names.

Also, do not chain the commands with `&&`. Run them carefully one by one.

## Step 2 - Update the "Vibe Flow" section in `AGENTS.md`

Here is an actualized version of the "Vibe Flow" section of a `AGENTS.md` file:

```markdown
Vibe Flow:

- `_docs/vibe-flow/How to Write a Technical Specification.md` - To design a **spec**
- `_docs/vibe-flow/How to Write Implementation Plans.md` - To design **plan(s)**
- `_docs/vibe-flow/Discuss-Then-Do Protocol.md` - **DTDP** is a collaborative process for any task except writing a spec or plan: bug fixes, features, design decisions, refactoring, etc.
- `_docs/vibe-flow/Vibe Flow Guide.md` - Where to save specifications and plans
```

Ensure all the documents are referenced, and update the descriptions if needed.

## Step 3 - Add Writing Documentation Guide

Check if `_docs/Writing Documentation.md` exists:

- If it **does not exist**:
  1. Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/Writing%20Documentation.md) to `_docs/Writing Documentation.md` using `curl -o` or `wget -O`.
  2. Add a reference to this document in `AGENTS.md` under the "Additional documentation" section (or similar section for optional documents). Use this format: `- _docs/Writing Documentation.md - Guidelines for writing documents in the _docs directory`
- If it **already exists**: Skip this step and do not modify the existing file.

## Step 4 - Download Claude Code / Cursor Commands

If Claude Code or Cursor is detected (presence of `.claude/` directory, `CLAUDE.md` file, `.cursor/` directory, or `.cursorrules` file), download the command files:

1. Create the `.claude/commands/` directory if it does not exist.
2. Fetch these files:
   - Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/spec.md) to `.claude/commands/spec.md`
   - Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/plan.md) to `.claude/commands/plan.md`
   - Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/dtdp.md) to `.claude/commands/dtdp.md`

## Step 5 - Add "For AI Assistants" Section

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
