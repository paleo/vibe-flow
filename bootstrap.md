# Bootstrap AI Workflow

These instructions set up a minimal AI workflow for a local codebase. They produce a small, well-structured documentation set that AI agents and humans can consult on demand.

Process overview:

1. Initial checks
2. Determine the START_FILE
3. Create directories
4. Move START_FILE to `_docs/Unused Instructions.md`
5. Extract and infer documentation
6. Create `AGENTS.md`
7. Handle Links from UNUSED_FILE
8. Refresh instructions files
9. Report to the user

When complete, the repository will include a concise documentation stack. The target structure is:

```text
_docs/
├── ai-workflow/
│   ├── AI Workflow Guide.md
│   ├── Code Quality & Refactoring.md
│   ├── How to Write a Technical Specification.md
│   └── How to Write an Implementation Plan.md
├── Code Style Guidelines.md
├── How to Write Unit Tests.md
├── Monorepo Overview.md
└── Unused Instructions.md
_plans/
└── .gitkeep
AGENTS.md
```

## 1. Initial Checks

- If this is a git repository, verify the working tree is clean. If there are uncommitted changes or no version control, obtain explicit confirmation before continuing. DO NOT PROCEED WITHOUT CONFIRMATION IF THERE ARE UNCOMMITTED CHANGES.
- If an AI workflow already exists (for example, `_docs/ai-workflow/` is present), ask how to proceed. DO NOT CONTINUE WITHOUT CONFIRMATION WHEN AN AI WORKFLOW IS ALREADY SET UP.

## 2. Determine the local START_FILE

The **START_FILE** is the primary, local AI instructions file used by this repository.

Search the codebase for candidate files using this glob pattern: `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,GEMINI.md}`.

- If one or more files are found, pick the most complete and up-to-date as the START_FILE.
- If none are found:
  - If you are Claude Code: you MUST STOP NOW and ask the user to run `/init`.
  - If you are GitHub Copilot in VS Code: you MUST STOP NOW and ask the user to press CTRL+SHIFT+P (or CMD+SHIFT+P), then run "Chat: Generate Workspace Instructions File".
  - Otherwise: fetch and follow the [remote instructions](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/external/generate-workspace-instructions.md) to create `.github/copilot-instructions.md`. Use the created file as the START_FILE.

## 3. Create Directories

- Create two directories `_docs` and `_plans` at the repository root if they do not exist.
- Create the `_docs/ai-workflow` subdirectory if it does not exist.
- Create an empty file `_plans/.gitkeep`.

If `.gitignore` exists, ensure it includes:

```text
_plans/*
!.gitkeep
```

## 4. Move START_FILE to `_docs/Unused Instructions.md`

This step handles the case where START_FILE is `AGENTS.md` and we need to consolidate its content into a single, neutral location.

1. Check if `_docs/Unused Instructions.md` already exists. If it exists, you must stop now. DO NOT CONTINUE IF `_docs/Unused Instructions.md` EXISTS.
2. Move all the START_FILE content into `_docs/Unused Instructions.md`. The target file must start with `# Unused Instructions` as the title (do not keep the original title). Remove START_FILE.
3. From now on, we call `_docs/Unused Instructions.md` the **UNUSED_FILE**.

## 5. Extract and Infer Documentation

In the following sub-steps, we will extract documents from UNUSED_FILE and infer project-specific conventions from the codebase. For every new document, be brief and specific. Do not include generic best practices. This is a reference for a skilled newcomer, not a tutorial.

### 5.1. Code Style Guidelines

Create `_docs/Code Style Guidelines.md` with the repository’s actual code style rules. Extract any style guidance from UNUSED_FILE and infer additional rules from the codebase. Do not add rules that are not observed. Use concise bullet lists.

Remove from UNUSED_FILE all the information you extracted. Do not leave a link to the extracted document.

### 5.2. Monorepo Overview

If this project is not a monorepo, skip this step and go to 5.3.

Create `_docs/Monorepo Overview.md` describing the repository’s monorepo structure. Extract information about sub-projects and monorepo tooling from UNUSED_FILE and infer details from the codebase. Include at least:

- **Sub-projects** (or "Packages" or "Modules" etc., use the proper naming): List all the sub-projects and their purpose.
- **Monorepo Tooling**: Describe the tooling about how the sub-projects are handled in the monorepo
- **Main Configuration Files**

Remove from UNUSED_FILE all the information you extracted. Do not leave a link to the extracted document.

### 5.3. How to Write Unit Tests

Review the codebase. If there are no unit tests, skip this step and go to 5.4. If uncertain, stop and ask the user.

Create `_docs/How to Write Unit Tests.md` explaining how tests are written and run in this repository. Extract relevant details from UNUSED_FILE and infer the rest from the codebase.

Include at least:

- **Tooling**: Mention the tooling used.
- **Running Tests**: Explain how to run the tests, globally, for one sub-project, or for one file, with and without watcher.
- **Writing Tests**: Explain how to write tests, where to place them, how to name the files.

Be very concise. Do not mention obvious information. It's not a course or a tutorial. It's a reference for newcomers to that codebase.

Remove from UNUSED_FILE all the information you extracted. Do not leave a link to the extracted document.

