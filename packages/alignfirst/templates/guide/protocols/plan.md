# Planning Protocol

## Prerequisites

### Determine TICKET_DIR and the Spec File

You need:

- the TICKET_DIR and ticket directory context — run `{{TICKET_CMD}}` once (`{{CMD}} ticket --side` when there is no external ticket)
- a **spec file** in the TICKET_DIR

Identify TICKET_DIR and the spec file before starting the protocol. If either is missing, STOP AND ASK THE USER.

## Phases

Before starting, **read the spec file** and understand it entirely.

In order to generate implementation plans, you MUST follow this process:

1. **Investigation**: Explore the codebase, understand the current implementation, and identify the problem
2. **Analysis**: Determine the plan structure (single or multiple plans) and identify relevant documentation and skills
3. **Plan Design**: Design plan(s) based on the analysis - If you discover issues or missing design decisions, STOP AND ASK THE USER
4. **Main Plan Design**: If multiple plans, design a main plan to coordinate them
5. **Writing**: Write the plan file(s)
6. **Review**: Critically review and improve the plan(s)

## Phase 1. Investigation

Check your context for available **documentation** and **skills**. Read every document and skill relevant to any aspect of the task — this is not optional. For each skill, also **read its relevant references**.

Investigate the codebase yourself, find the relevant source code, think carefully, take the time to understand how it currently works and what has to be done.

Use the SPEC text as a starting point, but do not trust it blindly. Verify the current implementation and ensure the spec is still accurate. If you discover that an important design choice still needs to be made, or if the spec has issues, STOP AND ASK THE USER.

For each operation in the spec, search for existing functions that do a similar job.

## Phase 2. Analysis

Based on your investigation, determine the plan structure:

### 2.1 Assess Work Scopes

Evaluate if the work should be split into multiple specialized plans or handled as a single plan:

- **Single plan**: Preferred when work is small enough to be manageable, especially if it is cohesive within one area
- **Multiple specialized plans with a main plan**: Split the work when it is complex, based on:
  - **Distinct logical units**: When large enough, separate features or modules within the same stack
  - **Stack boundaries**: Different technologies or specialization areas (if custom agents are defined, their descriptions can help identify these boundaries)
  - Each specialized plan should produce a **coherent deliverable**

### 2.2 Identify Relevant Documentation and Skills

Identify which **documentation** and **skills** are relevant for the work. Omit if none apply.

- List the documentation and skills that the implementing agent should read and follow. Always exclude `alignfirst` from skills.
- For complex skills with reference files, identify specific files that should be loaded

## Phase 3. Plan Design

Design an implementation plan based on the SPEC. Include all useful information from the spec. If the spec is already detailed enough, you can extract and reuse parts of it. Add implementation details, file paths, and a breakdown into steps that weren't in the spec.

### 3.1 Plan Content Guidelines

Follow these guidelines for all plans (single or specialized):

- The plan must be a **self-explanatory prompt** for the coding agent, so help it by explaining what you discovered that is relevant.
- Give some context: explain how it works currently, and how it will work after the task is done.
- In a "Prerequisites" section, list **relevant documentation and skills** to use. Do not repeat their content.
- Mention a way to find **important source files**: by giving file paths, or by providing a function name to search for, for example. If needed, line numbers can be mentioned in the plan.
- Include a list of **numbered steps**.
- **Never plan backward compatibility** unless explicitly requested. Prefer clean code. Unused code must be removed.
- About **tests**: First investigate the codebase to see if there are tests already in place for the kind of tests you're considering. Do not mention writing tests unless you are sure they will be well-integrated into the project.
- Do not include sections like "Benefits", "Code Style Compliance", "Rationale" or anything that adds no actionable information. Focus on the problem and the solution.
- List **existing functions to reuse or refactor**. Plan thin wrappers, not re-implementations. Each operation should have one proper place.

### 3.2 Single Plan Format

_Use this when writing a single plan. Skip this section for multiple plans._

A single plan has no header with assignment, documentation, or skills — they are listed in the Prerequisites section within the plan body.

### 3.3 Specialized Plan Format

_Use this when writing multiple plans. Skip this section for a single plan._

For specialized plans, add these additional requirements:

**At the top of each specialized plan**, add a header. Only include fields that have content — omit any field with nothing to list. One agent can be assigned to multiple plans (separate instances).

_Note: "Custom agent" refers to configured agent profiles in your environment (e.g., custom agents in Copilot, custom subagents in Claude Code). If your environment doesn't support this, ignore the "Assigned to" field._

Example:

```markdown
# Specialized Plan - [Short Title Here]

- **Assigned to**: `agent-name`
- **Documentation**:
  - `docs/topic-a/relevant-doc.md`
  - `docs/topic-b/other-doc.md`
- **Skills**: `skill-a`, `skill-b`
```

**In the context section**, explain what you discovered **relevant to this plan's scope** and how it works currently and will work after the task is done **within its scope**.

**In the numbered steps**, include only steps for this plan's work. Each plan should be self-contained.

**Coordination notes**: If this plan depends on another plan, mention it explicitly.

### 3.4 Add a Final Step to Plans

_For all plans (single or specialized)_, add a final step named "Write a Handover Document" with this content:

```markdown
Write a **handover document**. This document must contain the list of all files you updated. Also, summarize the changes made in a very concise way. Add only relevant information that will help your teammates understand what's new. Do not mention obvious information. It's not a course or a tutorial, if there is nothing to explain, then do not explain. Create its path by replacing the final `.md` in `{PLAN_FILE_PATH}` with `.summary.md`, then write the handover there. Ignore lint errors (formatting issues) in this file. At the end, give the path of this handover file to the user.
```

