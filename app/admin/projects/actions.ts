'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  tag: z.string().optional(),
  status: z.string().optional(),
  status_label: z.string().optional(),
  href: z.string().url().or(z.literal('')).optional(),
  role: z.string().optional(),
  year: z.number().int().optional(),
  is_featured: z.boolean().default(false)
})

export async function deleteProject(id: string) {
  const supabase = await createClient()
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
}

export async function toggleFeatured(id: string, currentState: boolean) {
  const supabase = await createClient()
  await supabase.from('projects').update({ is_featured: !currentState }).eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  
  const payload = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    tag: formData.get('tag') as string,
    status: formData.get('status') as string,
    status_label: formData.get('status_label') as string,
    href: formData.get('href') as string,
    role: formData.get('role') as string,
    year: parseInt(formData.get('year') as string, 10) || new Date().getFullYear(),
    is_featured: formData.get('is_featured') === 'on',
  }

  const validatedData = projectSchema.parse(payload)

  const { error } = await supabase.from('projects').insert(validatedData)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const payload = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    tag: formData.get('tag') as string,
    status: formData.get('status') as string,
    status_label: formData.get('status_label') as string,
    href: formData.get('href') as string,
    role: formData.get('role') as string,
    year: parseInt(formData.get('year') as string, 10) || new Date().getFullYear(),
    is_featured: formData.get('is_featured') === 'on',
  }

  const validatedData = projectSchema.parse(payload)

  const { error } = await supabase.from('projects').update(validatedData).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}
