# Ticket Directory and Work Files

## Ticket Directory

TICKET_DIR holds a ticket's work files and includes a trailing slash. TICKET_ID is the external ticket ID or `side-N` for work without an external ticket.

{{TICKET_DETECTION}}

`{{TICKET_CMD}}` prints TICKET_DIR and its entries, creates a missing directory, and restores an archived one. Run it once to load the ticket directory context, unless `{{CMD}} ticket --catchup` already did.

{{PLANS_STATE}}

When the user says there is no external ticket, run `{{CMD}} ticket --side` and use the returned TICKET_ID in subsequent ticket commands. Reuse an existing `side-N` directory when the user refers to earlier work. Omit the ticket ID from commit messages.

## Work Files

Files use `{CYCLE_LETTER}{FILE_NUMBER}-{FILE_TYPE}.md`. FILE_PREFIX combines the cycle letter and the file number within that cycle. FILE_NAME includes the prefix and extension.

Immediately before creating each file, run `{{TICKET_CMD}} --next <filename>` with the extension included. It returns TICKET_DIR, CYCLE_LETTER, FILE_NUMBER, and FILE_NAME. Append FILE_NAME to TICKET_DIR to get the file path, preserving the leading dot and existing slash.

With no filename, `{{TICKET_CMD}} --next` returns FILE_PREFIX instead of FILE_NAME. Add `--new-cycle` to either form when the protocol or user calls for a new cycle.

Neither form reserves a number. Write the file before requesting another filename. With `--json`, the same information uses the same field names.

Common file types are `spec`, `plan`, `AAD.summary`, `description`, `review`, and `merge.summary`. Use another type when needed.

Cycle letters and file numbers are internal. Never discuss them with the user.
