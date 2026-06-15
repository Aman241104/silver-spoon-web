import { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://silverspoon.in'

  const staticRoutes = [
    '', '/products', '/about', '/contact', '/stores',
    '/gifting', '/gifting/concierge', '/gifting/build-a-box',
    '/gifting/group-gifting', '/corporate', '/faq', '/shipping',
    '/returns', '/care'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = products.map(p => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes]
}
