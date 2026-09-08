---
"@paleo/alcode": minor
---

Breaking change: the `catchup` value of `--protocol` is removed; `new --catchup` replaces it and loads the ticket history before the protocol and message. `--message-file <path|->` reads the message from a file or stdin. The prompt reaches the coding agent through stdin. `--no-ticket` reads `TICKET_ID` from the `alignfirst` report.
