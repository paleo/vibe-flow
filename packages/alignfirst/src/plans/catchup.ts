import { readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { CliError } from "../cli-error.js";
import type { ResolvedTicketDir } from "./ticket.js";

const MAX_FILE_BYTES = 65_536;
const MAX_OUTPUT_BYTES = 30_000;
const PLAN_FILE = /^[A-Z]\d+-(?:main-plan|plan-.*)\.md$/;

interface CatchupFile {
  path: string;
  size: number;
}

export function renderCatchup(cwd: string, ticket: ResolvedTicketDir, report: string): string {
  const files = ticket.entries
    .filter(isCatchupFile)
    .flatMap((entry) => describeFile(cwd, join(ticket.dir, entry)));
  if (files.length === 0) return `${report}\nNo Markdown files to load.\n`;
  const outputBytes = files.reduce(
    (total, file) => total + sectionBytes(file),
    Buffer.byteLength(report) + 1,
  );
  if (outputBytes > MAX_OUTPUT_BYTES) return renderInventory(report, files, outputBytes);
  return `${report}\n${files.map((file) => renderSection(cwd, file)).join("")}`;
}

function isCatchupFile(entry: string): boolean {
  return entry.endsWith(".md") && (entry.endsWith(".summary.md") || !PLAN_FILE.test(entry));
}

function describeFile(cwd: string, path: string): CatchupFile[] {
  try {
    const stat = statSync(path);
    return stat.isFile() ? [{ path: relative(cwd, path), size: stat.size }] : [];
  } catch (error) {
    throw fileError(path, error);
  }
}

function fileError(path: string, error: unknown): CliError {
  const detail = error instanceof Error ? error.message : String(error);
  return new CliError(`Cannot load catchup file ${path}: ${detail}`);
}

function sectionBytes(file: CatchupFile): number {
  const body = isOversized(file) ? Buffer.byteLength(omissionNotice(file)) : file.size;
  return Buffer.byteLength(wrapSection(file.path, "")) + body;
}

function isOversized(file: CatchupFile): boolean {
  return file.size > MAX_FILE_BYTES;
}

function omissionNotice(file: CatchupFile): string {
  return `Content omitted: ${file.size} bytes, over the ${MAX_FILE_BYTES}-byte limit.`;
}

function wrapSection(path: string, body: string): string {
  return `<file path="${path}">\n${body}\n</file>\n\n`;
}

function renderInventory(report: string, files: CatchupFile[], outputBytes: number): string {
  const notice = `History too large to print (${outputBytes} bytes, budget ${MAX_OUTPUT_BYTES}). Read the files relevant to the task rather than all of them.`;
  const entries = files.map((file) => `- ${file.path} (${file.size} bytes)`);
  return `${report}\n${notice}\n\n${entries.join("\n")}\n`;
}

function renderSection(cwd: string, file: CatchupFile): string {
  const body = isOversized(file) ? omissionNotice(file) : readBody(cwd, file);
  return wrapSection(file.path, body.replace(/\n+$/, ""));
}

function readBody(cwd: string, file: CatchupFile): string {
  try {
    return readFileSync(join(cwd, file.path), "utf-8");
  } catch (error) {
    throw fileError(file.path, error);
  }
}
