import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");
const distIndexFile = path.resolve(distDir, "index.html");

const BUDGETS = {
  entryJsMaxKb: 180,
  appCssMaxKb: 70,
  vendorCssMaxKb: 230,
  totalInitialMaxKb: 420,
};

const toKb = (bytes) => bytes / 1024;

const readSize = async (relativePath) => {
  const resolved = path.resolve(distDir, relativePath.replace(/^\//, ""));
  const stat = await fs.stat(resolved);
  return stat.size;
};

const parseInitialAssets = (html) => {
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  const styles = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  return {
    scripts: scripts.filter((src) => src.startsWith("/assets/")),
    styles: styles.filter((href) => href.startsWith("/assets/")),
  };
};

async function main() {
  const html = await fs.readFile(distIndexFile, "utf8");
  const { scripts, styles } = parseInitialAssets(html);

  if (!scripts.length) {
    throw new Error("No entry scripts found in dist/index.html");
  }

  const [entryScript] = scripts;

  const entryJsSize = await readSize(entryScript);
  const styleSizeList = await Promise.all(
    styles.map(async (href) => ({ href, size: await readSize(href) }))
  );
  const vendorCssSize = styleSizeList
    .filter((item) => item.href.includes("vendor-element"))
    .reduce((sum, item) => sum + item.size, 0);
  const appCssSize = styleSizeList
    .filter((item) => !item.href.includes("vendor-element"))
    .reduce((sum, item) => sum + item.size, 0);
  const totalInitialSize = entryJsSize + vendorCssSize + appCssSize;

  const lines = [
    `[perf:budget] entry js: ${toKb(entryJsSize).toFixed(2)} kB (<= ${BUDGETS.entryJsMaxKb} kB)`,
    `[perf:budget] app css: ${toKb(appCssSize).toFixed(2)} kB (<= ${BUDGETS.appCssMaxKb} kB)`,
    `[perf:budget] vendor css: ${toKb(vendorCssSize).toFixed(2)} kB (<= ${BUDGETS.vendorCssMaxKb} kB)`,
    `[perf:budget] initial total: ${toKb(totalInitialSize).toFixed(2)} kB (<= ${BUDGETS.totalInitialMaxKb} kB)`,
  ];

  const errors = [];
  if (toKb(entryJsSize) > BUDGETS.entryJsMaxKb) {
    errors.push(`entry js exceeded budget: ${entryScript}`);
  }
  if (toKb(appCssSize) > BUDGETS.appCssMaxKb) {
    errors.push("app css exceeded budget");
  }
  if (toKb(vendorCssSize) > BUDGETS.vendorCssMaxKb) {
    errors.push("vendor css exceeded budget");
  }
  if (toKb(totalInitialSize) > BUDGETS.totalInitialMaxKb) {
    errors.push("total initial payload exceeded budget");
  }

  lines.forEach((line) => console.log(line));

  if (errors.length) {
    console.error("[perf:budget] failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("[perf:budget] passed");
}

main().catch((error) => {
  console.error("[perf:budget] failed:", error);
  process.exitCode = 1;
});
