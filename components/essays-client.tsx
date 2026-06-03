'use client'
import { useState } from 'react'
import Link from 'next/link'

export function EssaysClient({ essays }: { essays: any[] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const filters = ['All', 'Technical', 'Personal', 'Religious']
  const essaysPerPage = 6

  const filteredEssays = activeFilter === 'All'
    ? essays
    : essays.filter(e => e.category === activeFilter)

  const totalPages = Math.ceil(filteredEssays.length / essaysPerPage)
  const startIdx = (currentPage - 1) * essaysPerPage
  const paginatedEssays = filteredEssays.slice(startIdx, startIdx + essaysPerPage)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(newPage)
    setTimeout(() => {
      const essayList = document.querySelector('.essay-list')
      essayList?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <section id="essays">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Essays / Writing</div>
            <h2 className="section-title">Notes on building, faith, and the work.</h2>
            <p className="section-sub">Technical deep-dives, personal field notes, and reflections from a Muslim engineer in Lahore. Long-form, no listicles.</p>
          </div>
          <div className="essay-filters" role="tablist" aria-label="Essay categories">
            {filters.map(filter => (
              <button
                key={filter}
                className="essay-filter"
                aria-pressed={filter === activeFilter}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="essay-list">
          {paginatedEssays.map((e) => {
            const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            return (
              <Link key={e.id} className="essay-row" href={`/essays/${e.slug}`}>
                <div className="essay-date">{fmtDate(e.published_at)}</div>
                <div>
                  <div className="essay-title">{e.title}</div>
                  <div className="essay-title-meta">{e.subtitle}</div>
                </div>
                <div className="essay-cat" data-cat={e.category}>{e.category}</div>
                <div className="essay-read">{e.read_time}</div>
              </Link>
            )
          })}
        </div>
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--border)', alignItems: 'center' }}>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 1 ? 'var(--fg-4)' : 'var(--fg-2)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                padding: '4px 8px',
                transition: 'color .2s',
                opacity: currentPage === 1 ? 0.4 : 1
              }}
            >
              ←
            </button>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: page === currentPage ? 'var(--accent)' : 'var(--fg-4)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all .2s',
                    opacity: page === currentPage ? 1 : 0.4
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === totalPages ? 'var(--fg-4)' : 'var(--fg-2)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                padding: '4px 8px',
                transition: 'color .2s',
                opacity: currentPage === totalPages ? 0.4 : 1
              }}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
