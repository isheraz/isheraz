'use client'
import { PROJECTS } from '@/lib/data'
import { ArrowUpRight } from './icons'

export function Projects() {
  const featured = PROJECTS.find(p => p.feature)
  const regular = PROJECTS.filter(p => !p.feature)

  return (
    <section id="projects">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Selected work / Ventures</div>
            <h2 className="section-title">Products I've built — or am still building.</h2>
            <p className="section-sub">From AI voice agents that close debt to NFT marketplaces serving 300+ concurrent transactions. A subset of what I've shipped.</p>
          </div>
          <a className="section-link" href="https://github.com/isheraz" target="_blank" rel="noreferrer">
            More on GitHub <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="proj-grid">
          {featured && (
            <a key={featured.id} className="proj-card feature" href={featured.href} target="_blank" rel="noreferrer">
              <div>
                <div className="proj-head" style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="proj-logo">{featured.logo}</div>
                    <div>
                      <div className="proj-name">{featured.name}</div>
                      <div className="proj-tag">{featured.tag} · {featured.year}</div>
                    </div>
                  </div>
                  <span className="proj-status" data-tone={featured.status}>{featured.statusLabel}</span>
                </div>
                <p className="proj-desc" style={{ fontSize: 17 }}>{featured.desc}</p>
                <div className="proj-stack" style={{ marginTop: 18 }}>
                  {featured.stack.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
                <div className="proj-foot" style={{ marginTop: 22 }}>
                  <span>{featured.role}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {featured.href.replace('https://', '').replace('http://', '')} <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
              <div className="proj-art" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent)' }} />
                  Live call · INV-1042 · 00:24
                </div>
                <div style={{ flex: '1 1 0%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 56 }}>
                    {[48.8396, 61.2492, 71.7096, 78.6105, 80.9603, 78.5585, 72.0304, 62.7188, 52.45, 43.217, 36.8325, 34.6142, 37.1557, 44.223, 54.7956, 67.2438, 79.6115, 89.957, 96.6899, 98.8478, 66.2634, 59.594, 50.2067, 39.9412, 30.7897, 24.5509, 22.5172, 25.2499, 32.4819, 43.1642, 55.6478, 67.9706, 78.1986, 84.7619, 86.7275, 83.9617, 77.1532, 67.6932, 57.4342, 48.3672, 42.2762, 40.4279, 43.3514, 50.7465, 61.5357, 44.0515, 56.3262, 66.4343, 72.8264, 74.5996, 71.6535, 64.708, 55.1785, 44.9291, 35.9495, 30.0084, 28.3463, 31.4602, 39.0166, 49.91, 62.4548, 74.6784, 84.6638, 90.8835].map((h, i) => (
                      <div key={i} style={{ flex: '1 1 0%', height: `${h}%`, background: i < 42 ? 'var(--accent)' : 'var(--border-strong)', borderRadius: '1.5px', minHeight: 3 }} />
                    ))}
                  </div>
                  <div style={{ marginTop: 18, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55, fontStyle: 'italic' }}>
                    "Hi, this is Maya from Chasyr calling about invoice 1042 from March. Would you like to discuss a payment plan?"
                  </div>
                  <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
                    <span>OUTCOME: Payment plan agreed</span>
                    <span style={{ color: '#16a34a' }}>$4,820 recovered</span>
                  </div>
                </div>
              </div>
            </a>
          )}
          {regular.map(p => (
            <a key={p.id} className="proj-card" href={p.href} target="_blank" rel="noreferrer">
              <div className="proj-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="proj-logo">{p.logo}</div>
                  <div>
                    <div className="proj-name">{p.name}</div>
                    <div className="proj-tag">{p.tag}</div>
                  </div>
                </div>
                <span className="proj-status" data-tone={p.status}>{p.statusLabel}</span>
              </div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
              <div className="proj-foot">
                <span>{p.role} · {p.year}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Visit <ArrowUpRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
