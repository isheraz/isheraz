'use client'

import React, { createContext, useContext } from 'react'
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

type ThemeContextType = {
  t: typeof TWEAK_DEFAULTS
  setTweak: (keyOrEdits: any, val?: any) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

  const toggleTheme = () => setTweak('dark', !t.dark)

  return (
    <ThemeContext.Provider value={{ t, setTweak, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
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
  }, [])
  return <>{children}</>
}
