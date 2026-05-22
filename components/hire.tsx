'use client'
import { TIERS } from '@/lib/data'
import { Check, Arrow } from './icons'

export function Hire() {
  return (
    <section id="hire">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Hire me / Consulting</div>
            <h2 className="section-title">For teams stuck on infra, architecture, or "where do we even start with AI?"</h2>
          </div>
        </div>
        <div className="hire-pitch">
          <p>You've got a product team that's confused about <em>infra and architecture</em> — or you know you should be adopting AI but don't know where to start. I've done this 25+ times. I'll come in, untangle it, and leave you with a team that knows how to ship.</p>
          <a className="btn btn-accent" href="mailto:sherazahmed93@gmail.com">
            Email me directly <Arrow size={13} />
          </a>
        </div>
        <div className="hire-grid">
          {TIERS.map((t: any, i: number) => (
            <div key={i} className={t.featured ? 'tier featured' : 'tier'}>
              {t.badge && <div className="tier-badge">{t.badge}</div>}
              <div className="tier-name">{t.name}</div>
              <div>
                <div className="tier-price">{t.price}<span>{t.unit}</span></div>
              </div>
              <div className="tier-desc">{t.desc}</div>
              <ul className="tier-feats">
                {t.feats.map((f: string, j: number) => (
                  <li key={j}><Check /> <span>{f}</span></li>
                ))}
              </ul>
              <a className={`btn tier-cta ${t.featured ? 'btn-accent' : ''}`} href="mailto:sherazahmed93@gmail.com">
                {t.cta} <Arrow size={13} />
              </a>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '28px', padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '14px', color: 'var(--fg-3)' }}>
            <b style={{ color: 'var(--fg)', fontWeight: 500 }}>Specialised in:</b> AI / LLM integration, Voice Agents, RAG &amp; Vector DBs, system architecture, pre-sales / solution design, Next.js + Supabase + AWS / GCP, engineering team leadership.
          </div>
        </div>
      </div>
    </section>
  )
}
