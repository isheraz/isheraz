import sanitizeHtml from 'sanitize-html'
import { createClient } from '@/utils/supabase/server'

export async function About() {
  const supabase = await createClient()

  const [settingsRes, tiersRes] = await Promise.all([
    supabase.from('site_settings').select('*').single(),
    supabase.from('consulting_tiers').select('*').order('sort_order', { ascending: true })
  ])

  const siteSettings = settingsRes.data
  const consultingTiers = tiersRes.data || []

  const totalSlots = consultingTiers.reduce((acc: any, tier: any) => acc + (tier.inventory_available || 0), 0)
  
  let openToText = 'Unavailable'
  if ((siteSettings?.is_accepting_projects ?? true) && totalSlots > 0) {
    const activeTiers = consultingTiers.filter((t: any) => (t.inventory_available || 0) > 0)
    if (activeTiers.length === 1) {
      openToText = `${activeTiers[0].inventory_available} ${activeTiers[0].name.toLowerCase()}`
    } else if (activeTiers.length > 1) {
      const last = activeTiers.pop()
      openToText = `${activeTiers.map((t: any) => `${t.inventory_available} ${t.name.toLowerCase()}`).join(', ')} and ${last.inventory_available} ${last.name.toLowerCase()}`
    }
  }
  const defaultBio = (
    <>
      <p><strong>Sheraz Ahmed.</strong> Solutions Architect, engineering leader, AI product builder. I've been shipping software for 11+ years — from CodeIgniter backends serving 100K OTT users at TV2U, to 25-project portfolios at InvoZone, to architecting AI voice agents for Australian SMBs at 9T5 / Sociabletech.</p>
      <p>I was an early adopter of AI-assisted development and have spent the past two years embedding AI tools — voice agents, LLMs, RAG pipelines, autonomous outreach — into production products and engineering teams. Currently leading architecture for <strong>Chasyr</strong> and <strong>Adjudication.io</strong>, consulting the <strong>Punjab Government</strong> pro-bono on AI for special-needs education, and building <strong>Cadence</strong> solo on weekends.</p>
      <p>My philosophy: <em>good code is an art form — and with AI filling the knowledge gap, that's more true than ever.</em> AI doesn't replace the engineer; it removes the knowledge ceiling. Craftsmanship matters more now, not less.</p>
      <p style={{ marginTop: 28 }}>Want to talk? <a href="mailto:sherazahmdd@gmail.com" style={{ color: 'var(--accent-text)', borderBottom: '1px solid' }}>sherazahmdd@gmail.com</a> · <a href="https://github.com/isheraz" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text)', borderBottom: '1px solid' }}>@isheraz</a></p>
    </>
  )

  const sanitizedBio = siteSettings?.bio_text ? sanitizeHtml(siteSettings.bio_text) : null

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
            {sanitizedBio ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizedBio }} />
            ) : (
              defaultBio
            )}
          </div>
          <div className="about-meta">
            <div className="about-meta-row"><b>Currently</b><span>{siteSettings?.meta_currently || 'Sr. Solutions Engineer, 9T5'}</span></div>
            <div className="about-meta-row"><b>Based in</b><span>{siteSettings?.meta_based_in || 'Lahore, Pakistan · UTC+5'}</span></div>
            <div className="about-meta-row"><b>Education</b><span>{siteSettings?.meta_education || 'BS SE, Lancaster & COMSATS'}</span></div>
            <div className="about-meta-row"><b>Stack</b><span>{siteSettings?.meta_stack || 'TS · Next · Supabase · AWS'}</span></div>
            <div className="about-meta-row"><b>Side bets</b><span>{siteSettings?.meta_side_bets || '4 in flight'}</span></div>
            <div className="about-meta-row"><b>Reading</b><span>{siteSettings?.meta_reading || 'A Philosophy of Software Design'}</span></div>
            <div className="about-meta-row"><b>Open to</b><span>{openToText}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
