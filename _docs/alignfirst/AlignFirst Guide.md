# AlignFirst Guide

## TASK_DIR Location

**TASK_DIR** is the directory where work files related to a task are stored. Usually, we use **TASK_DIR** = `_plans/{TICKET_ID}/` (a sub-directory of the `_plans` folder). If no ticket ID is known, ask the user for it.

- Create TASK_DIR if it doesn't exist
- Or, list existing files

## File Naming Convention

Format: `{CYCLE_LETTER}{FILE_NUMBER}-{FILE_TYPE}.md`

**Common file types:**

- `spec` - technical specification
- `plan` - implementation plan
- `AAD.summary` - AAD summary document

**Example structure:**

```text
_plans/
├── 123/
│   ├── A1-spec.md
│   ├── A2-plan.md
│   └── A3-AAD.summary.md
│   └── B1-spec.md
```

## Notes

- **TICKET_ID** is a unique identifier for the task, often an issue or ticket number.
- Cycles are identified by a **CYCLE_LETTER** (A, B, C...). The user decides when to start a new one.
- In a cycle, determine the next **FILE_NUMBER** from existing file names. Every new file must have a bumped file number.
- Do not bother the user with CYCLE_LETTER or FILE_NUMBER. They are for internal organization. It's up to you to list the files and determine the last CYCLE_LETTER and FILE_NUMBER. Start CYCLE_LETTER with `A` if there is no existing cycle, and FILE_NUMBER with `1`. So you just need to ask for a **ticket ID** if you don't have one.
- When the user requests a new cycle: bump CYCLE_LETTER and reset FILE_NUMBER.
- There is no strict sequence of file types in the workflow. Available file types are also flexible; if you need a new one, just create it.
