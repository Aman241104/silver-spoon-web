'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

function formDataToRow(formData: FormData, id?: string) {
  return {
    ...(id ? { id } : { id: formData.get('id') as string }),
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

  if (!row.id || !row.name || !row.category) {
    return { error: 'ID, name, and category are required.' }
  }

  const { error } = await supabase.from('products').insert(row)
  if (error) return { error: error.message }

  revalidateTag('products', 'max')
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
  const row = formDataToRow(formData, id)

  const { error } = await supabase.from('products').update(row).eq('id', id)
  if (error) return { error: error.message }

  revalidateTag('products', 'max')
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
  revalidateTag('products', 'max')
  return { error: undefined }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const authError = await requireAuth(supabase)
  if (authError) return authError
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidateTag('products', 'max')
  revalidatePath('/')
  revalidatePath('/products')
  return { error: undefined }
}
