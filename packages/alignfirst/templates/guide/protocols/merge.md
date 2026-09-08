# Merge Protocol

## Prerequisites

Run `{{TICKET_CMD}}` once to identify TICKET_DIR and load the ticket directory context (`{{CMD}} ticket --side` when there is no external ticket).

---

This protocol applies when a merge or rebase has produced conflicts, or when the user provides an incoming branch to merge. Follow the steps below.

## 1. Check Git Status

Run `git status` to check for conflicts.

**If there are no conflicts:** start the merge — use the incoming branch if the user provided one, {{BASE_BRANCH_RULE}} If the merge completes cleanly, you are done — no summary file needed. Otherwise, continue with the steps below.

## 2. Investigate

Take the time to understand how things work in the incoming branch and in the current branch. For each conflicting file, read enough surrounding context to understand the intent on both sides.

## 3. Resolve

Run `{{TICKET_CMD}} --next merge.summary.md` to continue the current cycle. Append FILE_NAME to TICKET_DIR, then immediately create the summary at that path. Log each notable resolution in it as you resolve (see step 5 for the expected content).

Resolve the conflicts properly — preserve both intents whenever possible. Do not blindly accept one side.

Resolve conflicts one at a time. Avoid batch processing, broad search-and-replace operations, and other brute-force edits.

**Special case for lock files:** If a lock file has conflicts:

1. Accept all the changes from the incoming branch.
2. After all other conflicts are resolved, run the proper install command so the package manager re-applies the current branch's dependency changes.

## 4. Validate and Commit

After resolving all conflicts, run the codebase's usual checks, such as compilation, linting, and unit tests. Commit the merge as soon as the available checks pass, using Git's default message (for example, `git commit --no-edit`).

If you need to execute the project, whether through E2E tests or manual checks, do so after the merge commit. Commit any resulting fixes separately.

## 5. Summarize

Finalize the summary file.

**Keep it lean.** Only document challenging conflicts and the choices made to resolve them. Do not list straightforward resolutions — if everything was trivial, the summary should be almost empty (just a header and a one-line note that there was nothing tricky). Do not include a commit message — git already provides one for merges.

Example:

```markdown
# Merge Summary - [very short title]

## Notable Resolutions

- `path/to/file.ts`: [what made it tricky and which choice was made, in one or two sentences]

## Lock File

[Only if there was a lock file conflict: which lock file, which install command was run]
```

Omit any section with nothing to report.

_Ignore markdown lint errors in the summary file._

At the end, give the path of the summary file to the user.
