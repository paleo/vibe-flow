---
name: alcatchupspec
description: "Load the current AlignFirst task history, then execute the specification protocol."
disable-model-invocation: true
license: CC0 1.0
metadata:
  author: Paleo
  version: "4.0.0"
  repository: https://github.com/paleo/alignfirst
---

Run `npx -y alignfirst ticket --catchup` to load the ticket history. Add the ticket ID before `--catchup` when the user names one, or `--side` when there is no external ticket.

Then follow the `spec` protocol guide if it is already in context. Otherwise, run `npx -y alignfirst guide spec` and follow it; the output includes the ticket directory and work file rules. Do not use your own plan mode.
