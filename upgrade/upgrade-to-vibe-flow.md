# Upgrade to Vibe Flow

In order to determine if the legacy version of Vibe Flow is already set up, look for the `_docs/ai-workflow/` directory. If it doesn't exist, then the legacy workflow is not set up and you must stop now. DO NOT PROCEED WITHOUT CONFIRMATION IF THE LEGACY WORKFLOW IS NOT SET UP.

If the legacy workflow is set up, proceed with the following steps:

## Step 1 — Use `AGENTS.md`

_At first, check if the `AGENTS.md` file at the root of the codebase exists. If it exists, then skip this section and go to step 2._

1. Search in the codebase for AI instructions files using this glob pattern: `**/{INDEX.md,.github/copilot-instructions.md,AGENT.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,GEMINI.md}`. If one or more files exist, choose the most complete and up-to-date one. This becomes the **START_FILE**.
2. Replace the content of `AGENTS.md` file with the content of START_FILE.
3. Update the new content of `AGENTS.md`: correct the paths to the documents, relative to the root of the repository (prefix with `_docs/`, e.g. `_docs/Code Style Guidelines.md`).
4. In `AGENTS.md`, insert a new section just before the section that contains a list of available documents (probably `## Documentation Files`). If you can't find the right place, append it at the end of the file. Here is the content:

   ```markdown
   ## Important Instructions

   - For each task the user asks, you MUST select the relevant documentation files and read them ENTIRELY.
   - Always ignore the `_plans` directory when you search for anything in the codebase.
   ```

5. Remove the START_FILE file. It is replaced by `AGENTS.md`, we don't need it anymore.
6. Remove every other instructions file in the codebase, except for `CLAUDE.md` if it exists.
7. If a `CLAUDE.md` file exists, then remove all the previous content, even the title. Replace the content with this one line:

   ```markdown
   @AGENTS.md
   ```

## Step 2 — Rename `ai-workflow` to `vibe-flow`

1. Rename the `ai-workflow` directory to `vibe-flow`.
2. In the `AGENTS.md` file, rename the directory in the references files accordingly.
3. In `_docs/vibe-flow/`, rename the `AI Workflow Guide.md` file to `Vibe Flow Guide.md`.
4. In the `AGENTS.md` file, rename the reference to the guide accordingly.
5. Search for `ai-workflow` in the codebase and replace it with `vibe-flow`.
6. Search for `AI Workflow` in the codebase and replace it with `Vibe Flow`.

## Step 3 — Move the "Code Quality & Refactoring" document

If a `_docs/vibe-flow/Code Quality & Refactoring.md` file exists, do the following:

1. Move the `_docs/vibe-flow/Code Quality & Refactoring.md` file to `_docs/Code Quality & Refactoring.md`.
2. Update any references to the document in `AGENTS.md` to reflect its new location. Move the reference from the "Vibe Flow" section to another section (like an "Additional documentation" section).
3. In `Code Quality & Refactoring.md`, remove any references to `vibe-flow`. Remove the "Pre-requisites" section if it exists.

## Step 4 — Update Vibe Flow Documents

### Overwrite Vibe Flow Core Documents

Use `curl` or `wget` to fetch and overwrite the following files with their latest versions:

- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/How%20to%20Write%20a%20Technical%20Specification.md) to `_docs/vibe-flow/How to Write a Technical Specification.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/How%20to%20Write%20an%20Implementation%20Plan.md) to `_docs/vibe-flow/How to Write an Implementation Plan.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/Discuss-Then-Do%20Protocol.md) to `_docs/vibe-flow/Discuss-Then-Do Protocol.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/Vibe%20Flow%20Guide.md) to `_docs/vibe-flow/Vibe Flow Guide.md`

Important: Use `curl -o "filename"` or `wget -O "filename"` to set the exact output filename and avoid URL-encoded names.

Also, do not chain the commands with `&&`. Run them carefully one by one.

### Add Writing Documentation Guide

Check if `_docs/Writing Documentation.md` exists:

- If it **does not exist**:
  1. Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/Writing%20Documentation.md) to `_docs/Writing Documentation.md` using `curl -o` or `wget -O`.
  2. Add a reference to this document in `AGENTS.md` under the "Additional documentation" section (or similar section for optional documents). Use this format: `- _docs/Writing Documentation.md - Guidelines for writing documents in the _docs directory`
- If it **already exists**: Skip this step and do not modify the existing file.

### Reference DTDP document

In `AGENTS.md`, insert a reference to the new `Discuss-Then-Do Protocol.md` file in the Vibe Flow section. Take the opportunity to replace the descriptions of the workflow documents if they are not up-to-date:

```markdown
Vibe Flow:

- `_docs/vibe-flow/How to Write a Technical Specification.md` - To design a **spec**
- `_docs/vibe-flow/How to Write an Implementation Plan.md` - To design a **plan**
- `_docs/vibe-flow/Discuss-Then-Do Protocol.md` - **DTDP** is a collaborative process for any task except writing a spec or plan: bug fixes, features, design decisions, refactoring, etc.
- `_docs/vibe-flow/Vibe Flow Guide.md` - Where to save specifications and plans
```
