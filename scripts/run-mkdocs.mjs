#!/usr/bin/env node

import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const command = process.argv[2];

if (!command || !["build", "serve"].includes(command)) {
  console.error("Usage: node scripts/run-mkdocs.mjs <build|serve> [mkdocs arguments]");
  process.exit(2);
}

const temporaryDirectory = await mkdtemp(
  path.join(os.tmpdir(), "global-mobility-mkdocs-"),
);
const temporaryConfig = path.join(temporaryDirectory, "mkdocs.yml");

try {
  const sourceConfig = await readFile(
    path.join(repositoryRoot, "mkdocs.yml"),
    "utf8",
  );
  const absoluteDocsDirectory = JSON.stringify(repositoryRoot);
  const preparedConfig = sourceConfig
    .replace('docs_dir: "."', `docs_dir: ${absoluteDocsDirectory}`)
    .replace(
      'custom_dir: "site-overrides"',
      `custom_dir: ${JSON.stringify(path.join(repositoryRoot, "site-overrides"))}`,
    )
    .replace(
      '  - "scripts/mkdocs_search_aliases.py"',
      `  - ${JSON.stringify(
        path.join(repositoryRoot, "scripts/mkdocs_search_aliases.py"),
      )}`,
    )
    .replace(
      'jieba_dict_user: "assets/search/jieba-user.txt"',
      `jieba_dict_user: ${JSON.stringify(
        path.join(repositoryRoot, "assets/search/jieba-user.txt"),
      )}`,
    );

  if (
    preparedConfig === sourceConfig ||
    preparedConfig.includes('  - "scripts/mkdocs_search_aliases.py"')
  ) {
    throw new Error("mkdocs.yml 中缺少预期的可移植路径配置。");
  }

  await writeFile(temporaryConfig, preparedConfig, "utf8");

  const executable = process.env.MKDOCS_BIN || "mkdocs";
  const result = spawnSync(
    executable,
    [command, "--config-file", temporaryConfig, ...process.argv.slice(3)],
    {
      cwd: repositoryRoot,
      env: process.env,
      stdio: "inherit",
    },
  );

  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
