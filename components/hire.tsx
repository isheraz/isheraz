import { createClient } from '@/utils/supabase/server'
import { HireClient } from './hire-client'

export async function Hire() {
  const supabase = await createClient()
  const { data: tiers } = await supabase.from('consulting_tiers').select('*').order('sort_order', { ascending: true })

  return <HireClient tiers={tiers || []} />
}
