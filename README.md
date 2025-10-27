# Vibe Flow

Vibe Flow is a hackable set of prompts that enables Spec-Driven Development, i.e. vibe coding for professional developers.

It works well with **any agent** powered by one of these models:

- **Claude Sonnet 4+**
- **GPT 5+**

## Get Started

1. Ensure your agent uses Claude Sonnet 4.5 or GPT-5-Codex (or another good coding model);
2. Give it [this installation prompt](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/bootstrap.md).

It will install the following structure and plug your AI instructions file into it:

```text
_docs/
├── vibe-flow/
│   ├── How to Write a Technical Specification.md
│   ├── How to Write an Implementation Plan.md
│   └── Vibe Flow Guide.md
├── Code Style Guidelines.md
├── How to Write Unit Tests.md
└── Writing Documentation.md
_plans/
AGENTS.md
```

Then, start using the workflow.

## Use the Workflow

### Technical Specification

A specification can be written long before the implementation. The agent helps you write it by investigating and initiating a discussion:

```markdown
Read your documentation, then help me write a new spec for ticket 123.
It's about [some feature you need]
```

This will discuss with you, then write a `_plans/123/A1-spec.md` file.

### Implementation Plan

The implementation plan is how you verify that the agent has understood what it need to do. Generating a plan is part of the implementation:

```markdown
Read your documentation, then write the implementation plan for ticket 123.
```

This will read the `_plans/123/A1-spec.md` file and then write a `_plans/123/A2-plan.md` file.

### Implementation

The plan is self-explanatory and we don't want to fill the context with workflow details. Clear the context, then:

```markdown
Implement the plan `_plans/123/A2-plan.md`
```

This will execute the plan and then write a `_plans/123/A3-summary.md` file.

### Discuss-Then-Do Protocol

There is also a lighter prompt. Here is how to trigger it:

```markdown
DTDP, ticket ID = 123.

Fix the bug about [something to do]
```

The agent will discuss first, then it will directly work on the codebase. At the end a `_plans/123/A1-summary.md` file will be written.

## Rationale

The documentation for AI agents must be reorganized into multiple files, because:

- We want our technical documentation to be **sustainable** and not specific to how agents work today.
- We want the same documentation to be **shared** among several agents and humans.
- We don't want to fill the **context window** with unnecessary instructions.

Everything must be written in (git-ignored) local files, because:

1. The context window is limited, the compression mechanism is unreliable, we want to be able to continue an unfinished task in a fresh session;
2. It's a way to keep track of what we agreed with the agent and what has been done.

## No Guidelines

There are no guidelines. This is just a starting point for your own workflow. Feel free to adapt it to your needs.

## Example

See the [ParoiCMS repository](https://gitlab.com/paroi/opensource/paroicms/) for a real-world example with its `_docs/` directory.

## Migrations (update from older version)

Two migration prompts are available:

- [Upgrade from AI Workflow](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/upgrade-from-ai-workflow.md): replace your `_docs/ai-workflow/` directory and the instruction file with the Vibe Flow directory and `AGENTS.md`.
- [Update Vibe Flow](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/update-vibe-flow.md): overwrite your `_docs/vibe-flow/` directory with the last versions of the Vibe Flow prompts, and reference them in your `AGENTS.md`.
