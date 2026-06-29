import { MetadataRoute } from 'next'
import { categories } from '@/data/products'
import { getAllProductsLean } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.silverspoonbyacj.com'

  const dbProducts = await getAllProductsLean()

  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: '/products', priority: 0.9 },
    { path: '/about', priority: 0.6 },
    { path: '/gifting', priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  const collectionRoutes = categories.map(cat => ({
    url: `${baseUrl}/collections/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const productRoutes = dbProducts.map(p => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...collectionRoutes, ...productRoutes]
}
