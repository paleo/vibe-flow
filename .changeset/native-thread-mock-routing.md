---
"@paleo/openclaw-channel-mock-core": minor
"@paleo/openclaw-slack-mock": minor
"@paleo/openclaw-discord-mock": patch
---

Added configurable Slack thread routing, native starter receipt shapes, and canonical thread-session delivery. A send whose target names a stored thread now lands in that thread under its parent conversation, with or without an accompanying `threadId`. Discord-shaped `thread-reply` now accepts a bare `threadId` as its delivery target, as bundled Discord does.
