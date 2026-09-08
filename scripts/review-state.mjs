import { readFile } from "node:fs/promises";
import path from "node:path";
import { categoryDefinitions, enumerateCategory } from "./content-tree.mjs";

export const reviewStatePath = ".maintenance/review-state.json";
export const homepageReviewLabels = {
  "README.md": "- **最近一次全库内容复核基准：**",
  "README.en.md": "- **Last full content review baseline:**",
};

export function parseIsoDate(value, label = "date") {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must use YYYY-MM-DD: ${value ?? "missing"}`);
  }
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid date: ${value}`);
  }
  return parsed;
}

export function dateInTimeZone(date = new Date(), timeZone = "Asia/Shanghai") {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

// Use the same day next calendar month, clamped to that month's final day.
export function addCalendarMonth(value) {
  const date = parseIsoDate(value);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + 1);
  const lastDay = new Date(date.valueOf());
  lastDay.setUTCMonth(lastDay.getUTCMonth() + 1);
  lastDay.setUTCDate(0);
  date.setUTCDate(Math.min(day, lastDay.getUTCDate()));
  const result = date.toISOString().slice(0, 10);
  parseIsoDate(result, "next monthly review date");
  return result;
}

export function monthlyReviewIsDue(reviewed, asOf, status) {
  parseIsoDate(asOf, "audit date");
  const due = addCalendarMonth(reviewed);
  return status === "stale" || asOf >= due;
}

export function hasPageReviewDeclaration(markdown) {
  // Strip inline emphasis so legacy bold labels cannot hide a date declaration.
  const plain = markdown.replace(/[*`]/g, "");
  return (
    /(?:本条核验日期|核验日期|核验时间|复核日期|复核时间|last_verified|review_interval_days)/i.test(plain) ||
    /(?:核验|复核|verified|reviewed)(?:于|日期|时间|基准日)?\s*[：:]?\s*\d{4}-\d{2}-\d{2}/i.test(plain)
  );
}

function requireRecord(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
}

export function validateReviewState(state, {
  leafPaths,
  asOf = dateInTimeZone(),
  homepages,
}) {
  parseIsoDate(asOf, "validation date");
  requireRecord(state, reviewStatePath);
  const expectedKeys = ["cadence", "last_full_review", "page_reviews"];
  if (JSON.stringify(Object.keys(state).sort()) !== JSON.stringify(expectedKeys.sort())) {
    throw new Error(`${reviewStatePath} must contain only cadence, last_full_review, and page_reviews`);
  }
  if (state.cadence !== "monthly") {
    throw new Error(`${reviewStatePath} cadence must be monthly`);
  }
  parseIsoDate(state.last_full_review, "last_full_review");
  if (state.last_full_review > asOf) {
    throw new Error(`Future last_full_review ${state.last_full_review} after ${asOf}`);
  }
  requireRecord(state.page_reviews, "page_reviews");
  if (!Array.isArray(leafPaths) || !leafPaths.length || new Set(leafPaths).size !== leafPaths.length) {
    throw new Error("Content tree must supply a non-empty, unique policy leaf list");
  }
  const expectedPages = new Set(leafPaths);
  const registeredPages = Object.keys(state.page_reviews);
  const missing = leafPaths.filter((page) => !Object.hasOwn(state.page_reviews, page));
  const extra = registeredPages.filter((page) => !expectedPages.has(page));
  if (missing.length || extra.length) {
    throw new Error(`Review registry/content-tree mismatch; missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}`);
  }
  for (const [page, reviewed] of Object.entries(state.page_reviews)) {
    parseIsoDate(reviewed, `${page} review date`);
    if (reviewed > asOf) {
      throw new Error(`Future review date ${reviewed} after ${asOf}: ${page}`);
    }
    if (state.last_full_review > reviewed) {
      throw new Error(`last_full_review ${state.last_full_review} exceeds page review ${reviewed}: ${page}`);
    }
  }
  requireRecord(homepages, "homepages");
  for (const [homepage, label] of Object.entries(homepageReviewLabels)) {
    const declarations = (homepages[homepage] ?? "").split(/\r?\n/)
      .filter((line) => line.startsWith(label));
    if (declarations.length !== 1 || declarations[0] !== `${label} ${state.last_full_review}`) {
      throw new Error(`${homepage} must declare exactly once: ${label} ${state.last_full_review}`);
    }
  }
  return state;
}

export async function loadReviewState(repositoryRoot, options = {}) {
  let { leafPaths } = options;
  if (!leafPaths) {
    const trees = await Promise.all(categoryDefinitions.map((definition) =>
      enumerateCategory(repositoryRoot, definition)));
    leafPaths = trees.flatMap((tree) => tree.leaves.map((leaf) =>
      path.relative(repositoryRoot, leaf.readmePath).split(path.sep).join("/")));
  }
  const [json, ...homepageTexts] = await Promise.all([
    readFile(path.join(repositoryRoot, reviewStatePath), "utf8"),
    ...Object.keys(homepageReviewLabels).map((homepage) =>
      readFile(path.join(repositoryRoot, homepage), "utf8")),
  ]);
  let state;
  try {
    state = JSON.parse(json);
  } catch (error) {
    throw new Error(`Invalid ${reviewStatePath}: ${error.message}`);
  }
  const homepages = Object.fromEntries(Object.keys(homepageReviewLabels)
    .map((homepage, index) => [homepage, homepageTexts[index]]));
  return validateReviewState(state, { ...options, leafPaths, homepages });
}
