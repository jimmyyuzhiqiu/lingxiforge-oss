import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

if (path.basename(distDir) !== "dist") {
  throw new Error(`[clean:dist] refusing to operate on unexpected directory: ${distDir}`);
}
const distAssetsDir = path.resolve(distDir, "assets");

const TOP_LEVEL_GENERATED = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "vite.svg",
  "og-cover.svg",
  "brand2.png",
  "test.html",
];

const STATIC_COPY_DIRS = [
  "ai",
  "draco",
  "models",
  "resources",
  "showcase",
  "stock",
];

const DUPLICATE_SUFFIX_PATTERN = /\s+\d+(?=\.[^.]+$)/;

async function safeRemove(target) {
  try {
    await fs.rm(target, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 120,
    });
  } catch {
    // keep build resilient: skip unrecoverable leftovers instead of hard failing
  }
}

async function collectDuplicateSuffixFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => collectDuplicateSuffixFiles(path.join(dir, entry.name)))
  );

  const local = entries
    .filter((entry) => entry.isFile() && DUPLICATE_SUFFIX_PATTERN.test(entry.name))
    .map((entry) => path.join(dir, entry.name));

  return [...local, ...nested.flat()];
}

async function removeDuplicateSuffixFiles() {
  try {
    const duplicateTargets = await collectDuplicateSuffixFiles(distDir);
    await Promise.all(duplicateTargets.map((target) => safeRemove(target)));
    return duplicateTargets.length;
  } catch {
    return 0;
  }
}

async function main() {
  await fs.mkdir(distDir, { recursive: true });

  await safeRemove(distAssetsDir);

  await Promise.all(
    TOP_LEVEL_GENERATED.map((name) => safeRemove(path.join(distDir, name)))
  );

  await Promise.all(
    STATIC_COPY_DIRS.map((name) => safeRemove(path.join(distDir, name)))
  );

  const duplicateCount = await removeDuplicateSuffixFiles();

  console.log(
    `[clean:dist] removed dist/assets, static copy dirs, generated top-level files, and ${duplicateCount} duplicate-suffixed files (recursive)`
  );
}

main().catch((error) => {
  console.error("[clean:dist] failed:", error);
  process.exitCode = 1;
});
