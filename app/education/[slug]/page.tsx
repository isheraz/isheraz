import EducationDetail from '@/components/education-detail'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { absoluteUrl, plainText, DEFAULT_OG_IMAGE } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: item } = await supabase
    .from('education')
    .select('title, description')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!item) return {}

  const description = plainText(item.description) || item.title
  const url = absoluteUrl(`/education/${slug}`)

  return {
    title: item.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: item.title,
      description,
      type: 'article',
      url,
      siteName: 'Sheraz Ahmed',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title: item.title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}

export default async function EducationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!slug) notFound()

  const supabase = await createClient()

  const { data: item } = await supabase
    .from('education')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!item) notFound()

  const { data: moreItems } = await supabase
    .from('education')
    .select('*')
    .neq('slug', slug)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  const description = plainText(item.description)
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: item.title,
    url: absoluteUrl(`/education/${slug}`),
  }
  if (description) jsonLd.description = description

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationDetail item={item} moreItems={moreItems || []} />
    </>
  )
}
