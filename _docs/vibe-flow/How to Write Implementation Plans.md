# How to Write Implementation Plans

## Pre-requisites

Before you start, read the `Vibe Flow Guide.md` entirely.

### Determine TASK_DIR, CYCLE_LETTER, and FILE_NUMBER

You need:

- the **TASK_DIR** - if you don't have it, ask the user for a **ticket ID**
- the current **CYCLE_LETTER** and the next **FILE_NUMBER** - deduce them by yourself.
- a **spec file** in the `_plans/{TASK_DIR}/` directory

If any of these pieces of information is missing, STOP AND ASK THE USER.

## Phases

Before starting, **read the spec file** and understand it entirely.

In order to generate implementation plans, you MUST follow this process:

1. **Investigation Phase**: Take the time to explore the codebase, understand the current implementation, and identify the problem
2. **Analysis Phase**: Determine which subagents are needed (if any) based on the files/areas that will be modified
3. **Designing Phase - Implementation Plan Structure**: Design plan(s) based on the analysis - If you discover issues or missing design decisions, STOP AND ASK THE USER
4. **Designing Phase - Orchestrator Plan**: If multiple subagents are involved, design an orchestrator plan to coordinate them
5. **Writing Phase**: Write the plan file(s)
6. **Review Phase**: Critically review and improve the plan(s)

## Phase 1. Investigation Phase

Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what has to be done.

Use the SPEC text as a starting point, but do not trust it blindly. Verify the current implementation and ensure the spec is still accurate. If you discover that an important design choice still needs to be made, or if the spec has issues, STOP AND ASK THE USER.

## Phase 2. Analysis Phase

Based on your investigation, determine the plan structure:

### 2.1 Assess Work Scope and Independence

First, evaluate if the work can be split into **specialized sub-plans**:

- **Single, cohesive work**: Generate a **single plan**
- **Large work with independent pieces**: Split into multiple plans with an orchestrator
  - Each sub-plan should be independently executable (no sequential dependencies between them)
  - Sub-plans work on completely separated parts of the codebase
  - Example: refactoring 3 independent packages
  - If **Subagents** (or **Custom Agents**) are defined, use their specialization areas to help determine how to split the work.

### 2.2 Map to Subagents (if applicable)

**If Subagents exist**:

1. **Identify affected areas**: List all files, packages, and directories that will be modified
2. **Map to subagents**: Using the subagent specialization areas, determine which subagents are responsible for each area
3. **Combine with scope assessment**:
   - **Single subagent needed**: Create a **single plan** (no orchestrator)
   - **Multiple subagents OR independent sub-plans**: Create multiple specialized plans + one orchestrator plan
   - When splitting by independence AND subagents, align sub-plans with both criteria

## Phase 3. Designing Phase - Implementation Plan Structure

Design an implementation plan based on the spec. Include all useful information from the SPEC. If the SPEC is already detailed enough, you can extract and reuse parts of it. Add implementation details, file paths, and a breakdown into steps that weren't in the spec.

### 3.1 Common Plan Guidelines

**These guidelines apply to all plans (single plan or specialized plans).**

Follow these guidelines:

- The plan must be a **self-explanatory prompt** for the coding agent, so help it by explaining what you discovered that is relevant.
- Give some context: explain how it works currently, and how it will work after the task is done.
- In a "Prerequisites" section, select the **relevant documentation** from the `_docs/` directory. Do not repeat any documentation. Instead, mention the documentation that needs to be read. Always include `Code Style Guidelines.md` in the list.
- Mention a way to find **important source files**: by giving file paths, or by providing a function name to search for, for example. If needed, line numbers can be mentioned in the plan.
- Include a list of **numbered steps**.
- **Never plan backward compatibility** unless explicitly requested. Prefer clean code. Unused code must be removed.
- About **tests**: Investigate first in the codebase if there are tests already in place for the kind of tests you consider. Do not mention to write tests unless you are sure they will be well-integrated in the project.
- Do not include sections like "Benefits", "Code Style Compliance", "Rationale" or anything that adds no actionable information. Focus on the problem and the solution.

### 3.2 Additional Requirements for Specialized Plans

**Use this when multiple plans are created (either for different subagents or for independent work pieces).**

For specialized plans, add these additional requirements:

**At the top of each specialized plan**, add a header indicating which subagent should execute it (or "Agent" if no specific subagent):

```markdown
**Assigned to**: [Subagent Name or "Agent"]
```

**In the context section**, explain what you discovered **relevant to this plan's scope** and how it works currently and will work after the task is done **within its scope**.

**In the numbered steps**, include only steps for this plan's work. Each plan should be independently executable.

**Coordination notes**: If this plan has dependencies on another plan (sequential execution required), mention it explicitly. Otherwise, plans can be executed in parallel.

### 3.3 Add a Final Step to Plans

**For single plans and specialized plans**, add a final step named "Write a Handover Document" with this content:

```markdown
Write a **handover document**. This document must contain the list of all files you updated. Also, summarize the changes made in a very concise way. Add only relevant information that will help your teammates understand what's new. Do not mention obvious information. It's not a course or a tutorial, if there is nothing to explain, then do not explain. Write this handover document in `{PLAN_FILE_PATH}.summary.md`. Avoid overwriting an existing file. Ignore lint errors (formatting issues) in this file.
```

Note:

