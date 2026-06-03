import { createClient } from '@/utils/supabase/server'
import { ProjectsClient } from './projects-client'
import { ThemeProvider } from '@/components/providers'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Projects & Ventures',
  description: 'A complete archive of ventures, products, and case studies I\'ve worked on over the years.',
  openGraph: {
    title: 'All Projects & Ventures | Sheraz Ahmed',
    description: 'A complete archive of ventures, products, and case studies I\'ve worked on over the years.',
    url: 'https://isheraz.com/projects',
  }
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  // Fetch initial batch
  const { data: initialProjects } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })
    .limit(6)
    
  return (
    <ThemeProvider>
      <Nav />
      <ProjectsClient initialProjects={initialProjects || []} />
      <Footer />
    </ThemeProvider>
  )
}