Note:

- This is a regular step, it should be numbered like the other steps. For example, if your plan has 5 steps, this becomes step 6.
- Replace "{PLAN_FILE_PATH}" with the complete plan file path, such as `.plans/123/A2-plan-backend.md`. Its handover path is `.plans/123/A2-plan-backend.summary.md`.

### 3.5 Common Footer for All Plans

Add the following content to the very end of each plan:

```markdown
---

Do not trust this plan blindly. Be sure you understand the codebase and the plan by yourself before applying it.

**IMPORTANT**: Do NOT use external search tools (Context7, web search, documentation fetching) during implementation unless explicitly allowed in this plan. All context should be provided in this plan or discoverable in the codebase.
```

## Phase 4. Main Plan Design

**Create a main plan only when multiple plans are created. Skip this section entirely if not applicable.**

### 4.1 Main Plan Guidelines

The main plan coordinates the execution of all specialized plans. It should contain:

1. **Reference to the specification**: Mention the spec file but do not repeat its content.
2. **Execution strategy** section: Specify if plans can be executed in parallel or must be sequential, with dependencies clearly noted.
3. **Plan assignments** section: For each specialized plan, include only applicable fields — assignment, documentation, skills, and a brief description
4. **Main Handover Document** section

Format example:

````markdown
# Main Plan - [Short Title Here]

This main plan coordinates the implementation of [reference spec file].

## Execution Strategy

**Parallel execution possible**: Plans A3, A4, and A5 are independent and can be executed simultaneously.

OR

**Sequential execution required**: A3 must complete before A4 (A4 depends on API endpoints from A3).

## Plan Assignments

Execute these specialized plans:

1. **Plan A** (`A3-plan-xxx.md`)
   - **Assigned to**: `agent-name`
   - **Documentation**:
     - `docs/topic-a/doc-1.md`
     - `docs/topic-b/doc-2.md`
   - **Skills**: `skill-a`, `skill-b`
   - **Description**: [Brief description]

2. **Plan B** (`A4-plan-yyy.md`)
   - **Documentation**:
     - `docs/topic-b/doc-3.md`
   - **Description**: [Brief description]

_**Important:** In the prompt you give to the subagent tool, do not reproduce the specialized plan. Instead, provide the file path._

### Coordination Notes

[Any important notes about how the plans interact, if applicable]

## Main Handover Document

Write a **main plan handover document**. This document should:

1. Reference each specialized plan's handover file
2. For each referenced handover:
   - State "Completed" if the plan was executed successfully
   - Detail any issues encountered during execution

Keep this handover very short. Do not combine or repeat the content of individual handovers. Create its path by replacing the final `.md` in `{PLAN_FILE_PATH}` with `.summary.md`, then write the handover there. Ignore lint errors (formatting issues) in this file.

---

Do not trust this plan blindly. Be sure you understand the codebase and all specialized plans before coordinating their execution.

**IMPORTANT**: Do NOT use external search tools (Context7, web search, documentation fetching) during implementation unless explicitly allowed in these plans. All context should be provided in these plans or discoverable in the codebase.
````

Note:

- Replace "{PLAN_FILE_PATH}" with the complete plan file path, such as `.plans/123/A2-main-plan.md`. Its handover path is `.plans/123/A2-main-plan.summary.md`.

## Phase 5. Writing

Continue the current cycle. Request the file names with `{{TICKET_CMD}} --next`, then write every file it named before requesting anything else. Append each name to TICKET_DIR to get its path. Never overwrite an existing file.

**Single plan**: run `{{TICKET_CMD}} --next plan.md`.

- Plan: `{TICKET_DIR}{CYCLE_LETTER}{FILE_NUMBER}-plan.md`, e.g. `.plans/123/A2-plan.md`
- Handover: `.plans/123/A2-plan.summary.md`

**Multiple plans**: run one command with a `--next` per file, the main plan first, then the specialized plans in the order the main plan lists them. The command returns all the names, numbered in that order, so the main plan can reference the specialized plans exactly. Example:

```
{{TICKET_CMD}} --next main-plan.md --next plan-api.md --next plan-ui.md
```

- Main plan: `{TICKET_DIR}{CYCLE_LETTER}{FILE_NUMBER}-main-plan.md`, e.g. `.plans/123/A2-main-plan.md`
- Specialized plans: `{TICKET_DIR}{CYCLE_LETTER}{FILE_NUMBER}-plan-{DESCRIPTOR}.md`, e.g. `.plans/123/A3-plan-api.md`, `.plans/123/A4-plan-ui.md`. The descriptor is lowercase and hyphenated and names the work scope or stack area.
- Handovers: replace the final `.md` with `.summary.md`, e.g. `.plans/123/A3-plan-api.summary.md`. The main plan handover is written after all specialized plans complete.

_Important Note: There will be lint errors in the markdown files you write. Ignore them. NEVER FIX LINT ERRORS (FORMATTING ISSUES) IN THE PLANS._

## Phase 6. Review

When you think the plan(s) are complete, read them again with a critical eye and edit them to improve them.

Repeat the review until you think all plans are solid.

**Additional review for multiple plans**:

- Each specialized plan is self-contained
- Each specialized plan header includes only applicable fields (assignment, documentation, skills)
- The main plan correctly references all specialized plans with their applicable fields
- Dependencies between plans are clearly documented

---

At the end, give the path of the plan file to the user (for a single plan: the plan file; for multiple plans: the main plan file)
