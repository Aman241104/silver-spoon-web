-- Migration 001: Add collections and offers tables
-- Run this in Supabase SQL Editor before using /admin/collections and /admin/offers

-- Collections table: powers the "Explore Our Collections" homepage section
CREATE TABLE IF NOT EXISTS collections (
  slug         TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  image_url    TEXT,
  link_href    TEXT,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"         ON collections FOR SELECT USING (true);
CREATE POLICY "authenticated insert" ON collections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update" ON collections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete" ON collections FOR DELETE TO authenticated USING (true);

-- Seed with the current hardcoded values so nothing looks empty on first load
INSERT INTO collections (slug, title, image_url, link_href, sort_order) VALUES
  ('mens',      'Men''s Collection',      '/images/collections/men-category-new.png', '/products?gender=men',  1),
  ('womens',    'Women''s Collection',    '/images/collections/women-category.png',   '/products?gender=women', 2),
  ('gifting',   'Gifting Collection',     '/images/collections/gifting-collection.jpg', '/gifting',            3),
  ('tableware', 'Silverware & Tableware', '/images/collections/new-arrivals.jpg',     '/collections/utensils', 4)
ON CONFLICT (slug) DO NOTHING;

-- Offers table: homepage promotional banners managed from admin
CREATE TABLE IF NOT EXISTS offers (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  subtitle     TEXT,
  badge_text   TEXT,
  image_url    TEXT,
  link_href    TEXT,
  cta_text     TEXT NOT NULL DEFAULT 'Shop Now',
  is_active    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"          ON offers FOR SELECT USING (true);
CREATE POLICY "authenticated insert" ON offers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update" ON offers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete" ON offers FOR DELETE TO authenticated USING (true);
