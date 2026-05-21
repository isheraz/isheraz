'use client'
import { GH_DATA } from '@/lib/data'
import { ArrowUpRight } from './icons'

export function GitHubSection() {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
  const dayLabels = ['Mon', 'Wed', 'Fri']

  return (
    <section id="github">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">GitHub activity / Open source</div>
            <h2 className="section-title">3,238 contributions, last 12 months.</h2>
            <p className="section-sub">That number isn't noise. It's deliberately integrating AI into every layer of how I write, review, and ship code.</p>
          </div>
        </div>
        <div className="gh-card">
          <div className="gh-head">
            <div>
              <div className="gh-num">3,238 <small>contributions</small></div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>May 2025 — May 2026 · across 59 repositories</div>
            </div>
            <div style={{ display: 'flex', gap: 22, fontSize: 13, color: 'var(--fg-3)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--fg)' }}>87</div>
                <div style={{ fontSize: 11 }}>longest streak</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--fg)' }}>15</div>
                <div style={{ fontSize: 11 }}>current streak</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 18, paddingBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--fg-4)' }}>
              {dayLabels.map(day => <span key={day}>{day}</span>)}
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--fg-4)', marginBottom: 6, paddingLeft: 4 }}>
                {months.map(month => <span key={month}>{month}</span>)}
              </div>
              <div className="gh-grid" role="img" aria-label="Contribution graph">
                {GH_DATA.map((week, wi) =>
                  week.map((level, di) => (
                    <div key={`${wi}-${di}`} className="gh-cell" data-l={level}
                         style={{ gridArea: `${di + 1} / ${wi + 1}` }}></div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="gh-foot">
            <span>AI-assisted code review · agent-driven CI · custom prompts</span>
            <div className="gh-legend">
              Less
              <i style={{ background: 'var(--grid-0)' }}></i>
              <i style={{ background: 'var(--grid-1)' }}></i>
              <i style={{ background: 'var(--grid-2)' }}></i>
              <i style={{ background: 'var(--grid-3)' }}></i>
              <i style={{ background: 'var(--grid-4)' }}></i>
              More
            </div>
          </div>
          <div className="gh-stats">
            <div className="gh-stat"><b>59</b><span>Repositories</span></div>
            <div className="gh-stat"><b>7</b><span>Organisations</span></div>
            <div className="gh-stat"><b>1.2k</b><span>PRs reviewed</span></div>
            <div className="gh-stat"><b>312</b><span>Issues closed</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
