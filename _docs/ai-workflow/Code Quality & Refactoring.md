# Code Quality & Refactoring

## Pre-requisites

If the user provides you with a ticket ID, then read the `AI Workflow Guide.md` entirely, it will help you to find the relevant handover document to read.

## Code Quality Process

A developer in our team just finished an implementation. But he is a newcomer, so you need to ensure that the code is clean, maintainable, and efficient, as it may not meet our standards yet.

Read the files that were modified, if it's all good just say it's OK. Otherwise, improve the implementation, apply the following principles to ensure the code is clean, maintainable, and efficient.

### SRP - Single Responsibility Principle

- Avoid exceeding the height of one screen (~50 lines) for function implementations.
- Apply the _Single Responsibility Principle_ when dividing code: one function for one concern.

### DRY - Don't Repeat Yourself

Each time you see duplicated logic, take the time to refactor it into a reusable function.

### YAGNI - You Aren't Gonna Need It

Do not keep unused code such as variables, functions, implementations, etc.

### Remove Unnecessary Inline Comments

- Keep code clean and self-explanatory rather than adding explanatory comments.
- Remove inline comments that are redundant with the code itself.

Only keep inline comments that document hacks, TODOs, or exceptional situations, or when the code's purpose isn't obvious from its structure.
