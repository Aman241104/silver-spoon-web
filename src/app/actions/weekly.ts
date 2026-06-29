'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

export async function toggleWeekly(id: string, isWeekly: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase
    .from('products')
    .update({ is_weekly: isWeekly })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidateTag('products', 'max')
  revalidateTag('weekly-products', 'max')
  revalidatePath('/')
  revalidatePath('/collections/weekly-fast-moving')
  return { error: undefined }
}
