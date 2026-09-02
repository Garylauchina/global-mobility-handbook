#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";

const siteArgument = process.argv[2];

if (!siteArgument) {
  console.error("Usage: node scripts/validate-search.mjs <built-site-directory>");
  process.exit(2);
}

const siteDirectory = path.resolve(siteArgument);
const searchIndexPath = path.join(
  siteDirectory,
  "search",
  "search_index.json",
);
const wrapperRelativePath = path.join(
  "assets",
  "javascripts",
  "workers",
  "search-query-fix.js",
);
const wrapperPath = path.join(siteDirectory, wrapperRelativePath);

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function findPageConfiguration(html) {
  const match = html.match(
    /<script\b[^>]*\bid=["']__config["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  requireCondition(
    match,
    "Built homepage is missing the Material #__config block.",
  );

  return match[1];
}

function parsePageConfiguration(configurationText) {
  try {
    return JSON.parse(configurationText);
  } catch (error) {
    throw new Error(`Unable to parse Material #__config JSON: ${error.message}`);
  }
}

function normaliseLocation(location) {
  let value = String(location ?? "")
    .split("#", 1)[0]
    .split("?", 1)[0]
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")
    .replace(/index\.html$/, "");

  try {
    value = decodeURIComponent(value);
  } catch {
    // Search locations are normally URI encoded, but an undecodable value can
    // still be displayed in a useful failure report.
  }

  if (value && !value.endsWith("/")) value += "/";
  return value;
}

function flattenResults(items) {
  const flattened = [];
  for (const group of Array.isArray(items) ? items : []) {
    if (Array.isArray(group)) flattened.push(...group);
    else if (group && typeof group === "object") flattened.push(group);
  }

  const seen = new Set();
  return flattened.filter((item) => {
    const location = normaliseLocation(item?.location);
    if (!location || seen.has(location)) return false;
    seen.add(location);
    return true;
  });
}

function describeTopResults(results, limit = 5) {
  if (!results.length) return "(no results)";
  return results
    .slice(0, limit)
    .map(
      (item, index) =>
        `${index + 1}. ${normaliseLocation(item.location)} [${item.title ?? ""}]`,
    )
    .join("; ");
}

async function loadSearchIndex() {
  let parsed;
  try {
    parsed = JSON.parse(await readFile(searchIndexPath, "utf8"));
  } catch (error) {
    throw new Error(
      `Unable to read built search index at ${searchIndexPath}: ${error.message}`,
    );
  }

  requireCondition(
    parsed && typeof parsed.config === "object" && Array.isArray(parsed.docs),
    `Built search index at ${searchIndexPath} does not contain config and docs.`,
  );
  requireCondition(
    parsed.docs.length > 0,
    "Built search index contains no documents.",
  );
  return parsed;
}

async function resolveWorkerLocation() {
  const homepagePath = path.join(siteDirectory, "index.html");
  let homepage;
  try {
    homepage = await readFile(homepagePath, "utf8");
  } catch (error) {
    throw new Error(
      `Unable to read built homepage at ${homepagePath}: ${error.message}`,
    );
  }

  const configurationElement = {
    textContent: findPageConfiguration(homepage),
  };
  const document = {
    baseURI: "https://search.invalid/",
    getElementById(id) {
      return id === "__config" ? configurationElement : null;
    },
  };
  const integrationScripts = [
    ...homepage.matchAll(
      /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
    .map((match) => match[1])
    .filter((source) => source.includes("search-query-fix.js"));
  requireCondition(
    integrationScripts.length > 0,
    "Built homepage is missing the inline search-query-fix integration script.",
  );

  for (const source of integrationScripts) {
    try {
      vm.runInNewContext(
        source,
        { document, JSON, URL },
        { filename: `${path.join(siteDirectory, "index.html")}:search-config` },
      );
    } catch (error) {
      throw new Error(`Inline search worker integration failed: ${error.message}`);
    }
  }

  const configuration = parsePageConfiguration(configurationElement.textContent);
  requireCondition(
    typeof configuration.search === "string" && configuration.search.length > 0,
    "Material #__config does not define a search worker URL.",
  );

  const configuredUrl = new URL(configuration.search, document.baseURI);
  requireCondition(
    configuredUrl.pathname.endsWith(`/${wrapperRelativePath.split(path.sep).join("/")}`),
    `Material #__config does not reference ${wrapperRelativePath}: ${configuration.search}`,
  );

  try {
    const wrapperStats = await stat(wrapperPath);
    requireCondition(
      wrapperStats.isFile(),
      `Search wrapper is not a file: ${wrapperPath}`,
    );
  } catch (error) {
    if (error.message.startsWith("Search wrapper")) throw error;
    throw new Error(
      `Built search wrapper is missing at ${wrapperPath}: ${error.message}`,
    );
  }

  return configuredUrl;
}

function createWorkerHarness(workerLocation) {
  const listeners = new Map();
  const pendingResponses = [];
  const executedScripts = [];
  const scriptUrlStack = [];

  const context = {
    console,
    URL,
    URLSearchParams,
    TextDecoder,
    TextEncoder,
    clearInterval,
    clearTimeout,
    location: workerLocation,
    performance,
    queueMicrotask,
    setInterval,
    setTimeout,
  };

  context.addEventListener = (type, listener) => {
    if (typeof listener !== "function") return;
    const registered = listeners.get(type) ?? [];
    if (!registered.includes(listener)) registered.push(listener);
    listeners.set(type, registered);
  };

  context.removeEventListener = (type, listener) => {
    const registered = listeners.get(type) ?? [];
    listeners.set(
      type,
      registered.filter((candidate) => candidate !== listener),
    );
  };

  context.postMessage = (message) => {
    const pendingIndex = pendingResponses.findIndex(
      ({ expectedType }) => message?.type === expectedType,
    );
    if (pendingIndex === -1) return;
    const [pending] = pendingResponses.splice(pendingIndex, 1);
    clearTimeout(pending.timer);
    pending.resolve(message);
  };

  context.self = context;
  context.globalThis = context;
  const vmContext = vm.createContext(context);

  function localPathForUrl(scriptUrl) {
    requireCondition(
      scriptUrl.origin === "https://search.invalid",
      `Search worker attempted to import an unexpected origin: ${scriptUrl.href}`,
    );
    const relativePath = decodeURIComponent(scriptUrl.pathname).replace(
      /^\/+/,
      "",
    );
    const localPath = path.resolve(siteDirectory, relativePath);
    const relativeToSite = path.relative(siteDirectory, localPath);
    requireCondition(
      relativeToSite && !relativeToSite.startsWith("..") && !path.isAbsolute(relativeToSite),
      `Search worker import escapes the built site directory: ${scriptUrl.href}`,
    );
    return { localPath, relativeToSite };
  }

  function executeScript(scriptUrl) {
    const { localPath, relativeToSite } = localPathForUrl(scriptUrl);
    let source;
    try {
      source = readFileSync(localPath, "utf8");
    } catch (error) {
      throw new Error(
        `Unable to load worker dependency ${relativeToSite}: ${error.message}`,
      );
    }

    executedScripts.push(relativeToSite.split(path.sep).join("/"));
    scriptUrlStack.push(scriptUrl);
    try {
      vm.runInContext(source, vmContext, {
        filename: localPath,
        timeout: 15_000,
      });
    } finally {
      scriptUrlStack.pop();
    }
  }

  context.importScripts = (...specifiers) => {
    const importer = scriptUrlStack.at(-1) ?? workerLocation;
    for (const specifier of specifiers) {
      executeScript(new URL(String(specifier), importer));
    }
  };

  function request(message, expectedType) {
    return new Promise((resolve, reject) => {
      let timer;
      const fail = (error) => {
        const index = pendingResponses.findIndex(
          (pending) => pending.resolve === resolve,
        );
        if (index !== -1) pendingResponses.splice(index, 1);
        clearTimeout(timer);
        reject(error);
      };
      timer = setTimeout(() => {
        fail(
          new Error(
            `Timed out waiting for search worker response type ${expectedType}.`,
          ),
        );
      }, 30_000);

      pendingResponses.push({ expectedType, reject, resolve, timer });

      const event = {
        currentTarget: context,
        data: message,
        defaultPrevented: false,
        target: context,
        type: "message",
      };
      let stopImmediately = false;
      event.preventDefault = () => {
        event.defaultPrevented = true;
      };
      event.stopImmediatePropagation = () => {
        stopImmediately = true;
      };
      event.stopPropagation = () => {};

      const registered = [...(listeners.get("message") ?? [])];
      if (
        typeof context.onmessage === "function" &&
        !registered.includes(context.onmessage)
      ) {
        registered.push(context.onmessage);
      }

      if (!registered.length) {
        fail(new Error("Search worker registered no message handler."));
        return;
      }

      for (const listener of registered) {
        if (stopImmediately) break;
        try {
          Promise.resolve(listener.call(context, event)).catch(fail);
        } catch (error) {
          fail(error);
          break;
        }
      }
    });
  }

  executeScript(workerLocation);
  return { executedScripts, request };
}

function assertCountryResult(query, results, countrySlug, targetPrefix) {
  const normalisedTarget = normaliseLocation(targetPrefix);
  const rank = results.findIndex((item) =>
    normaliseLocation(item.location).startsWith(normalisedTarget),
  );
  requireCondition(
    rank !== -1 && rank <= 4,
    `Query ${JSON.stringify(query)} did not place a ${normalisedTarget} page in the top 5. Top results: ${describeTopResults(
      results,
    )}`,
  );
  const firstLocation = normaliseLocation(results[0]?.location);
  requireCondition(
    firstLocation.split("/")[1] === countrySlug,
    `Query ${JSON.stringify(query)} did not place a ${countrySlug} country page first. Top results: ${describeTopResults(
      results,
    )}`,
  );
  return {
    location: normaliseLocation(results[rank].location),
    rank: rank + 1,
  };
}

async function main() {
  const searchIndex = await loadSearchIndex();
  const workerLocation = await resolveWorkerLocation();
  const harness = createWorkerHarness(workerLocation);

  const setupResponse = await harness.request(
    {
      type: 0,
      data: {
        ...searchIndex,
        options: { suggest: true },
      },
    },
    1,
  );
  requireCondition(
    setupResponse?.type === 1,
    "Search worker setup did not complete.",
  );

  const wrapperScript = wrapperRelativePath.split(path.sep).join("/");
  requireCondition(
    harness.executedScripts.includes(wrapperScript),
    `Search wrapper was not executed: ${wrapperScript}`,
  );
  requireCondition(
    harness.executedScripts.some(
      (script) =>
        script !== wrapperScript &&
        /^assets\/javascripts\/workers\/search\..+\.js$/.test(script),
    ),
    `Material upstream search worker was not executed. Loaded scripts: ${harness.executedScripts.join(
      ", ",
    )}`,
  );

  const countries = [
    { chinese: "新加坡", english: "Singapore", slug: "singapore" },
    { chinese: "日本", english: "Japan", slug: "japan" },
    { chinese: "法国", english: "France", slug: "france" },
    { chinese: "德国", english: "Germany", slug: "germany" },
    { chinese: "瑞士", english: "Switzerland", slug: "switzerland" },
  ];

  for (const country of countries) {
    const targetPrefix = `study-student-residence/${country.slug}/`;
    for (const query of [country.chinese, country.english]) {
      const response = await harness.request(
        { type: 2, data: query, options: { suggest: true } },
        3,
      );
      const results = flattenResults(response?.data?.items);
      const match = assertCountryResult(
        query,
        results,
        country.slug,
        targetPrefix,
      );
      console.log(
        `Search ${JSON.stringify(query)} -> ${match.location} (rank ${match.rank})`,
      );
    }
  }

  const universityResponse = await harness.request(
    { type: 2, data: "university", options: { suggest: true } },
    3,
  );
  const universityResults = flattenResults(universityResponse?.data?.items);
  const universityRank = universityResults.findIndex((item) =>
    /^study-student-residence\/[^/]+\/university\/$/.test(
      normaliseLocation(item.location),
    ),
  );
  requireCondition(
    universityRank !== -1 && universityRank <= 4,
    `Query "university" did not place a university study route in the top 5 results. Top results: ${describeTopResults(
      universityResults,
    )}`,
  );
  console.log(
    `Search "university" -> ${normaliseLocation(
      universityResults[universityRank].location,
    )} (rank ${universityRank + 1})`,
  );

  console.log(
    `Search regression validation passed (${searchIndex.docs.length} indexed documents; ${harness.executedScripts.length} worker scripts executed).`,
  );
}

try {
  await main();
} catch (error) {
  console.error(`Search regression validation failed: ${error.message}`);
  process.exitCode = 1;
}
