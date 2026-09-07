import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { configureGit, git, makeTempDir, runMain } from "./helpers.js";

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("ticket command", () => {
  it("creates, lists and restores ticket directories", async () => {
    const cwd = makeProject();
    const created = await runMain(["ticket", "78"], { cwd });
    expect(created.stdout).toContain("Directory: .plans/78/ (created)");
    writeFileSync(join(cwd, ".plans", "78", "A1-request.md"), "request");
    expect((await runMain(["ticket", "78", "--next", "spec.md"], { cwd })).stdout).toBe(
      "- Ticket directory: `.plans/78/`\n- Next file: `A2-spec.md`\n",
    );
    mkdirSync(join(cwd, ".plans", "_archives"));
    mkdirSync(join(cwd, ".plans", "_archives", "99"));
    const restored = await runMain(["ticket", "99"], { cwd });
    expect(restored.stdout).toContain("restored from _archives");
    expect(existsSync(join(cwd, ".plans", "99"))).toBe(true);
  });

  it("computes a new cycle and keeps dry runs read-only", async () => {
    const cwd = makeProject();
    mkdirSync(join(cwd, ".plans", "78"));
    writeFileSync(join(cwd, ".plans", "78", "A2-spec.md"), "spec");
    const next = await runMain(
      ["ticket", "78", "--next", "notes.txt", "--new-cycle", "--dry-run"],
      { cwd },
    );
    expect(next.stdout).toBe("- Ticket directory: `.plans/78/`\n- Next file: `B1-notes.txt`\n");
    const missing = await runMain(["ticket", "79", "--dry-run"], { cwd });
    expect(missing.stdout).toContain("would be created");
    expect(existsSync(join(cwd, ".plans", "79"))).toBe(false);
  });

  it("computes a dry-run filename from archived entries", async () => {
    const cwd = makeProject();
    const archive = join(cwd, ".plans", "_archives", "99");
    mkdirSync(archive, { recursive: true });
    writeFileSync(join(archive, "C4-plan.md"), "plan");

    const result = await runMain(["ticket", "99", "--next", "AAD.summary.md", "--dry-run"], {
      cwd,
    });

    expect(result.stdout).toBe(
      "- Ticket directory: `.plans/99/`\n- Next file: `C5-AAD.summary.md`\n",
    );
    expect(existsSync(join(cwd, ".plans", "99"))).toBe(false);
    expect(existsSync(archive)).toBe(true);
  });

  it("prints prefixes without reserving numbers and advances after a file is written", async () => {
    const cwd = makeProject();
    const first = await runMain(["ticket", "78", "--next"], { cwd });
    expect(first).toMatchObject({ code: 0, stderr: "" });
    expect(first.stdout).toBe("- Ticket directory: `.plans/78/`\n- Next file prefix: `A1`\n");
    expect((await runMain(["ticket", "78", "--next"], { cwd })).stdout).toBe(first.stdout);
    expect((await runMain(["ticket", "78", "--next", "spec.md"], { cwd })).stdout).toContain(
      "- Next file: `A1-spec.md`",
    );
    writeFileSync(join(cwd, ".plans", "78", "A1-spec.md"), "spec");
    expect((await runMain(["ticket", "78", "--next"], { cwd })).stdout).toContain(
      "- Next file prefix: `A2`",
    );
  });

  it("emits the same compact information in JSON for either next form", async () => {
    const cwd = makeProject();
    mkdirSync(join(cwd, ".plans", "78"));
    writeFileSync(join(cwd, ".plans", "78", "A1-request.md"), "request");
    const prefix = await runMain(["ticket", "78", "--next", "--json"], { cwd });
    expect(prefix.code).toBe(0);
    expect(JSON.parse(prefix.stdout)).toEqual({ dir: ".plans/78/", prefix: "A2" });
    const filename = await runMain(["ticket", "78", "--next", "spec.md", "--json"], { cwd });
    expect(filename.code).toBe(0);
    expect(JSON.parse(filename.stdout)).toEqual({ dir: ".plans/78/", next: "A2-spec.md" });
  });

  it("accepts bare --next with cycle and dry-run flags and an explicit ticket after --", async () => {
    const cwd = makeProject();
    const archive = join(cwd, ".plans", "_archives", "78");
    mkdirSync(archive, { recursive: true });
    writeFileSync(join(archive, "C4-plan.md"), "plan");
    const result = await runMain(
      ["ticket", "--next", "--new-cycle", "--dry-run", "--json", "--", "78"],
      { cwd },
    );
    expect(result.code).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ dir: ".plans/78/", prefix: "D1" });
    expect(existsSync(join(cwd, ".plans", "78"))).toBe(false);
    expect(existsSync(archive)).toBe(true);
  });

  it("supports inline filenames and rejects explicitly empty filenames", async () => {
    const cwd = makeProject();
    const invalid = await runMain(["ticket", "78", "--next="], { cwd });
    expect(invalid.code).toBe(1);
    expect(invalid.stderr).toContain("--next must be a non-empty single path segment.");
    expect(existsSync(join(cwd, ".plans", "78"))).toBe(false);
    const result = await runMain(["ticket", "78", "--next=spec.md"], { cwd });
    expect(result.code).toBe(0);
    expect(result.stdout).toBe("- Ticket directory: `.plans/78/`\n- Next file: `A1-spec.md`\n");
  });

  it("keeps argument validation for bare --next", async () => {
    const cwd = makeProject();
    for (const args of [
      ["ticket", "78", "--next", "--unknown"],
      ["ticket", "78", "--new-cycle"],
      ["ticket", "78", "--next", "spec.md", "extra"],
      ["ticket", "78", "--side", "--next"],
    ]) {
      expect((await runMain(args, { cwd })).code, args.join(" ")).toBe(1);
    }
    expect(existsSync(join(cwd, ".plans", "78"))).toBe(false);
  });

  it("previews side-ticket prefixes and creates side tickets with named output", async () => {
    const cwd = makeProject();
    const preview = await runMain(["ticket", "--side", "--next", "--dry-run", "--json"], {
      cwd,
    });
    expect(preview.code).toBe(0);
    expect(JSON.parse(preview.stdout)).toEqual({ dir: ".plans/side-1/", prefix: "A1" });
    expect(existsSync(join(cwd, ".plans", "side-1"))).toBe(false);
    const created = await runMain(["ticket", "--side", "--next", "request.md", "--json"], {
      cwd,
    });
    expect(created.code).toBe(0);
    expect(JSON.parse(created.stdout)).toEqual({ dir: ".plans/side-1/", next: "A1-request.md" });
    expect(existsSync(join(cwd, ".plans", "side-1"))).toBe(true);
    expect(existsSync(join(cwd, ".plans", "side-1", "A1-request.md"))).toBe(false);
  });

  it("rejects unsafe --next filenames before creating the ticket", async () => {
    const cwd = makeProject();

    for (const filename of ["", ".", "..", "../outside.md", "nested/file.md", "nested\\file.md"]) {
      const result = await runMain(["ticket", "78", "--next", filename], { cwd });
      expect(result.code).toBe(1);
      expect(result.stderr).toContain("--next must be a non-empty single path segment.");
    }

    expect(existsSync(join(cwd, ".plans", "78"))).toBe(false);
  });

  it("reserves side tickets across active and archived entries, including an EEXIST race", async () => {
    const cwd = makeProject();
    mkdirSync(join(cwd, ".plans", "_archives", "side-2"), { recursive: true });
    writeFileSync(join(cwd, ".plans", "side-3"), "occupied");
    const result = await runMain(["ticket", "--side", "--json"], { cwd });
    expect(JSON.parse(result.stdout)).toMatchObject({ id: "side-4", state: "created" });
    expect(existsSync(join(cwd, ".plans", "side-4"))).toBe(true);
  });

  it("accounts for occupied names when previewing a side ticket", async () => {
    const cwd = makeProject();
    mkdirSync(join(cwd, ".plans", "_archives", "side-2"), { recursive: true });
    writeFileSync(join(cwd, ".plans", "side-3"), "occupied");
    const result = await runMain(["ticket", "--side", "--dry-run", "--json"], { cwd });
    expect(JSON.parse(result.stdout)).toMatchObject({ id: "side-4", state: "created" });
    expect(existsSync(join(cwd, ".plans", "side-4"))).toBe(false);
  });

  it("deduces the ticket from the branch and emits the JSON contract", async () => {
    const cwd = makeProject();
    git(cwd, "checkout", "-q", "-b", "78/unified-cli");
    writeFileSync(
      join(cwd, ".alignfirst.json"),
      JSON.stringify({ schemaVersion: 1, ticketIdPattern: "^\\d+$" }),
    );
    const result = await runMain(["ticket", "--json"], { cwd });
    expect(JSON.parse(result.stdout)).toEqual({
      id: "78",
      dir: ".plans/78",
      state: "created",
      branch: "78/unified-cli",
      entries: [],
    });
    const next = await runMain(["ticket", "--json", "--next", "spec.md"], { cwd });
    expect(JSON.parse(next.stdout)).toEqual({ dir: ".plans/78/", next: "A1-spec.md" });
    const prefix = await runMain(["ticket", "--json", "--next"], { cwd });
    expect(JSON.parse(prefix.stdout)).toEqual({ dir: ".plans/78/", prefix: "A1" });
  });

  it("requires the plans gate and validates configured ids", async () => {
    const cwd = makeProject(false);
    expect((await runMain(["ticket", "78"], { cwd })).stderr).toContain(
      "No .plans/ directory in the current directory.",
    );
    mkdirSync(join(cwd, ".plans"));
    writeFileSync(
      join(cwd, ".alignfirst.json"),
      JSON.stringify({ schemaVersion: 1, ticketIdPattern: "^\\d+$" }),
    );
    expect((await runMain(["ticket", "abc"], { cwd })).stderr).toContain("does not match");
    expect((await runMain(["ticket", "side-2"], { cwd })).code).toBe(0);
  });

  it("explains how to enable branch deduction when no id or pattern is given", async () => {
    const cwd = makeProject();
    const result = await runMain(["ticket"], { cwd });
    expect(result.stderr).toContain("No ticket id given. Pass it.");
    expect(result.stderr).toContain("Setting ticketIdPattern");
  });
});

function makeProject(withPlans = true): string {
  const cwd = makeTempDir();
  dirs.push(cwd);
  configureGit(cwd);
  git(cwd, "init", "--quiet");
  writeFileSync(join(cwd, "README.md"), "project");
  git(cwd, "add", "-A");
  git(cwd, "commit", "--quiet", "-m", "init");
  if (withPlans) mkdirSync(join(cwd, ".plans"));
  return cwd;
}
