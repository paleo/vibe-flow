import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { renderCommandForm } from "../command-form.js";
import type { CommandContext } from "../context.js";
import { renderConventions } from "../conventions.js";
import { parseBareCommandArgs } from "../parse-args.js";
import { runDocmap } from "./docmap.js";

export function runContext(ctx: CommandContext, args: string[]): number {
  const usage = `Usage: ${ctx.form} context\n`;
  if (parseBareCommandArgs(ctx, args, usage)) return 0;
  ctx.stdout.write(`# Project Conventions\n\n${renderConventions(ctx)}`);
  const code = existsSync(join(ctx.cwd, "docs")) ? writeDocmapSection(ctx) : 0;
  ctx.stdout.write(`\n${renderProtocolsSection(ctx)}`);
  return code;
}

function writeDocmapSection(ctx: CommandContext): number {
  ctx.stdout.write("\n# Docmap Usage\n\n");
  return runDocmap(ctx, []);
}

function renderProtocolsSection(ctx: CommandContext): string {
  const template = readFileSync(
    new URL("../../templates/context/protocols.md", import.meta.url),
    "utf-8",
  );
  return renderCommandForm(template, ctx.form);
}
