import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const categoryDirs = ["citizenship-by-investment","investment-permanent-residence","investment-residence","entrepreneur-business-residence","digital-nomad-remote-work","visitor-financial-remote","passive-income-retirement","closed-paused-unverified"];
const forbiddenExtensions = new Set([".xlsx", ".xls", ".csv", ".tsv", ".pdf"]);
const forbiddenText = [/\/Users\//, /Mobile Documents/i, /[?&](ref|affiliate)=/i, /utm_(source|medium|campaign)=/i];
const failures = [];
let countryPages = 0;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      if (forbiddenExtensions.has(path.extname(entry.name).toLowerCase())) failures.push(`Forbidden artifact: ${path.relative(root, full)}`);
      if (entry.name.endsWith(".md") || entry.name === "LICENSE" || entry.name.endsWith(".yml")) {
        const text = await fs.readFile(full, "utf8");
        for (const pattern of forbiddenText) if (pattern.test(text)) failures.push(`Forbidden or private marker ${pattern} in ${path.relative(root, full)}`);
        if (entry.name.endsWith(".md")) {
          for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
            const target = match[1].trim();
            if (/^(https?:|mailto:|#)/i.test(target)) continue;
            const cleanTarget = target.split(/[?#]/, 1)[0];
            const resolved = path.resolve(path.dirname(full), cleanTarget);
            try {
              const stat = await fs.stat(resolved);
              if (stat.isDirectory()) await fs.access(path.join(resolved, "README.md"));
            } catch {
              failures.push(`Broken relative link ${target} in ${path.relative(root, full)}`);
            }
          }
        }
      }
    }
  }
}

for (const dirName of categoryDirs) {
  const categoryPath = path.join(root, dirName);
  try {
    const entries = await fs.readdir(categoryPath, { withFileTypes: true });
    if (!entries.some((entry) => entry.isFile() && entry.name === "README.md")) failures.push(`Missing category README: ${dirName}`);
    for (const entry of entries.filter((item) => item.isDirectory())) {
      const readme = path.join(categoryPath, entry.name, "README.md");
      try {
        const text = await fs.readFile(readme, "utf8");
        countryPages += 1;
        if (!text.includes("last_verified:")) failures.push(`Missing last_verified: ${path.relative(root, readme)}`);
        if (!text.includes("http")) failures.push(`Missing source URL: ${path.relative(root, readme)}`);
      } catch {
        failures.push(`Missing country README: ${path.relative(root, readme)}`);
      }
    }
  } catch {
    failures.push(`Missing category directory: ${dirName}`);
  }
}

await walk(root);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Validation passed: ${countryPages} country/category pages; no forbidden tabular artifacts or private path markers.`);
