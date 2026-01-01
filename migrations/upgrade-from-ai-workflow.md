# Upgrade from AI-Workflow

**In order to determine if the legacy AI-Workflow is set up, look for the `_docs/ai-workflow/` directory. If it doesn't exist, then the legacy workflow is not set up and you must stop now. DO NOT PROCEED WITHOUT CONFIRMATION IF THE LEGACY WORKFLOW IS NOT SET UP.**

If the legacy workflow is set up, proceed with the following steps:

## Step 1 — Use `AGENTS.md` as the main instruction file

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

## Step 2 — Rename `ai-workflow` to `alignfirst`

1. Rename the `_docs/ai-workflow` directory to `_docs/alignfirst`.
2. In the `AGENTS.md` file, rename the directory in the references files accordingly.
3. In `_docs/alignfirst/`, rename these files if they exist:
   - `AI Workflow Guide.md` → `AlignFirst Guide.md`
   - `Discuss-Then-Do Protocol.md` → `Align-and-Do Protocol.md`
4. In the `AGENTS.md` file, update all references to these renamed files.
5. Search for `ai-workflow` in the codebase and replace it with `alignfirst`.
6. Search for `AI Workflow` in the codebase and replace it with `AlignFirst`.
7. Search for `DTDP` in the codebase and replace it with `ALADO`.
8. Search for `Discuss-Then-Do` in the codebase and replace it with `Align-and-Do`.

## Step 3 — Move the "Code Quality & Refactoring" document

If a `_docs/alignfirst/Code Quality & Refactoring.md` file exists, do the following:

1. Move the `_docs/alignfirst/Code Quality & Refactoring.md` file to `_docs/Code Quality & Refactoring.md`.
2. Update any references to the document in `AGENTS.md` to reflect its new location. Move the reference from the "AlignFirst" section to another section (like an "Additional documentation" section).
3. In `Code Quality & Refactoring.md`, remove any references to `alignfirst`. Remove the "Pre-requisites" section if it exists.

## Step 4 - Update AlignFirst Documents

Fetch this migration prompt and execute all the steps: https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/v1/migrations/update-alignfirst.md

Note: When executing this migration, since you are coming from `ai-workflow`, the script will detect `_docs/alignfirst/` (which you just created in Step 2) and will run the "Update AlignFirst" path.
