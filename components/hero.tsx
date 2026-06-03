import { createClient } from '@/utils/supabase/server'
import { HeroClient } from './hero-client'

export async function Hero() {
  const supabase = await createClient()

  const [settingsRes, tiersRes] = await Promise.all([
    supabase.from('site_settings').select('*').single(),
    supabase.from('consulting_tiers').select('*')
  ])

  return <HeroClient siteSettings={settingsRes.data} consultingTiers={tiersRes.data || []} />
}
