# AI Workflow

**Workflow** for **Programming AI Agents**.

## Get Started

Give [this prompt](https://raw.githubusercontent.com/paleo/ai-workflow/refs/heads/main/bootstrap.md) to your agent.

It should install the following structure and plug your AI instructions file to it:

```text
_docs/
├── ai-workflow/
│   ├── AI Workflow Guide.md
│   └── Code Quality & Refactoring.md
│   ├── How to Write a Technical Specification.md
│   ├── How to Write an Implementation Plan.md
├── Code Style Guidelines.md
├── How to Write Unit Tests.md
├── INDEX.md
└── Monorepo Overview.md
_plans/
```

Tested with:

- **VS Code Copilot** with **Claude Sonnet 4**
- **Claude Code**

Then, start using the workflow.

## Use the Workflow

### Technical Specification

A specification contains design decisions. It can be written long before the implementation so it doesn't contain too much implementation details that could become outdated. It can be stored in the ticket system. The agent helps you to write a spec. by asking you questions and then writing a file:

```markdown
Write a spec for the ticket 123. It's about [some feature you need]
```

This will write a `_plans/123/A1-spec.md` file.

### Implementation Plan

An implementation plan contains the steps to implement something. It should be written when you are ready to implement. In fact, writing a plan is part of the implementation. The agent can help you write an implementation plan:

```markdown
Write the implementation plan for the ticket 123.
```

This will read the `_plans/123/A1-spec.md` file, then write a `_plans/123/A2-plan.md` file.

### Implementation

The plan is self-explanatory and we don't want to fill the context with workflow details:

```markdown
Implement the plan `_plans/123/A2-plan.md`
```

This will write a `_plans/123/A3-handover.md` file.

### Code Quality & Refactoring

After the implementation, run the code quality and refactoring process:

```markdown
Ensure code quality for the ticket 123.
```

## Guidelines

There are no guidelines. It's just a starting point for your own workflow. Feel free to adapt it to your needs.
