'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

async function requireAuth(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' as const }
  return null
}

export async function deleteCollection(slug: string) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('collections').delete().eq('slug', slug)
  if (error) return { error: error.message }
  revalidateTag('collections', 'max')
  revalidatePath('/')
  return { error: undefined }
}

export async function upsertCollection(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const slug = formData.get('slug') as string
  if (!slug) return { error: 'Slug is required.' }

  const row = {
    slug,
    title: (formData.get('title') as string) || '',
    description: (formData.get('description') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    link_href: (formData.get('link_href') as string) || null,
    sort_order: Number(formData.get('sort_order')) || 0,
    is_active: formData.get('is_active') === 'true',
    updated_at: new Date().toISOString(),
  }

  if (!row.title) return { error: 'Title is required.' }

  const { error } = await supabase.from('collections').upsert(row, { onConflict: 'slug' })
  if (error) return { error: error.message }

  revalidateTag('collections', 'max')
  revalidatePath('/')
  return { error: undefined }
}
