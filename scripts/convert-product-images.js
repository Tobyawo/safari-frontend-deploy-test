#!/usr/bin/env node
/**
 * Resizes images under PRODUCT_IMAGES_DIR, writes to OUTPUT_DIR, then moves each
 * original into PROCESSED_DIR (same relative path). The incoming folder only
 * holds files not yet handled, so cron does not repeat work.
 *
 * Default output dimensions: 297 × 457 px (TARGET_DPI default 72 where metadata applies).
 *
 * Environment variables:
 *   PRODUCT_IMAGES_DIR  — queue folder (default: ../public/images/products)
 *   OUTPUT_DIR          — converted images (default: ../public/images/products-converted)
 *   PROCESSED_DIR       — originals after success (default: ../public/images/products-processed)
 *   TARGET_WIDTH        — default 297
 *   TARGET_HEIGHT       — default 457
 *   TARGET_DPI          — default 72
 *   FIT                 — cover | contain (default: cover)
 *   DRY_RUN             — set to 1 to log only
 *
 * Usage:
 *   node scripts/convert-product-images.js
 *   npm run convert-product-images
 */

const fs = require("fs");
const path = require("path");

const EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tiff"]);

function parseEnvInt(name, fallback) {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

const TARGET_WIDTH = parseEnvInt("TARGET_WIDTH", 297);
const TARGET_HEIGHT = parseEnvInt("TARGET_HEIGHT", 457);
const TARGET_DPI = parseEnvInt("TARGET_DPI", 72);
const FIT = (process.env.FIT || "cover").toLowerCase() === "contain" ? "contain" : "cover";
const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

/** Env paths: absolute, or relative to current working directory (e.g. project root when using cron `cd`). */
function resolveDataDir(envValue, defaultRelativeToScripts) {
  if (envValue && String(envValue).trim() !== "") {
    return path.isAbsolute(envValue)
      ? envValue
      : path.resolve(process.cwd(), envValue);
  }
  return path.resolve(__dirname, defaultRelativeToScripts);
}

const ROOT = resolveDataDir(
  process.env.PRODUCT_IMAGES_DIR,
  "../public/images/products"
);

const OUT_ROOT = resolveDataDir(
  process.env.OUTPUT_DIR,
  "../public/images/products-converted"
);

const PROCESSED_ROOT = resolveDataDir(
  process.env.PROCESSED_DIR,
  "../public/images/products-processed"
);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

function moveOriginalToProcessed(filePath, rel) {
  const processedPath = path.join(PROCESSED_ROOT, rel);
  const processedDir = path.dirname(processedPath);
  if (!fs.existsSync(processedDir)) {
    fs.mkdirSync(processedDir, { recursive: true });
  }
  if (fs.existsSync(processedPath)) {
    fs.unlinkSync(processedPath);
  }
  fs.renameSync(filePath, processedPath);
}

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error(
      "Missing dependency: sharp. Install with: npm install sharp --save-dev"
    );
    process.exit(1);
  }

  const fileList = walk(ROOT);
  if (fileList.length === 0) {
    console.log(`No images found under ${ROOT}`);
    return;
  }

  if (!DRY_RUN) {
    if (!fs.existsSync(OUT_ROOT)) {
      fs.mkdirSync(OUT_ROOT, { recursive: true });
    }
    if (!fs.existsSync(PROCESSED_ROOT)) {
      fs.mkdirSync(PROCESSED_ROOT, { recursive: true });
    }
  }

  console.log(
    `Queue:    ${ROOT}\nOutput:   ${OUT_ROOT}\nProcessed:${PROCESSED_ROOT}\n` +
      `Converting ${fileList.length} image(s) → ${TARGET_WIDTH}×${TARGET_HEIGHT} (${FIT}), DPI ${TARGET_DPI}`
  );

  for (const filePath of fileList) {
    const rel = path.relative(ROOT, filePath);
    const destPath = path.join(OUT_ROOT, rel);

    try {
      if (DRY_RUN) {
        console.log(
          `[dry-run] ${filePath} → ${destPath}, then move original → ${path.join(PROCESSED_ROOT, rel)}`
        );
        continue;
      }

      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Output already correct: do not re-encode; still move original out of queue.
      if (fs.existsSync(destPath)) {
        const existing = await sharp(destPath).metadata();
        if (
          existing.width === TARGET_WIDTH &&
          existing.height === TARGET_HEIGHT
        ) {
          moveOriginalToProcessed(filePath, rel);
          console.log(
            `OK (output already ${TARGET_WIDTH}×${TARGET_HEIGHT}, moved original): ${rel}`
          );
          continue;
        }
      }

      const meta = await sharp(filePath).metadata();
      if (meta.width === TARGET_WIDTH && meta.height === TARGET_HEIGHT) {
        fs.copyFileSync(filePath, destPath);
        moveOriginalToProcessed(filePath, rel);
        console.log(
          `OK (copied, already ${TARGET_WIDTH}×${TARGET_HEIGHT}, moved original): ${rel}`
        );
        continue;
      }

      const pipeline = sharp(filePath)
        .resize(TARGET_WIDTH, TARGET_HEIGHT, {
          fit: FIT,
          position: "centre",
        })
        .withMetadata({ density: TARGET_DPI });

      const ext = path.extname(filePath).toLowerCase();
      const tmp = `${destPath}.tmp${ext}`;

      if (ext === ".png") {
        await pipeline.png({ compressionLevel: 9 }).toFile(tmp);
      } else if (ext === ".jpg" || ext === ".jpeg") {
        await pipeline.jpeg({ quality: 88, mozjpeg: true }).toFile(tmp);
      } else if (ext === ".webp") {
        await pipeline.webp({ quality: 88 }).toFile(tmp);
      } else {
        await pipeline.toFile(tmp);
      }

      fs.renameSync(tmp, destPath);
      moveOriginalToProcessed(filePath, rel);
      console.log(`OK: ${rel} → ${destPath}, original → processed`);
    } catch (err) {
      console.error(`FAIL: ${filePath}`, err.message);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
