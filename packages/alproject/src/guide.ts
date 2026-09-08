import { readFileSync } from "node:fs";
import { dirname } from "node:path";

import type { ProjectInventory, ProjectsDirectory } from "./discovery.js";
import { escapeAdditionalJsonCharacters, formatRange } from "./format.js";
import type { PortRange } from "./markers.js";

export function renderProjectsGuide(inventory?: ProjectInventory): string {
  const guide = readTemplate("guide.md").trimEnd();
  if (inventory === undefined) return guide;
  const sections = inventory.directories.map((directory) => renderDirectory(inventory, directory));
  return `${guide}\n\n${sections.join("\n\n")}`;
}

function readTemplate(name: string): string {
  return readFileSync(new URL(`../templates/${name}`, import.meta.url), "utf-8");
}

function renderDirectory(inventory: ProjectInventory, directory: ProjectsDirectory): string {
  const lines = [`## Directory ${renderData(directory.path)}`];
  if (directory.description !== undefined) {
    lines.push("", `Description: ${renderData(directory.description)}`);
  }
  lines.push("", `Port range: ${renderRange(directory.portRange)}`, "", "Projects:");
  const projects = inventory.projects.filter((project) => project.directory === directory.path);
  if (projects.length === 0) lines.push("- (none)");
  else {
    for (const project of projects) {
      lines.push(`- ${renderData(project.name)} — ${renderRange(project.portRange, "(portless)")}`);
    }
  }
  lines.push("", "Nested directories:");
  const nested = inventory.directories.filter(
    (candidate) => candidate.path !== directory.path && dirname(candidate.path) === directory.path,
  );
  if (nested.length === 0) lines.push("- (none)");
  else {
    for (const child of nested) {
      lines.push(`- ${renderData(child.path)} — ${renderRange(child.portRange)}`);
    }
  }
  return lines.join("\n");
}

function renderData(value: string): string {
  const escaped = escapeAdditionalJsonCharacters(JSON.stringify(value));
  const delimiter = "`".repeat(longestBacktickRun(escaped) + 1);
  return `${delimiter}${escaped}${delimiter}`;
}

function longestBacktickRun(value: string): number {
  let longest = 0;
  for (const [run] of value.matchAll(/`+/gu)) longest = Math.max(longest, run.length);
  return longest;
}

function renderRange(range: PortRange | undefined, absent = "(none)"): string {
  return range === undefined ? absent : formatRange(range);
}
