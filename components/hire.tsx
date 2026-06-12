import { createClient } from '@/utils/supabase/server'
import { HireClient } from './hire-client'

export async function Hire() {
  const supabase = await createClient()
  const { data: tiers } = await supabase.from('consulting_tiers').select('*').order('sort_order', { ascending: true })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (tiers || []).map(t => ({
      '@type': 'Question',
      name: `What is included in the ${t.name} consulting tier?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${t.description} Features include: ${(t.features || []).join(', ')}. Price: ${t.price_label} ${t.unit}.`
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HireClient tiers={tiers || []} />
    </>
  )
}
