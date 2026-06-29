'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

function formDataToOffer(formData: FormData) {
  return {
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) || null,
    badge_text: (formData.get('badge_text') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    link_href: (formData.get('link_href') as string) || null,
    cta_text: (formData.get('cta_text') as string) || 'Shop Now',
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
  }
}

async function requireAuth(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' as const }
  return null
}

export async function createOffer(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const row = formDataToOffer(formData)
  if (!row.title) return { error: 'Title is required.' }

  const { error } = await supabase.from('offers').insert(row)
  if (error) return { error: error.message }

  revalidateTag('offers', 'max')
  revalidatePath('/')
  return { error: undefined }
}

export async function updateOffer(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const id = Number(formData.get('id'))
  const row = formDataToOffer(formData)
  if (!row.title) return { error: 'Title is required.' }

  const { error } = await supabase.from('offers').update(row).eq('id', id)
  if (error) return { error: error.message }

  revalidateTag('offers', 'max')
  revalidatePath('/')
  return { error: undefined }
}

export async function toggleOfferActive(id: number, isActive: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('offers').update({ is_active: isActive }).eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('offers', 'max')
  revalidatePath('/')
  return { error: undefined }
}

export async function deleteOffer(id: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('offers').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidateTag('offers', 'max')
  revalidatePath('/')
  return { error: undefined }
}
