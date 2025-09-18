# Upgrade AI Workflow to `AGENTS.md`

In order to determine if an AI workflow is already set up, look for the `_docs/ai-workflow/` directory. If it doesn't exist, then the workflow is not set up and you must stop now. DO NOT PROCEED WITHOUT CONFIRMATION IF AI WORKFLOW IS NOT SET UP.

If the workflow is set up, proceed with the following steps:

1. Search in the codebase for AI instructions files using this glob pattern: `**/{INDEX.md,.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,GEMINI.md}`. If one or more files exist, choose the most complete and up-to-date one. This becomes the **START_FILE**.
2. If START_FILE is `AGENTS.md`, then you must stop now. DO NOT PROCEED IF START_FILE IS ALREADY `AGENTS.md`.
3. Replace the content of `AGENTS.md` file with the content of START_FILE.
4. Update the new content of `AGENTS.md`: correct the paths to the documents, relative to the root of the repository (prefix with `_docs/`, e.g. `_docs/Code Style Guidelines.md`).
5. In `AGENTS.md`, insert a new section just before the section that contains a list of available documents (probably `## Documentation Files`). If you can't find the right place, append it at the end of the file. Here is the content:

   ```markdown
   ## Important Instructions

   - For each task the user asks, you MUST select the relevant documentation files and read them ENTIRELY.
   - Always ignore `_local` and `_plans` directories when you search for anything in the codebase.
   ```

6. Remove START_FILE.
7. Remove every other instructions file in the codebase, except for `CLAUDE.md` if it exists.
8. If a `CLAUDE.md` file exists, then remove all the previous content, even the title. Replace the content with this one line:

   ```markdown
   @AGENTS.md
   ```
