# How to Write an Implementation Plan

## Pre-requisites

Before you start, read the `AI Workflow Guide.md` entirely.

You need:

- the TASK_DIR - if you don't have it, ask the user for a **ticket ID**
- the current CYCLE_LETTER and the bumped FILE_NUMBER - deduce them by yourself
- a SPEC (technical specification) - if you don't have it, ask the user for it

## Creating an Implementation Plan

This is a procedure for a planning-only task. Help the user design an implementation plan for improving this project.

Use the SPEC text as a starting point, but do not trust it. Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what has to be done.

Remember that you are a newcomer to this project while the user has extensive experience with the codebase and will be happy to help guide you. If you have any doubt, or if you discover that an important design choice still needs to be made, STOP and ask.

### Guidelines

- The implementation plan must be a **self-explanatory prompt** for a coding agent, so help it by explaining what you discovered.
- Give some context: explain how it works currently, and how it will work after the task is done.
- In a "Prerequisites" section, select the **relevant documentation** from the `_docs/` directory. Do not repeat any documentation. Instead, mention the documentation that needs to be read. Always include `Code Style Guidelines.md` in the list.
- Mention a way to find **important source files**: by giving file paths, or by providing a function name to search for, for example. If needed, line numbers can be mentioned in the plan.
- Include a list of **numbered steps** and all useful information from the SPEC:
  - If the SPEC is already a good plan, you can use it as-is.
  - Do not add **backwards compatibility** unless explicitly requested. Prefer clean code. Unused code must be removed.
  - About **tests**: Investigate first in the code base if there are tests already in place for the kind of tests you consider. Do not mention to write tests unless you are sure they will be well-integrated in the project.

### Add a Final Step to the Plan

In your plan there is a list of steps. Add a new step named "Write a Handover Document" with this content:

<content_to_add>
Write a **handover document**. This document must contain the list of all files you updated. Also, summarize the changes made in a very concise way. Add only relevant information that will help your teammates understand what's new. Do not mention obvious information. It's not a course or a tutorial, if there is nothing to explain, then do not explain. Write this handover document in a new `{TASK_DIR}/{TASK_FILE_PREFIX}-summary.md` markdown file. Avoid overwriting an existing file. Ignore lint errors (formatting issues) in this file.
</content_to_add>

Note:

- This is a regular step, it should be numbered like the other steps.
- Replace "{TASK_DIR}" with the actual TASK_DIR, e.g. `_plans/123/`
- Replace "{TASK_FILE_PREFIX}" with the current CYCLE_LETTER and the FILE_NUMBER of the plan plus one, e.g. `A3`

### Last Paragraph

Add the following content to the very end of the implementation plan:

<content_to_add>
---

Do not trust this implementation plan blindly. Be sure you understand the codebase and the plan by yourself before applying it.
</content_to_add>

## Save the Implementation Plan

Write your plan in a markdown file in TASK_DIR. Compose the filename with the current CYCLE_LETTER and the FILE_NUMBER incremented from the last one in the same cycle, e.g. `A2-plan.md`. Do not overwrite an existing file.

_Important Note: There will be lint errors in the markdown file you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE PLAN._

## Improve the PLAN

When you think the plan is complete, read it again with a critical eye, edit it to improve it. Repeat until you think it's solid.
