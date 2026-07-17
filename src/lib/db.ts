import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import type { Product } from '@/data/products'

export type DbProduct = Product & { isWeekly?: boolean }

export type DbProductLean = {
  id: string
  name: string
  category: string
  image: string
  price: number
  featured?: boolean
  isWeekly?: boolean
}

export type DbCollection = {
  slug: string
  title: string
  description?: string
  image_url?: string
  link_href?: string
  sort_order: number
  is_active: boolean
}

export type DbOffer = {
  id: number
  title: string
  subtitle?: string
  badge_text?: string
  image_url?: string
  link_href?: string
  cta_text: string
  is_active: boolean
  sort_order: number
}

const PRODUCT_CARD_SELECT = 'id,name,category,sub_category,image,price,featured,is_weekly,purity,gender,description'
const LEAN_SELECT = 'id,name,category,image,price,featured,is_weekly'
const COLLECTION_SELECT = 'slug,title,description,image_url,link_href,sort_order,is_active'
const OFFER_SELECT = 'id,title,subtitle,badge_text,image_url,link_href,cta_text,is_active,sort_order'

function rowToProduct(row: Record<string, unknown>): DbProduct {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    subCategory: (row.sub_category as string) || undefined,
    serialNumber: (row.serial_number as string) || undefined,
    purity: (row.purity as string) || undefined,
    gender: (row.gender as Product['gender']) || undefined,
    description: (row.description as string) || '',
    image: (row.image as string) || '',
    price: Number(row.price) || 0,
    weight: (row.weight as string) || undefined,
    dimensions: (row.dimensions as string) || undefined,
    featured: (row.featured as boolean) || false,
    trending: (row.trending as boolean) || false,
    isWeekly: (row.is_weekly as boolean) || false,
    occasions: (row.occasions as string[]) || [],
    styles: (row.styles as string[]) || [],
  }
}

function rowToProductLean(row: Record<string, unknown>): DbProductLean {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    image: (row.image as string) ?? '',
    price: Number(row.price) || 0,
    featured: (row.featured as boolean) || false,
    isWeekly: (row.is_weekly as boolean) || false,
  }
}

function sbUrl() { return process.env.NEXT_PUBLIC_SUPABASE_URL! }
function sbKey() { return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! }
function sbHeaders(extra?: Record<string, string>) {
  return {
    apikey: sbKey(),
    Authorization: `Bearer ${sbKey()}`,
    'Accept-Profile': 'public',
    ...extra,
  }
}

async function pgGet(path: string, extra?: Record<string, string>): Promise<Response> {
  return fetch(`${sbUrl()}/rest/v1${path}`, { headers: sbHeaders(extra) })
}

async function pgRows(path: string, extra?: Record<string, string>): Promise<Record<string, unknown>[]> {
  const res = await pgGet(path, extra)
  const json = await res.json()
  if (!Array.isArray(json)) {
    if (process.env.NODE_ENV !== 'production') console.error('[db] pgRows error:', JSON.stringify(json))
    return []
  }
  return json
}

async function pgRowsWithCount(path: string): Promise<{ rows: Record<string, unknown>[]; total: number }> {
  const res = await pgGet(path, { Prefer: 'count=exact' })
  const json = await res.json()
  const rows = Array.isArray(json) ? json : []
  const contentRange = res.headers.get('Content-Range') ?? ''
  const total = Number(contentRange.split('/')[1]) || 0
  return { rows, total }
}

async function pgHead(path: string): Promise<number> {
  try {
    const res = await fetch(`${sbUrl()}/rest/v1${path}`, {
      method: 'HEAD',
      headers: sbHeaders({ Prefer: 'count=exact' }),
    })
    if (!res.ok) return 0
    const range = res.headers.get('Content-Range') ?? ''
    return Number(range.split('/')[1]) || 0
  } catch {
    return 0
  }
}

// ─── Counts (cached) ─────────────────────────────────────────────────────────

export async function countProducts(filter?: string): Promise<number> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  return pgHead(`/products?select=id${filter ? `&${filter}` : ''}`)
}

export async function countActiveOffers(): Promise<number> {
  'use cache'
  cacheLife('minutes')
  cacheTag('offers')
  return pgHead('/offers?select=id&is_active=eq.true')
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<DbProduct[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const rows = await pgRows('/products?select=*&order=name')
  return rows.map(rowToProduct)
}

export async function getProductsPaginated(
  page: number,
  limit = 50
): Promise<{ products: DbProduct[]; total: number }> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const offset = (page - 1) * limit
  const { rows, total } = await pgRowsWithCount(
    `/products?select=*&order=name&limit=${limit}&offset=${offset}`
  )
  return { products: rows.map(rowToProduct), total }
}

export async function getAllProductsLean(): Promise<DbProductLean[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const rows = await pgRows(`/products?select=${LEAN_SELECT}&order=name`)
  return rows.map(rowToProductLean)
}

