import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // Fetch dynamic routes
  const [essaysRes, projectsRes, eduRes] = await Promise.all([
    supabase.from('essays').select('slug, updated_at, published_at').eq('is_published', true).lte('published_at', new Date().toISOString()),
    supabase.from('projects').select('id, updated_at, created_at'),
    supabase.from('education').select('slug, created_at')
  ])

  const essays = (essaysRes.data || []).map((essay) => ({
    url: `https://isheraz.com/essays/${essay.slug}`,
    lastModified: new Date(essay.updated_at || essay.published_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const education = (eduRes.data || []).map((edu) => ({
    url: `https://isheraz.com/education/${edu.slug}`,
    lastModified: new Date(edu.created_at || Date.now()),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const routes = [
    {
      url: 'https://isheraz.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://isheraz.com/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://isheraz.com/login',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    }
  ]

  return [...routes, ...essays, ...education]
}
