'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

function formDataToRow(formData: FormData) {
  return {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    sub_category: (formData.get('subCategory') as string) || null,
    serial_number: (formData.get('serialNumber') as string) || null,
    purity: (formData.get('purity') as string) || null,
    gender: (formData.get('gender') as string) || null,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    price: Number(formData.get('price')) || 0,
    weight: (formData.get('weight') as string) || null,
    dimensions: (formData.get('dimensions') as string) || null,
    featured: formData.get('featured') === 'true',
    trending: formData.get('trending') === 'true',
    is_weekly: formData.get('isWeekly') === 'true',
  }
}

async function requireAuth(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' as const }
  return null
}

export async function createProduct(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError

  const row = formDataToRow(formData)

  if (!row.name || !row.category) {
    return { error: 'Name and category are required.' }
  }

  const { generateUniqueId } = await import('@/lib/generateUniqueId')
  let insertError: string | undefined
  const id = await generateUniqueId(row.name, async (candidate) => {
    const { error } = await supabase.from('products').insert({ ...row, id: candidate })
    if (!error) return { ok: true }
    if (error.code === '23505') return { ok: false } // PK collision, retry with a new suffix
    insertError = error.message
    return { ok: true } // stop retrying on a non-collision error
  }).catch(() => undefined)

  if (insertError) return { error: insertError }
  if (!id) return { error: 'Could not generate a unique product ID. Please try again.' }

  updateTag('products')
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath(`/collections/${row.category}`)
  return { error: undefined }
}

export async function updateProduct(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError

  const id = formData.get('id') as string
  const row = formDataToRow(formData)

  const { error } = await supabase.from('products').update(row).eq('id', id)
  if (error) return { error: error.message }

  updateTag('products')
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath(`/collections/${row.category}`)
  revalidatePath(`/product/${id}`)
  return { error: undefined }
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('products').update({ featured: isFeatured }).eq('id', id)
  if (error) return { error: error.message }
  updateTag('products')
  return { error: undefined }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }

  updateTag('products')
  revalidatePath('/')
  revalidatePath('/products')
  return { error: undefined }
}
