'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteNowUpdate(id: string) {
  const supabase = await createClient()
  await supabase.from('now_updates').delete().eq('id', id)
  revalidatePath('/admin/now')
  revalidatePath('/', 'layout')
}

export async function createNowUpdate(formData: FormData) {
  const supabase = await createClient()
  
  const payload = {
    tag: formData.get('tag'),
    text: formData.get('text'),
    accent: formData.get('accent'),
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
    is_active: true
  }
  
  const { error } = await supabase.from('now_updates').insert(payload)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/now')
  revalidatePath('/', 'layout')
  redirect('/admin/now')
}

export async function updateNowUpdate(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const payload = {
    tag: formData.get('tag'),
    text: formData.get('text'),
    accent: formData.get('accent'),
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
    is_active: true
  }
  
  const { error } = await supabase.from('now_updates').update(payload).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/now')
  revalidatePath('/', 'layout')
  redirect('/admin/now')
}
