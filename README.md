# Vibe Flow

Vibe Flow is a hackable set of prompts that enables _Spec-Driven Development_ for professional developers.

It works well with **any agent** powered by a coding model such as:

- **Claude Opus 4+** or **Claude Sonnet 4+** (Anthropic)
- **GPT 5+** (OpenAI)
- **Composer 1** (Cursor)

## Get Started

1. Ensure your agent uses a capable coding model.
2. Give it [this installation prompt](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/bootstrap.md).

It will install the following structure and plug your AI instructions file into it:

```text
_docs/
├── vibe-flow/
│   ├── Discuss-Then-Do Protocol.md
│   ├── How to Write a Technical Specification.md
│   ├── How to Write Implementation Plans.md
│   └── Vibe Flow Guide.md
├── Code Style Guidelines.md
├── How to Write Unit Tests.md
└── Writing Documentation.md
_plans/
AGENTS.md
```

Then, start using the workflow.

## Using Vibe Flow

### Generate Technical Specification

A specification can be written long before the implementation. The agent helps you write it by investigating and initiating a discussion:

```markdown
Read your documentation, then help me write a new spec.

[something to do]
```

Or, if you use Claude Code or Cursor, you can use the command: `/spec [something to do]`.

The agent will discuss with you, then write a `_plans/123/A1-spec.md` file.

_Note: `123` is the ticket ID. If it can be deduced from the branch name, it will. Otherwise the agent will ask you. `A1` means it's the first file of cycle A (files are organized by cycles)._

### Generate Implementation Plan(s)

Plans orchestrate what agents or subagents will do:

```markdown
Read your documentation, then write plans.
```

Or, if you use Claude Code or Cursor, you can use the command: `/plan`.

The agent reads the spec and writes plan(s) in `_plans/123/A2-plan*.md`.

### Implementation

**Clear the context**, then execute the plan(s):

```markdown
Execute the plan `_plans/123/A2-plan-orchestrator.md`
```

The agent executes and writes handover document(s) (`.summary.md` files).

### Discuss-Then-Do Protocol (DTDP)

There is also a lighter prompt for small tasks without spec/plans. Here's how to trigger it:

```markdown
Read your documentation first. I need a DTDP.

[something to do]
```

Or, if you use Claude Code or Cursor, you can use the command: `/dtdp [something to do]`.

The agent will discuss first, then it will directly work on the codebase. At the end a `_plans/123/A1-summary.md` file will be written.

## Rationale

The documentation for AI agents must be reorganized into multiple files, because:

- We want our technical documentation to be **sustainable** and not specific to how agents work today.
- We want the same documentation to be **shared** among several agents and humans.
- We don't want to fill the **context window** with unnecessary instructions.

Everything must be written in (git-ignored) local files, because:

1. The context window is limited, the compression mechanism is opaque, and we want to be able to continue an unfinished task in a fresh session.
2. It's a way to keep track of what we agreed with the agent and what has been done.

## No Guidelines

There are no guidelines. This is just a starting point for your own workflow. Feel free to adapt it to your needs.

## Example

See the [ParoiCMS repository](https://gitlab.com/paroi/opensource/paroicms/) for a real-world example with its `_docs/` directory.

## Why "Spec-Driven Development"?

Spec-Driven Development (SDD) has long existed in API development (design-first with OpenAPI/Swagger). In 2024–2025, the term expanded to describe a methodology for AI-assisted coding: writing specifications before code, where specs become the source of truth guiding AI agents through structured phases: **spec → plan → implement**.

SDD is the structured alternative to "vibe coding" — the ad-hoc approach where you prompt an AI and hope for the best. Tools like GitHub Spec Kit and AWS Kiro have popularized this approach.

Vibe Flow follows in their footsteps, but as a lightweight, agent-agnostic prompt system — no plugins, no platform lock-in. The same workflow works across any capable coding agent, making it easy for teams to adopt regardless of their tooling choices.

## Migrations (update from older version)

Two migration prompts are available:

- [Upgrade from AI Workflow](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/upgrade-from-ai-workflow.md): replace your `_docs/ai-workflow/` directory and the instruction file with the Vibe Flow directory and `AGENTS.md`.
- [Update Vibe Flow](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/update-vibe-flow.md): overwrite your `_docs/vibe-flow/` directory with the latest versions of the Vibe Flow prompts, and reference them in your `AGENTS.md`.
