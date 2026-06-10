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

export async function incrementLike(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.rpc('increment_essay_likes', { essay_id: id })
  if (error) {
    console.error('Failed to increment likes', error)
  }
}

function calculateReadTime(html: string): string {
  if (!html) return '1 min'
  const text = html.replace(/<[^>]+>/g, '') // strip HTML tags
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}

export async function createEssay(payload: any) {
  const supabase = await createClient()
  
  // Auto calculate read time
  payload.read_time = calculateReadTime(payload.content)

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
  
  // Auto calculate read time
  payload.read_time = calculateReadTime(payload.content)

  const { error } = await supabase.from('essays').update(payload).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/essays')
  revalidatePath('/', 'layout')
  redirect('/admin/essays')
}