export async function getProductsPaginatedLean(
  page: number,
  limit = 40
): Promise<{ products: DbProductLean[]; total: number }> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const offset = (page - 1) * limit
  const { rows, total } = await pgRowsWithCount(
    `/products?select=${LEAN_SELECT}&order=name&limit=${limit}&offset=${offset}`
  )
  return { products: rows.map(rowToProductLean), total }
}

export async function searchProductsLean(query: string): Promise<DbProductLean[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const params = new URLSearchParams()
  params.set('select', LEAN_SELECT)
  params.set('or', `(name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%)`)
  params.set('order', 'name')
  const rows = await pgRows(`/products?${params}`)
  return rows.map(rowToProductLean)
}

export async function getWeeklyProducts(): Promise<DbProduct[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('products', 'weekly-products')
  const rows = await pgRows(`/products?select=${PRODUCT_CARD_SELECT}&is_weekly=eq.true&order=name&limit=6`)
  return rows.map(rowToProduct)
}

const NON_JEWELLERY = ['utensils', 'german-silver', 'silver-coated', 'silver-idols', 'silver-frames', 'rakhi']

export async function getProductsByCategory(slug: string): Promise<DbProduct[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const params = new URLSearchParams({ select: PRODUCT_CARD_SELECT, order: 'name' })
  if (slug === 'men' || slug === 'women') {
    params.set('gender', `eq.${slug}`)
    params.set('category', `not.in.(${NON_JEWELLERY.join(',')})`)
  } else if (slug === 'weekly-fast-moving') {
    params.set('is_weekly', 'eq.true')
  } else {
    params.set('category', `eq.${slug}`)
  }
  const rows = await pgRows(`/products?${params}`)
  return rows.map(rowToProduct)
}

export async function getProductById(id: string): Promise<DbProduct | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const rows = await pgRows(`/products?id=eq.${encodeURIComponent(id)}&limit=1`)
  return rows[0] ? rowToProduct(rows[0]) : null
}

export async function searchProducts(query: string): Promise<DbProduct[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')
  const params = new URLSearchParams()
  params.set('or', `(name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%)`)
  params.set('order', 'name')
  const rows = await pgRows(`/products?${params}`)
  return rows.map(rowToProduct)
}

// ─── Collections ────────────────────────────────────────────────────────────

function rowToCollection(row: Record<string, unknown>): DbCollection {
  return {
    slug: row.slug as string,
    title: row.title as string,
    description: (row.description as string) || undefined,
    image_url: (row.image_url as string) || undefined,
    link_href: (row.link_href as string) || undefined,
    sort_order: Number(row.sort_order) || 0,
    is_active: (row.is_active as boolean) ?? true,
  }
}

export async function getCollections(): Promise<DbCollection[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('collections')
  const rows = await pgRows(`/collections?select=${COLLECTION_SELECT}&is_active=eq.true&order=sort_order`)
  return rows.map(rowToCollection)
}

export async function getAllCollections(): Promise<DbCollection[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('collections')
  const rows = await pgRows(`/collections?select=${COLLECTION_SELECT}&order=sort_order`)
  return rows.map(rowToCollection)
}

// ─── Offers ─────────────────────────────────────────────────────────────────

function rowToOffer(row: Record<string, unknown>): DbOffer {
  return {
    id: Number(row.id),
    title: row.title as string,
    subtitle: (row.subtitle as string) || undefined,
    badge_text: (row.badge_text as string) || undefined,
    image_url: (row.image_url as string) || undefined,
    link_href: (row.link_href as string) || undefined,
    cta_text: (row.cta_text as string) || 'Shop Now',
    is_active: (row.is_active as boolean) ?? true,
    sort_order: Number(row.sort_order) || 0,
  }
}

export async function getActiveOffers(): Promise<DbOffer[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('offers')
  const rows = await pgRows(`/offers?select=${OFFER_SELECT}&is_active=eq.true&order=sort_order`)
  return rows.map(rowToOffer)
}

export async function getAllOffers(): Promise<DbOffer[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('offers')
  const rows = await pgRows(`/offers?select=${OFFER_SELECT}&order=sort_order`)
  return rows.map(rowToOffer)
}

export async function getOfferById(id: number): Promise<DbOffer | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag('offers')
  const rows = await pgRows(`/offers?select=${OFFER_SELECT}&id=eq.${id}&limit=1`)
  return rows[0] ? rowToOffer(rows[0]) : null
}

// ─── Category Images ─────────────────────────────────────────────────────────

export async function getCategoryImages(): Promise<Record<string, string>> {
  'use cache'
  cacheLife('hours')
  cacheTag('category-images')
  const rows = await pgRows('/category_images?select=slug,image_url')
  const map: Record<string, string> = {}
  for (const row of rows) {
    if (row.slug) map[row.slug as string] = (row.image_url as string) ?? ''
  }
  return map
}

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
