'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'
import type { NavMenu } from '@/lib/db'

export async function createNavMenuItem(menu: NavMenu, title: string, href: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('nav_items').insert({ menu, title, href })
  if (error) return { error: error.message }
  revalidateTag('nav-items', 'max')
  revalidatePath('/admin/nav-menu')
  return { error: undefined }
}

export async function deleteNavMenuItem(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { error } = await supabase.from('nav_items').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidateTag('nav-items', 'max')
  revalidatePath('/admin/nav-menu')
  return { error: undefined }
}
