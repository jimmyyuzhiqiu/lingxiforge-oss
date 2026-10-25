import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const sitemapFile = path.resolve(projectRoot, "public/sitemap.xml");
const duplicateSitemapFile = path.resolve(projectRoot, "public/sitemap 2.xml");
const robotsFile = path.resolve(projectRoot, "public/robots.txt");
const routerFile = path.resolve(projectRoot, "src/router/index.ts");
const sourceIndexFile = path.resolve(projectRoot, "index.html");
const distIndexFile = path.resolve(projectRoot, "dist/index.html");
const distDir = path.resolve(projectRoot, "dist");
const distAssetsDir = path.resolve(distDir, "assets");
const DUPLICATE_SUFFIX_PATTERN = /\s+\d+(?=\.[^.]+$)/;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function fail(errors, message) {
  errors.push(message);
}

function validateSitemap(xml, errors) {
  if (!xml.includes("<urlset") || !xml.includes("</urlset>")) {
    fail(errors, "sitemap.xml missing <urlset> wrapper");
  }

  const openUrl = (xml.match(/<url>/g) || []).length;
  const closeUrl = (xml.match(/<\/url>/g) || []).length;
  if (openUrl === 0) {
    fail(errors, "sitemap.xml contains no <url> entries");
  }
  if (openUrl !== closeUrl) {
    fail(errors, "sitemap.xml has unbalanced <url> tags");
  }

  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  blocks.forEach((block, index) => {
    if (!/<loc>https?:\/\/[^<]+<\/loc>/.test(block)) {
      fail(errors, `sitemap.xml entry #${index + 1} missing absolute <loc>`);
    }
  });
}

function validateRobots(robots, errors) {
  const sitemapLines = robots
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("Sitemap:"));

  if (sitemapLines.length !== 1) {
    fail(errors, `robots.txt should contain exactly one Sitemap line, found ${sitemapLines.length}`);
    return;
  }

  if (!/\/sitemap\.xml$/i.test(sitemapLines[0])) {
    fail(errors, "robots.txt Sitemap line must end with /sitemap.xml");
  }
}

function validateRouter(routerContent, errors) {
  if (!routerContent.includes("import.meta.env.VITE_SITE_URL")) {
    fail(errors, "router/index.ts missing VITE_SITE_URL origin support");
  }
  if (!routerContent.includes("window.location.origin")) {
    fail(errors, "router/index.ts missing window.location.origin fallback");
  }
  if (!routerContent.includes("upsertMeta(\"name\", \"twitter:url\"")) {
    fail(errors, "router/index.ts missing twitter:url meta update");
  }
  if (!routerContent.includes("upsertMeta(\"name\", \"twitter:image:alt\"")) {
    fail(errors, "router/index.ts missing twitter:image:alt meta update");
  }
  if (!routerContent.includes("upsertAlternateLinks(")) {
    fail(errors, "router/index.ts missing hreflang alternate link updates");
  }
}

function validateCanonicalAndHreflang(html, errors, label) {
  const canonicalMatches = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) || [];
  if (canonicalMatches.length !== 1) {
    fail(errors, `${label} should contain exactly one canonical link, found ${canonicalMatches.length}`);
  }

  const hasZh = /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']zh-CN["'][^>]*>/i.test(html);
  const hasDefault = /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']x-default["'][^>]*>/i.test(html);
  if (!hasZh || !hasDefault) {
    fail(errors, `${label} missing required hreflang alternates (zh-CN and x-default)`);
  }

  if (!/<meta[^>]+name=["']twitter:image:alt["'][^>]*>/i.test(html)) {
    fail(errors, `${label} missing twitter:image:alt`);
  }
}

function validateNoscriptFallback(html, errors, label) {
  const hasNoscript = /<noscript>[\s\S]*?<\/noscript>/i.test(html);
  if (!hasNoscript) {
    fail(errors, `${label} missing <noscript> fallback block`);
    return;
  }

  if (!/<noscript>[\s\S]*?<h1[^>]*>[^<]+<\/h1>[\s\S]*?<\/noscript>/i.test(html)) {
    fail(errors, `${label} noscript fallback should include a semantic H1`);
  }

  const hasCoreLinks =
    /<noscript>[\s\S]*?<a[^>]+href=["']\/product["'][^>]*>/i.test(html) &&
    /<noscript>[\s\S]*?<a[^>]+href=["']\/contact["'][^>]*>/i.test(html);
  if (!hasCoreLinks) {
    fail(errors, `${label} noscript fallback should expose core navigation links`);
  }
}

async function validateDist(errors) {
  const sourceHtml = await fs.readFile(sourceIndexFile, "utf8");
  validateCanonicalAndHreflang(sourceHtml, errors, "index.html");
  validateNoscriptFallback(sourceHtml, errors, "index.html");

  if (!(await exists(distIndexFile))) return;
  const html = await fs.readFile(distIndexFile, "utf8");
  validateCanonicalAndHreflang(html, errors, "dist/index.html");
  // Home prerender is optional; only validate text when prerender markup is present.
  if (
    html.includes("data-prerender-home") &&
    !html.includes("让深藏的文明，在指尖重现")
  ) {
    fail(errors, "dist/index.html prerender marker exists but homepage H1 text is missing");
  }
}

async function collectDuplicateSuffixFilesRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => collectDuplicateSuffixFilesRecursive(path.join(dir, entry.name)))
  );

  const local = entries
    .filter((entry) => entry.isFile() && DUPLICATE_SUFFIX_PATTERN.test(entry.name))
    .map((entry) => path.relative(distDir, path.join(dir, entry.name)));

  return [...local, ...nested.flat()];
}

async function validateDistDuplicates(errors) {
  if (!(await exists(distDir))) return;
  const topLevelEntries = await fs.readdir(distDir, { withFileTypes: true });
  const topLevelDuplicateNames = topLevelEntries
    .filter((entry) => entry.isFile() && DUPLICATE_SUFFIX_PATTERN.test(entry.name))
    .map((entry) => entry.name);

  const assetDuplicateNames = (await exists(distAssetsDir))
    ? await collectDuplicateSuffixFilesRecursive(distAssetsDir)
    : [];

  const duplicateNames = [...topLevelDuplicateNames, ...assetDuplicateNames].sort((a, b) =>
    a.localeCompare(b, "en")
  );

  if (duplicateNames.length) {
    fail(
      errors,
      `dist contains duplicate-suffixed files: ${duplicateNames.join(", ")}`
    );
  }
}

async function main() {
  const errors = [];

  const [sitemap, robots, routerContent] = await Promise.all([
    fs.readFile(sitemapFile, "utf8"),
    fs.readFile(robotsFile, "utf8"),
    fs.readFile(routerFile, "utf8"),
  ]);

  validateSitemap(sitemap, errors);
  validateRobots(robots, errors);
  validateRouter(routerContent, errors);

  if (await exists(duplicateSitemapFile)) {
    fail(errors, "duplicate sitemap file exists: public/sitemap 2.xml");
  }

  await validateDist(errors);
  await validateDistDuplicates(errors);

  if (errors.length) {
    console.error("[seo:check] failed:");
    errors.forEach((message) => console.error(`- ${message}`));
    process.exitCode = 1;
    return;
  }

  console.log("[seo:check] passed");
}

main().catch((error) => {
  console.error("[seo:check] failed:", error);
  process.exitCode = 1;
});
