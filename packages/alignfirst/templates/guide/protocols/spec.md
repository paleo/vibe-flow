# Specification Protocol

## Prerequisites

Run `{{TICKET_CMD}}` once to identify TICKET_DIR and load the ticket directory context (`{{CMD}} ticket --side` for a side ticket, when there is no ticket).

## Phases

When the user asks you for a SPEC (technical specification), you MUST follow this process:

1. **Investigation**: Research the codebase to understand the current implementation and identify the problem
2. **Discussion**: Collaborate with the user to explore the problem space and potential solutions BEFORE writing the specification file
3. **Specification**: Only after user approval, write the final specification file

The discussion phase is MANDATORY. Remember that you are a newcomer to this project while the user has extensive experience with the codebase and will be happy to help guide you.

## Phase 1. Investigation

Check your context for available **documentation** and **skills**. Read every document and skill relevant to any aspect of the task — this is not optional. For each skill, also **read its relevant references**.

Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what has to be done. If the Context7 MCP is available, feel free to use it.

Always seek a clean break solution by default. Never consider backward compatibility unless explicitly requested.

## Phase 2. Discussion

Engage in a thorough collaborative discussion covering:

- **Problem exploration**: Present your understanding of the problem and ask clarifying questions
- **Current implementation analysis**: Share what you discovered and ask for confirmation or corrections
- **Multiple solution approaches**: Present several viable alternatives when they exist, explaining trade-offs
- **Sub-subject identification**: Break down the problem into all relevant sub-components and ensure each is addressed
- **Design decisions**: Ask for user input on key architectural choices
- **Edge cases and implications**: Explore potential issues and broader system impacts

You should ask questions freely to ensure you fully understand:

- The problem context and requirements
- Existing patterns and conventions in the codebase
- User preferences for implementation approaches
- Any constraints or considerations you might have missed

Do not use your question tool. Always ask in plain text. Your questions will be the opportunity for a real discussion.

## Phase 3. Specification

After the user approves your proposal, run `{{TICKET_CMD}} --next spec.md --new-cycle` to start a new cycle. Append FILE_NAME to TICKET_DIR, then immediately write the specification at that path. Do not overwrite an existing file.

- After the title, include a suggested commit message {{COMMIT_RULE}}. The shorter the better. Then list the required documentation and skills. List each doc file individually — never a folder. Always exclude `alignfirst` from skills. Omit any field with nothing to list. Example:

  ```text
  # [{TICKET_ID}] Short Title

  Suggested commit message: `<commit message>`

  Required Documentation:

  - `docs/topic-a/doc-1.md`
  - `docs/topic-b/doc-2.md`

  Required skills: `skill-1`, `skill-2`
  ```

- **Do not specify backward compatibility** unless explicitly requested. Prefer clean break by default. Unused code must be removed.
- A specification is not always immediately executed, and you have to assume that the code can change before it is executed. You can mention a function by name, but NEVER mention specific line numbers as they will become obsolete.
- Spell out every change to code contracts: database schema and migrations, API shapes, critical type definitions.
- Do not include other detailed code. Refer to source files by path or function name.
- Cover the full scope of the task. Never drop parts to shrink the spec — splitting work across plans is handled later by the *plan* protocol. If you anticipate a section should land in a separate plan, flag it inline (e.g. "candidate for a specialized plan").
- Do not include sections like "Benefits", "Code Style Compliance" or anything that adds no new information. Focus on the problem and the solution.

_Important Note:_ There will be lint errors in the markdown file you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE SPEC.

At the end, give the path of the spec file to the user.
