# AI Workflow

Pure-prompt **Vibe Coding Kit**. Works well with:

- **VS Code & GitHub Copilot**, with **Claude Sonnet 4** or **GPT-5**
- **Claude Code**
- **Cursor**, with **Claude Sonnet 4** or **GPT-5**

## Get Started

1. Ensure your agent uses Claude Sonnet 4 or GPT-5 (or Claude Opus);
2. Give it [this prompt](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/bootstrap.md).

It will install the following structure and plug your AI instructions file into it:

```text
_docs/
├── ai-workflow/
│   ├── AI Workflow Guide.md
│   ├── Code Quality & Refactoring.md
│   ├── How to Write a Technical Specification.md
│   └── How to Write an Implementation Plan.md
├── Code Style Guidelines.md
└── How to Write Unit Tests.md
_plans/
AGENTS.md
```

Then, start using the workflow.

### Or, Upgrade from a Previous Version of AI Workflow

1. Ensure your agent uses Claude Sonnet 4 or GPT-5 (or Claude Opus);
2. Give it [this prompt](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/upgrade/upgrade-to-agentsmd.md).

## Use the Workflow

### Technical Specification

A specification can be written long before the implementation. The agent helps you write it by investigating and initiating a discussion:

```markdown
Read your documentation, then help me write a new spec for ticket 123. It's about [some feature you need]
```

This will write a `_plans/123/A1-spec.md` file.

### Implementation Plan

The implementation plan is how you verify that the agent has understood what it need to do. Generating a plan is part of the implementation:

```markdown
Write the implementation plan for ticket 123.
```

This will read the `_plans/123/A1-spec.md` file and then write a `_plans/123/A2-plan.md` file.

### Implementation

The plan is self-explanatory and we don't want to fill the context with workflow details. Clear the context, then:

```markdown
Implement the plan `_plans/123/A2-plan.md`
```

This will execute the plan and then write a `_plans/123/A3-summary.md` file.

### Code Quality & Refactoring

After the implementation, run the code quality and refactoring process:

```markdown
Ensure code quality for the last implementation in ticket 123.
```

## No Guidelines

There are no guidelines. This is just a starting point for your own workflow. Feel free to adapt it to your needs.

## Rationale

The documentation for AI agents must be reorganized into multiple files, because:

- We want our technical documentation to be **sustainable** and not specific to how agents work today.
- We want the same documentation to be **shared** among several agents and humans.
- We don't want to fill the **context window** with unnecessary instructions.

Everything must be written in (git-ignored) local files, because:

1. The context window is limited, the compression mechanism is unreliable, we want to be able to continue an unfinished task in a fresh session;
2. It's a way to keep track of what we agreed with the agent and what has been done.

## Example

See the [ParoiCMS repository](https://gitlab.com/paroi/opensource/paroicms/) for a real-world example with its `_docs/` directory.
