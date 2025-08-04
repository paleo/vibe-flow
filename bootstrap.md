# Bootstrap AI Workflow

## Initial Checks

If this is a git repository, ensure that the working tree is clean. If there are uncommitted changes, or if there is no version control, ask the user for confirmation before continuing. DO NOT PROCEED WITHOUT CONFIRMATION IF THERE ARE UNCOMMITTED CHANGES.

If you feel like AI workflow is already set up, ask the user what you should do. DO NOT PROCEED WITHOUT CONFIRMATION IF AI WORKFLOW IS ALREADY SET UP.

## Determine START_FILE

Find AI instructions files located at `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,GEMINI.md,README.md}` (do one glob search). If there are multiple files, choose the one that seems to be the most complete and up-to-date. We will call this file the **START_FILE**.

If no such file exists, fetch and follow the instructions from `https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/external/vscode-generate-workspace-instructions-file.md`. Then START_FILE will be the file you just created.

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

- Create a new file `_docs/ai-workflow/How to Write a Technical Specification.md`. Fetch its content from here: https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Write%20a%20Technical%20Specification.md
- Create a new file `_docs/ai-workflow/How to Write an Implementation Plan.md`. Fetch its content from here: https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Write%20an%20Implementation%20Plan.md

### 2.6: Code Review & Refactoring Document

Write a new file `_docs/ai-workflow/How to Do Code Review & Refactoring.md`. If there is any information about refactoring in the START_FILE, extract it.

Also, look into these rules and feel free to copy them if you don't have anything: https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/_docs/ai-workflow/How%20to%20Do%20Code%20Review%20%26%20Refactoring.md

Then you can write this file. The content of this file will be a prompt that must help to improve the code of another AI agent. It should contain these 3 principles: SRP (Single Responsibility Principle), DRY (Don't Repeat Yourself), and YAGNI (You Aren't Gonna Need It). Be concise and clear.

## Step 3: INDEX.md

Create the `_docs/INDEX.md` file. Here is a template, adjust it to our project:

<claude_md_template>
# {PROJECT_NAME} Development Instructions

{INSERT_START_FILE_CONTENT_HERE}

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

</claude_md_template>

## Step 4: New content for all entry files

### 4.1: Determine the list of instructions files

In this step, we will rewrite all instruction files for AI agents. First, we need to determine the entry files for the AI agents in this codebase. Start with your own instructions file (if it doesn't exist, then you'll create it), and look for others in the codebase. Of course, if START_FILE exists, it is one of them.

If `.cursorrules` exists, then remove this file from the repository and replace it with a new `.cursor/rules/index.mdc` file.

### 4.2: Create or replace the instructions files

Then we'll replace the content of these files with new content. Here is the new content for each entry file.

For `.github/copilot-instructions.md`:

<instructions_markdown>
[Read these instructions](../_docs/INDEX.md)
</instructions_markdown>

For `.cursor/rules/index.mdc`:

<instructions_markdown>
---
alwaysApply: true
---

ALWAYS read the instructions in `_docs/INDEX.md` ENTIRELY.
</instructions_markdown>

For all other instructions files:

<instructions_markdown>
ALWAYS read the instructions in `_docs/INDEX.md` ENTIRELY.
</instructions_markdown>
