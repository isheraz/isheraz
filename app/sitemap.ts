import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import { absoluteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [essaysRes, eduRes] = await Promise.all([
    supabase.from('essays').select('slug, updated_at, published_at').eq('is_published', true).lte('published_at', new Date().toISOString()),
    supabase.from('education').select('slug, created_at').eq('is_published', true),
  ])

  const essays = (essaysRes.data || []).map((essay) => ({
    url: absoluteUrl(`/essays/${essay.slug}`),
    lastModified: new Date(essay.updated_at || essay.published_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const education = (eduRes.data || []).map((edu) => ({
    url: absoluteUrl(`/education/${edu.slug}`),
    lastModified: new Date(edu.created_at || Date.now()),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const routes = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: absoluteUrl('/essays'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: absoluteUrl('/education'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  return [...routes, ...essays, ...education]
}
