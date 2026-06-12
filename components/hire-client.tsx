'use client'
import { useState } from 'react'
import { Check, Arrow } from './icons'
import { createClient } from '@/utils/supabase/client'

export function HireClient({ tiers = [] }: { tiers?: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const supabase = createClient()

  async function handleCheckout(tierId: string) {
    setLoading(tierId)
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier_id: tierId, return_url: window.location.href }
      })
      if (error) throw error
      
      if (data?.url) {
        window.location.href = data.url
      } else {
        alert(data?.error || 'Checkout failed')
      }
    } catch (e) {
      alert('Error creating checkout session')
    }
    setLoading(null)
  }

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
          <a className="btn btn-accent" href="mailto:sherazahmdd@gmail.com">
            Email me directly <Arrow size={13} />
          </a>
        </div>
        <div className="hire-grid">
          {tiers.map((t: any) => (
            <div key={t.id} className={t.is_featured ? 'tier featured' : 'tier'}>
              {t.badge_text && <div className="tier-badge">{t.badge_text}</div>}
              <div className="tier-name">{t.name}</div>
              <div>
                <div className="tier-price">{t.price_label}<span>{t.unit}</span></div>
              </div>
              <div className="tier-desc">{t.description}</div>
              <ul className="tier-feats">
                {(t.features || []).map((f: string, j: number) => (
                  <li key={j}><Check /> <span>{f}</span></li>
                ))}
              </ul>
              {t.inventory_available === 0 ? (
                <button 
                  className="btn tier-cta" 
                  disabled
                  style={{ width: '100%', cursor: 'not-allowed', opacity: 0.5 }}
                >
                  Sold Out
                </button>
              ) : t.stripe_price_id ? (
                <button 
                  className={`btn tier-cta ${t.is_featured ? 'btn-accent' : ''}`} 
                  onClick={() => handleCheckout(t.id)}
                  disabled={loading === t.id}
                  style={{ width: '100%' }}
                >
                  {loading === t.id ? 'Loading...' : t.cta_text} <Arrow size={13} />
                </button>
              ) : (
                <a className={`btn tier-cta ${t.is_featured ? 'btn-accent' : ''}`} href="mailto:sherazahmdd@gmail.com" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                  {t.cta_text} <Arrow size={13} />
                </a>
              )}
              {typeof t.inventory_available === 'number' && t.inventory_available > 0 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--accent-text)' }}>
                  Only {t.inventory_available} spots remaining
                </div>
              )}
              {t.inventory_available === 0 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--fg-muted)' }}>
                  No more spots remaining
                </div>
              )}
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
