'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { z } from 'zod'

const SettingsSchema = z.object({
  bio_text: z.string().optional().nullable(),
  is_accepting_projects: z.boolean(),
  meta_currently: z.string().max(255).optional(),
  meta_based_in: z.string().max(255).optional(),
  meta_education: z.string().max(255).optional(),
  meta_stack: z.string().max(255).optional(),
  meta_side_bets: z.string().max(255).optional(),
  meta_reading: z.string().max(255).optional(),
  last_shipped_date: z.string().optional().nullable(),
})

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const id = formData.get('id') as string

  const parsedData = SettingsSchema.safeParse({
    bio_text: formData.get('bio_text'),
    is_accepting_projects: formData.get('is_accepting_projects') === 'on',
    meta_currently: formData.get('meta_currently') || '',
    meta_based_in: formData.get('meta_based_in') || '',
    meta_education: formData.get('meta_education') || '',
    meta_stack: formData.get('meta_stack') || '',
    meta_side_bets: formData.get('meta_side_bets') || '',
    meta_reading: formData.get('meta_reading') || '',
    last_shipped_date: formData.get('last_shipped_date') || null
  })

  if (!parsedData.success) {
    throw new Error(parsedData.error.message)
  }

  const payload = parsedData.data

  if (id) {
    const { error } = await supabase.from('site_settings').update(payload).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('site_settings').insert([payload])
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/settings')
  revalidatePath('/', 'layout')
}
