'use client'
import { Arrow } from './icons'

export function Newsletter() {
  const subscriberCount = 73
  const targetCount = 100
  const progressPercent = (subscriberCount / targetCount) * 100
  const spotsRemaining = targetCount - subscriberCount

  return (
    <section id="newsletter">
      <div className="shell">
        <div className="news-card">
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 12 }}>Newsletter / Coming soon</div>
            <h3>I'll start a newsletter once 100 people are interested.</h3>
            <p>Honest signal: I don't want to send to a list of zero. Drop your email and you'll get the first issue when we hit 100. No spam, no nurture sequence, no "7 frameworks I use" nonsense — just essays, sent monthly-ish.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thanks!') }} style={{ display: 'flex', gap: 8, marginTop: 18, maxWidth: 420 }}>
              <input type="email" required placeholder="you@domain.com" style={{ flex: '1 1 0%', padding: '10px 14px', borderRadius: 9, border: '1px solid var(--border-strong)', background: 'var(--bg-elev)', color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none' }} />
              <button type="submit" className="btn btn-primary">Join early <Arrow size={13} /></button>
            </form>
          </div>
          <div className="news-progress">
            <div className="news-progress-bar">
              <div className="news-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="news-progress-meta">
              <span><b>{subscriberCount}</b> / {targetCount} early subscribers</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.5 }}>
              {spotsRemaining} spots away. When we hit it, the first issue goes out and the form closes for a beat.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
