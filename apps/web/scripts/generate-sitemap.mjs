import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const routesFile = path.resolve(projectRoot, "src/router/routes.ts");
const casesFile = path.resolve(projectRoot, "src/data/casesContent.ts");
const sitemapFile = path.resolve(projectRoot, "public/sitemap.xml");
const robotsFile = path.resolve(projectRoot, "public/robots.txt");

const DEFAULT_SITE_ORIGIN = "https://lingxiforge.com";
const SITE_ORIGIN = resolveSiteOrigin(
  process.env.VITE_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_ORIGIN
);
const TODAY = new Date().toISOString().slice(0, 10);

const EXCLUDED_PATHS = new Set([
  "/login",
  "/register",
  "/search",
  "/details",
  "/test",
  "/404",
]);

const HINTS = new Map([
  ["/", { changefreq: "weekly", priority: "1.0" }],
  ["/product", { changefreq: "monthly", priority: "0.9" }],
  ["/workflow", { changefreq: "monthly", priority: "0.9" }],
  ["/showcase", { changefreq: "monthly", priority: "0.9" }],
  ["/cases", { changefreq: "weekly", priority: "0.9" }],
  ["/gallery", { changefreq: "monthly", priority: "0.8" }],
  ["/materials", { changefreq: "monthly", priority: "0.8" }],
  ["/partners", { changefreq: "monthly", priority: "0.8" }],
  ["/resources", { changefreq: "weekly", priority: "0.8" }],
  ["/newsroom", { changefreq: "weekly", priority: "0.7" }],
  ["/about", { changefreq: "monthly", priority: "0.7" }],
  ["/apply", { changefreq: "monthly", priority: "0.7" }],
  ["/pricing", { changefreq: "monthly", priority: "0.7" }],
  ["/faqs", { changefreq: "monthly", priority: "0.7" }],
  ["/trust", { changefreq: "monthly", priority: "0.7" }],
  ["/ip", { changefreq: "monthly", priority: "0.6" }],
  ["/contact", { changefreq: "monthly", priority: "0.7" }],
  ["/accessibility", { changefreq: "yearly", priority: "0.3" }],
  ["/privacy", { changefreq: "yearly", priority: "0.3" }],
  ["/terms", { changefreq: "yearly", priority: "0.3" }],
  ["/cookies", { changefreq: "yearly", priority: "0.3" }],
]);

const readString = (node) => {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text.trim();
  }
  return null;
};

const objectProp = (node, key) =>
  node.properties.find((prop) => {
    if (!ts.isPropertyAssignment(prop)) return false;
    if (ts.isIdentifier(prop.name)) return prop.name.text === key;
    if (ts.isStringLiteral(prop.name)) return prop.name.text === key;
    return false;
  });

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

function resolveSiteOrigin(raw) {
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

function parseSource(filePath) {
  return fs.readFile(filePath, "utf8").then((content) =>
    ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  );
}

async function extractRoutes() {
  const source = await parseSource(routesFile);
  const records = [];
  let routesArray = null;

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    node.declarationList.declarations.forEach((decl) => {
      if (!ts.isIdentifier(decl.name)) return;
      if (decl.name.text !== "constantRoute") return;
      if (decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
        routesArray = decl.initializer;
      }
    });
  });

  if (!routesArray) {
    throw new Error("Unable to locate constantRoute in routes.ts");
  }

  const walk = (arrayNode, inheritedNoindex = false) => {
    arrayNode.elements.forEach((entry) => {
      if (!ts.isObjectLiteralExpression(entry)) return;

      const pathNode = objectProp(entry, "path");
      const routePath = pathNode ? readString(pathNode.initializer) : null;
      const redirect = Boolean(objectProp(entry, "redirect"));
      const component = Boolean(objectProp(entry, "component"));

      let noindex = inheritedNoindex;
      const metaNode = objectProp(entry, "meta");
      if (metaNode && ts.isObjectLiteralExpression(metaNode.initializer)) {
        const robotsNode = objectProp(metaNode.initializer, "robots");
        const robots = robotsNode ? readString(robotsNode.initializer) : null;
        if (robots && robots.toLowerCase().includes("noindex")) {
          noindex = true;
        }
      }

      if (routePath) {
        records.push({
          path: normalizePath(routePath),
          noindex,
          redirect,
          component,
        });
      }

      const childrenNode = objectProp(entry, "children");
      if (childrenNode && ts.isArrayLiteralExpression(childrenNode.initializer)) {
        walk(childrenNode.initializer, noindex);
      }
    });
  };

  walk(routesArray, false);
  return records;
}

async function extractCaseSlugs() {
  const source = await parseSource(casesFile);
  const slugs = [];
  let casesArray = null;

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    node.declarationList.declarations.forEach((decl) => {
      if (!ts.isIdentifier(decl.name)) return;
      if (decl.name.text !== "cases") return;
      if (decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
        casesArray = decl.initializer;
      }
    });
  });

  if (!casesArray) {
    throw new Error("Unable to locate cases array in casesContent.ts");
  }

  casesArray.elements.forEach((entry) => {
    if (!ts.isObjectLiteralExpression(entry)) return;
    const slugNode = objectProp(entry, "slug");
    const slug = slugNode ? readString(slugNode.initializer) : null;
    if (slug) slugs.push(slug);
  });

  return slugs;
}

function isIndexableRoute(record) {
  if (!record.path || !record.path.startsWith("/")) return false;
  if (record.noindex) return false;
  if (record.path.includes(":") || record.path.includes("*")) return false;
  if (record.redirect && !record.component) return false;
  if (EXCLUDED_PATHS.has(record.path)) return false;
  if (record.path.startsWith("/home")) return false;
  if (record.path.startsWith("/workbench")) return false;
  if (record.path.startsWith("/usercenter")) return false;
  return true;
}

function hintFor(pathname) {
  if (pathname.startsWith("/cases/")) {
    return { changefreq: "monthly", priority: "0.8" };
  }
  return HINTS.get(pathname) || { changefreq: "monthly", priority: "0.7" };
}

const xmlEscape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

function buildSitemap(paths) {
  const urls = paths
    .map((pathname) => {
      const { changefreq, priority } = hintFor(pathname);
      const loc = new URL(pathname, `${SITE_ORIGIN}/`).toString();
      return [
        "  <url>",
        `    <loc>${xmlEscape(loc)}</loc>`,
        `    <lastmod>${TODAY}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    "# Login / internal pages",
    "Disallow: /login",
    "Disallow: /register",
    "Disallow: /search",
    "Disallow: /details",
    "Disallow: /home/",
    "Disallow: /workbench/",
    "Disallow: /usercenter/",
    "Disallow: /test",
    "Disallow: /404",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}

async function main() {
  const [routes, caseSlugs] = await Promise.all([extractRoutes(), extractCaseSlugs()]);
  const output = new Set(routes.filter(isIndexableRoute).map((item) => item.path));

  caseSlugs.forEach((slug) => output.add(`/cases/${slug}`));

  const sorted = [...output].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b, "zh-CN");
  });

  await fs.writeFile(sitemapFile, buildSitemap(sorted), "utf8");
  await fs.writeFile(robotsFile, buildRobots(), "utf8");

  console.log(
    `[seo:sitemap] wrote ${sorted.length} URLs to ${path.relative(projectRoot, sitemapFile)}`
  );
  console.log(
    `[seo:sitemap] wrote robots to ${path.relative(projectRoot, robotsFile)}`
  );
}

main().catch((error) => {
  console.error("[seo:sitemap] failed:", error);
  process.exitCode = 1;
});
