# Upgrade to Agent Skills

This migration converts your Vibe Flow installation from the `_docs/` system to the Agent Skills standard (`_skills/`).

**Reference**: <https://agentskills.io/specification.md>

## Pre-requisites

- Verify `_docs/vibe-flow/` exists. If not, STOP - this is not a Vibe Flow installation.
- If this is a git repository, verify the working tree is clean. DO NOT PROCEED with uncommitted changes.

## Migration Steps

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

- [README.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/README.md) → `_skills/vibe-flow/README.md`
- [SKILL.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/SKILL.md) → `_skills/vibe-flow/SKILL.md`
- [spec-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/spec-protocol.md) → `_skills/vibe-flow/spec-protocol.md`
- [plan-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/plan-protocol.md) → `_skills/vibe-flow/plan-protocol.md`
- [dtdp-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/dtdp-protocol.md) → `_skills/vibe-flow/dtdp-protocol.md`
- [pr-message-protocol.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/_skills/vibe-flow/pr-message-protocol.md) → `_skills/vibe-flow/pr-message-protocol.md`

### 3. Convert Other Documentation to Skills

For each `.md` file in `_docs/` (excluding `Unused Instructions.md`):

1. Derive skill name from filename:
   - `Code Style Guidelines.md` → `code-style`
   - `How to Write Unit Tests.md` → `testing`
   - `Writing Documentation.md` → `documentation`
   - `Monorepo Overview.md` → `monorepo`
   - Other files: lowercase, replace spaces with hyphens

2. Create skill directory and move file:

   ```bash
   mkdir -p "_skills/{skill-name}"
   mv "_docs/{Original Filename}.md" "_skills/{skill-name}/SKILL.md"
   ```

3. Prepend YAML frontmatter using shell commands:

   ```bash
   { cat <<'EOF'
   ---
   name: {skill-name}
   description: {infer from content - describe what the skill does AND when to use it}
   ---

   EOF
   cat "_skills/{skill-name}/SKILL.md"; } > "_skills/{skill-name}/SKILL.md.tmp" && mv "_skills/{skill-name}/SKILL.md.tmp" "_skills/{skill-name}/SKILL.md"
   ```

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

The resulting `AGENTS.md` should be minimal. Example:

```markdown
# {PROJECT_NAME}

Always ignore the `_plans` directory when searching the codebase.

## For AI Assistants

_Ticket ID_: Format is `XXX-###`. When not provided, deduce it from the branch name.
```

### 6. Update Claude/Cursor Commands (if present)

If `.claude/commands/` exists, delete the old commands and fetch fresh ones:

```bash
rm -f .claude/commands/spec.md .claude/commands/plan.md .claude/commands/dtdp.md .claude/commands/doc.md
```

Then fetch the latest versions. Do not chain commands:

- [spec.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/spec.md) → `.claude/commands/spec.md`
- [plan.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/plan.md) → `.claude/commands/plan.md`
- [dtdp.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/dtdp.md) → `.claude/commands/dtdp.md`
- [doc.md](https://raw.githubusercontent.com/paleo/vibe-flow/refs/heads/main/.claude/commands/doc.md) → `.claude/commands/doc.md`

### 7. Delete Old Structure

If `_docs/Unused Instructions.md` exists, keep the `_docs/` directory but delete everything else inside it:

```bash
find _docs -type f ! -name "Unused Instructions.md" -delete
find _docs -type d -empty -delete
```

Otherwise, delete the entire directory:

```bash
rm -rf _docs
```

### 8. Report to User

Summarize:

- Number of skills created
- List of skill names
- Remind user that skills are auto-discovered by agents
- Note: If Ticket ID was not preserved, suggest running the vibe-flow post-install setup
