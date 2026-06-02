import { createClient } from '@/utils/supabase/server'
import { HomePageClient } from './home-client'

export default async function App() {
  const supabase = await createClient()
  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('year', { ascending: false })

  const { data: essays } = await supabase
    .from('essays')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const { data: education } = await supabase
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true })

  const { data: consultingTiers } = await supabase
    .from('consulting_tiers')
    .select('*')
    .order('sort_order', { ascending: true })

  const { data: nowUpdates } = await supabase
    .from('now_updates')
    .select('*')
    .order('sort_order', { ascending: true })

  const { data: siteSettings } = await supabase
    .from('site_settings')
    .select('*')
    .maybeSingle()

  const { count: subscriberCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })

  const { data: footerVentures } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })
    .limit(5)

  return <HomePageClient featuredProjects={featuredProjects || []} footerVentures={footerVentures || []} essays={essays || []} education={education || []} consultingTiers={consultingTiers || []} subscriberCount={subscriberCount || 0} nowUpdates={nowUpdates || []} siteSettings={siteSettings || null} />
}
