/**
 * One-time migration: pushes all products from src/data/products.ts into Supabase.
 * Run with: npx tsx scripts/seed-supabase.ts
 *
 * Prerequisites:
 *   1. Create a Supabase project at supabase.com
 *   2. Run the SQL schema (see plan file or README)
 *   3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 *      OR export them as environment variables before running this script
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { products } from '../src/data/products'
import ws from 'ws'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: ws },
})

const rows = products.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category === 'weekly-fast-moving' ? 'bracelets' : p.category,
  sub_category: p.subCategory ?? null,
  serial_number: p.serialNumber ?? null,
  purity: p.purity ?? null,
  gender: p.gender ?? null,
  description: p.description,
  image: p.image,
  price: p.price,
  weight: p.weight ?? null,
  dimensions: p.dimensions ?? null,
  featured: p.featured ?? false,
  trending: p.trending ?? false,
  is_weekly: p.category === 'weekly-fast-moving',
  occasions: p.occasions ?? [],
  styles: p.styles ?? [],
}))

async function seed() {
  console.log(`Seeding ${rows.length} products...`)

  // Insert in batches of 100
  const BATCH = 100
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'id' })
    if (error) {
      console.error(`Batch ${Math.floor(i / BATCH) + 1} failed:`, error.message)
      process.exit(1)
    }
    console.log(`  ✓ ${Math.min(i + BATCH, rows.length)} / ${rows.length}`)
  }

  const weekly = rows.filter(r => r.is_weekly)
  console.log(`\nDone! ${rows.length} products seeded.`)
  console.log(`${weekly.length} marked as weekly picks.`)
}

seed().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
