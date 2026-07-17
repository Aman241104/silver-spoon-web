'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

async function requireAuth(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' as const }
  return null
}

export async function createReview(formData: FormData) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError

  const row = {
    name: formData.get('name') as string,
    rating: Number(formData.get('rating')) || 5,
    body: formData.get('body') as string,
    published: formData.get('published') === 'true',
    sort_order: Number(formData.get('sortOrder')) || 0,
  }
  if (!row.name || !row.body) return { error: 'Name and review text are required.' }

  const { error } = await supabase.from('reviews').insert(row)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  revalidatePath('/admin/reviews')
  return { error: undefined }
}

export async function deleteReview(id: string) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('reviews').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  revalidatePath('/admin/reviews')
  return { error: undefined }
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('reviews').update({ published }).eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('reviews', 'max')
  revalidatePath('/')
  return { error: undefined }
}
