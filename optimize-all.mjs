import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, extname, basename, dirname, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = "/home/whoever/work/silver-spoon-web";
const PUBLIC = join(ROOT, "public/images");
const SRC = join(ROOT, "src");

// Never convert these (need real transparency)
const SKIP = new Set([
  "logo.png",
  "logo-original-backup.png",
  "placeholder-need-image.svg",
]);

let totalBefore = 0, totalAfter = 0, converted = 0, compressed = 0, skipped = 0;
const renames = []; // { oldRel, newRel } — relative to /public

function getAllImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllImages(full));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) results.push(full);
  }
  return results;
}

async function hasAlpha(filePath) {
  const { channels, hasAlpha } = await sharp(filePath).metadata();
  return hasAlpha && channels === 4;
}

function size(p) { return existsSync(p) ? statSync(p).size : 0; }

async function processImage(filePath) {
  const name = basename(filePath);
  if (SKIP.has(name)) { skipped++; return; }

  const ext = extname(filePath).toLowerCase();
  const before = size(filePath);
  totalBefore += before;

  if (ext === ".png") {
    const alpha = await hasAlpha(filePath);

    if (!alpha) {
      // Convert PNG→JPEG in-place (replace file, update extension)
      const jpgPath = filePath.replace(/\.png$/i, ".jpg");
      const tmp = filePath + ".tmp.jpg";

      await sharp(filePath)
        .rotate()
        .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(tmp);

      const after = size(tmp);
      totalAfter += after;

      // Rename tmp → .jpg, delete .png
      const { renameSync } = await import("fs");
      renameSync(tmp, jpgPath);
      unlinkSync(filePath);

      const relOld = "/" + relative(join(ROOT, "public"), filePath).replace(/\\/g, "/");
      const relNew = "/" + relative(join(ROOT, "public"), jpgPath).replace(/\\/g, "/");
      renames.push({ old: relOld, new: relNew });
      converted++;

      const pct = Math.round((1 - after / before) * 100);
      console.log(`PNG→JPG  ${name}  ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${pct}%)`);
    } else {
      // Has alpha — compress PNG in-place
      const tmp = filePath + ".tmp.png";
      await sharp(filePath)
        .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toFile(tmp);

      const after = size(tmp);
      // Only replace if actually smaller
      if (after < before) {
        const { renameSync } = await import("fs");
        renameSync(tmp, filePath);
        totalAfter += after;
        compressed++;
        const pct = Math.round((1 - after / before) * 100);
        console.log(`PNG cmp  ${name}  ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${pct}%)`);
      } else {
        unlinkSync(tmp);
        totalAfter += before;
        skipped++;
      }
    }
  } else {
    // JPEG — recompress in-place
    const tmp = filePath + ".tmp.jpg";
    await sharp(filePath)
      .rotate()
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(tmp);

    const after = size(tmp);
    if (after < before) {
      const { renameSync } = await import("fs");
      renameSync(tmp, filePath);
      totalAfter += after;
      compressed++;
      const pct = Math.round((1 - after / before) * 100);
      console.log(`JPG cmp  ${name}  ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${pct}%)`);
    } else {
      unlinkSync(tmp);
      totalAfter += before;
      skipped++;
    }
  }
}

// --- main ---
const images = getAllImages(PUBLIC);
console.log(`Found ${images.length} images. Processing...\n`);

for (const img of images) {
  try {
    await processImage(img);
  } catch (e) {
    console.error(`ERROR: ${img} — ${e.message}`);
  }
}

// Update all path references in src/
if (renames.length > 0) {
  console.log(`\nUpdating ${renames.length} path references in src/...`);

  function getAllSourceFiles(dir) {
    const results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) results.push(...getAllSourceFiles(full));
      else if (/\.(ts|tsx|js|jsx|css|json)$/.test(entry.name)) results.push(full);
    }
    return results;
  }

  const sourceFiles = getAllSourceFiles(SRC);
  // also check root config files
  for (const f of ["next.config.ts", "next.config.js", "tailwind.config.ts"]) {
    const p = join(ROOT, f);
    if (existsSync(p)) sourceFiles.push(p);
  }

  for (const sf of sourceFiles) {
    let content = readFileSync(sf, "utf8");
    let changed = false;
    for (const { old: o, new: n } of renames) {
      if (content.includes(o)) {
        content = content.split(o).join(n);
        changed = true;
      }
    }
    if (changed) {
      writeFileSync(sf, content);
      console.log(`  updated: ${relative(ROOT, sf)}`);
    }
  }
}

const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
const pct = Math.round((1 - totalAfter / totalBefore) * 100);
console.log(`
=== DONE ===
PNG→JPG converted : ${converted}
In-place compressed: ${compressed}
Skipped            : ${skipped}
Before : ${(totalBefore/1024/1024).toFixed(1)} MB
After  : ${(totalAfter/1024/1024).toFixed(1)} MB
Saved  : ${savedMB} MB  (-${pct}%)
`);
