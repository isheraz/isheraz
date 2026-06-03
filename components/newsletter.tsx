import { createClient } from '@/utils/supabase/server'
import { NewsletterClient } from './newsletter-client'

export async function Newsletter() {
  const supabase = await createClient()
  const { count } = await supabase.from('subscribers').select('*', { count: 'exact', head: true })

  return <NewsletterClient subscriberCount={count || 0} />
}
