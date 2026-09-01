import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const categories = [
  ["citizenship-by-investment", "投资入籍"],
  ["investment-permanent-residence", "投资永居"],
  ["investment-residence", "投资居留"],
  ["entrepreneur-business-residence", "创业与经营居留"],
  ["digital-nomad-remote-work", "数字游民与远程工作"],
  ["visitor-financial-remote", "访客或财力型远程工作"],
  ["passive-income-retirement", "被动收入与退休居留"],
  ["closed-paused-unverified", "停办、暂停与待核"],
];
const allowedStatuses = new Set([
  "current",
  "stale",
  "candidate-unverified",
  "archived-or-unverified",
]);
const forbiddenExtensions = new Set([".xlsx", ".xls", ".csv", ".tsv", ".pdf"]);
const scannedTextExtensions = new Set([
  ".md",
  ".mjs",
  ".js",
  ".json",
  ".toml",
  ".yml",
  ".yaml",
]);
const forbiddenText = [
  /\/Users\//,
  new RegExp(["Mobile", "Documents"].join("\\s+"), "i"),
  /[?&](ref|affiliate)=/i,
  /utm_(source|medium|campaign)=/i,
];
const skippedDirectories = new Set([".git", ".venv", ".site", "node_modules"]);
const requiredGovernanceFiles = [
  "AGENTS.md",
  "MAINTENANCE.md",
  ".agents/skills/global-mobility-maintenance/SKILL.md",
  ".agents/skills/global-mobility-maintenance/references/source-policy.md",
  ".agents/skills/global-mobility-maintenance/references/review-checklist.md",
];
const failures = [];
let countryPages = 0;

function parseFrontMatter(markdown, relativePath) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    failures.push(`Missing frontmatter: ${relativePath}`);
    return {};
  }
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    if (Object.hasOwn(metadata, key)) {
      failures.push(`Duplicate frontmatter key ${key}: ${relativePath}`);
    }
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

function validIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.valueOf()) &&
    parsed.toISOString().slice(0, 10) === value
  );
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

const validationDate = dateInTimeZone(new Date(), "Asia/Shanghai");

function bulletValues(markdown, label) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [
    ...markdown.matchAll(
      new RegExp(`^- \\*\\*${escapedLabel}：\\*\\*\\s*(.+)$`, "gm"),
    ),
  ].map((match) => match[1].trim());
}

