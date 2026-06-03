import EducationDetail from '@/components/education-detail'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: item } = await supabase.from('education').select('title, school').eq('slug', slug).eq('is_published', true).single()
  
  if (!item) return {}

  return {
    title: `${item.title} at ${item.school}`,
    description: `Details about my education and degree: ${item.title} from ${item.school}.`,
    openGraph: {
      title: `${item.title} at ${item.school} | Sheraz Ahmed`,
      description: `Details about my education and degree: ${item.title} from ${item.school}.`,
      type: 'article',
      url: `https://isheraz.com/education/${slug}`
    }
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: item.title,
    provider: {
      '@type': 'EducationalOrganization',
      name: item.school
    },
    timeToComplete: 'P4Y',
    educationalCredentialAwarded: item.title,
    url: `https://isheraz.com/education/${slug}`
  }

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