### 5.4. Fetch Documents

Use `curl` or `wget` to fetch the following files:

- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/AI%20Workflow%20Guide.md) to `_docs/ai-workflow/AI Workflow Guide.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Write%20a%20Technical%20Specification.md) to `_docs/ai-workflow/How to Write a Technical Specification.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Write%20an%20Implementation%20Plan.md) to `_docs/ai-workflow/How to Write an Implementation Plan.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/Code%20Quality%20%26%20Refactoring.md) to `_docs/ai-workflow/Code Quality & Refactoring.md`

Important: Use `curl -o "filename"` or `wget -O "filename"` to set the exact output filename and avoid URL-encoded names.

## 6. Create `AGENTS.md`

Create a new `AGENTS.md` file at the repository root. Use the template below and adapt it to this project:

<index_md_template>

```markdown

# {PROJECT_NAME} Development Documentation

## Important Instructions

- For each task the user asks, you MUST select the relevant documentation files and read them ENTIRELY.
- Always ignore `_local` and `_plans` directories when you search for anything in the codebase.

## Documentation Files

Most frequently consulted procedures:

- `_docs/Code Style Guidelines.md` - ALWAYS READ BEFORE CODING

Additional documentation (read as needed):

- `_docs/How to Write Unit Tests.md`
- `_docs/Monorepo Overview.md`

AI Workflow:

- `_docs/ai-workflow/How to Write a Technical Specification.md` - For writing a **spec**
- `_docs/ai-workflow/How to Write an Implementation Plan.md` - For writing a **plan**
- `_docs/ai-workflow/Code Quality & Refactoring.md` - For **code review**, ensuring **code quality**, and **refactoring** by applying **SRP**, **DRY**, and **YAGNI** principles
- `_docs/ai-workflow/AI Workflow Guide.md` - Where plans, specifications, and implementation summaries are kept

```

</index_md_template>

## 7. Handle Links from UNUSED_FILE

### 7.1. Deprecate Documents

In UNUSED_FILE, look for markdown links or relative paths to other local `.md` files whose content overlaps with the new workflow documents:

- How to write an implementation plan (or: "How to Write a TIP.md")
- Refactoring (or: "Refactoring & Programming Principles.md")
- Or a document about Technical specifications

Then:

1. Remove those links or paths from UNUSED_FILE.
2. Rename the referenced files by appending `.DEPRECATED.md` to the filename.

### 7.2. Extract Links from UNUSED_FILE

If UNUSED_FILE contains links or relative paths to other local documentation, move those links into `AGENTS.md` under the appropriate section. Update relative paths so they remain correct from `AGENTS.md`.

## 8. New Content for Instruction Files

### 8.1. Determine the list of instruction files

Identify all instruction files for AI agents in the repository. Build a list `INSTRUCTIONS_FILES` that includes UNUSED_FILE and any other relevant files found. If your own instructions file is missing, add it to `INSTRUCTIONS_FILES`.

### 8.2. Remove or replace instruction files

Delete every file in `INSTRUCTIONS_FILES` except `AGENTS.md` and `CLAUDE.md`.

If `CLAUDE.md` exists, replace its entire content (including any title) with a single line:

```markdown
@AGENTS.md
```

## 9. Report to the User

Fill in the template below and present it to the user:

<markdown_template>

---

# Report

The {START_FILE} instructions file has been reorganized into several documents in the `_docs` directory. The goal is to avoid overloading the context window and instead provide a targeted set of documents so the agent reads only what it needs:

- The `_docs/` directory is intended for every newcomer (AI agents and human developers) to the codebase.
- The `_docs/ai-workflow/` directory contains AI-agent guidance for writing specifications, implementation plans, and performing code reviews. Treat it as a starting point and adapt as needed.
- The `_plans/` directory is where work files related to tasks will be stored. Its content is git-ignored.

Most of the content from the previous instructions file has been copied into `_docs/Unused Instructions.md`. Next, you should extract it into smaller, focused documents. This is 👉👉 **a good opportunity to create your first specification request**:

1. Start a new session;
2. Try this prompt:

    ```markdown
    Help me write a new spec. Ticket ID = `EXTRACT_INSTR`.

    I want to extract the content of `_docs/Unused Instructions.md` into documents in  the `_docs` directory.

    Guidelines for the extracted documents:

    - Each document must have a clear title and a specific purpose. It must contain only information from `_docs/Unused Instructions.md`. Its content size should be between 40 to 80 lines.
    - Remove the extracted information from `_docs/Unused Instructions.md`.
    - Each extracted document must be referenced in `AGENTS.md`, with a short one-liners description if the filename is not self-explanatory.

    To do:

    - It's an extraction. Do not invent documentation content.
    - The number of documents to extract should be the number of lines in `_docs/Unused Instructions.md` divided by 60, rounded down.
    - We need to decide which documents should be extracted.
    - It's also possible to augment the current documentations already present in the `_docs` directory.
    - If `_docs/Unused Instructions.md` doesn't contain any valuable information, then we should extract nothing.
    - At the end, the `_docs/Unused Instructions.md` must be removed.
    ```

3. After the specification is written, ask your agent: "Apply this spec".

</markdown_template>
