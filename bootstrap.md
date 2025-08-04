# Bootstrap AI Workflow

This process sets up a standardized AI workflow for a **local codebase** by:

1. Creating documentation directories and files
2. Extracting/creating project-specific documentation
3. Fetching standard AI workflow documents from GitHub
4. Setting up instruction files for various AI agents

**Important: Do not try to fetch any resource except the ones listed below. This is a bootstrap process, and it doesn't depend on any other resources.**

## Initial Checks

If this is a git repository, ensure that the working tree is clean. If there are uncommitted changes, or if there is no version control, ask the user for confirmation before continuing. DO NOT PROCEED WITHOUT CONFIRMATION IF THERE ARE UNCOMMITTED CHANGES.

If you feel like AI workflow is already set up, ask the user what you should do. DO NOT PROCEED WITHOUT CONFIRMATION IF AI WORKFLOW IS ALREADY SET UP.

## Determine the local START_FILE

The **START_FILE** is the primary AI instruction file that is used locally in the codebase.

Search in the codebase for AI instruction files using this glob pattern: `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,GEMINI.md}`

If one or multiple files exist, choose the most complete and up-to-date one. This becomes the **START_FILE**.

If no such file exists:

- If you are Claude Code, you should stop now and ask the user to run the `/init` command first.
- If you are Copilot in VS Code, then you should ask the user to press CTRL+SHIFT+P (or CMD+SHIFT+P), search and execute the command _"Chat: Generate Workspace Instructions File"_.
- Otherwise, you can fetch and follow the instructions in [this specific remote instructions file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/external/generate-workspace-instructions.md). By following these instructions, a new local `.github/copilot-instructions.md` file will be created. You will use this new `.github/copilot-instructions.md` file as the **START_FILE**.

## Step 1: Create Directories

Create two directories `_docs` and `_plans` at the root of the repository if they do not exist. If a `.gitignore` file exists, add `_plans` to it. Create a `_docs/ai-workflow` directory if it does not exist.

## Step 2: Extract and Infer Documentation

For each new document you will write, be really concise. Do not mention obvious best practices. It's not a course or a tutorial. It's a reference for a skilled newcomer to that codebase. Our newcomer likes to read concise documentation.

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

- Mention the tooling.
- **Running Tests**: Explain how to run the tests, globally, for one sub-project, or for one file, with and without watcher.
- **Writing Tests**: Explain how to write tests, where to place them, how to name the files.

Be really concise. Do not mention obvious information. It's not a course or a tutorial. It's a reference for newcomers to that codebase.

### 2.4: Extract the START_FILE content into specialized documents

If the START_FILE contains more than 5 lines, then extract its content into specialized documents. The goal is to have a very short file that contains only the most useful information for every working session. So, if the START_FILE is too long, extract the main sections into new files in the `_docs/` directory, and keep only the most important information in the START_FILE. Typically, each extracted file should have 20~80 lines.

Guidelines for extracting content:

- Do not replace the extracted content by any link, just remove it from the START_FILE.
- At the end, the START_FILE must contain 0 to 5 lines.

### 2.5: Fetch Documents

**Important**: Use the exact URLs below (spaces in URLs are encoded as `-`):

- Create a new file `_docs/ai-workflow/AI Workflow Guide.md`. Fetch its content from [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/ai-workflow-guide.md).
- Create a new file `_docs/ai-workflow/How to Write a Technical Specification.md`. Fetch its content from [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/how-to-write-a-technical-specification.md).
- Create a new file `_docs/ai-workflow/How to Write an Implementation Plan.md`. Fetch its content from [this file](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/how-to-write-an-implementation-plan.md).

### 2.6: Code Review & Refactoring Document

Write a new file `_docs/ai-workflow/How to Do Code Review & Refactoring.md`. If there is any information about refactoring in the START_FILE, extract it.

Also, look into [these rules](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/how-to-do-code-review-refactoring.md) and feel free to copy them.

Then you can write this file. The content of this file will be a prompt that must help to improve the code of another AI agent. It should contain these 3 principles: SRP (Single Responsibility Principle), DRY (Don't Repeat Yourself), and YAGNI (You Aren't Gonna Need It). Be concise and clear.

## Step 3: INDEX.md

Create the `_docs/INDEX.md` file. Here is a template, adjust it to our project:

<index_md_template>

# {PROJECT_NAME} Development Instructions

{INSERT_START_FILE_CONTENT_HERE}

## Pre-requisites

Before anything else, you MUST select the relevant internal documentation files and read them ENTIRELY.

## Internal documentation

Most frequently consulted procedures:

- `Code Style Guidelines.md` - ALWAYS READ BEFORE CODING

Additional documentation (read as needed):

- `How to Write Unit Tests.md`
- `Monorepo Overview.md`

AI Workflow:

- `ai-workflow/AI Workflow Guide.md` - Needed by the other AI workflow documents
- `ai-workflow/How to Write a Technical Specification.md`
- `ai-workflow/How to Write an Implementation Plan.md`
- `ai-workflow/How to Do Code Review & Refactoring.md`

</index_md_template>

## Step 4: New content for all entry files

### 4.1: Determine the list of instructions files

In this step, we will rewrite all instruction files for AI agents. First, we need to determine the entry files for the AI agents in this codebase. Start with your own instructions file (if it doesn't exist, then you'll create it), and look for others in the codebase. Of course, if START_FILE exists, it is one of them.

If `.cursorrules` exists, then remove this file from the repository and replace it with a new `.cursor/rules/index.mdc` file.

### 4.2: Create or replace the instructions files

Then we'll replace the content of these files with new content. Here is the new content for each entry file.

**For `copilot-instructions.md` or `.github/copilot-instructions.md`:**

```markdown
[Read these instructions](../_docs/INDEX.md)
```

**For `index.mdc` or `.cursor/rules/index.mdc`:**

```markdown
---
alwaysApply: true
---

ALWAYS read the instructions in `_docs/INDEX.md` ENTIRELY.
```

**For all other instruction files:**

```markdown
ALWAYS read the instructions in `_docs/INDEX.md` ENTIRELY.
```
