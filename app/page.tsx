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
import { ScrollAnimations } from '@/components/animations/scroll-animations'
import { HeroAnimations } from '@/components/animations/hero-animations'
import { CardInteractions } from '@/components/animations/card-interactions'

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
    <>
      {/* GSAP animation orchestrators — these render no visible DOM,
          they just register ScrollTrigger timelines and interactions */}
      <HeroAnimations />
      <ScrollAnimations />
      <CardInteractions />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <NowStrip />
        <div data-gsap-section="projects"><Projects /></div>
        <div data-gsap-section="essays"><Essays /></div>
        <div data-gsap-section="hire"><Hire /></div>
        <div data-gsap-section="education"><Education /></div>
        <div data-gsap-section="github"><GitHubSection /></div>
        <div data-gsap-section="newsletter"><Newsletter /></div>
        <div data-gsap-section="about"><About /></div>
      </main>
      <Footer />
    </>
  )
}
