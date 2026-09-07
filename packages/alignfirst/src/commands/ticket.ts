import { join, relative } from "node:path";
import { parseArgs } from "node:util";

import { CliError } from "../cli-error.js";
import type { CommandContext } from "../context.js";
import { formatLocalTimestamp, formatSize } from "../format.js";
import { parseCommandArgs } from "../parse-args.js";
import { renderCatchup } from "../plans/catchup.js";
import { assertPlansGate } from "../plans/layout.js";
import {
  deduceTicketFromBranch,
  nextFilePosition,
  peekSideTicket,
  reserveSideTicket,
  resolveTicketDir,
  type ResolvedTicketDir,
  type TicketEntry,
  validateTicketId,
} from "../plans/ticket.js";

const USAGE = `Usage:
  {{FORM}} ticket [<id>] [--next [<filename>]] [--new-cycle] [--json] [--dry-run]
  {{FORM}} ticket --side [--next [<filename>]] [--new-cycle] [--json] [--dry-run]
  {{FORM}} ticket [<id> | --side] --catchup

--catchup prints the ticket's Markdown files, plans excluded, summaries included.
Files over 64 KiB are listed without content. Above 30 KiB of output, only the entry
list is printed.
`;

interface TicketOptions {
  id: string;
  branch?: string;
  next?: string | true;
  newCycle: boolean;
  json: boolean;
  dryRun: boolean;
  side: boolean;
  catchup: boolean;
}

interface TicketJsonReport {
  TICKET_ID: string;
  TICKET_DIR: string;
  state: ResolvedTicketDir["state"];
  branch?: string;
  entries: TicketJsonEntry[];
}

interface TicketJsonEntry {
  name: string;
  size?: number;
  modifiedAt: string;
}

export function runTicket(ctx: CommandContext, args: string[]): number {
  assertPlansGate(ctx.cwd, ctx.form);
  const usage = renderUsage(ctx);
  const parsed = parseTicketArgs(ctx, args, usage);
  if (parsed === undefined) return 0;
  const result = resolveTicket(ctx, parsed);
  if (parsed.catchup) {
    ctx.stdout.write(renderCatchup(ctx.cwd, result, renderReport(ctx, parsed, result)));
    return 0;
  }
  if (parsed.next !== undefined) {
    writeNextReport(ctx, parsed, result, parsed.next);
    return 0;
  }
  if (parsed.json)
    ctx.stdout.write(`${JSON.stringify(jsonReport(ctx, parsed, result), undefined, 2)}\n`);
  else ctx.stdout.write(renderReport(ctx, parsed, result));
  return 0;
}

function renderUsage(ctx: CommandContext): string {
  return USAGE.replaceAll("{{FORM}}", ctx.form);
}

function parseTicketArgs(
  ctx: CommandContext,
  args: string[],
  usage: string,
): TicketOptions | undefined {
  const normalized = normalizeNextArgs(args);
  const { values, positionals } = parseCommandArgs(usage, () =>
    parseArgs({
      args: normalized.args,
      options: {
        next: { type: "boolean" },
        "new-cycle": { type: "boolean", default: false },
        json: { type: "boolean", default: false },
        "dry-run": { type: "boolean", default: false },
        side: { type: "boolean", default: false },
        catchup: { type: "boolean", default: false },
        help: { type: "boolean", short: "h", default: false },
      },
      strict: true,
      allowPositionals: true,
    } as const),
  );
  if (values.help) {
    ctx.stdout.write(usage);
    return;
  }
  if (positionals.length > 1) throw new CliError(`Expected at most one ticket id.\n\n${usage}`);
  if (values.side && positionals.length > 0)
    throw new CliError(`A ticket id cannot be combined with --side.\n\n${usage}`);
  if (values["new-cycle"] && values.next === undefined)
    throw new CliError(`--new-cycle requires --next.\n\n${usage}`);
  if (values.catchup && (values.next !== undefined || values.json || values["dry-run"]))
    throw new CliError(
      `--catchup cannot be combined with --next, --json, or --dry-run.\n\n${usage}`,
    );
  if (normalized.filename !== undefined) validateNextFilename(normalized.filename);
  const resolution = resolveTicketId(ctx, positionals[0], values.side, values["dry-run"]);
  return {
    ...resolution,
    next: values.next === undefined ? undefined : (normalized.filename ?? true),
    newCycle: values["new-cycle"],
    json: values.json,
    dryRun: values["dry-run"],
    side: values.side,
    catchup: values.catchup,
  };
}

interface NormalizedNextArgs {
  args: string[];
  filename?: string;
}

