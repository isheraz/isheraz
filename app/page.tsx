import { ThemeProvider, ScrollRevealProvider } from '@/components/providers'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { NowStrip } from '@/components/now'
import { Projects } from '@/components/projects'
import { Essays } from '@/components/essays'
import { Hire } from '@/components/hire'
import { Education } from '@/components/education'
import { GitHubSection } from '@/components/github'
import { Newsletter } from '@/components/newsletter'
import { About } from '@/components/about'
import { TweaksPanel, TweakSection, TweakColor, TweakRadio } from '@/components/tweaks-panel'

export default async function App() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sheraz Ahmed',
    url: 'https://isheraz.com',
    jobTitle: 'Solutions Architect & AI Product Builder',
    sameAs: [
      'https://github.com/isheraz',
      'https://linkedin.com/in/isheraz'
    ]
  }

  return (
    <ThemeProvider>
      <ScrollRevealProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>
          <Hero />
          <NowStrip />
          <div className="reveal"><Projects /></div>
          <div className="reveal"><Essays /></div>
          <div className="reveal"><Hire /></div>
          <div className="reveal"><Education /></div>
          <div className="reveal"><GitHubSection /></div>
          <div className="reveal"><Newsletter /></div>
          <div className="reveal"><About /></div>
        </main>
        <Footer />
      </ScrollRevealProvider>
    </ThemeProvider>
  )
}
