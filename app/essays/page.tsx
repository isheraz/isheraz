import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Essays } from '@/components/essays'
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/site'

const description = 'Technical deep-dives, personal field notes, and reflections from a Muslim engineer in Lahore. Long-form, no listicles.'

export const metadata: Metadata = {
  title: 'Essays',
  description,
  alternates: {
    canonical: absoluteUrl('/essays'),
  },
  openGraph: {
    title: 'Essays | Sheraz Ahmed',
    description,
    url: absoluteUrl('/essays'),
    type: 'website',
    siteName: 'Sheraz Ahmed',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    title: 'Essays | Sheraz Ahmed',
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
}

export default function EssaysIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <Essays showAll />
      </main>
      <Footer />
    </>
  )
}