function normalizeNextArgs(args: string[]): NormalizedNextArgs {
  const normalized: NormalizedNextArgs = { args: [] };
  for (let index = 0; index < args.length; ++index) {
    const arg = args[index];
    if (arg === "--") {
      normalized.args.push(...args.slice(index));
      break;
    }
    if (arg.startsWith("--next=")) {
      normalized.filename = arg.slice("--next=".length);
      normalized.args.push("--next");
      continue;
    }
    normalized.args.push(arg);
    if (arg !== "--next") continue;
    const following = args[index + 1];
    delete normalized.filename;
    if (following !== undefined && !following.startsWith("-")) {
      normalized.filename = following;
      ++index;
    }
  }
  return normalized;
}

function validateNextFilename(filename: string): void {
  if (filename.length === 0 || filename === "." || filename === ".." || /[\\/]/u.test(filename)) {
    throw new CliError("--next must be a non-empty single path segment.");
  }
}

interface TicketResolution {
  id: string;
  branch?: string;
}

function resolveTicketId(
  ctx: CommandContext,
  positional: string | undefined,
  side: boolean,
  dryRun: boolean,
): TicketResolution {
  const pattern = ctx.projectConfig?.config.ticketIdPattern;
  if (positional !== undefined) {
    validateTicketId(positional, pattern);
    return { id: positional };
  }
  if (side) return { id: dryRun ? peekSideTicket(ctx.cwd) : reserveSideTicket(ctx.cwd) };
  if (pattern === undefined) throw new CliError("No ticket id given. Pass it.");
  const deduced = deduceTicketFromBranch(ctx.cwd, pattern);
  validateTicketId(deduced.id, pattern);
  return deduced;
}

function resolveTicket(ctx: CommandContext, options: TicketOptions): ResolvedTicketDir {
  if (options.side && !options.dryRun)
    return {
      id: options.id,
      dir: join(ctx.cwd, ".plans", options.id),
      state: "created",
      entries: [],
    };
  return resolveTicketDir(ctx.cwd, options.id, { dryRun: options.dryRun });
}

function writeNextReport(
  ctx: CommandContext,
  options: TicketOptions,
  result: ResolvedTicketDir,
  filename: string | true,
): void {
  const names = result.entries.map((entry) => entry.name);
  const { cycleLetter, fileNumber } = nextFilePosition(names, options.newCycle);
  const prefix = `${cycleLetter}${fileNumber}`;
  const report = {
    TICKET_DIR: `${relative(ctx.cwd, result.dir)}/`,
    CYCLE_LETTER: cycleLetter,
    FILE_NUMBER: fileNumber,
    ...(filename === true ? { FILE_PREFIX: prefix } : { FILE_NAME: `${prefix}-${filename}` }),
  };
  if (options.json) {
    ctx.stdout.write(`${JSON.stringify(report, undefined, 2)}\n`);
    return;
  }
  const lines = Object.entries(report).map(([name, value]) => `- ${name}: \`${value}\``);
  ctx.stdout.write(`${lines.join("\n")}\n`);
}

function jsonReport(
  ctx: CommandContext,
  options: TicketOptions,
  result: ResolvedTicketDir,
): TicketJsonReport {
  return {
    TICKET_ID: result.id,
    TICKET_DIR: `${relative(ctx.cwd, result.dir)}/`,
    state: result.state,
    ...(options.branch === undefined ? {} : { branch: options.branch }),
    entries: result.entries.map((entry) => ({
      ...entry,
      modifiedAt: entry.modifiedAt.toISOString(),
    })),
  };
}

function renderReport(
  ctx: CommandContext,
  options: TicketOptions,
  result: ResolvedTicketDir,
): string {
  const reservation = options.side && options.dryRun ? " (would be reserved)" : "";
  const deduction =
    options.branch === undefined ? "" : ` (deduced from branch \`${options.branch}\`)`;
  const directoryState = renderDirectoryState(result.state, options.dryRun);
  const directory = `${relative(ctx.cwd, result.dir)}/`;
  const lines = [
    `- TICKET_ID: \`${result.id}\`${reservation}${deduction}`,
    `- TICKET_DIR: \`${directory}\`${directoryState}`,
  ];
  if (result.entries.length === 0) lines.push("- Entries: (none)");
  else lines.push("- Entries:", ...result.entries.map((entry) => `  - ${renderEntry(entry)}`));
  return `${lines.join("\n")}\n`;
}

function renderEntry(entry: TicketEntry): string {
  const name = `\`${entry.name}\``;
  if (entry.size === undefined) return name;
  return `${name} (${formatSize(entry.size)}, ${formatLocalTimestamp(entry.modifiedAt)})`;
}

function renderDirectoryState(state: ResolvedTicketDir["state"], dryRun: boolean): string {
  if (state === "existing") return "";
  if (state === "created") return dryRun ? " (would be created)" : " (created)";
  return dryRun ? " (would be restored from _archives)" : " (restored from _archives)";
}
