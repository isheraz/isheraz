'use client'
import { ArrowUpRight } from './icons'
import Link from 'next/link'

export function Projects({ projects = [] }: { projects?: any[] }) {
  // If no projects provided via props, we could optionally fallback to static data
  // but for the home page we want to use the DB featured projects.
  
  return (
    <section id="projects">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Selected work / Ventures</div>
            <h2 className="section-title">Products I've built — or am still building.</h2>
            <p className="section-sub">A curated selection of featured products and case studies.</p>
          </div>
          <Link className="section-link" href="/projects">
            View All Projects <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="proj-grid">
          {projects.map((p, index) => {
            const isFeatured = p.is_featured;
            return (
              <a key={p.id} className={`proj-card ${isFeatured ? 'feature' : ''}`} href={p.href} target="_blank" rel="noreferrer">
                <div>
                  <div className="proj-head" style={{ marginBottom: isFeatured ? 18 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="proj-logo">{p.name.substring(0, 2)}</div>
                      <div>
                        <div className="proj-name">{p.name}</div>
                        <div className="proj-tag">{p.tag} {isFeatured && `· ${p.year}`}</div>
                      </div>
                    </div>
                    <span className="proj-status" data-tone={p.status}>{p.status_label || p.status}</span>
                  </div>
                  <p className="proj-desc" style={{ fontSize: isFeatured ? 17 : undefined }}>{p.description}</p>
                  <div className="proj-stack" style={{ marginTop: isFeatured ? 18 : undefined }}>
                    {/* If we had stack in DB we'd map it. For now just show tag if needed, or leave empty */}
                  </div>
                  <div className="proj-foot" style={{ marginTop: isFeatured ? 22 : 0 }}>
                    <span>{p.role}{!isFeatured && ` · ${p.year}`}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {isFeatured && p.href ? p.href.replace('https://', '').replace('http://', '') : 'Visit'} <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
                {p.name.toLowerCase().includes('chasyr') && (
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
                )}
                
                {p.name.toLowerCase().includes('column') && (
                  <div className="proj-art" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent)' }} />
                      Public Notice Sync · NY-842 · Legal
                    </div>
                    <div style={{ flex: '1 1 0%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 56, gap: 4 }}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} style={{ flex: '1 1 0%', height: `${40 + i * 10}%`, background: 'var(--border-strong)', borderTopLeftRadius: 4, borderTopRightRadius: 4, display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
                            <div style={{ height: 4, background: 'var(--accent)', borderRadius: 2 }} />
                            <div style={{ flex: 1, background: 'var(--bg-elev)', borderRadius: 2 }} />
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 18, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55 }}>
                        <span style={{ color: 'var(--accent)' }}>System:</span> 48 new legal notices processed and synced to publishing network.
                      </div>
                      <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
                        <span>STATUS: Compliant</span>
                        <span style={{ color: '#16a34a' }}>100% Synced</span>
                      </div>
                    </div>
                  </div>
                )}
              </a>
            )
          })}
        </div>
        
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/projects" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'var(--bg-elev)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--fg)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.2s'
          }}>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
