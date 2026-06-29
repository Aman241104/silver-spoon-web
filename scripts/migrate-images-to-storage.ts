/**
 * Migrates all relative /images/... paths in the DB to Supabase Storage URLs.
 * Run with: npx tsx scripts/migrate-images-to-storage.ts
 */

import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "product-images";
const PUBLIC_DIR = join(process.cwd(), "public");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  db: { schema: "public" },
  realtime: { transport: ws },
});

let uploaded = 0;
let skipped = 0;
let missing = 0;
let errors = 0;

async function uploadFile(relativePath: string): Promise<string | null> {
  const diskPath = join(PUBLIC_DIR, relativePath);
  if (!existsSync(diskPath)) {
    console.warn(`  ✗ File not found on disk: ${relativePath}`);
    missing++;
    return null;
  }

  // Derive a clean storage filename from the path
  const storageName = relativePath
    .replace(/^\/images\//, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  // Check if already uploaded to avoid re-uploading
  const { data: existing } = await supabase.storage
    .from(BUCKET)
    .list(storageName.split("/").slice(0, -1).join("/") || "", {
      search: storageName.split("/").pop(),
      limit: 1,
    });

  const fileBuffer = readFileSync(diskPath);
  const ext = relativePath.split(".").pop()?.toLowerCase() ?? "jpg";
  const mime =
    ext === "png" ? "image/png" :
    ext === "webp" ? "image/webp" :
    ext === "gif" ? "image/gif" :
    "image/jpeg";

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storageName, fileBuffer, { contentType: mime, upsert: true });

  if (error) {
    console.error(`  ✗ Upload error for ${storageName}:`, error.message);
    errors++;
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(storageName);

  uploaded++;
  return publicUrl;
}

async function migrateProducts() {
  console.log("\n── Products ─────────────────────────────");
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, image")
    .like("image", "/images/%");

  if (error) { console.error("Failed to fetch products:", error.message); return; }
  console.log(`Found ${products?.length ?? 0} products with relative image paths.`);

  for (const product of products ?? []) {
    process.stdout.write(`  [${product.id}] ${product.name} → `);
    const url = await uploadFile(product.image);
    if (url) {
      await supabase.from("products").update({ image: url }).eq("id", product.id);
      console.log("✓ " + url.split("/").pop());
    }
  }
}

async function migrateCategoryImages() {
  console.log("\n── Category Images ──────────────────────");
  const { data: rows, error } = await supabase
    .from("category_images")
    .select("slug, image_url")
    .like("image_url", "/images/%");

  if (error) { console.error("Failed to fetch category_images:", error.message); return; }
  console.log(`Found ${rows?.length ?? 0} category images with relative paths.`);

  for (const row of rows ?? []) {
    process.stdout.write(`  [${row.slug}] → `);
    const url = await uploadFile(row.image_url);
    if (url) {
      await supabase.from("category_images").update({ image_url: url }).eq("slug", row.slug);
      console.log("✓ " + url.split("/").pop());
    }
  }
}

async function migrateCollections() {
  console.log("\n── Collections ──────────────────────────");
  const { data: rows, error } = await supabase
    .from("collections")
    .select("slug, image_url")
    .like("image_url", "/images/%");

  if (error) { console.error("Failed to fetch collections:", error.message); return; }
  console.log(`Found ${rows?.length ?? 0} collection images with relative paths.`);

  for (const row of rows ?? []) {
    process.stdout.write(`  [${row.slug}] → `);
    const url = await uploadFile(row.image_url);
    if (url) {
      await supabase.from("collections").update({ image_url: url }).eq("slug", row.slug);
      console.log("✓ " + url.split("/").pop());
    }
  }
}

async function main() {
  console.log("Silver Spoon — Image Migration to Supabase Storage");
  console.log("=".repeat(50));

  await migrateProducts();
  await migrateCategoryImages();
  await migrateCollections();

  console.log("\n" + "=".repeat(50));
  console.log(`Done.`);
  console.log(`  ✓ Uploaded:   ${uploaded}`);
  console.log(`  → Skipped:    ${skipped}`);
  console.log(`  ✗ Not found:  ${missing}`);
  console.log(`  ✗ Errors:     ${errors}`);
}

main().catch(console.error);
