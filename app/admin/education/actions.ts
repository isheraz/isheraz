'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteEducation(id: string) {
  const supabase = await createClient()
  await supabase.from('education').delete().eq('id', id)
  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
}

export async function createEducation(payload: any) {
  const supabase = await createClient()
  
  if (!payload.slug) {
    payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
  
  const { error } = await supabase.from('education').insert(payload)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
  redirect('/admin/education')
}

export async function updateEducation(id: string, payload: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('education').update(payload).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
  redirect('/admin/education')
}
