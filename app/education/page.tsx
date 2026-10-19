import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Education } from '@/components/education'
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/site'

const description = 'Tutorials I\'ve written, talks I\'ve given, and the resource lists I\'d hand a younger version of myself.'

export const metadata: Metadata = {
  title: 'Education',
  description,
  alternates: {
    canonical: absoluteUrl('/education'),
  },
  openGraph: {
    title: 'Education | Sheraz Ahmed',
    description,
    url: absoluteUrl('/education'),
    type: 'website',
    siteName: 'Sheraz Ahmed',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    title: 'Education | Sheraz Ahmed',
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
}

export default function EducationIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <Education showAll />
      </main>
      <Footer />
    </>
  )
}
