'use client'
import { useState, useEffect } from 'react'
import { GH_DATA as FALLBACK_DATA } from '@/lib/data'
import { ArrowUpRight } from './icons'

export function GitHubSection() {
  const [ghData, setGhData] = useState<number[][]>(FALLBACK_DATA);
  const [total, setTotal] = useState<number>(3238);
  const [stats, setStats] = useState({ repos: 59, orgs: 7, prs: 1200, issues: 312 });

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          if (data && data.grid) {
            setGhData(data.grid);
            setTotal(data.totalContributions);
            setStats({
              repos: data.repos ?? 59,
              orgs: data.orgs ?? 7,
              prs: data.prs ?? 1200,
              issues: data.issues ?? 312,
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch GitHub data', err);
      }
    }
    fetchGitHub();
  }, []);

  // Generate dynamic rolling 12 months for the chart labels
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const months = [];
  for (let i = 11; i >= 0; i--) {
    months.push(allMonths[(currentMonth - i + 12) % 12]);
  }
  
  const startYear = currentMonth === 11 ? currentYear : currentYear - 1;
  const dateRangeString = `${months[0]} ${startYear} — ${months[11]} ${currentYear}`;

  const dayLabels = ['Mon', 'Wed', 'Fri']

  return (
    <section id="github">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">GitHub activity / Open source</div>
            <h2 className="section-title">{total.toLocaleString()} contributions, last 12 months.</h2>
            <p className="section-sub">That number isn't noise. It's deliberately integrating AI into every layer of how I write, review, and ship code.</p>
          </div>
        </div>
        <div className="gh-card">
          <div className="gh-head">
            <div>
              <div className="gh-num">{total.toLocaleString()} <small>contributions</small></div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>{dateRangeString} · across 59 repositories</div>
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
          <div className="gh-chart-wrapper">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 18, paddingBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--fg-3)' }}>
              {dayLabels.map(day => <span key={day}>{day}</span>)}
            </div>
            <div className="gh-chart-scroll">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--fg-3)', marginBottom: 6, paddingLeft: 4 }}>
                {months.map(month => <span key={month}>{month}</span>)}
              </div>
              <div className="gh-grid" role="img" aria-label="Contribution graph">
                {ghData.map((week, wi) =>
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
            <div className="gh-stat"><b>{stats.repos}</b><span>Repositories</span></div>
            <div className="gh-stat"><b>{stats.orgs}</b><span>Organisations</span></div>
            <div className="gh-stat"><b>{stats.prs > 1000 ? (stats.prs / 1000).toFixed(1) + 'k' : stats.prs}</b><span>PRs</span></div>
            <div className="gh-stat"><b>{stats.issues}</b><span>Issues closed</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
