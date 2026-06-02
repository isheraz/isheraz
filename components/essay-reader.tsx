'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { GitHub, LinkedIn, Arrow } from './icons'

export function EssayReader({ essay }: { essay: any }) {
  const router = useRouter()
  const [progress, setProgress] = React.useState(0)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') router.back() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (!essay) return null

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="reader-overlay" role="dialog" aria-modal="true">
      <div className="reader-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <button className="reader-close-fab" onClick={() => router.back()} aria-label="Close essay" title="Close (Esc)">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l8 8M12 4L4 12" /></svg>
      </button>
      <header className="reader-bar">
        <div className="shell reader-bar-inner">
          <div className="reader-bar-meta">
            <span className="essay-cat" data-cat={essay.category}>{essay.category}</span>
            <span>·</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>{essay.read_time} read</span>
          </div>
        </div>
      </header>
      <div className="reader-scroller" ref={scrollerRef}>
        <article className="reader-article">
          <div className="reader-eyebrow">
            <span className="essay-cat" data-cat={essay.category}>{essay.category}</span>
            <span>·</span>
            <time>{fmtDate(essay.published_at)}</time>
          </div>
          <h1 className="reader-title">{essay.title}</h1>
          <p className="reader-deck">{essay.subtitle}</p>
          <div className="reader-byline">
            <div className="reader-avatar">SA</div>
            <div>
              <div className="reader-byname">Sheraz Ahmed</div>
              <div className="reader-bymeta">Solutions Architect · Lahore</div>
            </div>
            <div style={{ flex: 1 }} />
            <div className="reader-byshare">
              <a className="icon-btn" href="https://github.com/isheraz" target="_blank" rel="noreferrer"><GitHub size={14} /></a>
              <a className="icon-btn" href="https://linkedin.com/in/isheraz" target="_blank" rel="noreferrer"><LinkedIn size={14} /></a>
            </div>
          </div>
          <div className="reader-body" dangerouslySetInnerHTML={{ __html: essay.content }}>
          </div>
          <div className="reader-end">
            <div className="reader-end-rule" />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>End of essay</div>
            <div className="reader-end-cta">
              <a className="btn btn-accent" href="/#newsletter">Get the next one by email <Arrow size={13} /></a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
