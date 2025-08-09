# Bootstrap AI Workflow

This process sets up a minimal AI workflow for a **local codebase** with the following steps:

1. Create Directories
2. Extract and Infer Documentation
3. Create `INDEX.md`
4. Extract the Content of the Previous Instructions File
5. New content for all instructions files
6. Back to the Previous Instructions File?
7. Explain the Workflow

After completing this process, the codebase will have a structured set of documentation files that guide AI agents in their work. The final structure will look like this:

```text
_docs/
├── ai-workflow/
│   ├── AI Workflow Guide.md
│   ├── Code Quality & Refactoring.md
│   ├── How to Write a Technical Specification.md
│   └── How to Write an Implementation Plan.md
├── Code Style Guidelines.md
├── How to Write Unit Tests.md
├── INDEX.md
├── Monorepo Overview.md
└── Onboarding.md
_plans/
.github/
└── copilot-instructions.md
.gitignore
CLAUDE.md
```

## Initial Checks

If this is a git repository, ensure that the working tree is clean. If there are uncommitted changes, or if there is no version control, ask the user for confirmation before continuing. DO NOT PROCEED WITHOUT CONFIRMATION IF THERE ARE UNCOMMITTED CHANGES.

If an AI workflow is already set up (in particular, if a `_docs/ai-workflow/` directory already exists), ask the user what you should do. DO NOT PROCEED WITHOUT CONFIRMATION IF AI WORKFLOW IS ALREADY SET UP.

## Determine the local START_FILE

The **START_FILE** is the primary AI instructions file that is used locally in the codebase.

Search in the codebase for AI instructions files using this glob pattern: `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,GEMINI.md}`

If one or more files exist, choose the most complete and up-to-date one. This becomes the **START_FILE**.

If no such file exists in the repository:

- If you are Claude Code, you MUST STOP NOW and ask the user to run the `/init` command first.
- If you are GitHub Copilot in VS Code, then you MUST STOP NOW and ask the user to press CTRL+SHIFT+P (or CMD+SHIFT+P), search and execute the command _"Chat: Generate Workspace Instructions File"_.
- Otherwise, you can fetch and follow the instructions in [this specific remote instructions file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/external/generate-workspace-instructions.md). By following these instructions, a new local `.github/copilot-instructions.md` file will be created. You will use this new `.github/copilot-instructions.md` file as the **START_FILE**.

## Step 1: Create Directories

Create two directories `_docs` and `_plans` at the root of the repository if they do not exist. If a `.gitignore` file exists, add `_plans` to it. Create a `_docs/ai-workflow` directory if it does not exist.

## Step 2: Extract and Infer Documentation

For each new document you will write, be very concise. Do not mention obvious best practices. It's not a course or a tutorial. It's a reference for a skilled newcomer to that codebase. The newcomer prefers concise documentation.

### 2.1: Code Style Guidelines

Write a new file `_docs/Code Style Guidelines.md` that will contain the code style rules of this repository. If there is any information about code style in the START_FILE, extract it. Also explore the codebase to deduce existing code style rules. Do not invent any rule that is not observed in the codebase. The rules must be short, in the form of bullet lists.

### 2.2: Monorepo Overview

If the current project is not a monorepository, skip this step.

Write a new file `_docs/Monorepo Overview.md` that will contain the monorepo overview of this repository. If there is any information about the sub-projects (packages etc.) and the monorepo tooling in the START_FILE (the package manager, the changelog system, any integrated building manager etc.), extract it. Also, explore the codebase to deduce existing monorepo structure. This file must have at least the following sections:

- **Sub-projects** (or "Packages" or "Modules" etc., use the proper naming): List all the sub-projects and their purpose.
- **Monorepo Tooling**: Describe the tooling about how the sub-projects are handled in the monorepo
- **Main Configuration Files**

### 2.3: How to Write Unit Tests

Investigate the codebase. If the current project doesn't contain unit tests, skip this step. If you have any doubt, ask the user.

Write a new file `_docs/How to Write Unit Tests.md` that will explain how to write and run unit tests in this repository. If there is any information about unit tests in the START_FILE, extract it. Also explore the codebase to deduce how unit tests work in this codebase.

This file must have at least the following sections:

- **Tooling**: Mention the tooling used.
- **Running Tests**: Explain how to run the tests, globally, for one sub-project, or for one file, with and without watcher.
- **Writing Tests**: Explain how to write tests, where to place them, how to name the files.

Be very concise. Do not mention obvious information. It's not a course or a tutorial. It's a reference for newcomers to that codebase.

### 2.4: Fetch Documents

Use **curl** or **wget** (or find another way) to fetch the following files, specifying the output filename explicitly to avoid URL encoding issues:

- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/AI%20Workflow%20Guide.md) to `_docs/ai-workflow/AI Workflow Guide.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Write%20a%20Technical%20Specification.md) to `_docs/ai-workflow/How to Write a Technical Specification.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Write%20an%20Implementation%20Plan.md) to `_docs/ai-workflow/How to Write an Implementation Plan.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/Code%20Quality%20%26%20Refactoring.md) to `_docs/ai-workflow/Code Quality & Refactoring.md`

**Important:** Use `curl -o "filename"` or `wget -O "filename"` to specify the exact output filename and avoid URL encoding in filenames.

## Step 3: Create `INDEX.md`

Create the `_docs/INDEX.md` file. Here is a template, adjust it to our project:

<index_md_template>

# {PROJECT_NAME} Development Instructions

## Documentation Files

Most frequently consulted procedures:

- `Code Style Guidelines.md` - ALWAYS READ BEFORE CODING

Additional documentation (read as needed):

- `How to Write Unit Tests.md`
- `Monorepo Overview.md`

AI Workflow:

- `ai-workflow/How to Write a Technical Specification.md` - For writing a **spec**
- `ai-workflow/How to Write an Implementation Plan.md` - For writing a **plan**
- `ai-workflow/Code Quality & Refactoring.md` - For **code review**, ensuring **code quality**, and **refactoring** by applying **SRP**, **DRY**, and **YAGNI** principles
- `ai-workflow/AI Workflow Guide.md` - Where plans, specifications, and implementation summaries are kept

## Instructions

ALWAYS READ `Onboarding.md` ENTIRELY before anything else. Then, you MUST select the relevant documentation files and read them ENTIRELY.

</index_md_template>

## Step 4: Extract the Content of START_FILE

### 4.1: Deprecate Documents

In START_FILE, look for markdown links or paths to other local markdown files (`.md`) in the repository, with file names or descriptions that could be redundant with our workflow documents:

- How to write an implementation plan (or: "How to Write a TIP.md")
- Refactoring (or: "Refactoring & Programming Principles.md")
- Or a document about Technical specifications

Then:

1. Remove these links or paths from START_FILE.
2. Rename these files with a `.DEPRECATED.md` suffix & extension.

### 4.2: Extract Links from START_FILE

If there are markdown links or paths to other local documentation files in the monorepo (with relative paths), move these links to the proper place in the `_docs/INDEX.md` file. Pay attention to the relative paths, they must be correct after the move.

### 4.3: Extract Onboarding Content

Now we will move all the remaining content of START_FILE.

Extract the content of START_FILE into a new file `_docs/Onboarding.md` with a new title `# Onboarding Guide`. If this file already exists, append the content to it. If there is no content to add, ensure the file is created.

Guidelines:

- Do not replace the extracted content by any link, just remove it from the START_FILE.
- At the end, START_FILE should be almost empty (the title can remain, but without anything else).

## Step 5: New content for all instructions files

### 5.1: Special Case for `.cursorrules`

If `.cursorrules` exists, then remove this file from the repository and replace it with a new `.cursor/rules/index.mdc` file with empty content (we'll fill this in later).

### 5.2: Determine the list of instructions files

Now, we need to detect every existing instructions file for AI agents in the codebase.

Make a list INSTRUCTIONS_FILES of all the instructions files in this repository. Of course, if START_FILE exists, it is one of them. Look for others in the codebase.

Also, if your own instructions file is not in the list, then add it to INSTRUCTIONS_FILES.

### 5.3: Create or replace the instructions files

Replace the content of every file in INSTRUCTIONS_FILES. The new content is provided below. Use it to replace the content of the file. Do not create new files here, except for your own instructions file if it doesn't exist.

**For `copilot-instructions.md` or `.github/copilot-instructions.md`:**

```markdown
[Follow these instructions](../_docs/INDEX.md)
```

**For `index.mdc` or `.cursor/rules/index.mdc`:**

```markdown
---
alwaysApply: true
---

ALWAYS follow the instructions in `_docs/INDEX.md` ENTIRELY.
```

**For all other instructions files:**

```markdown
ALWAYS follow the instructions in `_docs/INDEX.md` ENTIRELY.
```

Guidelines:

- Do not keep any previous content in these files, remove it all, even the title.

## Step 6: Back to START_FILE?

The processus is achieved but we have one option to propose to the user.

Here, you MUST STOP and ASK THE USER what they prefer for the main entry point of the documentation:

1. Keep our new multi-agent `_docs/INDEX.md` file;
2. Or, use START_FILE (use the real file name here in your message to the user).

If the user chooses to keep the `_docs/INDEX.md` file, then skip this step and go to Step 7.

If the user prefers to use START_FILE as the main entry point, then:

1. Replace the content of START_FILE file with the content of `_docs/INDEX.md`
2. Update the new content of START_FILE: correct the paths to the documents, relative to the root of the repository (prefix with `_docs/`, e.g. `_docs/Onboarding.md`).
3. Remove the `_docs/INDEX.md` file
4. Update every other instructions file in the codebase to point to START_FILE instead of `_docs/INDEX.md`.
5. If START_FILE is a `.mdc` file, then you must also prepend the following lines to the content of START_FILE:

    ```markdown
    ---
    alwaysApply: true
    ---
    ```

## Step 7: Explain the Workflow

Display a very concise summary of the changes and a short explanation of the new structure. In particular, you should mention this information:

- The `_docs/` directory is intended for every newcomer to the codebase. AI agents are perpetual newcomers, but it is also for human developers.
- The `_docs/ai-workflow/` directory contains instructions for AI agents to help with writing specifications, implementation plans, and doing code reviews. But it's only a starting point. The user is encouraged to modify these documents and adapt them to their needs.
- The `_plans/` directory is where work files related to tasks will be stored. It is git-ignored.
- The content of the previous instructions file has been extracted to various documents in the `_docs/` directory and in particular the `_docs/Onboarding.md` file.

Why did we reorganize the previous instructions file? The principle is to NOT fill the context window with too much information, but instead to provide a list of documents so the agent will read only what it needs.
