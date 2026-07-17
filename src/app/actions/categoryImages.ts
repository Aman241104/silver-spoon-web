'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

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

export async function deleteCategoryImage(slug: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('category_images').delete().eq('slug', slug)
  if (error) return { error: error.message }
  revalidateTag('category-images', 'max')
  revalidatePath('/products')
  return { error: undefined }
}
