# @paleo/alignfirst-developer-openclaw-plugin

## 0.2.0

### Minor Changes

- 348c407: Required OpenClaw 2026.9.3 and Node 24.16+ or 26; the test image now runs Node 26.
- 348c407: Added native Slack delivery receipts, receipt inspection, and debug diagnostics for rejected deliveries. Handoff list JSON omits starter text.

### Patch Changes

- 348c407: Use the heartbeat acknowledgement for silent handoff wakes to avoid unsolicited recovery replies in OpenClaw 2026.9.3.

## 0.1.0

### Minor Changes

- 6d72df2: Added durable activation and claim handling for confirmed Slack and Discord thread starters.
