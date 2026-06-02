'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string
  if (!email) {
    return { error: 'Email is required' }
  }

  const supabase = await createClient()
  
  const { error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    
  if (error) {
    if (error.code === '23505') { // Unique violation
      return { success: true, message: 'You are already subscribed!' }
    }
    return { error: error.message }
  }

  revalidatePath('/')
  return { success: true, message: 'Thanks for subscribing! We will notify you when we launch.' }
}
