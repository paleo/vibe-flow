# How to Write a PR Message

## Pre-requisites

You need:

- the **TASK_DIR** - if you don't have it, ask the user for a **ticket ID**
- the next **CYCLE_LETTER** - deduce it by yourself - start with a new cycle (bump the CYCLE_LETTER, reset the FILE_NUMBER to 1)

## Steps

1. Find the current ticket plan directory.
2. Read every `*spec.md` and `*summary.md` file in the ticket plan directory.
3. Draft a PR message summarizing what has been implemented and show it to the user.
4. Write a new file `{CYCLE_LETTER}1-PR-message.md` with the next cycle letter.

## Guidelines

- Write in markdown:
  - If there is one subject, write a single paragraph.
  - Otherwise, write a bulleted list with one subject per item.
- Be concise. Keep it to the essentials—a brief overview of what was done.
- Merge related subjects where possible.
- Prefer functional/business descriptions over technical ones when possible.
- Include technical details only for major changes (e.g., renaming a database table, significant linter config changes, major codebase refactors).
- Do not mention specs that were not implemented. If in doubt, explore the codebase to confirm what was actually done.

---

_Important Note: There can be lint errors in the markdown file you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE PR MESSAGE._
