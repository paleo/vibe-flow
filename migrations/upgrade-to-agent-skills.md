# Upgrade to Agent Skills

This migration converts your Vibe Flow installation from the `_docs/` system to the Agent Skills standard (`_skills/`).

**Reference**: <https://agentskills.io/specification.md>

## Pre-requisites

- Verify `_docs/vibe-flow/` exists. If not, STOP - this is not a Vibe Flow installation.
- If this is a git repository, verify the working tree is clean. DO NOT PROCEED with uncommitted changes.

## Install the Vibe Flow Skill

### 1. Delete Old Vibe Flow Files

```bash
rm -rf _docs/vibe-flow
```

### 2. Download Fresh Vibe Flow Skill

Create the skill directory and fetch the latest files from the repository:

```bash
mkdir -p _skills/vibe-flow
```

Use `curl -o "filename"` or `wget -O "filename"` to fetch the following files. Do not chain the commands with `&&`. Run them carefully one by one:

- [README.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/_skills/vibe-flow/README.md) → `_skills/vibe-flow/README.md`
- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/_skills/vibe-flow/SKILL.md) → `_skills/vibe-flow/SKILL.md`
- [spec-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/_skills/vibe-flow/spec-protocol.md) → `_skills/vibe-flow/spec-protocol.md`
- [plan-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/_skills/vibe-flow/plan-protocol.md) → `_skills/vibe-flow/plan-protocol.md`
- [dtdp-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/_skills/vibe-flow/dtdp-protocol.md) → `_skills/vibe-flow/dtdp-protocol.md`
- [pr-message-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/_skills/vibe-flow/pr-message-protocol.md) → `_skills/vibe-flow/pr-message-protocol.md`

### 3. Update Claude/Cursor Commands (if present)

If `.claude/commands/` exists, delete the old commands and fetch fresh ones:

```bash
rm -f .claude/commands/spec.md .claude/commands/plan.md .claude/commands/dtdp.md .claude/commands/pr-message.md .claude/commands/doc.md
```

Then fetch the latest versions. Do not chain commands:

- [spec.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/spec.md) → `.claude/commands/spec.md`
- [plan.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/plan.md) → `.claude/commands/plan.md`
- [dtdp.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/dtdp.md) → `.claude/commands/dtdp.md`
- [pr-message.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/refactor/skills/.claude/commands/pr-message.md) → `.claude/commands/pr-message.md`

### 4. Clean AGENTS.md

Remove all references to `_docs/vibe-flow/` files from `AGENTS.md`. This includes references to:

- `Vibe Flow Guide.md`
- `How to Write a Technical Specification.md`
- `How to Write Implementation Plans.md`
- `Discuss-Then-Do Protocol.md`

Remove the entire "Vibe Flow" section if it becomes empty after removing these references.

## Convert Documentation to Skills

This section requires a discussion with the user to determine how to organize documentation into skills.

### 1. List Available Documentation

List all `.md` files in `_docs/` (excluding `Unused Instructions.md`). Present them to the user.

### 2. Suggest Groupings

Analyze the documentation files and suggest logical groupings. For example:

- Multiple plugin-related docs → one `work-on-plugin` skill with reference files
- Architecture/overview docs → one `architecture` skill

**Important**: These files must always be separate skills (unless the user says otherwise):

- `Code Style Guidelines.md` → `code-style` skill
- `Code Quality & Refactoring.md` → `code-quality` skill
- `How to Write Unit Tests.md` → `testing` skill

Present your suggestions to the user and ask:

> "Here are the documentation files I found. I suggest grouping them as follows:
>
> - **{skill-name}**: {file1.md}, {file2.md} - {brief description of when to use this skill}
> - **{skill-name}**: {file3.md} - {brief description}
>
> Would you like to proceed with these groupings, or do you have a different organization in mind?"

### 3. Create Skills Based on User Decision

For each skill the user wants to create:

1. Create the skill directory:

   ```bash
   mkdir -p "_skills/{skill-name}"
   ```

2. Move the primary file as `SKILL.md`:

   ```bash
   mv "_docs/{Primary File}.md" "_skills/{skill-name}/SKILL.md"
   ```

3. Move additional reference files (if any) with kebab-case names:

   ```bash
   mv "_docs/{Other File}.md" "_skills/{skill-name}/{other-file}.md"
   ```

4. Prepend YAML frontmatter to `SKILL.md`:

   ```bash
   { cat <<'EOF'
   ---
   name: {skill-name}
   description: {agreed description - what the skill does AND when to use it}
   ---

   EOF
   cat "_skills/{skill-name}/SKILL.md"; } > "_skills/{skill-name}/SKILL.md.tmp" && mv "_skills/{skill-name}/SKILL.md.tmp" "_skills/{skill-name}/SKILL.md"
   ```

5. Update internal references in `SKILL.md` to point to the reference files.

### 4. Handle Unused Instructions

If `_docs/Unused Instructions.md` exists, leave it in place. The `_docs/` directory will be kept with only this file inside.

### 5. Clean AGENTS.md

1. Remove all references to `_docs/` files
2. Remove empty sections (sections with no content after removing references)
3. Keep only:
   - Project name/title
   - "Always ignore the `_plans` directory when searching the codebase"
   - Ticket ID format (in "For AI Assistants" section) if present
   - Any project-specific instructions not related to documentation

### 6. Delete Old Structure

If `_docs/Unused Instructions.md` exists, keep the `_docs/` directory but delete everything else inside it:

```bash
find _docs -type f ! -name "Unused Instructions.md" -delete
find _docs -type d -empty -delete
```

Otherwise, delete the entire directory:

```bash
rm -rf _docs
```

## Report to User

Summarize:

- Vibe Flow skill installed
- Number of additional skills created from documentation
- List of all skill names
- Remind user that skills are auto-discovered by agents
- Note: If Ticket ID was not preserved, suggest running the vibe-flow post-install setup
