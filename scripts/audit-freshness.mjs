#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  categoryDefinitions,
  enumerateCategory,
} from "./content-tree.mjs";

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

function parseIsoDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    throw new Error(`${label} must use YYYY-MM-DD: ${value ?? "missing"}`);
  }
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid date: ${value}`);
  }
  return parsed;
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

function reviewRule(metadata, relativePath) {
  if (!allowedStatuses.has(metadata.status)) {
    throw new Error(`${relativePath} has invalid status ${metadata.status ?? "missing"}`);
  }
  const interval = Number(metadata.review_interval_days);
  if (![30, 90, 180].includes(interval)) {
    throw new Error(
      `${relativePath} has invalid review_interval_days ${metadata.review_interval_days ?? "missing"}`,
    );
  }
  if (
    ["candidate-unverified", "archived-or-unverified"].includes(metadata.status) &&
    interval !== 180
  ) {
    throw new Error(`${relativePath} ${metadata.status} must use a 180-day interval`);
  }
  if (["current", "stale"].includes(metadata.status) && ![30, 90].includes(interval)) {
    throw new Error(`${relativePath} ${metadata.status} must use a 30- or 90-day interval`);
  }
  return { interval, reason: "frontmatter" };
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const options = parseArguments(process.argv.slice(2));
const today = dateInTimeZone(new Date(), "Asia/Shanghai");
const asOfValue = options.asOf ?? today;
const asOf = parseIsoDate(asOfValue, "--as-of");
const rows = [];

for (const definition of categoryDefinitions) {
  const tree = await enumerateCategory(repositoryRoot, definition);
  for (const { readmePath, markdown } of tree.leaves) {
    const relativePath = path.relative(repositoryRoot, readmePath);
    const metadata = frontMatter(markdown, relativePath);
    const verified = parseIsoDate(metadata.last_verified, `${relativePath} last_verified`);
    if (verified.valueOf() > asOf.valueOf()) {
      throw new Error(
        `${relativePath} last_verified ${metadata.last_verified} is later than audit date ${asOfValue}`,
      );
    }
    const { interval, reason } = reviewRule(metadata, relativePath);
    const due = new Date(verified.valueOf() + interval * millisecondsPerDay);
    const ageDays = Math.floor((asOf.valueOf() - verified.valueOf()) / millisecondsPerDay);
    rows.push({
      path: relativePath,
      status: metadata.status,
      interval,
      reason,
      verified: metadata.last_verified,
      due: formatDate(due),
      ageDays,
      isDue: metadata.status === "stale" || asOf.valueOf() >= due.valueOf(),
    });
  }
}

rows.sort((left, right) =>
  left.due.localeCompare(right.due) || left.path.localeCompare(right.path),
);
const dueRows = rows.filter((row) => row.isDue);
const overdueCurrentRows = dueRows.filter((row) => row.status === "current");
const visibleRows = options.all ? rows : dueRows;
const intervalCounts = new Map(
  [30, 90, 180].map((interval) => [
    interval,
    rows.filter((row) => row.interval === interval).length,
  ]),
);

console.log(
  `Freshness audit as of ${asOfValue}: ${dueRows.length} due of ${rows.length} pages, ${overdueCurrentRows.length} overdue pages still marked current; intervals 30d=${intervalCounts.get(30)}, 90d=${intervalCounts.get(90)}, 180d=${intervalCounts.get(180)}.`,
);
for (const row of visibleRows) {
  const state = row.isDue ? "DUE" : "OK";
  console.log(
    [
      state,
      row.due,
      `${row.interval}d`,
      `${row.ageDays}d-old`,
      row.status,
      row.reason,
      row.path,
    ].join("\t"),
  );
}

if (!visibleRows.length) console.log("No pages are due for review.");
if (options.strict && dueRows.length) process.exitCode = 1;
if (options.checkPublicStatus && overdueCurrentRows.length) process.exitCode = 1;
