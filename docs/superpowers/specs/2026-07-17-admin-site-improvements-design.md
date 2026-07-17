# Admin + Site Improvements — Design

Date: 2026-07-17

## Scope

Six independent pieces, three admin bug/feature fixes, one admin+site feature, two site-only features. Each is independently shippable; no shared code between them except the DB migration file.

## 1. Category dropdown bug (admin)

**Root cause**: `category_images` table (Supabase, not tracked in `scripts/schema.sql`) stores only `slug` + `image_url`. The add-product dropdown (`ProductForm.tsx`) imports a hardcoded `categories` array from `src/data/products.ts` at build time and never reads `category_images`. A custom category created via the Category Images admin page writes only to `category_images` — it has no path into the product form.

**Fix**:
- Migration: add `name text` column to `category_images`.
- `NewCategoryForm` already collects a category name (`categoryName` state) but never sends it — pass it through `upsertCategoryImage(slug, name, imageUrl)`.
- New `getAllCategoriesForForm()` in `src/lib/db.ts`: merges hardcoded `categories` array with `category_images` rows not already present (by slug) into `{ id, name }[]`.
- `products/new/page.tsx` and `products/[id]/page.tsx` (server components) fetch this merged list and pass it as a prop into `ProductForm`, which renders the dropdown from the prop instead of the static import.

## 2. Auto-generated product ID (admin)

- Remove the `id` input, slug-preview, and "Reset" UI from `ProductForm.tsx` entirely.
- `createProduct` action (`src/app/actions/products.ts`) generates the id server-side: `toSlug(name) + '-' + <4-char base36 random>`. On insert conflict (duplicate PK), retry with a new suffix up to 3 attempts.
- Admin never sees or edits an ID.

## 3. Sub-category system (admin)

- New table `subcategories (slug text primary key, name text not null)` — one global list (not per-category), per client decision.
- New admin page `/admin/(shell)/subcategories`, same inline add/list/delete pattern as the Category Images page (no image upload needed — just name/slug).
- New `src/app/actions/subcategories.ts`: `upsertSubcategory`, `deleteSubcategory`.
- `ProductForm.tsx`: sub-category free-text input becomes a `<select>` (with a blank "None" option) fed from a `subcategories` list passed in as a prop, fetched the same way as the merged categories list.
- Out of scope: the existing per-category `subCategories` arrays in `src/data/products.ts` (used only by the public collection-page filter UI) are untouched — separate concern, not part of this request.

## 4. Weekly section: configurable count + random toggle (admin + site)

- New table `weekly_settings` — single row, `id boolean primary key default true` (enforces one row), `count integer not null default 6`, `randomize boolean not null default false`.
- Weekly admin page (`WeeklyToggleList.tsx` + new small settings form): number input for count, toggle switch for randomize, saved via new `updateWeeklySettings` action. The existing `MAX_WEEKLY = 6` UI cap becomes dynamic, driven by the configured count (client can still toggle more products into the "weekly pool" than are shown, same as today's overflow behavior).
- `getWeeklyProducts()` in `src/lib/db.ts`: reads `weekly_settings`, fetches the manually toggled (`is_weekly=true`) set, then:
  - `randomize=false`: return first `count` (current behavior, ordered by name).
  - `randomize=true`: shuffle the toggled set server-side, return first `count`.
- **Caveat (communicated to client)**: the homepage weekly section is cached via `'use cache'` + `cacheLife('hours')`. Randomization reshuffles once per cache window (hours), not on every single page visit.

## 5. Product image zoom (site)

- New `ImageZoomModal` component used by `ProductDetailClient.tsx`: click the main product image → fullscreen overlay, scroll-wheel/pinch to zoom, drag to pan when zoomed, close via Esc/backdrop/close button.
- Built with `framer-motion` (already a dependency) — no new library added.
- Scope: the product detail page's single main image only. Products have one `image` field, not a gallery, so this is not a multi-image lightbox.

## 6. Happy customers / reviews section (site + admin)

- New table `reviews (id uuid primary key default gen_random_uuid(), name text not null, rating int not null check (rating between 1 and 5), body text not null, published boolean not null default true, sort_order int not null default 0, created_at timestamptz not null default now())`.
- New admin page `/admin/(shell)/reviews`: inline add form + list with edit/delete/publish-toggle, same structural pattern as Category Images / Subcategories pages.
- New `src/app/actions/reviews.ts`: `upsertReview`, `deleteReview`.
- Seed: insert 10 generated realistic reviews (name, 4-5 star rating, short quote) directly via migration/seed so the section is populated immediately.
- New `HappyCustomers` site section (`src/components/sections/`): auto-rotating testimonial carousel (framer-motion), pause on hover, dot/arrow navigation for manual control and accessibility, responsive (stacked on mobile, multi-card on laptop). Placed in `src/app/page.tsx` between `Newsletter` and `Footer`.

## Data model additions summary

```sql
alter table category_images add column if not exists name text;

create table if not exists subcategories (
  slug text primary key,
  name text not null
);

create table if not exists weekly_settings (
  id boolean primary key default true check (id),
  count integer not null default 6,
  randomize boolean not null default false
);
insert into weekly_settings (id) values (true) on conflict do nothing;

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
```

These statements will be added to `scripts/schema.sql` (currently missing `category_images` too — will be backfilled) and applied to the live Supabase project via the Supabase MCP tools.

## Out of scope

- Multi-image product galleries (only single-image zoom).
- Per-category sub-category lists (global list only, per decision).
- Migrating existing free-text `products.sub_category` values into the new table (new dropdown starts empty; existing product data untouched, still renders as plain text until re-edited).
