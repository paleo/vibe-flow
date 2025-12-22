# Vibe Flow Skill

_Note: This is the v2 of Vibe Flow. If you are looking for the v1 (without Agent Skill), see the [v1 branch](https://github.com/paleo/vibe-flow/tree/v1)._

Vibe Flow is a hackable set of prompts that enables _Spec-Driven Development_. It's distributed as an _Agent Skill_ and works well with any agent powered by a coding model such as:

- **Claude Opus 4+** or **Claude Sonnet 4+** (Anthropic)
- **GPT 5+** (OpenAI)
- **Composer 1** (Cursor)

## Get Started

1. Ensure your agent uses a capable coding model.
2. Give it **[this installation prompt](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/install-vibe-flow.md)**.

It will install the Vibe Flow skill:

```text
.claude/skills/
└── vibe-flow/
    ├── SKILL.md
    ├── README.md
    ├── spec-protocol.md
    ├── plan-protocol.md
    ├── dtdp-protocol.md
    └── pr-message-protocol.md
```

Then, start using the workflow.

## Using Vibe Flow

### Generate Technical Specification

A specification can be written long before the implementation. The agent helps you write it by investigating and initiating a discussion:

```markdown
Help me write a new spec.

[something to do]
```

Or, if you use Claude Code or Cursor, you can use the command: `/spec [something to do]`.

The agent will discuss with you, then write a `_plans/123/A1-spec.md` file.

_Note: `123` is the ticket ID. If it can be deduced from the branch name, it will. Otherwise the agent will ask you. `A1` means it's the first file of cycle A (files are organized by cycles)._

### Generate Implementation Plan(s)

Plans orchestrate what agents or subagents will do:

```markdown
Write plans for the current spec.
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
I need a DTDP.

[something to do]
```

Or, if you use Claude Code or Cursor, you can use the command: `/dtdp [something to do]`.

The agent will discuss first, then it will directly work on the codebase. At the end a `_plans/123/A1-summary.md` file will be written.

## Rationale

Specs, plans, and summaries must be written in well-organized (git-ignored) local files, because:

1. The context window is limited, the compression mechanism is opaque, and we want to be able to continue an unfinished task in a fresh session.
2. It's a way to keep track of what was agreed upon with the agent and what has been done.

## Example

See the [ParoiCMS repository](https://gitlab.com/paroi/opensource/paroicms/) for a real-world example.

## Why "Spec-Driven Development"?

Spec-Driven Development (SDD) first existed in API development as a design-first approach using OpenAPI/Swagger. With AI-assisted coding agents, the term expanded to describe a methodology: writing specifications before code, where specs become the source of truth guiding AI agents through structured phases: **spec → plan → implement**.

SDD is the structured alternative to "vibe coding" — the ad-hoc approach where you prompt an AI and hope for the best. Tools like GitHub Spec Kit and AWS Kiro have popularized this approach.

Vibe Flow follows in their footsteps, but as a lightweight, agent-agnostic prompt system — no plugins, no platform lock-in. The same workflow works across any capable coding agent, making it easy for teams to adopt regardless of their tooling choices.

## Installation, Migrations

- **[Install Vibe Flow](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/install-vibe-flow.md)**: Install the Vibe Flow skill in a new project.
- **[Update Vibe Flow](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/update-vibe-flow.md)**: Update an existing Vibe Flow skill to the latest version.
- **[Upgrade from v1](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/migrations/upgrade-to-agent-skills.md)**: If you have an old `_docs/vibe-flow/` installation, migrate to the Agent Skills standard.

## License

CC0-1.0 license
