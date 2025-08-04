# How to Do Code Review & Refactoring

Read the files that were modified, and apply the following principles to the code.

## SRP - Single Responsibility Principle

- Avoid exceeding the height of one screen (~50 lines) for function implementations.
- Apply the _Single Responsibility Principle_ when dividing code: one function for one concern.

## DRY - Don't Repeat Yourself

Each time you see duplicated logic, take the time to refactor it into a reusable function.

## YAGNI - You Aren't Gonna Need It

Do not keep unused code such as variables, functions, implementations, etc.

## Remove unnecessary inline comments

- Keep code clean and self-explanatory rather than adding explanatory comments.
- Remove inline comments that are redundant with the code itself.

Only keep inline comments that document hacks, TODOs, or exceptional situations, or when the code's purpose isn't obvious from its structure.
