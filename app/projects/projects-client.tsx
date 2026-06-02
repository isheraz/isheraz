'use client'

import React, { useState } from 'react'
import { Nav, Footer } from '@/components/nav'
import { useTweaks } from '@/components/tweaks-panel'
import { createClient } from '@/utils/supabase/client'
import { ArrowUpRight } from '@/components/icons'

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

export function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [projects, setProjects] = useState(initialProjects)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialProjects.length === 6)
  const [page, setPage] = useState(1)

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
  }, [t.dark, t.density, t.accent, t.font])

  const toggleTheme = () => setTweak('dark', !t.dark)

  const loadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    const supabase = createClient()
    const from = page * 6
    const to = from + 5
    
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })
      .range(from, to)

    if (data && data.length > 0) {
      setProjects(prev => [...prev, ...data])
      setPage(p => p + 1)
      if (data.length < 6) setHasMore(false)
    } else {
      setHasMore(false)
    }
    setLoading(false)
  }

  return (
    <>
      <Nav theme={t.dark ? 'dark' : 'light'} onToggleTheme={toggleTheme} />
      <main style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="shell">
          <div style={{ marginBottom: '4rem' }}>
            <div className="section-eyebrow">Archive</div>
            <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem' }}>All Projects</h1>
            <p className="section-sub" style={{ fontSize: '1.25rem', color: 'var(--fg-muted)', maxWidth: '600px' }}>
              A complete archive of ventures, products, and case studies I've worked on over the years.
            </p>
          </div>
          
          <div className="proj-grid">
            {projects.map(p => (
              <a key={p.id} className="proj-card" href={p.href} target="_blank" rel="noreferrer">
                <div>
                  <div className="proj-head" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="proj-logo">{p.name.substring(0, 2)}</div>
                      <div>
                        <div className="proj-name">{p.name}</div>
                        <div className="proj-tag">{p.tag}</div>
                      </div>
                    </div>
                    <span className="proj-status" data-tone={p.status}>{p.status_label || p.status}</span>
                  </div>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-stack"></div>
                  <div className="proj-foot" style={{ marginTop: 0 }}>
                    <span>{p.role} · {p.year}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      Visit <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {hasMore && (
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <button 
                onClick={loadMore} 
                disabled={loading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.875rem 1.75rem',
                  background: 'var(--bg-elev)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--fg)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