function validateCountryPage(directory, expectedCategory, readme, markdown) {
  const relativePath = path.relative(root, readme);
  const metadata = parseFrontMatter(markdown, relativePath);
  const isWarningPage = directory === "closed-paused-unverified";
  const activeStatuses = new Set(["current", "stale", "candidate-unverified"]);

  for (const key of [
    "title",
    "category",
    "status",
    "last_verified",
    "review_interval_days",
  ]) {
    if (!metadata[key]) failures.push(`Missing ${key}: ${relativePath}`);
  }
  if (!allowedStatuses.has(metadata.status)) {
    failures.push(`Invalid status ${metadata.status ?? "missing"}: ${relativePath}`);
  }
  if (metadata.category !== expectedCategory) {
    failures.push(
      `Category mismatch ${metadata.category ?? "missing"}; expected ${expectedCategory}: ${relativePath}`,
    );
  }
  if (!validIsoDate(metadata.last_verified)) {
    failures.push(`Invalid last_verified ${metadata.last_verified ?? "missing"}: ${relativePath}`);
  } else if (metadata.last_verified > validationDate) {
    failures.push(
      `Future last_verified ${metadata.last_verified} after ${validationDate}: ${relativePath}`,
    );
  }
  const reviewInterval = Number(metadata.review_interval_days);
  if (![30, 90, 180].includes(reviewInterval)) {
    failures.push(
      `Invalid review_interval_days ${metadata.review_interval_days ?? "missing"}: ${relativePath}`,
    );
  }

  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading !== metadata.title) {
    failures.push(
      `H1/title mismatch ${heading ?? "missing"} != ${metadata.title ?? "missing"}: ${relativePath}`,
    );
  }

  if (isWarningPage) {
    if (metadata.status !== "archived-or-unverified") {
      failures.push(`Warning page must use archived-or-unverified: ${relativePath}`);
    }
    if (reviewInterval !== 180) {
      failures.push(`Warning page must use review_interval_days 180: ${relativePath}`);
    }
  } else {
    if (!activeStatuses.has(metadata.status)) {
      failures.push(`Active category has non-active status ${metadata.status}: ${relativePath}`);
    }
    if (metadata.status === "candidate-unverified" && reviewInterval !== 180) {
      failures.push(`Candidate page must use review_interval_days 180: ${relativePath}`);
    }
    if (["current", "stale"].includes(metadata.status) && ![30, 90].includes(reviewInterval)) {
      failures.push(`${metadata.status} page must use review_interval_days 30 or 90: ${relativePath}`);
    }
    if (!metadata.region) failures.push(`Missing region: ${relativePath}`);
    if (!metadata.evidence) failures.push(`Missing evidence: ${relativePath}`);
    if (
      ["current", "stale"].includes(metadata.status) &&
      !["A", "B"].includes(metadata.evidence)
    ) {
      failures.push(`${metadata.status} page must use evidence A or B: ${relativePath}`);
    }
    if (metadata.status === "candidate-unverified" && metadata.evidence !== "C") {
      failures.push(`Candidate page must use evidence C: ${relativePath}`);
    }
    if (metadata.status === "candidate-unverified" && !markdown.includes("证据警示")) {
      failures.push(`Candidate page is missing evidence warning: ${relativePath}`);
    }
    if (metadata.status === "stale") {
      const expectedWarning = `> **复核警示：** 本页已超过复核周期。以下内容最后核验于 ${metadata.last_verified}；在完成主管机关复核前，不应视为当前开放规则。`;
      if (!markdown.includes(expectedWarning)) {
        failures.push(`Stale page has a missing or non-standard 复核警示: ${relativePath}`);
      }
      const staleStatuses = bulletValues(markdown, "当前状态");
      const expectedStatus = `待复核（最后核验：${metadata.last_verified}；原记录：开放）`;
      if (staleStatuses.some((value) => value !== expectedStatus)) {
        failures.push(`Stale page has a non-standard 当前状态 value: ${relativePath}`);
      }
    } else if (markdown.includes("> **复核警示：**")) {
      failures.push(`Non-stale page retains a stale 复核警示: ${relativePath}`);
    }
    if (
      metadata.status === "current" &&
      bulletValues(markdown, "当前状态").some((value) => value.startsWith("待复核（"))
    ) {
      failures.push(`Current page retains a 待复核 当前状态 value: ${relativePath}`);
    }

    const activeFields = [
      "当前状态",
      "最低门槛或收入",
      "资金或收入性质",
      "首次身份与期限",
      "居住与续签",
      "当地工作",
      "家属",
      "永居或入籍路径",
      "税务提示",
      "关键限制与变化",
      "证据等级",
      "主要来源",
      "本条核验日期",
    ];
    const programCount = bulletValues(markdown, "当前状态").length;
    if (!programCount) failures.push(`Active page has no program block: ${relativePath}`);
    for (const field of activeFields) {
      if (bulletValues(markdown, field).length !== programCount) {
        failures.push(
          `Active page ${field} count does not match ${programCount} program blocks: ${relativePath}`,
        );
      }
    }
    if (!/^## 纠错与更新$/m.test(markdown)) {
      failures.push(`Active page is missing 纠错与更新 section: ${relativePath}`);
    }
  }

  const visibleDates = [
    ...bulletValues(markdown, "本条核验日期"),
    ...bulletValues(markdown, "核验日期"),
  ];
  if (!visibleDates.length) {
    failures.push(`Missing visible verification date: ${relativePath}`);
  }
  for (const visibleDate of visibleDates) {
    if (visibleDate !== metadata.last_verified) {
      failures.push(
        `Verification date mismatch ${visibleDate} != ${metadata.last_verified}: ${relativePath}`,
      );
    }
  }

  const visibleEvidence = bulletValues(markdown, "证据等级");
  if (!visibleEvidence.length) failures.push(`Missing visible evidence grade: ${relativePath}`);
  if (!isWarningPage) {
    for (const evidence of visibleEvidence) {
      if (evidence !== metadata.evidence) {
        failures.push(
          `Evidence mismatch ${evidence} != ${metadata.evidence ?? "missing"}: ${relativePath}`,
        );
      }
    }
  }

  const sources = bulletValues(markdown, "主要来源");
  if (!sources.length || sources.some((source) => !/https?:\/\//.test(source))) {
    failures.push(`Missing source URL on a 主要来源 line: ${relativePath}`);
  }

  if (isWarningPage) {
    const warningFields = [
      "当前状态",
      "关键变化",
      "为什么不能按有效项目处理",
      "证据等级",
      "主要来源",
      "核验日期",
    ];
    const programCount = bulletValues(markdown, "当前状态").length;
    if (!programCount) failures.push(`Warning page has no program block: ${relativePath}`);
    for (const field of warningFields) {
      if (bulletValues(markdown, field).length !== programCount) {
        failures.push(
          `Warning page ${field} count does not match ${programCount} program blocks: ${relativePath}`,
        );
      }
    }
  }
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      if (forbiddenExtensions.has(path.extname(entry.name).toLowerCase())) {
        failures.push(`Forbidden artifact: ${path.relative(root, full)}`);
      }
      if (
        entry.name === "LICENSE" ||
        scannedTextExtensions.has(path.extname(entry.name).toLowerCase())
      ) {
        const text = await fs.readFile(full, "utf8");
        for (const pattern of forbiddenText) {
          if (pattern.test(text)) {
            failures.push(
              `Forbidden or private marker ${pattern} in ${path.relative(root, full)}`,
            );
          }
        }
        if (entry.name.endsWith(".md")) {
          for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
            const target = match[1].trim();
            if (/^(https?:|mailto:|#)/i.test(target)) continue;
            const cleanTarget = target.split(/[?#]/, 1)[0];
            const resolved = path.resolve(path.dirname(full), cleanTarget);
            try {
              const stat = await fs.stat(resolved);
              if (stat.isDirectory()) {
                await fs.access(path.join(resolved, "README.md"));
              }
            } catch {
              failures.push(
                `Broken relative link ${target} in ${path.relative(root, full)}`,
              );
            }
          }
        }
      }
    }
  }
}

for (const relativePath of requiredGovernanceFiles) {
  try {
    await fs.access(path.join(root, relativePath));
  } catch {
    failures.push(`Missing governance file: ${relativePath}`);
  }
}

for (const [directory, expectedCategory] of categories) {
  const categoryPath = path.join(root, directory);
  try {
    const entries = await fs.readdir(categoryPath, { withFileTypes: true });
    if (!entries.some((entry) => entry.isFile() && entry.name === "README.md")) {
      failures.push(`Missing category README: ${directory}`);
    }
    for (const entry of entries.filter((item) => item.isDirectory())) {
      const readme = path.join(categoryPath, entry.name, "README.md");
      try {
        const markdown = await fs.readFile(readme, "utf8");
        countryPages += 1;
        validateCountryPage(directory, expectedCategory, readme, markdown);
      } catch {
        failures.push(`Missing country README: ${path.relative(root, readme)}`);
      }
    }
  } catch {
    failures.push(`Missing category directory: ${directory}`);
  }
}

await walk(root);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Validation passed as of ${validationDate}: ${countryPages} country pages; metadata, links, governance files, and public-artifact rules are consistent.`,
);