- This is a regular step, it should be numbered like the other steps. For example, if your plan has 5 steps, this becomes step 6.
- Replace "{PLAN_FILE_PATH}" with the actual plan file path without extension (e.g., for plan `_plans/123/A2-plan-backend.md`, use `_plans/123/A2-plan-backend`, resulting in `_plans/123/A2-plan-backend.summary.md`).

### 3.4 Common Footer for All Plans

Add the following content to the very end of each plan (single plan or specialized plan):

```markdown
---

Do not trust this plan blindly. Be sure you understand the codebase and the plan by yourself before applying it.
```

## Phase 4. Designing Phase - Orchestrator Plan

**Create an orchestrator plan only when multiple plans are created. Skip this section entirely if not applicable.**

### 4.1 Orchestrator Plan Guidelines

The orchestrator plan coordinates the execution of all specialized plans. It should contain:

1. **Reference to the specification**: Mention the spec file but do not repeat its content.
2. **Execution strategy**: Specify if plans can be executed in parallel or must be sequential, with dependencies clearly noted.
3. **Plan assignments**: For each specialized plan, specify which subagent (or "Agent") should execute it.
4. **Coordination notes**: Any important information about how the plans interact or depend on each other.
5. **Final step**: Add a step to write an orchestrator handover (see section 4.2).

Format example:

<example_markdown>

## Execution Plan

This orchestrator coordinates the implementation of [reference spec file].

### Execution Strategy

**Parallel execution possible**: Plans A3, A4, and A5 are independent and can be executed simultaneously.

OR

**Sequential execution required**: A3 must complete before A4 (A4 depends on API endpoints from A3).

### Plan Assignments

1. **Backend Plan** (`A3-plan-backend.md`)
   - **Assigned to**: `backend-coder`
   - **Description**: [Brief description of what this plan accomplishes]

2. **React Plan** (`A4-plan-react.md`)
   - **Assigned to**: `react-coder`
   - **Description**: [Brief description of what this plan accomplishes]

3. **Plugin Update** (`A5-plan-plugin.md`)
   - **Assigned to**: `plugin-coder`
   - **Description**: [Brief description of what this plan accomplishes]

### Coordination Notes

[Any important notes about how the plans interact, if applicable]

</example_markdown>

### 4.2 Orchestrator Handover Step

Add a final step to the orchestrator plan named "Write Orchestrator Handover Document" with this content:

```markdown
Write an **orchestrator handover document**. This document should:

1. Reference each specialized plan's handover file
2. For each referenced handover:
   - State "Completed" if the plan was executed successfully
   - Detail any issues encountered during execution

Keep this handover very short. Do not combine or repeat the content of individual handovers. Write this document in `{PLAN_FILE_PATH}.summary.md`. Avoid overwriting an existing file. Ignore lint errors (formatting issues) in this file.
```

Note:

- Replace "{PLAN_FILE_PATH}" with the actual plan file path without extension (e.g., for plan `_plans/123/A2-plan-orchestrator.md`, use `_plans/123/A2-plan-orchestrator`, resulting in `_plans/123/A2-plan-orchestrator.summary.md`)

### 4.3 Footer for Orchestrator Plan

Add the following content to the very end of the orchestrator plan:

```markdown
---

Do not trust this plan blindly. Be sure you understand the codebase and all specialized plans before coordinating their execution.
```

## Phase 5. Writing Phase

Write the plan file(s) according to the determined structure:

**Single Plan**:

- **Single plan**: `_plans/{TASK_DIR}/{CYCLE_LETTER}{FILE_NUMBER}-plan.md`
  - Example: `_plans/123/A2-plan.md`
  - Handover: `_plans/123/A2-plan.summary.md`
  - No orchestrator plan needed

**Multiple Plans** (multiple subagents OR independent work pieces):

- **Orchestrator plan**: `_plans/{TASK_DIR}/{CYCLE_LETTER}{FILE_NUMBER}-plan-orchestrator.md`
  - Example: `_plans/123/A2-plan-orchestrator.md`
  - Handover: `_plans/123/A2-plan-orchestrator.summary.md` (written after all specialized plans complete)
- **Specialized plans**: `_plans/{TASK_DIR}/{CYCLE_LETTER}{FILE_NUMBER}-plan-{DESCRIPTOR}.md`
  - Use subagent name or descriptive name: `backend`, `react`, `plugin-contact-form`, `package-converter`, etc.
  - Example: `_plans/123/A3-plan-backend.md`, `_plans/123/A4-plan-plugin-zoom.md`, `_plans/123/A5-plan-plugin-menu.md`
  - Handovers: `_plans/123/A3-plan-backend.summary.md`, etc.

**Important**:

- Increment FILE_NUMBER for each plan file
- Use lowercase, hyphenated descriptors for plan names (subagent name or work scope descriptor)
- When multiple plans are created, the orchestrator plan should be written first and have the lowest FILE_NUMBER
- Be careful never to overwrite an existing file

_Important Note: There will be lint errors in the markdown files you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE PLANS._

## Phase 6. Review Phase

When you think the plan(s) are complete, read them again with a critical eye, edit them to improve them.

Repeat the review until you think all plans are solid.

**Additional review for multiple plans**:

- Each specialized plan is self-contained and independently executable
- Each specialized plan clearly states its assignment (subagent or "Agent")
- The orchestrator plan correctly references all specialized plans
- The orchestrator specifies if plans can run in parallel or must be sequential
- Dependencies between plans are clearly documented
