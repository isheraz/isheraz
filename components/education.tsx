import { createClient } from '@/utils/supabase/server'
import { EducationClient } from './education-client'

export async function Education() {
  const supabase = await createClient()
  const { data: education } = await supabase.from('education').select('*').eq('is_published', true).order('created_at', { ascending: false })

  return <EducationClient education={education || []} />
}
