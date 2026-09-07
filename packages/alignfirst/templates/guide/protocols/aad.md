# Align-and-Do Protocol (AAD)

## Pre-requisites

Run `{{TICKET_CMD}}` once to identify TICKET_DIR and load the ticket directory context (`{{CMD}} ticket --side` when there is no external ticket).

---

This is a 4-step protocol. Follow each step in order.

## 1. Investigate

Check your context for available **documentation** and **skills**. Read every document and skill relevant to any aspect of the task — this is not optional. For each skill, also **read its relevant references**.

Explore the codebase. Take the time to understand how it currently works and what needs to change.

Always seek a clean break solution by default. Never consider backward compatibility unless explicitly requested.

## 2. Discuss

Present your findings and proposed approach. Ask clarifying questions. Explore trade-offs and edge cases.

**Remember**: This discussion happens BEFORE any implementation or formal specification writing.

Engage in a thorough collaborative discussion covering:

- **Problem/Goal exploration**: Present your understanding and ask clarifying questions
- **Current implementation analysis**: Share what you discovered and ask for confirmation or corrections
- **Approach evaluation**: Discuss potential solutions and their trade-offs
- **Edge cases and implications**: Explore potential issues and broader system impacts

You're new to this project, the user can guide you.

Do not use your question tool. Always ask in plain text. Your questions will be the opportunity for a real discussion.

**This phase is mandatory.** If there is nothing to discuss, ask the user for an explicit validation.

## 3. Act

When you and the user agree, run `{{TICKET_CMD}} --next AAD.summary.md` to continue the current cycle. Append FILE_NAME to TICKET_DIR, then immediately create the summary file at that path. Do not overwrite an existing file. Start implementing after creating it.

Maintain the file as a **live report** while you work.

Use subagents (your subagent tool) for distinct, isolated units of work when beneficial.

## 4. Summarize

Finalize the summary file: replace the working notes with the final content described below.

Start the summary with a header, then a suggested commit message {{COMMIT_RULE}}. The shorter the better. Omit any field with nothing to list. Always exclude `alignfirst` from skills.

Example:

```markdown
# AAD Summary - [very short title]

Suggested commit message: `<commit message>`

Used documentation:

- `docs/topic-a/doc-1.md`
- `docs/topic-b/doc-2.md`

Used skills: `skill-a`, `skill-b`
```

The finalized summary is a **very concise handover document** that should capture:

- What was the topic or problem
- What was decided or discovered
- What action was taken (if any)
- Key outcomes or next steps

The shorter the better.

_Ignore markdown lint errors in the summary file._

At the end, give the path of the summary file to the user.
