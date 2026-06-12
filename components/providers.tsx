'use client'

import React, { createContext, useContext } from 'react'
import { useTweaks } from '@/components/tweaks-panel'

const TWEAK_DEFAULTS = {
  dark: typeof window !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') === 'dark'
    : true, // SSR default — the theme-init script will fix on hydration
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

  // Auto switch when OS theme changes
  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only switch if the user hasn't forced a theme via local storage
      // Actually, standard behavior is to sync if OS changes while app is open.
      setTweak('dark', e.matches)
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [setTweak])

  const toggleTheme = () => setTweak('dark', !t.dark)

  return (
    <ThemeContext.Provider value={{ t, setTweak, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * ScrollRevealProvider — DEPRECATED
 * Replaced by GSAP ScrollTrigger. Kept as a no-op passthrough so existing
 * imports don't break during migration. Will be removed once all pages
 * are migrated to the GSAP animation system.
 */
export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
