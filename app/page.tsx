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
import { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakRadio, TweakSelect } from '@/components/tweaks-panel'

const TWEAK_DEFAULTS = {
  dark: true,
  accent: '#8ec052',
  density: 'regular',
  font: 'geist',
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

export default function App() {
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
        <Hero variant={t.heroVariant} />
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

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakToggle label="Dark mode" value={t.dark} onChange={(v: any) => setTweak('dark', v)} />
          <TweakColor
            label="Accent"
            value={t.accent}
            options={['#8ec052', '#ff5b1f', '#2563eb', '#a855f7', '#f6f5f1']}
            onChange={(v: any) => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'regular', label: 'Regular' },
              { value: 'airy', label: 'Airy' },
            ]}
            onChange={(v: any) => setTweak('density', v)}
          />
          <TweakRadio
            label="Hero layout"
            value={t.heroVariant}
            options={[
              { value: 'default', label: 'Default' },
              { value: 'split', label: 'Split' },
              { value: 'centered', label: 'Center' },
            ]}
            onChange={(v: any) => setTweak('heroVariant', v)}
          />
        </TweakSection>
        <TweakSection label="Type">
          <TweakSelect
            label="Font pairing"
            value={t.font}
            options={[
              { value: 'geist', label: 'Geist + Geist Mono' },
              { value: 'instrument', label: 'Instrument Sans + JetBrains' },
              { value: 'spaceGrotesk', label: 'Space Grotesk + JetBrains' },
            ]}
            onChange={(v: any) => setTweak('font', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  )
}
