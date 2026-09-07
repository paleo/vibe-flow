# Shared Conventions

## Task directory

TASK_DIR holds a ticket's work files. TICKET_ID identifies the task, usually by its issue or ticket number.

{{TICKET_CONTEXT}}

`{{TICKET_CMD}}` prints TASK_DIR and its entries, creates a missing directory, and restores an archived one. Run it once to load the ticket directory context.

{{PLANS_STATE}}

When the user says there is no ticket, run `{{CMD}} ticket --side`. Reuse an existing `side-N` directory when the user refers to earlier work. Omit the ticket ID from commit messages.

## Work files

Files use `{CYCLE_LETTER}{FILE_NUMBER}-{FILE_TYPE}.md`, such as `A1-spec.md` or `A2-AAD.summary.md`.

Immediately before creating each file, run `{{TICKET_CMD}} --next <filename>` with the extension included. It prints only the ticket directory and next filename:

```markdown
- Ticket directory: `.plans/78/`
- Next file: `A2-spec.md`
```

Join the directory and filename to get the file path, preserving the leading dot. With no filename, `{{TICKET_CMD}} --next` prints the directory and next prefix, such as `A2`. Add `--new-cycle` to either form when the protocol or user calls for a new cycle.

Neither form reserves a number. Write the file before requesting another filename. With `--json`, the same information is returned as `dir` and `next`, or `dir` and `prefix`.

Common file types are `spec`, `plan`, `AAD.summary`, `description`, `review`, and `merge.summary`. Use another type when needed.

Cycle letters and file numbers are internal. Never discuss them with the user.
