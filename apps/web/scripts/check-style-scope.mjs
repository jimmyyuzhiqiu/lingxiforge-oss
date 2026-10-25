import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.resolve(projectRoot, "src");
const distAssetsRoot = path.resolve(projectRoot, "dist/assets");

const SOURCE_EXTENSIONS = new Set([".vue", ".scss", ".css"]);
const SOURCE_RISKY_PATTERN = /:global\(\s*:root\[theme=(?:"dark"|'dark'|dark)\]\s*\)\s+/g;
const ROOT_DARK_BLOCK_PATTERN = /:root\[theme\s*=\s*(?:"dark"|'dark'|dark)\]\{([^}]*)\}/g;
const DANGEROUS_DECLARATION_PATTERN = /(?:^|;)\s*(?:opacity|filter|background(?:-[a-z-]+)?|box-shadow|border-color)\s*:/i;

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkFiles(fullPath);
      return [fullPath];
    })
  );
  return files.flat();
}

function lineNumberFromIndex(source, index) {
  return source.slice(0, index).split("\n").length;
}

async function checkSourcePatterns(errors) {
  const files = await walkFiles(srcRoot);
  const targets = files.filter((file) => SOURCE_EXTENSIONS.has(path.extname(file)));

  for (const file of targets) {
    const content = await fs.readFile(file, "utf8");
    SOURCE_RISKY_PATTERN.lastIndex = 0;
    let match;
    while ((match = SOURCE_RISKY_PATTERN.exec(content))) {
      const line = lineNumberFromIndex(content, match.index);
      errors.push(
        `risky scoped dark selector in ${path.relative(projectRoot, file)}:${line} -> use :global(:root[theme=\"dark\"] .selector) form`
      );
    }
  }
}

async function checkDistRootPollution(errors) {
  let entries;
  try {
    entries = await fs.readdir(distAssetsRoot, { withFileTypes: true });
  } catch {
    errors.push("dist/assets not found; run build before style scope check");
    return;
  }

  const cssFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
    .map((entry) => path.join(distAssetsRoot, entry.name));

  for (const file of cssFiles) {
    const css = await fs.readFile(file, "utf8");
    ROOT_DARK_BLOCK_PATTERN.lastIndex = 0;
    let match;
    while ((match = ROOT_DARK_BLOCK_PATTERN.exec(css))) {
      const blockBody = match[1] || "";
      if (!DANGEROUS_DECLARATION_PATTERN.test(blockBody)) continue;
      const snippet = blockBody.trim().slice(0, 140).replace(/\s+/g, " ");
      errors.push(
        `dist pollution in ${path.relative(projectRoot, file)} -> bare :root[theme=dark]{...} contains dangerous declarations: ${snippet}`
      );
    }
  }
}

async function main() {
  const errors = [];
  await checkSourcePatterns(errors);
  await checkDistRootPollution(errors);

  if (errors.length) {
    console.error("[style:check] failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("[style:check] passed");
}

main().catch((error) => {
  console.error("[style:check] failed:", error);
  process.exitCode = 1;
});
