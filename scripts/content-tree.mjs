import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export const categoryDefinitions = [
  {
    directory: "citizenship-by-investment",
    category: "投资入籍",
    navigationLabel: "投资入籍",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "investment-permanent-residence",
    category: "投资永居",
    navigationLabel: "投资永居",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "investment-residence",
    category: "投资居留",
    navigationLabel: "投资居留",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "entrepreneur-business-residence",
    category: "创业与经营居留",
    navigationLabel: "创业与经营居留",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "study-student-residence",
    category: "留学与学生居留",
    navigationLabel: "留学与学生居留",
    levels: ["country", "route"],
    schema: "study",
  },
  {
    directory: "digital-nomad-remote-work",
    category: "数字游民与远程工作",
    navigationLabel: "数字游民与远程工作",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "visitor-financial-remote",
    category: "访客或财力型远程工作",
    navigationLabel: "访客或财力型远程工作",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "passive-income-retirement",
    category: "被动收入与退休居留",
    navigationLabel: "被动收入与退休居留",
    levels: ["country"],
    schema: "mobility",
  },
  {
    directory: "closed-paused-unverified",
    category: "停办、暂停与待核",
    navigationLabel: "停办、暂停、被替代与待核项目",
    levels: ["country"],
    schema: "mobility",
  },
];

export function directoryLinks(markdown) {
  const links = [];
  const pattern = /^- \[([^\]]+)\]\(\.\/([^/)]+)\/(?:README\.md)?\)$/gm;
  for (const match of markdown.matchAll(pattern)) {
    links.push({ label: match[1], slug: match[2] });
  }
  return links;
}

function sameSortedValues(left, right) {
  return JSON.stringify([...left].sort()) === JSON.stringify([...right].sort());
}

async function childDirectoryNames(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function requireDirectChildren(links, indexPath) {
  if (!links.length) {
    throw new Error(`${indexPath} must list at least one direct child page.`);
  }
}

async function readLeaf(readmePath, leafDirectory, description) {
  const nestedDirectories = await childDirectoryNames(leafDirectory);
  if (nestedDirectories.length) {
    throw new Error(
      `${description} is a registered leaf and must not contain child directories: ${nestedDirectories.sort().join(", ")}`,
    );
  }
  return readFile(readmePath, "utf8");
}

export async function enumerateCategory(repositoryRoot, definition) {
  const { directory, levels, schema } = definition;
  if (!["mobility", "study"].includes(schema)) {
    throw new Error(`${directory} has an unsupported content schema: ${schema}.`);
  }
  if (![
    JSON.stringify(["country"]),
    JSON.stringify(["country", "route"]),
  ].includes(JSON.stringify(levels))) {
    throw new Error(`${directory} has an unsupported content-tree level definition.`);
  }
  if (
    (schema === "mobility" && levels.length !== 1) ||
    (schema === "study" && levels.length !== 2)
  ) {
    throw new Error(`${directory} has incompatible schema and level definitions.`);
  }

  const categoryDirectory = path.join(repositoryRoot, directory);
  const categoryIndexPath = path.join(categoryDirectory, "README.md");
  const categoryMarkdown = await readFile(categoryIndexPath, "utf8");
  const countryLinks = directoryLinks(categoryMarkdown);
  requireDirectChildren(countryLinks, `${directory}/README.md`);

  const countryDirectories = await childDirectoryNames(categoryDirectory);
  if (!sameSortedValues(countryDirectories, countryLinks.map(({ slug }) => slug))) {
    throw new Error(
      `${directory}/README.md country links do not match its direct child directories.`,
    );
  }

  const countries = [];
  const leaves = [];
  for (const { label: countryLabel, slug: countrySlug } of countryLinks) {
    const countryDirectory = path.join(categoryDirectory, countrySlug);
    const countryIndexPath = path.join(countryDirectory, "README.md");

    if (levels.length === 1) {
      const markdown = await readLeaf(
        countryIndexPath,
        countryDirectory,
        `${directory}/${countrySlug}/README.md`,
      );
      const leaf = {
        kind: "country",
        countryLabel,
        countrySlug,
        label: countryLabel,
        slug: countrySlug,
        readmePath: countryIndexPath,
        markdown,
      };
      countries.push({
        label: countryLabel,
        slug: countrySlug,
        indexPath: countryIndexPath,
        markdown,
        routes: [],
      });
      leaves.push(leaf);
      continue;
    }

    const countryMarkdown = await readFile(countryIndexPath, "utf8");
    const routeLinks = directoryLinks(countryMarkdown);
    requireDirectChildren(
      routeLinks,
      `${directory}/${countrySlug}/README.md`,
    );
    const routeDirectories = await childDirectoryNames(countryDirectory);
    if (!sameSortedValues(routeDirectories, routeLinks.map(({ slug }) => slug))) {
      throw new Error(
        `${directory}/${countrySlug}/README.md route links do not match its direct child directories.`,
      );
    }

    const routes = [];
    for (const { label: routeLabel, slug: routeSlug } of routeLinks) {
      const routeDirectory = path.join(countryDirectory, routeSlug);
      const readmePath = path.join(routeDirectory, "README.md");
      const markdown = await readLeaf(
        readmePath,
        routeDirectory,
        `${directory}/${countrySlug}/${routeSlug}/README.md`,
      );
      const leaf = {
        kind: "route",
        countryLabel,
        countrySlug,
        routeLabel,
        routeSlug,
        label: routeLabel,
        slug: routeSlug,
        readmePath,
        markdown,
      };
      routes.push(leaf);
      leaves.push(leaf);
    }
    countries.push({
      label: countryLabel,
      slug: countrySlug,
      indexPath: countryIndexPath,
      markdown: countryMarkdown,
      routes,
    });
  }

  return {
    definition,
    categoryDirectory,
    categoryIndexPath,
    categoryMarkdown,
    countries,
    leaves,
  };
}
