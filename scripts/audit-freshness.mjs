#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  categoryDefinitions,
  enumerateCategory,
} from "./content-tree.mjs";
import {
  addReviewInterval,
  dateInTimeZone,
  loadReviewState,
  reviewIsDue,
  parseIsoDate,
} from "./review-state.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const millisecondsPerDay = 86_400_000;
const allowedStatuses = new Set([
  "current",
  "stale",
  "candidate-unverified",
  "archived-or-unverified",
]);

function parseArguments(argv) {
  const options = {
    all: false,
    strict: false,
    checkPublicStatus: false,
    asOf: null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--all") options.all = true;
    else if (argument === "--strict") options.strict = true;
    else if (argument === "--check-public-status") {
      options.checkPublicStatus = true;
    }
    else if (argument === "--as-of") {
      options.asOf = argv[index + 1];
      if (!options.asOf || options.asOf.startsWith("--")) {
        throw new Error("--as-of requires a YYYY-MM-DD value");
      }
      index += 1;
    } else if (argument === "--help") {
      console.log(
        "Usage: node scripts/audit-freshness.mjs [--as-of YYYY-MM-DD] [--all] [--strict|--check-public-status]",
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  if (options.strict && options.checkPublicStatus) {
    throw new Error("Use either --strict or --check-public-status, not both.");
  }
  return options;
}

function frontMatter(markdown, relativePath) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Missing frontmatter: ${relativePath}`);
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    metadata[key] = value;
  }
  return metadata;
}

const options = parseArguments(process.argv.slice(2));
const today = dateInTimeZone();
const asOfValue = options.asOf ?? today;
const asOf = parseIsoDate(asOfValue, "--as-of");
const rows = [];
const trees = await Promise.all(categoryDefinitions.map((definition) =>
  enumerateCategory(repositoryRoot, definition)));
const reviewState = await loadReviewState(repositoryRoot, {
  asOf: asOfValue,
  leafPaths: trees.flatMap((tree) => tree.leaves.map((leaf) =>
    path.relative(repositoryRoot, leaf.readmePath).split(path.sep).join("/"))),
});

for (const tree of trees) {
  for (const { readmePath, markdown } of tree.leaves) {
    const relativePath = path.relative(repositoryRoot, readmePath).split(path.sep).join("/");
    const metadata = frontMatter(markdown, relativePath);
    if (!allowedStatuses.has(metadata.status)) {
      throw new Error(`${relativePath} has invalid status ${metadata.status ?? "missing"}`);
    }
    const reviewed = reviewState.page_reviews[relativePath];
    const verified = parseIsoDate(reviewed);
    const ageDays = Math.floor((asOf.valueOf() - verified.valueOf()) / millisecondsPerDay);
    rows.push({
      path: relativePath,
      status: metadata.status,
      reviewed,
      due: addReviewInterval(reviewed),
      ageDays,
      isDue: reviewIsDue(reviewed, asOfValue, metadata.status),
    });
  }
}

rows.sort((left, right) =>
  left.due.localeCompare(right.due) || left.path.localeCompare(right.path),
);
const dueRows = rows.filter((row) => row.isDue);
const overdueCurrentRows = dueRows.filter((row) => row.status === "current");
const visibleRows = options.all ? rows : dueRows;
console.log(
  `30-day review queue as of ${asOfValue}: ${dueRows.length} due of ${rows.length} pages, ${overdueCurrentRows.length} overdue pages still marked current; cadence=every-30-days; last full review baseline=${reviewState.last_full_review}.`,
);
console.log("This queue checks review dates and status only; it does not verify policy facts or official sources.");
for (const row of visibleRows) {
  const state = row.isDue ? "DUE" : "OK";
  console.log(
    [
      state,
      row.due,
      "every-30-days",
      `${row.ageDays}d-old`,
      row.status,
      row.reviewed,
      row.path,
    ].join("\t"),
  );
}

if (!visibleRows.length) console.log("No pages are due for review.");
if (options.strict && dueRows.length) process.exitCode = 1;
if (options.checkPublicStatus && overdueCurrentRows.length) process.exitCode = 1;
