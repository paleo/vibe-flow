# How to Write an Implementation Plan

## Pre-requisites

Before you start, read the `AI Workflow Guide.md` entirely.

You need:

- the TASK_DIR
- the current CYCLE_LETTER and the next FILE_NUMBER
- a SPEC (technical specification)

If you don't have these inputs, then ask the user to provide them.

## Creating an Implementation Plan

This is a procedure for a planning-only task. Help the user design an implementation plan for improving this project.

Use the SPEC text as a starting point, but do not trust it. Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what has to be done.

### Guidelines

- Remember that you are a newcomer to this project while the user has extensive experience with the codebase and will be happy to help guide you. If you have any doubt, or if you discover that an important design choice still needs to be made, STOP and ask.
- The implementation plan will be a prompt for a coding agent, so help it by explaining what you discovered.
- Start with some context: explain how it works currently, and how it will work after the task is done.
- Select the relevant documentation from the `_docs/` directory. Do not repeat any documentation. Instead, mention the documentation that needs to be read.
- Mention a way to find important source files: by giving file paths, or by providing a function name to search for, for example.
- **Do not add backwards compatibility** unless explicitly requested. Prefer clean code. Unused code must be removed.
- If the SPEC contains some code, and if you think it is relevant, include it in the implementation plan. Include all useful information from the SPEC, but do not copy-paste the full SPEC as-is.

### Add Content To The Plan

In your plan there is a list of steps, add a new step named "Write a Handover Document" with this content:

<content_to_add>
You are part of our team and you work as a team. After you finish your work, your teammate Joe will continue working using your implementation. So now you are expected to write a handover document for Joe. The document must contain the list of all files you updated. Summarize the changes made in a very concise way. Add only relevant information that would help someone understand what's new. Beware that Joe doesn't like losing his time. Be very concise. Do not mention obvious information. It's not a course or a tutorial. If there is nothing to explain, then do not explain.

Write this handover document in a new `{TASK_DIR}/{TASK_FILE_PREFIX}-handover.md` markdown file. Avoid overwriting an existing file. Ignore lint errors in the summary file.
</content_to_add>

Note:

- This is a regular step, it should be numbered like the other steps.
- Replace "{TASK_DIR}" with the actual TASK_DIR, e.g. `_plans/123/`
- Replace "{TASK_FILE_PREFIX}" with the current CYCLE_LETTER and the next file number, e.g. `A3`

Add the following content to the very end of the implementation plan:

<content_to_add>
---

Do not trust this implementation plan blindly. Be sure you understand the codebase and the plan by yourself before applying it.
</content_to_add>

## Save the Implementation Plan

Write your plan in a markdown file in TASK_DIR. Compose the filename with the current CYCLE_LETTER and the next FILE_NUMBER, e.g. `A2-plan.md`. Do not overwrite an existing file.

_Important Note: There will be lint errors in the markdown file you write. Ignore them. NEVER FIX LINT ERRORS IN THE PLAN._

## Improve the PLAN

When you think the plan is complete, read it again with a critical eye, edit it to improve it. Repeat until you think it's solid.
