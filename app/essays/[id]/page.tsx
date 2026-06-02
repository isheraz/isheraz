import { createClient } from '@/utils/supabase/server'
import { EssayReader } from '@/components/essay-reader'
import { notFound } from 'next/navigation'

export default async function EssayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params
  
  const supabase = await createClient()
  const { data: essay } = await supabase
    .from('essays')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!essay) notFound()

  return <EssayReader essay={essay} />
}
