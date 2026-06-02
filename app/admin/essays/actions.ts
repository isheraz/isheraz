'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteEssay(id: string) {
  const supabase = await createClient()
  await supabase.from('essays').delete().eq('id', id)
  revalidatePath('/admin/essays')
  revalidatePath('/', 'layout')
}

export async function togglePublished(id: string, currentState: boolean) {
  const supabase = await createClient()
  await supabase.from('essays').update({ is_published: !currentState }).eq('id', id)
  revalidatePath('/admin/essays')
  revalidatePath('/', 'layout')
}

export async function createEssay(payload: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('essays').insert(payload)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/essays')
  revalidatePath('/', 'layout')
  redirect('/admin/essays')
}

export async function updateEssay(id: string, payload: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('essays').update(payload).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/essays')
  revalidatePath('/', 'layout')
  redirect('/admin/essays')
}
