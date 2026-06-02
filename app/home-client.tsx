'use client'

import React from 'react'
import { Nav, Footer } from '@/components/nav'
import { Hero } from '@/components/hero'
import { NowStrip } from '@/components/now'
import { Projects } from '@/components/projects'
import { Essays } from '@/components/essays'
import { Hire } from '@/components/hire'
import { Education } from '@/components/education'
import { GitHubSection } from '@/components/github'
import { Newsletter } from '@/components/newsletter'
import { About } from '@/components/about'
import { useTweaks } from '@/components/tweaks-panel'

const TWEAK_DEFAULTS = {
  dark: false,
  accent: '#8ec052',
  density: 'compact',
  font: 'spaceGrotesk',
  heroVariant: 'default'
}

const FONT_STACKS = {
  geist: {
    sans: '"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',
    serif: '"Instrument Serif", ui-serif, Georgia, serif',
  },
  instrument: {
    sans: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    serif: '"Instrument Serif", ui-serif, Georgia, serif',
  },
  spaceGrotesk: {
    sans: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    serif: '"Instrument Serif", ui-serif, Georgia, serif',
  },
}

function accentFg(hex: string) {
  const h = String(hex).replace('#', '')
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0')
  const n = parseInt(x.slice(0, 6), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const lum = r * 299 + g * 587 + b * 114
  return lum > 148000 ? '#0a0a0a' : '#ffffff'
}

function hexToRgba(hex: string, alpha: number) {
  const h = String(hex).replace('#', '')
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0')
  const n = parseInt(x.slice(0, 6), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function useScrollReveal(dep: any) {
  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const id = window.requestAnimationFrame(() => {
      const els = document.querySelectorAll('.reveal:not(.in)')
      if (!els.length) return
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
      els.forEach((el) => io.observe(el))
    })
    return () => window.cancelAnimationFrame(id)
  }, [dep])
}

export function HomePageClient({ featuredProjects, footerVentures, essays, education, consultingTiers, subscriberCount, nowUpdates, siteSettings }: { featuredProjects: any[], footerVentures: any[], essays: any[], education: any[], consultingTiers: any[], subscriberCount: number, nowUpdates: any[], siteSettings: any }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)

  React.useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', t.dark ? 'dark' : 'light')
    root.setAttribute('data-density', t.density)
    root.style.setProperty('--accent', t.accent)
    root.style.setProperty('--accent-fg', accentFg(t.accent))
    root.style.setProperty('--accent-soft', hexToRgba(t.accent, t.dark ? 0.16 : 0.10))
    const stack = (FONT_STACKS as any)[t.font] || FONT_STACKS.geist
    root.style.setProperty('--font-sans', stack.sans)
    root.style.setProperty('--font-mono', stack.mono)
    root.style.setProperty('--font-serif', stack.serif)
    try { localStorage.setItem('isheraz.theme', t.dark ? 'dark' : 'light') } catch (e) {}
  }, [t.dark, t.density, t.accent, t.font])

  useScrollReveal('home')

  const toggleTheme = () => setTweak('dark', !t.dark)

  return (
    <>
      <Nav theme={t.dark ? 'dark' : 'light'} onToggleTheme={toggleTheme} />
      <main>
        <Hero variant={t.heroVariant} siteSettings={siteSettings} consultingTiers={consultingTiers} />
        <NowStrip updates={nowUpdates} />
        <div className="reveal"><Projects projects={featuredProjects} /></div>
        <div className="reveal"><Essays essays={essays} /></div>
        <div className="reveal"><Hire tiers={consultingTiers} /></div>
        <div className="reveal"><Education education={education} /></div>
        <div className="reveal"><GitHubSection /></div>
        <div className="reveal"><Newsletter subscriberCount={subscriberCount} /></div>
        <div className="reveal"><About updates={nowUpdates} siteSettings={siteSettings} consultingTiers={consultingTiers} /></div>
      </main>
      <Footer projects={footerVentures} siteSettings={siteSettings} />
    </>
  )
}
