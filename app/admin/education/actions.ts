'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const educationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  school: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  meta_tags: z.array(z.string()).optional().default([]),
  sort_order: z.number().int().default(0),
  is_published: z.boolean().default(true)
})

export async function deleteEducation(id: string) {
  const supabase = await createClient()
  await supabase.from('education').delete().eq('id', id)
  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
}

export async function togglePublishedStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  await supabase.from('education').update({ is_published: !currentStatus }).eq('id', id)
  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
}

export async function createEducation(payload: any) {
  const supabase = await createClient()
  
  if (!payload.slug) {
    payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
  
  const validatedData = educationSchema.parse(payload)
  
  const { error } = await supabase.from('education').insert(validatedData)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
  redirect('/admin/education')
}

export async function updateEducation(id: string, payload: any) {
  const supabase = await createClient()
  
  const validatedData = educationSchema.parse(payload)
  
  const { error } = await supabase.from('education').update(validatedData).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/education')
  revalidatePath('/', 'layout')
  redirect('/admin/education')
}
