# AlignFirst Skill

**_Important: This is the v2 of AlignFirst (formerly Vibe Flow). AlignFirst is now distributed as an Agent Skill following the [Agent Skills open standard](https://agentskills.io/). If you work exclusively with Claude Code, go ahead. For other agents, you should probably install and use the [v1](https://github.com/paleo/alignfirst/blob/v1/README.md)._**

AlignFirst is a hackable set of prompts that enables _Spec-Driven Development_. It's distributed as an _Agent Skill_ and works well with any agent powered by a coding model such as:

- **Claude Opus 4+** or **Claude Sonnet 4+** (Anthropic)
- **GPT 5+** (OpenAI)
- **Composer 1** (Cursor)

## Get Started

1. Ensure your agent uses a capable coding model.
2. Give it **[this installation prompt](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/main/migrations/install-alignfirst.md)**.

It will install the AlignFirst skill:

```text
{.claude|.github|.cursor|.codex}/skills/alignfirst/
├── SKILL.md
├── README.md
├── spec-protocol.md
├── plan-protocol.md
├── do-protocol.md
└── description-protocol.md
```

Then, start using the workflow.

### Enable Agent Skills

Agent Skills is an [open standard](https://agentskills.io/) that works out of the box in Claude Code. Editor support is still experimental:

- [Enable Agent Skills in VS Code / GitHub Copilot](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Enable Agent Skills in Cursor](https://cursor.com/docs/context/skills)
- [Agent Skills in Claude Code](https://code.claude.com/docs/en/skills)
- [Agent Skills in Codex](https://developers.openai.com/codex/skills/)

## Using AlignFirst

### Generate Technical Specification

A specification can be written long before the implementation. The agent helps you write it by investigating and initiating a discussion:

```markdown
Help me write a new spec.

[something to do]
```

Or, if you use Claude Code or Cursor, you can use the command: `/alspec [something to do]`.

The agent will discuss with you, then write a `_plans/123/A1-spec.md` file.

_Note: `123` is the ticket ID. If it can be deduced from the branch name, it will. Otherwise the agent will ask you. `A1` means it's the first file of cycle A (files are organized by cycles)._

### Generate Implementation Plan(s)

Plans orchestrate what agents or subagents will do:

```markdown
Write plans for the current spec.
```

Or, if you use Claude Code or Cursor, you can use the command: `/alplan`.

The agent reads the spec and writes plan(s) in `_plans/123/A2-plan*.md`.

### Implementation

**Clear the context**, then execute the plan(s):

```markdown
Execute the plan `_plans/123/A2-plan-orchestrator.md`
```

The agent executes and writes handover document(s) (`.summary.md` files).

### Align-and-Do Protocol (AAD)

There is also a lighter prompt for small tasks without spec/plans. Here's how to trigger it:

```markdown
Start AAD.

[something to do]
```

Or, if you use Claude Code or Cursor, you can use the command: `/al [something to do]`.

The agent will discuss first, then it will directly work on the codebase. At the end a `_plans/123/A1-done.summary.md` file will be written.

## Rationale

Specs, plans, and summaries must be written in well-organized (git-ignored) local files, because:

1. The context window is limited, the compression mechanism is opaque, and we want to be able to continue an unfinished task in a fresh session.
2. It's a way to keep track of what was agreed upon with the agent and what has been done.

## Example

See the [ParoiCMS repository](https://gitlab.com/paroi/opensource/paroicms/) for a real-world example.

## Why "Spec-Driven Development"?

Spec-Driven Development (SDD) first existed in API development as a design-first approach using OpenAPI/Swagger. With AI-assisted coding agents, the term expanded to describe a methodology: writing specifications before code, where specs become the source of truth guiding AI agents through structured phases: **spec → plan → implement**.

SDD is the structured alternative to "vibe coding" — the ad-hoc approach where you prompt an AI and hope for the best. Tools like GitHub Spec Kit and AWS Kiro have popularized this approach.

AlignFirst follows in their footsteps, but as a lightweight, agent-agnostic prompt system — no plugins, no platform lock-in. The same workflow works across any capable coding agent, making it easy for teams to adopt regardless of their tooling choices.

## Technical Documentation Authoring Skill

The **Technical Documentation Authoring** skill is independent from AlignFirst but provided here. It helps you create skills that document your project:

1. Give your agent **[this installation prompt](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/main/migrations/install-technical-documentation-authoring.md)**.
2. Clear the context, then ask it:

    ```markdown
    Help me bootstrap our project skills. Use technical-documentation-authoring.
    ```

It can also work alongside AlignFirst:

```markdown
Start AAD. We need a new documentation about [topic].
```

## Installation, Migrations

- **[Upgrade from v1](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/main/migrations/upgrade-to-agent-skills.md)**: If you have an old `_docs/vibe-flow/` installation, migrate to the Agent Skills standard
- **[Install AlignFirst Skill](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/main/migrations/install-alignfirst.md)**
- **[Install Technical Documentation Authoring Skill](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/main/migrations/install-technical-documentation-authoring.md)**
- **[Update Skills](https://raw.githubusercontent.com/paleo/alignfirst/refs/heads/main/migrations/update-skills.md)**: Update installed _AlignFirst_ and/or _Technical Documentation Authoring_ skills to the latest version

## License

CC0 1.0 Universal.
