'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { GitHub, LinkedIn, Arrow } from './icons'
import { incrementLike } from '@/app/admin/essays/actions'
import { useGSAPContext } from '@/components/gsap-provider'
import Link from 'next/link'

export function EssayReader({ essay, relatedEssays = [] }: { essay: any, relatedEssays?: any[] }) {
  const router = useRouter()
  const [progress, setProgress] = React.useState(0)
  const [likes, setLikes] = React.useState(essay?.likes_count || 0)
  const [hasLiked, setHasLiked] = React.useState(false)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  const handleLike = async () => {
    if (hasLiked) return
    setLikes((l: number) => l + 1)
    setHasLiked(true)
    await incrementLike(essay.id)
  }

  const { lenis } = useGSAPContext()

  React.useEffect(() => {
    if (lenis) {
      lenis.stop()
      return () => lenis.start()
    }
  }, [lenis])

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

      <div className="reader-floating-actions">
        <button 
          className="reader-floating-btn"
          onClick={handleLike}
          data-active={hasLiked}
          title={hasLiked ? `${likes} Likes` : "Like this essay"}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill={hasLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          {likes > 0 && <span style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{likes}</span>}
        </button>
        
        {essay.linkedin_post_url ? (
          <a 
            className="reader-floating-btn"
            href={essay.linkedin_post_url} 
            target="_blank" 
            rel="noreferrer"
            title="Reshare on LinkedIn"
          >
            <LinkedIn size={18} />
          </a>
        ) : (
          <a 
            className="reader-floating-btn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://isheraz.com/essays/${essay.slug}`)}`} 
            target="_blank" 
            rel="noreferrer"
            title="Share on LinkedIn"
          >
            <LinkedIn size={18} />
          </a>
        )}
      </div>
      <header className="reader-bar">
        <div className="shell reader-bar-inner">
          <div className="reader-bar-meta">
            <span className="essay-cat" data-cat={essay.category}>{essay.category}</span>
            <span>·</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>{essay.read_time} read</span>
          </div>
        </div>
      </header>
      <div className="reader-scroller" ref={scrollerRef} data-lenis-prevent>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>End of essay</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
              </div>
            </div>
            <div className="reader-end-cta" style={{ marginTop: '2rem' }}>
              <a className="btn btn-accent" href="/#newsletter">Get the next one by email <Arrow size={13} /></a>
            </div>
          </div>
          
          {relatedEssays.length > 0 && (
            <div className="reader-related" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: '1rem' }}>Keep Reading</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedEssays.map(re => (
                  <Link key={re.id} href={`/essays/${re.slug}`} style={{ textDecoration: 'none', color: 'var(--fg-1)' }} className="related-link">
                    <span style={{ fontWeight: 500 }}>{re.title}</span> <Arrow size={12} style={{ display: 'inline-block', opacity: 0.5 }} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
