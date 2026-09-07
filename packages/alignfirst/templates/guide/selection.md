# AlignFirst Guide

Follow the requested protocol if its guide is already in context. Otherwise, load it with the command below. Each named guide includes its protocol and shared conventions; add `--protocol-only` when those conventions are already in context.

## Choose a protocol

Use spec → plan → execution for most tasks, especially when the design is uncertain. Use AAD for small changes or follow-up work. Execute a written plan in a fresh agent session.

| Protocol | Purpose | Command |
| --- | --- | --- |
| Specification (`alspec` alias) | Investigate, discuss, and write a technical specification. | `{{CMD}} guide spec` |
| Planning (`alplan` alias) | Turn a specification into implementation plans. | `{{CMD}} guide plan` |
| Align-and-Do (`AAD`, `al` aliases) | Investigate, agree, implement, and summarize a small change. | `{{CMD}} guide aad` |
| Merge (`almerge` alias) | Merge an incoming branch and resolve conflicts. | `{{CMD}} guide merge` |
| Review (`alreview` alias) | Review committed branch changes against a base branch. | `{{CMD}} guide review` |
| Description (`aldescription` alias) | Write a concise description of implemented work. | `{{CMD}} guide description` |
| Catch up (`alcatchup`, `alcatchupaad`, `alcatchupspec` aliases) | Load the ticket history, then continue, start AAD, or start a specification. | `{{CMD}} ticket --catchup` |

For more detail on workflows and the ticket lifecycle, read `{{CMD}} guide overview`.
