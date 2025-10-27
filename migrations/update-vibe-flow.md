# Updade Vibe Flow

**In order to determine if Vibe Flow is already set up, look for the `_docs/vibe-flow/` directory. If it doesn't exist, then Vibe Flow is not set up and you must stop now. DO NOT PROCEED WITHOUT CONFIRMATION IF VIBE FLOW IS NOT SET UP.**

If Vibe Flow is set up, proceed with the following steps:

## Step 1 - Overwrite Vibe Flow Core Documents

Use `curl` or `wget` to fetch and overwrite the following files with their latest versions:

- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/How%20to%20Write%20a%20Technical%20Specification.md) to `_docs/vibe-flow/How to Write a Technical Specification.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/How%20to%20Write%20an%20Implementation%20Plan.md) to `_docs/vibe-flow/How to Write an Implementation Plan.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/Discuss-Then-Do%20Protocol.md) to `_docs/vibe-flow/Discuss-Then-Do Protocol.md`
- Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/vibe-flow/Vibe%20Flow%20Guide.md) to `_docs/vibe-flow/Vibe Flow Guide.md`

Important: Use `curl -o "filename"` or `wget -O "filename"` to set the exact output filename and avoid URL-encoded names.

Also, do not chain the commands with `&&`. Run them carefully one by one.

## Step 2 - Update the "Vibe Flow" section in `AGENTS.md`

Here is an actualized version of the "Vibe Flow" section of a `AGENTS.md` file:

```markdown
Vibe Flow:

- `_docs/vibe-flow/How to Write a Technical Specification.md` - To design a **spec**
- `_docs/vibe-flow/How to Write an Implementation Plan.md` - To design a **plan**
- `_docs/vibe-flow/Discuss-Then-Do Protocol.md` - **DTDP** is a collaborative process for any task except writing a spec or plan: bug fixes, features, design decisions, refactoring, etc.
- `_docs/vibe-flow/Vibe Flow Guide.md` - Where to save specifications and plans
```

Ensure all the documents are referenced, and update the descriptions if needed.

## Step 3 - Add Writing Documentation Guide

Check if `_docs/Writing Documentation.md` exists:

- If it **does not exist**:
  1. Fetch [this file](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_docs/Writing%20Documentation.md) to `_docs/Writing Documentation.md` using `curl -o` or `wget -O`.
  2. Add a reference to this document in `AGENTS.md` under the "Additional documentation" section (or similar section for optional documents). Use this format: `- _docs/Writing Documentation.md - Guidelines for writing documents in the _docs directory`
- If it **already exists**: Skip this step and do not modify the existing file.
