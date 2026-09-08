---
"@paleo/openclaw-channel-mock-core": minor
"@paleo/openclaw-slack-mock": minor
"@paleo/openclaw-discord-mock": minor
---

Added configurable Slack thread routing, native starter receipt shapes, and canonical thread-session delivery. A send whose target names a stored thread now lands in that thread under its parent conversation, with or without an accompanying `threadId`. Discord-shaped `thread-create` now returns the native `{ ok, thread }` shape, with `partial: true` when the thread exists but its starter was not delivered; the former `threadId`, `target` and `message` fields are gone. Discord-shaped `thread-reply` now accepts a bare `threadId` as its delivery target, as bundled Discord does. The test-bus fault injector accepts `threadOnly: true` to fail only a threaded send.
