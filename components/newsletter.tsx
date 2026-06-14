import { createClient } from '@/utils/supabase/server'
import { NewsletterClient } from './newsletter-client'

export async function Newsletter() {
  const supabase = await createClient()
  
  // RLS typically blocks raw SELECTs on the subscribers table to prevent email scraping.
  // We use a securely defined RPC function to get the count instead.
  // If the RPC hasn't been created yet, this will fail gracefully and fall back to 0.
  const { data: count, error } = await supabase.rpc('get_subscriber_count')

  // If the RPC fails (e.g. doesn't exist), try the raw query as a fallback
  let finalCount = count || 0
  if (error) {
    const { count: rawCount } = await supabase.from('subscribers').select('*', { count: 'exact', head: true })
    finalCount = rawCount || 0
  }

  return <NewsletterClient subscriberCount={finalCount} />
}
