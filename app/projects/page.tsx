import { createClient } from '@/utils/supabase/server'
import { ProjectsClient } from './projects-client'

export default async function ProjectsPage() {
  const supabase = await createClient()
  // Fetch initial batch
  const { data: initialProjects } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })
    .limit(6)
    
  return <ProjectsClient initialProjects={initialProjects || []} />
}
