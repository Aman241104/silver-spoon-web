-- Migration 003: admin-managed nav dropdown items (Men/Women/Gifts/Collection menus)

CREATE TABLE IF NOT EXISTS nav_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu TEXT NOT NULL CHECK (menu IN ('MEN', 'WOMEN', 'GIFTS', 'COLLECTION')),
  title TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"          ON nav_items FOR SELECT USING (true);
CREATE POLICY "authenticated insert" ON nav_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update" ON nav_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete" ON nav_items FOR DELETE TO authenticated USING (true);
