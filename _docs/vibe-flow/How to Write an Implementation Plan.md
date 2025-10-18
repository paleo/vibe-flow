# How to Write an Implementation Plan

## CRITICAL FIRST STEP: Determine MODE

**STOP. Before proceeding any further, you MUST determine which MODE you are in.**

Examine the user's request carefully:

- **WITH-SPEC MODE**: The user mentions or provides an existing spec file with a path matching `_plans/*/??-spec.md` (e.g., `_plans/123/A1-spec.md`)
- **DISCUSSION MODE**: All other cases - the user describes a task/problem without providing a spec file

The MODE determines your entire workflow.

## Pre-requisites

Before you start, read the `Vibe Flow Guide.md` entirely.

### Determine TASK_DIR, CYCLE_LETTER, and FILE_NUMBER

You need:

- the **TASK_DIR** - if you don't have it, ask the user for a **ticket ID**
- the current **CYCLE_LETTER** and the next **FILE_NUMBER** - deduce them by yourself.

By default, in WITH-SPEC MODE, start with a new cycle (bump the CYCLE_LETTER, reset the FILE_NUMBER to 1).

## Phases

**Reminder: You should have already determined and stated the MODE above.**

In order to generate a plan, you MUST follow this process:

- **State the MODE explicitly** in your response.
- **Read the spec** (WITH-SPEC MODE only): Read and understand the spec file entirely.

Then, execute the phases:

1. **Investigation Phase**: Take the time to explore the codebase, understand the current implementation, and identify the problem
2. **Discussion Phase** (DISCUSSION MODE only): Collaborate with the user to explore the problem space and potential solutions BEFORE designing the plan
3. **Designing Phase**: Design the final plan - If you discover issues or missing design decisions, STOP and ask the user
4. **Writing Phase**: Write the plan file
5. **Review Phase**: Critically review and improve the plan

**Important MODE-specific behavior:**

- In **DISCUSSION MODE**, the discussion phase (Phase 2) is MANDATORY. Remember that you are a newcomer to this project while the user has extensive experience with the codebase and will be happy to help guide you. If the plan is straightforward and you have no question to ask, then you still must ask for confirmation before proceeding.
- In **WITH-SPEC MODE**, skip Phase 2 entirely and proceed from investigation directly to designing.

## Phase 1. Investigation Phase

Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what has to be done. If the Context7 MCP is available, feel free to use it.

**In WITH-SPEC MODE**: Use the SPEC text as a starting point, but do not trust it blindly. Verify the current implementation and ensure the spec is still accurate. If you discover that an important design choice still needs to be made, or if the spec has issues, STOP and discuss with the user.

## Phase 2. Discussion Phase (DISCUSSION MODE Only)

**This phase is skipped in WITH-SPEC MODE.**

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

## Phase 3. Designing Phase

### 3.1 Guidelines

**In DISCUSSION MODE**: After the user approves your proposal, design the final plan.

**In WITH-SPEC MODE**: Design the implementation plan based on the spec. Include all useful information from the SPEC. If the SPEC is already detailed enough, you can extract and reuse parts of it. Add implementation details, file paths, and a breakdown into steps that weren't in the spec.

Follow these guidelines:

- The plan must be a **self-explanatory prompt** for a coding agent, so help it by explaining what you discovered.
- Give some context: explain how it works currently, and how it will work after the task is done.
- In a "Prerequisites" section, select the **relevant documentation** from the `_docs/` directory. Do not repeat any documentation. Instead, mention the documentation that needs to be read. Always include `Code Style Guidelines.md` in the list.
- Mention a way to find **important source files**: by giving file paths, or by providing a function name to search for, for example. If needed, line numbers can be mentioned in the plan.
- Include a list of **numbered steps**.
- **Never plan backward compatibility** unless explicitly requested. Prefer clean code. Unused code must be removed.
- About **tests**: Investigate first in the codebase if there are tests already in place for the kind of tests you consider. Do not mention to write tests unless you are sure they will be well-integrated in the project.
- Do not include sections like "Benefits", "Code Style Compliance", "Rationale" or anything that adds no actionable information. Focus on the problem and the solution.

### 3.2 Add a Final Step

In your plan there is a list of steps. Add a new step named "Write a Handover Document" with this content:

<content_to_add>
Write a **handover document**. This document must contain the list of all files you updated. Also, summarize the changes made in a very concise way. Add only relevant information that will help your teammates understand what's new. Do not mention obvious information. It's not a course or a tutorial, if there is nothing to explain, then do not explain. Write this handover document in a new `{TASK_DIR}/{TASK_FILE_PREFIX}-summary.md` markdown file. Avoid overwriting an existing file. Ignore lint errors (formatting issues) in this file.
</content_to_add>

Note:

- This is a regular step, it should be numbered like the other steps.
- Replace "{TASK_DIR}" with the actual TASK_DIR, e.g., `_plans/123/`
- Replace "{TASK_FILE_PREFIX}" with the current CYCLE_LETTER and the FILE_NUMBER of the plan plus one, e.g., `A2`

### 3.3 Last Paragraph

Add the following content to the very end of the plan:

<content_to_add>
---

Do not trust this plan blindly. Be sure you understand the codebase and the plan by yourself before applying it.
</content_to_add>

## Phase 4. Writing Phase

The plan file must be saved as `_plans/{TASK_DIR}/{CYCLE_LETTER}{FILE_NUMBER}-plan.md`. Most of the time, this will be `_plans/123/A1-plan.md` in DISCUSSION MODE, or `_plans/123/A2-plan.md` in WITH-SPEC MODE (incremented from spec).

Be careful never to overwrite an existing file.

_Important Note: There will be lint errors in the markdown file you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE PLAN._

## Phase 5. Review Phase

When you think the plan is complete, read it again with a critical eye, edit it to improve it. Repeat until you think it's solid.
