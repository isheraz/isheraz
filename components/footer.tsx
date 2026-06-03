import React from 'react'
import { LogoWordmark } from './logo'
import { formatRelativeDate } from '@/utils/formatters'
import { createClient } from '@/utils/supabase/server'

export async function Footer() {
  const supabase = await createClient()

  // Fetch site settings and footer projects in parallel
  const [settingsRes, projectsRes] = await Promise.all([
    supabase.from('site_settings').select('*').single(),
    supabase.from('projects').select('*').order('year', { ascending: false }).limit(5)
  ])

  const siteSettings = settingsRes.data
  const projects = projectsRes.data || []

  const year = new Date().getFullYear()
  const lastShippedText = formatRelativeDate(siteSettings?.last_shipped_date)

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 14 }}>
              <LogoWordmark size={24} />
            </div>
            <p style={{ color: 'var(--fg-3)', fontSize: 14, margin: 0, maxWidth: '38ch', lineHeight: 1.55 }}>
              Sheraz Ahmed — Solutions Architect & AI product builder. Building from Lahore for the world.
            </p>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              <li><a href="#essays">Essays</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#hire">Hire me</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="https://github.com/isheraz" target="_blank" rel="noreferrer">GitHub ↗</a></li>
              <li><a href="https://linkedin.com/in/isheraz" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
              <li><a href="mailto:sherazahmdd@gmail.com">Email</a></li>
              <li><a href="tel:+923124501070">+92-312-450-1070</a></li>
            </ul>
          </div>
          <div>
            <h4>Ventures</h4>
            <ul>
              {projects.map((p: any) => (
                <li key={p.id}>
                  <a href={p.url || p.href || '#'} target="_blank" rel="noreferrer">
                    {p.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Sheraz Ahmed · built in Lahore</span>
          <span>Last shipped: {lastShippedText}</span>
        </div>
      </div>
    </footer>
  )
}
