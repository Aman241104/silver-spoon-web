'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
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
  revalidatePath('/admin/subcategories')
  revalidatePath('/admin/products/new')
  return { error: undefined }
}

export async function deleteSubcategory(slug: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('subcategories').delete().eq('slug', slug)
  if (error) return { error: error.message }
  revalidateTag('subcategories', 'max')
  revalidatePath('/admin/subcategories')
  revalidatePath('/admin/products/new')
  return { error: undefined }
}
