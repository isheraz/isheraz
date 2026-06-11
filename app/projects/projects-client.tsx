'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ArrowUpRight } from '@/components/icons'

export function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialProjects.length === 6)
  const [page, setPage] = useState(1)

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
          {projects.map(p => {
            const CardWrapper = p.hide_url || !p.href ? 'div' : 'a';
            return (
              <CardWrapper key={p.id} className="proj-card" {...(CardWrapper === 'a' ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}>
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
                    {!p.hide_url && p.href ? (
                      <>
                        Visit <ArrowUpRight size={12} />
                      </>
                    ) : null}
                  </span>
                </div>
              </div>
            </CardWrapper>
          )})}
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
  )
}
