'use client'

export function About() {
  return (
    <section id="about">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">About / Bio</div>
            <h2 className="section-title">A bit more on me.</h2>
          </div>
        </div>
        <div className="about-grid">
          <div>
            <p><strong>Sheraz Ahmed.</strong> Solutions Architect, engineering leader, AI product builder. I've been shipping software for 11+ years — from CodeIgniter backends serving 100K OTT users at TV2U, to 25-project portfolios at InvoZone, to architecting AI voice agents for Australian SMBs at 9T5 / Sociabletech.</p>
            <p>I was an early adopter of AI-assisted development and have spent the past two years embedding AI tools — voice agents, LLMs, RAG pipelines, autonomous outreach — into production products and engineering teams. Currently leading architecture for <strong>Chasyr</strong> and <strong>Adjudication.io</strong>, consulting the <strong>Punjab Government</strong> pro-bono on AI for special-needs education, and building <strong>Cadence</strong> solo on weekends.</p>
            <p>My philosophy: <em>good code is an art form — and with AI filling the knowledge gap, that's more true than ever.</em> AI doesn't replace the engineer; it removes the knowledge ceiling. Craftsmanship matters more now, not less.</p>
            <p style={{ marginTop: 28 }}>Want to talk? <a href="mailto:sherazahmdd@gmail.com" style={{ color: 'var(--accent)', borderBottom: '1px solid' }}>sherazahmdd@gmail.com</a> · <a href="https://github.com/isheraz" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', borderBottom: '1px solid' }}>@isheraz</a></p>
          </div>
          <div className="about-meta">
            <div className="about-meta-row"><b>Currently</b><span>Sr. Solutions Engineer, 9T5</span></div>
            <div className="about-meta-row"><b>Based in</b><span>Lahore, Pakistan · UTC+5</span></div>
            <div className="about-meta-row"><b>Education</b><span>BS SE, Lancaster & COMSATS</span></div>
            <div className="about-meta-row"><b>Stack</b><span>TS · Next · Supabase · AWS</span></div>
            <div className="about-meta-row"><b>Side bets</b><span>4 in flight</span></div>
            <div className="about-meta-row"><b>Reading</b><span>A Philosophy of Software Design</span></div>
            <div className="about-meta-row"><b>Open to</b><span>1 consulting slot</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
