import EducationDetail from '@/components/education-detail'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function EducationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!slug) notFound()

  const supabase = await createClient()

  const { data: item } = await supabase
    .from('education')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!item) notFound()

  const { data: moreItems } = await supabase
    .from('education')
    .select('*')
    .neq('slug', slug)
    .order('sort_order', { ascending: true })

  return <EducationDetail item={item} moreItems={moreItems || []} />
}
