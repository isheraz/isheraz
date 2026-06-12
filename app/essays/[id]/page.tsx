import { createClient } from '@/utils/supabase/server'
import { EssayReader } from '@/components/essay-reader'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: slug } = await params
  const supabase = await createClient()
  const { data: essay } = await supabase.from('essays').select('title, summary').eq('slug', slug).eq('is_published', true).lte('published_at', new Date().toISOString()).single()
  
  if (!essay) return {}

  return {
    title: essay.title,
    description: essay.summary || `An essay by Sheraz Ahmed`,
    alternates: {
      canonical: `/essays/${slug}`
    },
    openGraph: {
      title: essay.title,
      description: essay.summary || `An essay by Sheraz Ahmed`,
      type: 'article',
      url: `https://isheraz.com/essays/${slug}`
    }
  }
}

export default async function EssayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params
  
  const supabase = await createClient()
  const { data: essay } = await supabase
    .from('essays')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .lte('published_at', new Date().toISOString())
    .single()

  if (!essay) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.summary || `An essay by Sheraz Ahmed`,
    author: {
      '@type': 'Person',
      name: 'Sheraz Ahmed',
      url: 'https://isheraz.com'
    },
    datePublished: essay.published_at || essay.created_at,
    url: `https://isheraz.com/essays/${slug}`
  }

  const { data: relatedEssays } = await supabase
    .from('essays')
    .select('id, slug, title')
    .eq('is_published', true)
    .neq('id', essay.id)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EssayReader essay={essay} relatedEssays={relatedEssays || []} />
    </>
  )
}
