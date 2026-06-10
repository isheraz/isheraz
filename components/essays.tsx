import { createClient } from '@/utils/supabase/server'
import { EssaysClient } from './essays-client'

export async function Essays() {
  const supabase = await createClient()
  const { data: essays } = await supabase.from('essays').select('*').eq('is_published', true).lte('published_at', new Date().toISOString()).order('published_at', { ascending: false })

  return <EssaysClient essays={essays || []} />
}
