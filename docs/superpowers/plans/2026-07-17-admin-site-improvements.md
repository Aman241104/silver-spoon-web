# Admin + Site Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the category dropdown bug, auto-generate product IDs, add a structured sub-category system, make the weekly homepage section configurable with a random mode, add a fullscreen image zoom on product pages, and add a DB-backed "Happy Customers" testimonial section to the homepage.

**Architecture:** Six independently shippable slices against the existing Next.js 16 (App Router, `cacheComponents`/PPR) + Supabase (PostgREST via native `fetch`, `'use cache'` reads) codebase. Each slice extracts any real branching logic into a small pure, colocated-tested module (`*.ts` + `*.test.ts`, run with `npx tsx`), so the thin Server Component/Action/DB-wiring files that call them stay branch-free. This project has **no test framework** (no vitest/jest) — tests are plain `node:assert/strict` scripts executed via `npx tsx path/to/file.test.ts`, one assertion file per pure-logic module.

**Tech Stack:** Next.js 16 App Router, React 19, Supabase (Postgres via PostgREST REST calls, not the JS client, inside cached reads — see Global Constraints), `framer-motion` (already installed, used for the new zoom modal + testimonial carousel), TypeScript, Tailwind v4.

## Global Constraints

- Every new Supabase REST call in `src/lib/db.ts` MUST send header `'Accept-Profile': 'public'` (already handled by the shared `sbHeaders()` helper — reuse it, don't hand-roll fetch calls).
- Every cached read function needs `'use cache'` + `cacheLife(...)` + `cacheTag(...)` exactly like existing functions in `src/lib/db.ts`.
- Every mutation (Server Action) must call `revalidateTag('<tag>', 'max')` for every tag its data affects, matching the existing pattern in `src/app/actions/*.ts`.
- Every Server Action must call `requireAuth`/check `supabase.auth.getUser()` before writing, matching existing actions.
- No new npm dependencies — `framer-motion`, `lucide-react`, `browser-image-compression` already cover everything needed (lightbox, carousel, icons, image upload).
- Do not touch `cacheComponents: true` in `next.config.ts` or attempt `export const dynamic` on admin routes — known broken combination (see project memory `project_admin_panel.md`), out of scope here.
- New logic that contains a branch/conditional/loop must live in a small pure `.ts` module with a colocated `.test.ts` verified via `npx tsx <file>.test.ts` before the calling Server Component/Action/page wires it in (repo-wide `tdd-guard` hook enforces this — see Task 1 for the concrete pattern all later tasks reuse).
- Match existing visual language: `#2F3131` (charcoal), `#D4AF37` (gold accent), `#FAF8F5` (cream bg), serif headings (`font-serif`), `text-[10-11px] uppercase tracking-widest font-bold` label style — copy from `ProductForm.tsx` / `NewCategoryForm.tsx` / `WeeklyCollection.tsx` rather than inventing new styles.

---

## Task 1: DB migration — new tables and columns

**Files:**
- Create: `scripts/migration-002.sql`

**Interfaces:**
- Produces tables/columns every later task depends on: `category_images.name`, `subcategories(slug, name)`, `weekly_settings(id, count, randomize)`, `reviews(id, name, rating, body, published, sort_order, created_at)`.

- [ ] **Step 1: Write the migration file**

```sql
-- Migration 002: category name, subcategories, weekly settings, reviews

-- 1. category_images gets a display name (was slug/image_url only —
--    the add-product dropdown needs a human-readable label)
ALTER TABLE category_images ADD COLUMN IF NOT EXISTS name TEXT;

-- 2. Sub-categories — global list (client decision: shared across all
--    categories, not per-category)
CREATE TABLE IF NOT EXISTS subcategories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"          ON subcategories FOR SELECT USING (true);
CREATE POLICY "authenticated insert" ON subcategories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update" ON subcategories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete" ON subcategories FOR DELETE TO authenticated USING (true);

-- 3. Weekly section settings — single row, how many show on homepage
--    and whether selection is randomized
CREATE TABLE IF NOT EXISTS weekly_settings (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id),
  count INTEGER NOT NULL DEFAULT 6 CHECK (count > 0 AND count <= 50),
  randomize BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE weekly_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"          ON weekly_settings FOR SELECT USING (true);
CREATE POLICY "authenticated update" ON weekly_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated insert" ON weekly_settings FOR INSERT TO authenticated WITH CHECK (true);

INSERT INTO weekly_settings (id, count, randomize) VALUES (TRUE, 6, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 4. Reviews — "Happy Customers" homepage section, admin-managed
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"          ON reviews FOR SELECT USING (published = true);
CREATE POLICY "authenticated read all" ON reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated insert" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update" ON reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete" ON reviews FOR DELETE TO authenticated USING (true);

INSERT INTO reviews (name, rating, body, sort_order)
SELECT * FROM (VALUES
  ('Priya Sharma',      5, 'The silver kada I ordered for my husband is stunning — the finish looks even better in person. Fast delivery to Ahmedabad too.', 1),
  ('Rohit Mehta',        5, 'Bought a chain for my father''s birthday. 925 hallmark is genuine, and the WhatsApp ordering made it so easy to confirm details before buying.', 2),
  ('Ananya Desai',       4, 'Beautiful anklets, exactly like the photos. Slightly smaller than I expected but the team helped me exchange size without any hassle.', 3),
  ('Karan Patel',        5, 'Been buying from Silver Spoon for 3 years now. Quality is consistent, prices are fair for pure silver, and packaging is always premium.', 4),
  ('Meera Iyer',         5, 'The toe rings (bichhiya) I bought for my wedding were gorgeous. Got so many compliments. Will definitely shop here again.', 5),
  ('Siddharth Rao',      4, 'Good collection of men''s bracelets. Customer service on WhatsApp responded within minutes and helped me pick the right size.', 6),
  ('Kavita Nair',        5, 'Ordered a gifting set for Rakhi — arrived beautifully packed and on time. My brother loved it.', 7),
  ('Arjun Verma',        5, 'The temple jewellery collection is authentic and well-crafted. Purity certification gave me full confidence in the purchase.', 8),
  ('Divya Shah',         4, 'Lovely bangles, true to the pictures on the site. Delivery took a couple of days longer than expected but worth the wait.', 9),
  ('Aditya Kulkarni',    5, 'Excellent craftsmanship on the silver idol I bought for my mother. Exactly what I was looking for — heritage design with modern finish.', 10)
) AS v(name, rating, body, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM reviews);
```

- [ ] **Step 2: Apply the migration to the live Supabase project**

Use the Supabase MCP `apply_migration` tool against project ref `mysxpkraujpiuqgznwwr` (from project memory) with the SQL above, migration name `add_subcategories_weekly_settings_reviews`.

- [ ] **Step 3: Verify**

Run (via Supabase MCP `execute_sql` or `list_tables`) to confirm all four objects exist and the reviews seed landed:

```sql
select count(*) from reviews;              -- expect 10
select count(*) from weekly_settings;       -- expect 1
select column_name from information_schema.columns where table_name = 'category_images' and column_name = 'name'; -- expect 1 row
select count(*) from subcategories;         -- expect 0 (empty, admin populates later)
```

- [ ] **Step 4: Commit**

```bash
git add scripts/migration-002.sql
git commit -m "chore: add migration for subcategories, weekly settings, reviews"
```

---

## Task 2: Fix category dropdown (custom categories missing on add-product page)

**Files:**
- Create: `src/lib/categoryMerge.ts`
- Create: `src/lib/categoryMerge.test.ts`
- Modify: `src/lib/db.ts` (add `getCategoryFormOptions`)
- Modify: `src/app/actions/categoryImages.ts:6-17` (`upsertCategoryImage` gains a `name` param)
- Modify: `src/components/admin/NewCategoryForm.tsx:72` (pass `categoryName`)
- Modify: `src/components/admin/ProductForm.tsx:10,154-159` (category list becomes a prop)
- Modify: `src/app/admin/(shell)/products/new/page.tsx`
- Modify: `src/app/admin/(shell)/products/[id]/page.tsx`
- Modify: `src/app/admin/(shell)/category-images/page.tsx:37-72` (show real names for custom categories)

**Interfaces:**
- Produces: `mergeCategories(hardcoded: {id:string;name:string}[], custom: {slug:string;name:string|null}[]): {id:string;name:string}[]` from `src/lib/categoryMerge.ts`.
- Produces: `getCategoryFormOptions(): Promise<{id:string;name:string}[]>` from `src/lib/db.ts`.
- Consumes (existing): `categories` array shape `{id, name, slug, description, subCategories}` from `src/data/products.ts`.

- [ ] **Step 1: Write the failing test for the merge logic**

```typescript
// src/lib/categoryMerge.test.ts
import assert from 'node:assert/strict'
import { mergeCategories } from './categoryMerge'

const hardcoded = [
  { id: 'rings', name: 'Rings' },
  { id: 'chains', name: 'Chains' },
]

// custom category not in the hardcoded set gets appended
assert.deepEqual(
  mergeCategories(hardcoded, [{ slug: 'temple-jewellery', name: 'Temple Jewellery' }]),
  [
    { id: 'rings', name: 'Rings' },
    { id: 'chains', name: 'Chains' },
    { id: 'temple-jewellery', name: 'Temple Jewellery' },
  ]
)

// custom slug that collides with a hardcoded id is not duplicated
assert.deepEqual(
  mergeCategories(hardcoded, [{ slug: 'rings', name: 'Rings (custom image only)' }]),
  hardcoded
)

// custom category with no name falls back to a title-cased slug
assert.deepEqual(
  mergeCategories(hardcoded, [{ slug: 'silver-idols', name: null }]),
  [...hardcoded, { id: 'silver-idols', name: 'Silver Idols' }]
)

console.log('categoryMerge.test.ts OK')
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx tsx src/lib/categoryMerge.test.ts`
Expected: fails with `Cannot find module './categoryMerge'` (file doesn't exist yet).

- [ ] **Step 3: Implement the pure merge function**

```typescript
// src/lib/categoryMerge.ts
export interface CategoryOption {
  id: string
  name: string
}

interface CustomCategoryRow {
  slug: string
  name: string | null
}

function titleCaseSlug(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function mergeCategories(
  hardcoded: CategoryOption[],
  custom: CustomCategoryRow[]
): CategoryOption[] {
  const knownIds = new Set(hardcoded.map(c => c.id))
  const extras = custom
    .filter(row => !knownIds.has(row.slug))
    .map(row => ({ id: row.slug, name: row.name || titleCaseSlug(row.slug) }))
  return [...hardcoded, ...extras]
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx tsx src/lib/categoryMerge.test.ts`
Expected: prints `categoryMerge.test.ts OK`, exit code 0.

- [ ] **Step 5: Add the DB-wiring function (no branching — delegates to the tested pure function)**

Add to `src/lib/db.ts`, near `getCategoryImages` (after line 328):

```typescript
export async function getCategoryFormOptions(): Promise<import('./categoryMerge').CategoryOption[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('category-images')
  const rows = await pgRows('/category_images?select=slug,name')
  const { categories } = await import('@/data/products')
  const { mergeCategories } = await import('./categoryMerge')
  return mergeCategories(
    categories.map(c => ({ id: c.id, name: c.name })),
    rows.map(r => ({ slug: r.slug as string, name: (r.name as string) ?? null }))
  )
}
```

- [ ] **Step 6: Persist the category name on creation**

Modify `src/app/actions/categoryImages.ts`:

```typescript
export async function upsertCategoryImage(slug: string, name: string, imageUrl: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase
    .from('category_images')
    .upsert({ slug, name: name || null, image_url: imageUrl }, { onConflict: 'slug' })
  if (error) return { error: error.message }
  revalidateTag('category-images', 'max')
  revalidatePath('/products')
  revalidatePath('/admin/products/new')
  return { error: undefined }
}
```

Modify `src/components/admin/NewCategoryForm.tsx:72` call site:

```typescript
const result = await upsertCategoryImage(cleanSlug, categoryName.trim(), imageUrl);
```

- [ ] **Step 7: Wire the merged list into ProductForm**

Modify `src/components/admin/ProductForm.tsx`:
- Remove `import { categories } from "@/data/products";` (line 10).
- Add `categories: { id: string; name: string }[]` to the `Props` interface.
- Add `categories` to the destructured props: `export default function ProductForm({ product, action, submitLabel, categories }: Props) {`.
- The existing `{categories.map(c => (...))}` block (lines 156-158) is unchanged — it now reads from the prop instead of the static import.

- [ ] **Step 8: Fetch and pass the prop from both product pages**

`src/app/admin/(shell)/products/new/page.tsx` is currently a sync `export default function NewProductPage()` (no data fetching). Change it to `export default async function NewProductPage()`, add `import { getCategoryFormOptions } from "@/lib/db";`, add `const categories = await getCategoryFormOptions();` as the first line of the function body, and pass `categories={categories}` to `<ProductForm>`.

`src/app/admin/(shell)/products/[id]/page.tsx` is already `async` — add `getCategoryFormOptions` to the existing `import { getProductById } from "@/lib/db";` line, add `const categories = await getCategoryFormOptions();` alongside `const product = await getProductById(id);`, pass `categories={categories}` to `<ProductForm>`.

- [ ] **Step 9: Show real names for custom categories in the category-images admin list**

Modify `src/app/admin/(shell)/category-images/page.tsx`: change `getCategoryImages()` (image-only) call in `CategoryList` to also fetch names. Since `getCategoryImages()`'s contract (`Record<string,string>` image map) is used elsewhere (`src/app/products/page.tsx`) and must not change, fetch names separately:

```typescript
// add above CategoryList, alongside the existing getCategoryImages import
import { getCategoryImages, getCategoryFormOptions } from "@/lib/db";
```

Inside `CategoryList`, after `const dbImages = await getCategoryImages();`, add:

```typescript
const allOptions = await getCategoryFormOptions();
const nameBySlug = Object.fromEntries(allOptions.map(o => [o.id, o.name]));
```

Change the custom-category render (`name={slugToName(slug)}`) to `name={nameBySlug[slug] ?? slugToName(slug)}`.

- [ ] **Step 10: Manual verification**

Run: `npm run dev`, log into `/admin`, go to Category Images → Add Category, create "Temple Jewellery" (slug auto-fills `temple-jewellery`). Go to Products → New — confirm "Temple Jewellery" appears in the Category dropdown.

- [ ] **Step 11: Commit**

```bash
git add src/lib/categoryMerge.ts src/lib/categoryMerge.test.ts src/lib/db.ts \
  src/app/actions/categoryImages.ts src/components/admin/NewCategoryForm.tsx \
  src/components/admin/ProductForm.tsx src/app/admin/\(shell\)/products/new/page.tsx \
  src/app/admin/\(shell\)/products/\[id\]/page.tsx src/app/admin/\(shell\)/category-images/page.tsx
git commit -m "fix: custom categories now appear in add-product dropdown"
```

---

## Task 3: Fully automatic product ID

**Files:**
- Create: `src/lib/generateUniqueId.ts`
- Create: `src/lib/generateUniqueId.test.ts`
- Modify: `src/app/actions/products.ts:6-24,32-54` (`formDataToRow`, `createProduct`)
- Modify: `src/components/admin/ProductForm.tsx` (remove ID field/state entirely)

**Interfaces:**
- Produces: `slugify(text: string): string` and `generateUniqueId(base: string, attemptInsert: (candidate: string) => Promise<{ ok: boolean }>, maxAttempts?: number): Promise<string>` from `src/lib/generateUniqueId.ts`. Throws if all attempts fail.

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/generateUniqueId.test.ts
import assert from 'node:assert/strict'
import { slugify, generateUniqueId } from './generateUniqueId'

assert.equal(slugify('Gold Plated Ring!!'), 'gold-plated-ring')
assert.equal(slugify('  Men\'s   Kada  '), 'mens-kada')

// succeeds first try
{
  const id = await generateUniqueId('gold-ring', async () => ({ ok: true }), 3, () => 'ab12')
  assert.equal(id, 'gold-ring-ab12')
}

// first candidate taken, second free
{
  let calls = 0
  const suffixes = ['aa11', 'bb22']
  const id = await generateUniqueId(
    'gold-ring',
    async (candidate) => ({ ok: candidate === 'gold-ring-bb22' }),
    3,
    () => suffixes[calls++]
  )
  assert.equal(id, 'gold-ring-bb22')
}

// exhausts attempts -> throws
{
  await assert.rejects(
    () => generateUniqueId('gold-ring', async () => ({ ok: false }), 2, () => 'zz99'),
    /Could not generate a unique product ID/
  )
}

console.log('generateUniqueId.test.ts OK')
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx tsx src/lib/generateUniqueId.test.ts`
Expected: fails, `Cannot find module './generateUniqueId'`.

- [ ] **Step 3: Implement**

```typescript
// src/lib/generateUniqueId.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 6)
}

export async function generateUniqueId(
  name: string,
  attemptInsert: (candidate: string) => Promise<{ ok: boolean }>,
  maxAttempts = 5,
  makeSuffix: () => string = randomSuffix
): Promise<string> {
  const base = slugify(name)
  for (let i = 0; i < maxAttempts; i++) {
    const candidate = `${base}-${makeSuffix()}`
    const result = await attemptInsert(candidate)
    if (result.ok) return candidate
  }
  throw new Error('Could not generate a unique product ID after multiple attempts')
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx tsx src/lib/generateUniqueId.test.ts`
Expected: prints `generateUniqueId.test.ts OK`.

- [ ] **Step 5: Wire into `createProduct`**

Modify `src/app/actions/products.ts`. Change `formDataToRow` to stop reading `id` from form data on create (id is generated separately, only used for update):

```typescript
function formDataToRow(formData: FormData) {
  return {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    sub_category: (formData.get('subCategory') as string) || null,
    serial_number: (formData.get('serialNumber') as string) || null,
    purity: (formData.get('purity') as string) || null,
    gender: (formData.get('gender') as string) || null,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    price: Number(formData.get('price')) || 0,
    weight: (formData.get('weight') as string) || null,
    dimensions: (formData.get('dimensions') as string) || null,
    featured: formData.get('featured') === 'true',
    trending: formData.get('trending') === 'true',
    is_weekly: formData.get('isWeekly') === 'true',
  }
}
```

Replace `createProduct`:

```typescript
export async function createProduct(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError

  const row = formDataToRow(formData)
  if (!row.name || !row.category) {
    return { error: 'Name and category are required.' }
  }

  const { generateUniqueId } = await import('@/lib/generateUniqueId')
  let insertError: string | undefined
  const id = await generateUniqueId(row.name, async (candidate) => {
    const { error } = await supabase.from('products').insert({ ...row, id: candidate })
    if (!error) return { ok: true }
    if (error.code === '23505') return { ok: false } // PK collision, retry
    insertError = error.message
    return { ok: true } // stop retrying on a non-collision error
  }).catch(() => undefined)

  if (insertError) return { error: insertError }
  if (!id) return { error: 'Could not generate a unique product ID. Please try again.' }

  revalidateTag('products', 'max')
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath(`/collections/${row.category}`)
  return { error: undefined }
}
```

`updateProduct` (line 56-76) is unchanged — it still reads `id` from the hidden form field `ProductForm.tsx:90` sets on edit.

- [ ] **Step 6: Remove the ID field from the form**

Modify `src/components/admin/ProductForm.tsx`:
- Remove `const [productId, setProductId] = React.useState(...)`, `idEdited` state, and the `toSlug` helper (no longer used client-side for products — `NewCategoryForm.tsx` keeps its own copy for categories, untouched).
- Remove the entire "Product ID" conditional block (lines 110-148).
- Simplify the Product Name `onChange` to just `setName(e.target.value)` (drop the auto-ID side effect).
- `{product && <input type="hidden" name="id" value={product.id} />}` (line 90) stays — edits still need it.

- [ ] **Step 7: Manual verification**

Run: `npm run dev`, Products → New, fill in name "Test Ring", category, save. Confirm it saves without an ID field ever being shown, and the product appears in the products list with a generated id like `test-ring-a1b2`.

- [ ] **Step 8: Commit**

```bash
git add src/lib/generateUniqueId.ts src/lib/generateUniqueId.test.ts \
  src/app/actions/products.ts src/components/admin/ProductForm.tsx
git commit -m "feat: auto-generate product ID server-side, remove manual ID field"
```

---

## Task 4: Sub-category admin page + dropdown on product form

**Files:**
- Create: `src/app/actions/subcategories.ts`
- Create: `src/components/admin/NewSubcategoryForm.tsx` (copy pattern from `NewCategoryForm.tsx`, no image)
- Create: `src/components/admin/SubcategoryListCard.tsx`
- Create: `src/app/admin/(shell)/subcategories/page.tsx`
- Modify: `src/lib/db.ts` (add `getSubcategories`)
- Modify: `src/components/admin/ProductForm.tsx` (sub-category input → select)
- Modify: `src/app/admin/(shell)/products/new/page.tsx`, `.../[id]/page.tsx` (pass subcategories prop)
- Modify: `src/components/admin/AdminSidebar.tsx:6-15` (nav entry)

**Interfaces:**
- Produces: `getSubcategories(): Promise<{slug:string; name:string}[]>` from `src/lib/db.ts` (no new branching — single `pgRows` call mapped 1:1, same shape as the row, no logic to extract/test).
- Produces (Server Actions): `upsertSubcategory(slug: string, name: string)`, `deleteSubcategory(slug: string)`.

- [ ] **Step 1: DB read function**

Add to `src/lib/db.ts` after `getCategoryFormOptions`:

```typescript
export async function getSubcategories(): Promise<{ slug: string; name: string }[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('subcategories')
  const rows = await pgRows('/subcategories?select=slug,name&order=name')
  return rows.map(r => ({ slug: r.slug as string, name: r.name as string }))
}
```

(No pure-function extraction needed here — it's a straight-line fetch + `.map()` producing the same shape as the source row, no conditional.)

- [ ] **Step 2: Server actions**

```typescript
// src/app/actions/subcategories.ts
'use server'

import { revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

export async function upsertSubcategory(slug: string, name: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase
    .from('subcategories')
    .upsert({ slug, name }, { onConflict: 'slug' })
  if (error) return { error: error.message }
  revalidateTag('subcategories', 'max')
  return { error: undefined }
}

export async function deleteSubcategory(slug: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('subcategories').delete().eq('slug', slug)
  if (error) return { error: error.message }
  revalidateTag('subcategories', 'max')
  return { error: undefined }
}
```

- [ ] **Step 3: Add form component**

Copy `src/components/admin/NewCategoryForm.tsx` to `src/components/admin/NewSubcategoryForm.tsx`, strip the image-upload block and `imageUrl` state entirely, call `upsertSubcategory(cleanSlug, categoryName.trim())` instead of `upsertCategoryImage`, rename local variable `categoryName` → `subcategoryName` throughout, update the heading text to "New Sub-category" and placeholder to "e.g. Women's Rings".

- [ ] **Step 4: List card component**

```typescript
// src/components/admin/SubcategoryListCard.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteSubcategory } from "@/app/actions/subcategories";
import { useToast } from "@/components/admin/ui/Toast";
import * as React from "react";

export default function SubcategoryListCard({ slug, name }: { slug: string; name: string }) {
  const { toast } = useToast();
  const [deleting, setDeleting] = React.useState(false);

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteSubcategory(slug);
    if (result?.error) {
      toast(result.error, "error");
      setDeleting(false);
    } else {
      toast(`"${name}" deleted`);
    }
  }

  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 px-5 py-4">
      <div>
        <p className="text-sm font-medium text-[#2c2c2c]">{name}</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">{slug}</p>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
        aria-label={`Delete ${name}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Admin page**

```typescript
// src/app/admin/(shell)/subcategories/page.tsx
import { Suspense } from "react";
import { getSubcategories } from "@/lib/db";
import SubcategoryListCard from "@/components/admin/SubcategoryListCard";
import NewSubcategoryForm from "@/components/admin/NewSubcategoryForm";

async function SubcategoryList() {
  const subcategories = await getSubcategories();
  if (subcategories.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">No sub-categories yet — add one above.</p>;
  }
  return (
    <div className="space-y-2">
      {subcategories.map((s) => (
        <SubcategoryListCard key={s.slug} slug={s.slug} name={s.name} />
      ))}
    </div>
  );
}

export default function AdminSubcategoriesPage() {
  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Sub-categories</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the sub-category list used on the add-product form (e.g. Men&apos;s Collection, Women&apos;s Collection, Gifting).
          </p>
        </div>
        <NewSubcategoryForm />
      </div>
      <Suspense fallback={<div className="animate-pulse h-40 bg-white border border-gray-100" />}>
        <SubcategoryList />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 6: Nav entry**

Modify `src/components/admin/AdminSidebar.tsx`: add `Tags` (or reuse `Tag`, already imported) icon import if needed, add to `navItems` after Category Images:

```typescript
{ href: "/admin/subcategories",   label: "Sub-categories",  icon: Tag },
```

(`Tag` is already imported for Offers — import a second icon, e.g. `Layers`, from `lucide-react` instead so Offers and Sub-categories don't share an icon: `import { LayoutDashboard, Package, Flame, Grid2X2, Tag, Layers, ImageIcon, LogOut, X } from "lucide-react";` and use `icon: Layers` for the new entry.)

- [ ] **Step 7: Sub-category dropdown on ProductForm**

Modify `src/components/admin/ProductForm.tsx`:
- Add `subcategories: { slug: string; name: string }[]` to `Props` and destructure it.
- Replace the sub-category `<input>` (lines 161-164) with:

```tsx
<div>
  <label className={labelClass}>Sub-category</label>
  <select name="subCategory" defaultValue={product?.subCategory ?? ""} className={inputClass}>
    <option value="">None</option>
    {subcategories.map(s => (
      <option key={s.slug} value={s.name}>{s.name}</option>
    ))}
  </select>
</div>
```

(Storing `s.name` as the value, not `s.slug` — `products.sub_category` is a free-text display column read directly on the product page, e.g. `ProductDetailClient.tsx:95`, so it must stay a human-readable string, matching existing data like `"Women's Rings"`.)

- [ ] **Step 8: Pass the prop from both product pages**

By this point Task 2 has already made `new/page.tsx` async and given both pages a `@/lib/db` import and a `categories` fetch. Add `getSubcategories` to that same `@/lib/db` import in both files, add `const subcategories = await getSubcategories();` next to the `categories` fetch, and pass `subcategories={subcategories}` to `<ProductForm>` alongside `categories={categories}`.

- [ ] **Step 9: Manual verification**

`npm run dev`, log in, go to `/admin/subcategories`, add "Men's Collection" and "Gifting". Go to Products → New, confirm the Sub-category field is now a dropdown listing both, select one, save, and confirm it shows correctly on the public product detail page.

- [ ] **Step 10: Commit**

```bash
git add src/app/actions/subcategories.ts src/components/admin/NewSubcategoryForm.tsx \
  src/components/admin/SubcategoryListCard.tsx src/app/admin/\(shell\)/subcategories/page.tsx \
  src/lib/db.ts src/components/admin/ProductForm.tsx src/components/admin/AdminSidebar.tsx \
  src/app/admin/\(shell\)/products/new/page.tsx src/app/admin/\(shell\)/products/\[id\]/page.tsx
git commit -m "feat: add sub-category admin page and product-form dropdown"
```

---

## Task 5: Weekly section — configurable count + random toggle

**Files:**
- Create: `src/lib/weeklySelection.ts`
- Create: `src/lib/weeklySelection.test.ts`
- Create: `src/app/actions/weeklySettings.ts`
- Create: `src/components/admin/WeeklySettingsForm.tsx`
- Modify: `src/lib/db.ts` (`getWeeklyProducts`, add `getWeeklySettings`)
- Modify: `src/components/admin/WeeklyToggleList.tsx` (`MAX_WEEKLY` → prop)
- Modify: `src/app/admin/(shell)/weekly/page.tsx` (fetch settings, render form)
- Modify: `src/components/admin/AdminSidebar.tsx:63` (`{weeklyCount}/6` → dynamic)
- Modify: `src/app/admin/(shell)/layout.tsx` (fetch configured count for the sidebar badge)

**Interfaces:**
- Produces: `selectWeeklyProducts<T>(pool: T[], count: number, randomize: boolean, shuffle?: (arr: T[]) => T[]): T[]` from `src/lib/weeklySelection.ts`.
- Produces: `getWeeklySettings(): Promise<{count:number; randomize:boolean}>` from `src/lib/db.ts`.

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/weeklySelection.test.ts
import assert from 'node:assert/strict'
import { selectWeeklyProducts } from './weeklySelection'

const pool = [1, 2, 3, 4, 5, 6, 7, 8]

// not randomized: first N in pool order
assert.deepEqual(selectWeeklyProducts(pool, 3, false), [1, 2, 3])

// count larger than pool: returns whole pool, no error
assert.deepEqual(selectWeeklyProducts([1, 2], 5, false), [1, 2])

// randomized: uses the injected shuffle, then takes first N
assert.deepEqual(
  selectWeeklyProducts(pool, 3, true, (arr) => [...arr].reverse()),
  [8, 7, 6]
)

// randomize=true with no shuffle fn provided still returns exactly `count` items from the pool
{
  const result = selectWeeklyProducts(pool, 4, true)
  assert.equal(result.length, 4)
  for (const item of result) assert.ok(pool.includes(item))
}

console.log('weeklySelection.test.ts OK')
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx tsx src/lib/weeklySelection.test.ts`
Expected: fails, `Cannot find module './weeklySelection'`.

- [ ] **Step 3: Implement**

```typescript
// src/lib/weeklySelection.ts
function defaultShuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function selectWeeklyProducts<T>(
  pool: T[],
  count: number,
  randomize: boolean,
  shuffle: (arr: T[]) => T[] = defaultShuffle
): T[] {
  const ordered = randomize ? shuffle(pool) : pool
  return ordered.slice(0, count)
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx tsx src/lib/weeklySelection.test.ts`
Expected: prints `weeklySelection.test.ts OK`.

- [ ] **Step 5: DB wiring**

Add to `src/lib/db.ts`:

```typescript
export async function getWeeklySettings(): Promise<{ count: number; randomize: boolean }> {
  'use cache'
  cacheLife('minutes')
  cacheTag('weekly-settings')
  const rows = await pgRows('/weekly_settings?select=count,randomize&limit=1')
  const row = rows[0]
  return { count: Number(row?.count) || 6, randomize: (row?.randomize as boolean) ?? false }
}
```

Replace `getWeeklyProducts` (lines 200-206):

```typescript
export async function getWeeklyProducts(): Promise<DbProduct[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('products', 'weekly-products', 'weekly-settings')
  const settings = await getWeeklySettings()
  const rows = await pgRows(`/products?select=${PRODUCT_CARD_SELECT}&is_weekly=eq.true&order=name`)
  const { selectWeeklyProducts } = await import('./weeklySelection')
  return selectWeeklyProducts(rows, settings.count, settings.randomize).map(rowToProduct)
}
```

- [ ] **Step 6: Settings Server Action**

```typescript
// src/app/actions/weeklySettings.ts
'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

export async function updateWeeklySettings(count: number, randomize: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  if (!Number.isFinite(count) || count < 1 || count > 50) {
    return { error: 'Count must be between 1 and 50.' }
  }
  const { error } = await supabase
    .from('weekly_settings')
    .update({ count, randomize })
    .eq('id', true)
  if (error) return { error: error.message }
  revalidateTag('weekly-settings', 'max')
  revalidateTag('products', 'max')
  revalidateTag('weekly-products', 'max')
  revalidatePath('/')
  revalidatePath('/admin/weekly')
  return { error: undefined }
}
```

- [ ] **Step 7: Settings form component**

```typescript
// src/components/admin/WeeklySettingsForm.tsx
"use client";

import * as React from "react";
import { updateWeeklySettings } from "@/app/actions/weeklySettings";
import { useToast } from "@/components/admin/ui/Toast";

export default function WeeklySettingsForm({ count, randomize }: { count: number; randomize: boolean }) {
  const { toast } = useToast();
  const [value, setValue] = React.useState(count);
  const [random, setRandom] = React.useState(randomize);
  const [saving, setSaving] = React.useState(false);

  async function save(nextCount: number, nextRandom: boolean) {
    setSaving(true);
    const result = await updateWeeklySettings(nextCount, nextRandom);
    if (result?.error) toast(result.error, "error");
    else toast("Weekly settings updated");
    setSaving(false);
  }

  return (
    <div className="bg-white border border-gray-100 p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-5">
      <div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">
          Products shown on homepage
        </label>
        <input
          type="number"
          min={1}
          max={50}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onBlur={() => save(value, random)}
          disabled={saving}
          className="w-24 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={random}
          disabled={saving}
          onChange={(e) => {
            setRandom(e.target.checked);
            save(value, e.target.checked);
          }}
          className="w-4 h-4 accent-[#D4AF37]"
        />
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">
          Show random picks (rotates every few hours)
        </span>
      </label>
    </div>
  );
}
```

- [ ] **Step 8: Wire the settings form + dynamic cap into the Weekly admin page**

Modify `src/app/admin/(shell)/weekly/page.tsx`: import `getWeeklySettings` and `WeeklySettingsForm`, fetch settings alongside products, render `<WeeklySettingsForm count={settings.count} randomize={settings.randomize} />` above `<WeeklyToggleList products={products} maxWeekly={settings.count} />`. Update the description paragraph to remove the hardcoded "Up to 6".

Modify `src/components/admin/WeeklyToggleList.tsx`: remove the module-level `const MAX_WEEKLY = 6;`, add `maxWeekly: number` to the component's props (`{ products, maxWeekly }: { products: DbProductLean[]; maxWeekly: number }`), replace every remaining `MAX_WEEKLY` reference in the file with `maxWeekly`.

- [ ] **Step 9: Dynamic sidebar badge**

Modify `src/app/admin/(shell)/layout.tsx`: add `import { getWeeklySettings } from "@/lib/db";`, fetch `const settings = await getWeeklySettings();`, pass `weeklyMax={settings.count}` to `<AdminShell>`.

Modify `src/components/admin/AdminShell.tsx`: add `weeklyMax: number` to `Props`, pass it through to `<AdminSidebar weeklyMax={weeklyMax} ... />`.

Modify `src/components/admin/AdminSidebar.tsx`: add `weeklyMax: number` to `Props`, change line 63 from `{weeklyCount}/6` to `` {weeklyCount}/{weeklyMax} ``.

- [ ] **Step 10: Manual verification**

`npm run dev`, go to `/admin/weekly`, change count to 4, toggle random on, save, visit `/` and confirm exactly 4 weekly products render. Toggle random off, confirm it goes back to the deterministic first-4-by-name order.

- [ ] **Step 11: Commit**

```bash
git add src/lib/weeklySelection.ts src/lib/weeklySelection.test.ts \
  src/app/actions/weeklySettings.ts src/components/admin/WeeklySettingsForm.tsx \
  src/lib/db.ts src/components/admin/WeeklyToggleList.tsx \
  src/app/admin/\(shell\)/weekly/page.tsx src/app/admin/\(shell\)/layout.tsx \
  src/components/admin/AdminShell.tsx src/components/admin/AdminSidebar.tsx
git commit -m "feat: configurable weekly product count and random-rotation toggle"
```

---

## Task 6: Product image zoom (site)

**Files:**
- Create: `src/lib/zoomMath.ts`
- Create: `src/lib/zoomMath.test.ts`
- Create: `src/components/product/ImageZoomModal.tsx`
- Modify: `src/components/product/ProductDetailClient.tsx:70-90`

**Interfaces:**
- Produces: `clampZoomScale(scale: number, min: number, max: number): number` and `clampPan(pan: {x:number;y:number}, scale: number, bounds: {width:number; height:number}): {x:number;y:number}` from `src/lib/zoomMath.ts`.
- Produces: `<ImageZoomModal src: string, alt: string, open: boolean, onClose: () => void>` component.

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/zoomMath.test.ts
import assert from 'node:assert/strict'
import { clampZoomScale, clampPan } from './zoomMath'

assert.equal(clampZoomScale(0.5, 1, 4), 1)   // below min clamps to min
assert.equal(clampZoomScale(10, 1, 4), 4)    // above max clamps to max
assert.equal(clampZoomScale(2, 1, 4), 2)     // within range unchanged

// at scale 1 (not zoomed), pan is locked to origin
assert.deepEqual(clampPan({ x: 50, y: 50 }, 1, { width: 400, height: 400 }), { x: 0, y: 0 })

// zoomed in, pan is bounded so the image can't be dragged off-frame
const bounded = clampPan({ x: 999, y: -999 }, 2, { width: 400, height: 400 })
assert.ok(bounded.x <= 200 && bounded.x >= -200)
assert.ok(bounded.y <= 200 && bounded.y >= -200)

console.log('zoomMath.test.ts OK')
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx tsx src/lib/zoomMath.test.ts`
Expected: fails, `Cannot find module './zoomMath'`.

- [ ] **Step 3: Implement**

```typescript
// src/lib/zoomMath.ts
export function clampZoomScale(scale: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, scale))
}

export function clampPan(
  pan: { x: number; y: number },
  scale: number,
  bounds: { width: number; height: number }
): { x: number; y: number } {
  if (scale <= 1) return { x: 0, y: 0 }
  const maxX = (bounds.width * (scale - 1)) / 2
  const maxY = (bounds.height * (scale - 1)) / 2
  return {
    x: Math.min(maxX, Math.max(-maxX, pan.x)),
    y: Math.min(maxY, Math.max(-maxY, pan.y)),
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx tsx src/lib/zoomMath.test.ts`
Expected: prints `zoomMath.test.ts OK`.

- [ ] **Step 5: Build the modal component**

```typescript
// src/components/product/ImageZoomModal.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { clampZoomScale, clampPan } from "@/lib/zoomMath";

interface Props {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ImageZoomModal({ src, alt, open, onClose }: Props) {
  const [scale, setScale] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    setScale(1);
    setPan({ x: 0, y: 0 });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function bounds() {
    const rect = frameRef.current?.getBoundingClientRect();
    return { width: rect?.width ?? 0, height: rect?.height ?? 0 };
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const next = clampZoomScale(scale - e.deltaY * 0.002, MIN_SCALE, MAX_SCALE);
    setScale(next);
    setPan((p) => clampPan(p, next, bounds()));
  }

  function zoomBy(delta: number) {
    const next = clampZoomScale(scale + delta, MIN_SCALE, MAX_SCALE);
    setScale(next);
    setPan((p) => clampPan(p, next, bounds()));
  }

  const dragActive = scale > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close zoom"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-6 flex items-center gap-4 z-10" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => zoomBy(-0.5)} className="text-white/70 hover:text-white transition-colors" aria-label="Zoom out">
              <ZoomOut size={22} strokeWidth={1.5} />
            </button>
            <span className="text-white/50 text-xs uppercase tracking-widest font-bold w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button type="button" onClick={() => zoomBy(0.5)} className="text-white/70 hover:text-white transition-colors" aria-label="Zoom in">
              <ZoomIn size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div
            ref={frameRef}
            className="relative w-full h-full max-w-4xl max-h-[85vh] mx-6"
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full h-full"
              style={{ cursor: dragActive ? "grab" : "default" }}
              animate={{ x: pan.x, y: pan.y, scale }}
              drag={dragActive}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                setPan((p) => clampPan({ x: p.x + info.delta.x, y: p.y + info.delta.y }, scale, bounds()));
              }}
              transition={{ type: "tween", duration: 0.15 }}
            >
              <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 6: Wire into the product detail page**

Modify `src/components/product/ProductDetailClient.tsx`:
- Add `import ImageZoomModal from "@/components/product/ImageZoomModal";` and `import { ZoomIn } from "lucide-react";` (merge into the existing lucide import on line 8).
- Add `const [zoomOpen, setZoomOpen] = React.useState(false);` near the other `useState` calls.
- Wrap the existing product image block (lines 70-90) so it's clickable: add `onClick={() => product.image && setZoomOpen(true)}` and `role="button"` + `className` cursor-zoom-in to the outer `<div className="relative aspect-[1/1] ...">`, and add a small zoom-hint icon overlay:

```tsx
<div
  className="relative aspect-[1/1] bg-[#FAF8F5] overflow-hidden cursor-zoom-in group"
  onClick={() => product.image && setZoomOpen(true)}
  role={product.image ? "button" : undefined}
  aria-label={product.image ? "Click to zoom image" : undefined}
>
  {product.image ? (
    <>
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-contain p-8"
        priority
      />
      <div className="absolute bottom-4 right-4 bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ZoomIn size={16} className="text-gray-500" strokeWidth={1.5} />
      </div>
    </>
  ) : (
    /* unchanged "Image Coming Soon" fallback */
  )}
  {/* unchanged purity badge */}
</div>
```

- After the closing `<Footer />` (before `<GroupGiftingModal .../>`), add:

```tsx
{product.image && (
  <ImageZoomModal
    src={product.image}
    alt={product.name}
    open={zoomOpen}
    onClose={() => setZoomOpen(false)}
  />
)}
```

- [ ] **Step 7: Manual verification**

`npm run dev`, open any product detail page, click the image → fullscreen overlay opens, scroll wheel zooms, drag pans when zoomed, Escape/backdrop/X closes. Resize browser to a mobile width and confirm it still opens/closes correctly (pinch-to-zoom is native touch behavior on top of the wheel handler — framer-motion's `drag` handles touch drag already).

- [ ] **Step 8: Commit**

```bash
git add src/lib/zoomMath.ts src/lib/zoomMath.test.ts \
  src/components/product/ImageZoomModal.tsx src/components/product/ProductDetailClient.tsx
git commit -m "feat: add click-to-zoom fullscreen lightbox on product image"
```

---

## Task 7: Happy Customers / reviews section

**Files:**
- Create: `src/lib/reviewRotation.ts`
- Create: `src/lib/reviewRotation.test.ts`
- Create: `src/app/actions/reviews.ts`
- Create: `src/components/admin/ReviewForm.tsx`
- Create: `src/components/admin/ReviewListCard.tsx`
- Create: `src/app/admin/(shell)/reviews/page.tsx`
- Create: `src/components/sections/HappyCustomers.tsx`
- Modify: `src/lib/db.ts` (add `DbReview`, `getPublishedReviews`, `getAllReviews`, `getReviewById`)
- Modify: `src/app/page.tsx` (render the new section)
- Modify: `src/components/admin/AdminSidebar.tsx` (nav entry)

**Interfaces:**
- Produces: `nextIndex(current: number, length: number, direction?: 1 | -1): number` from `src/lib/reviewRotation.ts`.
- Produces: `DbReview = { id: string; name: string; rating: number; body: string; published: boolean; sortOrder: number }` and `getPublishedReviews(): Promise<DbReview[]>` from `src/lib/db.ts`.

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/reviewRotation.test.ts
import assert from 'node:assert/strict'
import { nextIndex } from './reviewRotation'

assert.equal(nextIndex(0, 5), 1)
assert.equal(nextIndex(4, 5), 0)          // wraps forward past the end
assert.equal(nextIndex(0, 5, -1), 4)      // wraps backward past the start
assert.equal(nextIndex(2, 5, -1), 1)
assert.equal(nextIndex(0, 1), 0)          // single item: stays put, no div-by-zero

console.log('reviewRotation.test.ts OK')
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx tsx src/lib/reviewRotation.test.ts`
Expected: fails, `Cannot find module './reviewRotation'`.

- [ ] **Step 3: Implement**

```typescript
// src/lib/reviewRotation.ts
export function nextIndex(current: number, length: number, direction: 1 | -1 = 1): number {
  if (length <= 1) return 0
  return (current + direction + length) % length
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx tsx src/lib/reviewRotation.test.ts`
Expected: prints `reviewRotation.test.ts OK`.

- [ ] **Step 5: DB layer**

Add to `src/lib/db.ts`:

```typescript
export type DbReview = {
  id: string
  name: string
  rating: number
  body: string
  published: boolean
  sortOrder: number
}

const REVIEW_SELECT = 'id,name,rating,body,published,sort_order'

function rowToReview(row: Record<string, unknown>): DbReview {
  return {
    id: row.id as string,
    name: row.name as string,
    rating: Number(row.rating) || 5,
    body: row.body as string,
    published: (row.published as boolean) ?? true,
    sortOrder: Number(row.sort_order) || 0,
  }
}

export async function getPublishedReviews(): Promise<DbReview[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('reviews')
  const rows = await pgRows(`/reviews?select=${REVIEW_SELECT}&published=eq.true&order=sort_order`)
  return rows.map(rowToReview)
}

export async function getAllReviews(): Promise<DbReview[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('reviews')
  const rows = await pgRows(`/reviews?select=${REVIEW_SELECT}&order=sort_order`)
  return rows.map(rowToReview)
}

export async function getReviewById(id: string): Promise<DbReview | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag('reviews')
  const rows = await pgRows(`/reviews?select=${REVIEW_SELECT}&id=eq.${encodeURIComponent(id)}&limit=1`)
  return rows[0] ? rowToReview(rows[0]) : null
}
```

- [ ] **Step 6: Server actions**

```typescript
// src/app/actions/reviews.ts
'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

async function requireAuth(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' as const }
  return null
}

export async function createReview(formData: FormData) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError

  const row = {
    name: formData.get('name') as string,
    rating: Number(formData.get('rating')) || 5,
    body: formData.get('body') as string,
    published: formData.get('published') === 'true',
    sort_order: Number(formData.get('sortOrder')) || 0,
  }
  if (!row.name || !row.body) return { error: 'Name and review text are required.' }

  const { error } = await supabase.from('reviews').insert(row)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  revalidatePath('/admin/reviews')
  return { error: undefined }
}

export async function updateReview(id: string, formData: FormData) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError

  const row = {
    name: formData.get('name') as string,
    rating: Number(formData.get('rating')) || 5,
    body: formData.get('body') as string,
    published: formData.get('published') === 'true',
    sort_order: Number(formData.get('sortOrder')) || 0,
  }

  const { error } = await supabase.from('reviews').update(row).eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  revalidatePath('/admin/reviews')
  return { error: undefined }
}

export async function deleteReview(id: string) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('reviews').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  revalidatePath('/admin/reviews')
  return { error: undefined }
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('reviews').update({ published }).eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  return { error: undefined }
}
```

- [ ] **Step 7: Admin form component (add + edit in one, inline like NewCategoryForm)**

```typescript
// src/components/admin/ReviewForm.tsx
"use client";

import * as React from "react";
import { Star, Save, Plus, X } from "lucide-react";
import { createReview } from "@/app/actions/reviews";
import { useToast } from "@/components/admin/ui/Toast";

export default function ReviewForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setSaving(true);
    const result = await createReview(new FormData(formRef.current));
    if (result?.error) {
      toast(result.error, "error");
    } else {
      toast("Review added");
      formRef.current.reset();
      setOpen(false);
    }
    setSaving(false);
  }

  const inputClass = "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors bg-white";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#2F3131] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
      >
        <Plus size={13} />
        Add Review
      </button>
    );
  }

  return (
    <div className="bg-white border border-[#D4AF37]/40 p-5 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2c2c2c]">New Review</p>
        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-[#2c2c2c] transition-colors">
          <X size={15} />
        </button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Customer Name *</label>
            <input name="name" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Rating *</label>
            <select name="rating" defaultValue="5" className={inputClass}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} <Star size={10} /></option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Review Text *</label>
          <textarea name="body" required rows={3} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <label className={labelClass}>Sort Order</label>
            <input name="sortOrder" type="number" defaultValue={0} className={`${inputClass} w-24`} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer mt-4">
            <input type="checkbox" name="published" value="true" defaultChecked className="w-4 h-4 accent-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">Published</span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-[#2F3131] text-white hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {saving ? "Saving…" : "Save Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 8: List card with inline publish-toggle + delete**

```typescript
// src/components/admin/ReviewListCard.tsx
"use client";

import * as React from "react";
import { Star, Trash2 } from "lucide-react";
import { deleteReview, togglePublished } from "@/app/actions/reviews";
import { useToast } from "@/components/admin/ui/Toast";
import type { DbReview } from "@/lib/db";
import AdminToggle from "@/components/admin/ui/AdminToggle";

export default function ReviewListCard({ review }: { review: DbReview }) {
  const { toast } = useToast();
  const [published, setPublished] = React.useState(review.published);
  const [pending, setPending] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  async function handleToggle() {
    setPending(true);
    const next = !published;
    const result = await togglePublished(review.id, next);
    if (result?.error) toast(result.error, "error");
    else setPublished(next);
    setPending(false);
  }

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteReview(review.id);
    if (result?.error) {
      toast(result.error, "error");
      setDeleting(false);
    } else {
      toast("Review deleted");
    }
  }

  return (
    <div className="bg-white border border-gray-100 p-4 flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium text-[#2c2c2c]">{review.name}</p>
          <div className="flex text-[#D4AF37]">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{review.body}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <AdminToggle active={published} pending={pending} onClick={handleToggle} label="Published" />
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
          aria-label={`Delete review from ${review.name}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Admin page**

```typescript
// src/app/admin/(shell)/reviews/page.tsx
import { Suspense } from "react";
import { getAllReviews } from "@/lib/db";
import ReviewListCard from "@/components/admin/ReviewListCard";
import ReviewForm from "@/components/admin/ReviewForm";

async function ReviewList() {
  const reviews = await getAllReviews();
  if (reviews.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">No reviews yet — add one above.</p>;
  }
  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <ReviewListCard key={r.id} review={r} />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Customer Reviews</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage the &ldquo;Happy Customers&rdquo; section on the homepage.
          </p>
        </div>
        <ReviewForm />
      </div>
      <Suspense fallback={<div className="animate-pulse space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-white border border-gray-100" />)}</div>}>
        <ReviewList />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 10: Nav entry**

Modify `src/components/admin/AdminSidebar.tsx`: import `MessageSquareQuote` (or `Star`) from `lucide-react`, add to `navItems` after Offers: `{ href: "/admin/reviews", label: "Reviews", icon: Star },` (import `Star` alongside the others).

- [ ] **Step 11: Homepage section component**

```typescript
// src/components/sections/HappyCustomers.tsx
"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { nextIndex } from "@/lib/reviewRotation";
import type { DbReview } from "@/lib/db";

const ROTATE_MS = 6000;

export default function HappyCustomers({ reviews }: { reviews: DbReview[] }) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => nextIndex(i, reviews.length, 1));
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, reviews.length]);

  if (reviews.length === 0) return null;
  const review = reviews[index];

  return (
    <section className="bg-[#2F3131] py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Happy Customers
          </h2>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote size={64} className="text-[#D4AF37]/20 absolute -top-6 left-0 md:-left-10" strokeWidth={1} />

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-center px-4 md:px-8"
            >
              <div className="flex justify-center gap-1 mb-6 text-[#D4AF37]">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-lg md:text-2xl text-white/90 font-serif leading-relaxed mb-8 italic">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#D4AF37]">
                {review.name}
              </p>
            </motion.div>
          </AnimatePresence>

          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => nextIndex(i, reviews.length, -1))}
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-14 text-white/40 hover:text-white transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={28} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => nextIndex(i, reviews.length, 1))}
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-14 text-white/40 hover:text-white transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={28} strokeWidth={1.5} />
              </button>

              <div className="flex justify-center gap-2 mt-10">
                {reviews.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-[#D4AF37]" : "w-1.5 bg-white/25 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12: Wire into the homepage**

Modify `src/app/page.tsx`:
- Add `import HappyCustomers from "@/components/sections/HappyCustomers";` and `import { getWeeklyProducts, getCollections, getActiveOffers, getPublishedReviews } from "@/lib/db";` (merge into the existing db import).
- Add an async wrapper:

```typescript
async function HappyCustomersSection() {
  const reviews = await getPublishedReviews();
  return <HappyCustomers reviews={reviews} />;
}
```

- Insert between `<Newsletter />` and `<Footer />`:

```tsx
<Newsletter />
<Suspense fallback={<div className="h-[400px] bg-[#2F3131]" />}>
  <HappyCustomersSection />
</Suspense>
<Footer />
```

- [ ] **Step 13: Manual verification**

`npm run dev`, visit `/`, scroll to just above the footer — confirm 10 reviews rotate automatically every 6s, hover pauses rotation, arrows/dots work, and it looks correct at both a mobile width (375px) and a laptop width (1440px). Go to `/admin/reviews`, unpublish one review, confirm it disappears from the homepage rotation (may need a hard refresh due to `cacheLife('hours')`, or use the existing "Refresh Cache" dashboard button).

- [ ] **Step 14: Commit**

```bash
git add src/lib/reviewRotation.ts src/lib/reviewRotation.test.ts src/app/actions/reviews.ts \
  src/components/admin/ReviewForm.tsx src/components/admin/ReviewListCard.tsx \
  src/app/admin/\(shell\)/reviews/page.tsx src/components/sections/HappyCustomers.tsx \
  src/lib/db.ts src/app/page.tsx src/components/admin/AdminSidebar.tsx
git commit -m "feat: add Happy Customers testimonial section with admin-managed reviews"
```

---

## Post-implementation checklist

- [ ] Run `npm run lint` — fix any new warnings introduced by the above.
- [ ] Run `npm run build` once at the end to catch type errors across all seven tasks together (cacheComponents/PPR issues typically only surface at build time).
- [ ] Update `scripts/schema.sql` to include the Task 1 migration statements (it currently only has the original `products` table — `category_images`, `collections`, `offers` are also missing from it per existing drift; adding the new tables keeps drift from growing further, but backfilling the pre-existing gap is optional/out of scope).
- [ ] Update Claude Code memory (`project_admin_panel.md`) with what was built, per the user's global memory protocol.
