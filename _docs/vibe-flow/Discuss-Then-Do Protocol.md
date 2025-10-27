# Discuss-Then-Do Protocol (DTDP)

## Pre-requisites

Before you start, read the `Vibe Flow Guide.md` entirely.

You need:

- the TASK_DIR - if you don't have it, ask the user for a **ticket ID**
- the current CYCLE_LETTER and the next FILE_NUMBER - deduce them by yourself

## Phases

When the user initiates a DTDP, you MUST follow this four-phase process:

1. **Investigation Phase**: Research the codebase to understand the current implementation and context
2. **Discussion Phase**: Collaborate with the user to explore the problem/solution space BEFORE taking action
3. **Action Phase**: Only after user approval, implement the agreed-upon solution
4. **Summary Phase**: Write a brief summary of what was discussed, decided, and done

The discussion phase is MANDATORY. Remember that you are a newcomer to this project while the user has extensive experience with the codebase and will be happy to help guide you.

## Phase 1. Investigation Phase

Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what needs to be done. If the Context7 MCP is available, feel free to use it.

Your goal is to build a solid understanding of:

- The current implementation and relevant code paths
- How the system currently behaves
- What needs to change or be addressed
- Potential approaches and their implications

## Phase 2. Discussion Phase

Engage in a thorough collaborative discussion covering:

- **Problem/Goal exploration**: Present your understanding and ask clarifying questions
- **Current implementation analysis**: Share what you discovered and ask for confirmation or corrections
- **Approach evaluation**: Discuss potential solutions and their trade-offs
- **Edge cases and implications**: Explore potential issues and broader system impacts

You should ask questions freely to ensure you fully understand:

- The context and requirements
- Existing patterns and conventions in the codebase
- User preferences for implementation approaches
- Any constraints or considerations you might have missed

**Remember**: This discussion happens BEFORE any implementation or formal specification writing.

## Phase 3. Action Phase

**Important: always ensure the user approves your proposal before implementing anything!**

When implementing the solution, follow these guidelines:

- **Code Style**: Adhere to the project's coding standards as outlined in `Code Style Guidelines.md`
- **Scope**: Implement only what was discussed and agreed upon
- **Testing**: Verify your changes work as expected
- **Communication**: Keep the user informed of progress and any unexpected findings

## Phase 4. Summary Phase

Write the summary in a markdown file in TASK_DIR. Compose the filename with the current CYCLE_LETTER and the next FILE_NUMBER, e.g. `A1-summary.md`. Do not overwrite an existing file.

The summary should capture:

- What was the topic or problem
- What was decided or discovered
- What action was taken (if any)
- Key outcomes or next steps

Keep it concise—the shorter the better.

_Important Note: There will be lint errors in the markdown file you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE SUMMARY._
