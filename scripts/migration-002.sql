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

CREATE POLICY "public read"            ON reviews FOR SELECT USING (published = true);
CREATE POLICY "authenticated read all" ON reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated insert"   ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update"   ON reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete"   ON reviews FOR DELETE TO authenticated USING (true);

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
