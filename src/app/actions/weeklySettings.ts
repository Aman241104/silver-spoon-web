'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

export async function updateWeeklySettings(count: number, randomize: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  if (!Number.isFinite(count) || count < 1 || count > 50) {
    return { error: 'Count must be between 1 and 50.' }
  }
  const { error } = await supabase
    .from('weekly_settings')
    .update({ count, randomize })
    .eq('id', true)
  if (error) return { error: error.message }
  revalidateTag('weekly-settings', 'max')
  revalidateTag('products', 'max')
  revalidateTag('weekly-products', 'max')
  revalidatePath('/')
  revalidatePath('/admin/weekly')
  return { error: undefined }
}
