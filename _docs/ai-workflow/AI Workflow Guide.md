# AI Workflow Guide

## TASK_DIR Location

**TASK_DIR** is the directory where work files related to a task are stored. Usually, we use **TASK_DIR** = `_plans/{TICKET_ID}`. If no ticket identifier is known, ask the user for it.

- Create TASK_DIR if it doesn't exist
- Or, list existing files

## File Naming Convention

Format: `{CYCLE_LETTER}{FILE_NUMBER}-{FILE_TYPE}.md`

**Common file types:**

- `spec` - technical specification
- `plan` - implementation plan  
- `handover` - implementation completion document
- `commit` - suggested commit message and changelog entry

**Example structure:**

```text
_plans/123/
├── A1-spec.md
├── A2-plan.md
├── A3-handover.md
└── B1-spec.md
```

## Notes

- Cycles are identified by a **CYCLE_LETTER** (A, B, C...), the user decides when to start a new one
- In a cycle, determine the next **FILE_NUMBER** from existing file names
- There is no strict sequence in the workflow. The file type is also flexible; if you need a new one, just create it.
