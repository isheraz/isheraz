'use client'

import React from 'react'
import { Arrow, GitHub, LinkedIn, Mail, Sun, Moon } from './icons'
import { LogoWordmark } from './logo'

const links = [
  ['Essays', '#essays'],
  ['Projects', '#projects'],
  ['Hire me', '#hire'],
  ['Education', '#education'],
  ['About', '#about'],
]

export function Nav({ theme, onToggleTheme }: any) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className={open ? 'nav open' : 'nav'}>
      <div className="shell nav-inner">
        <a href="#top" className="nav-mark" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogoWordmark size={20} />
        </a>
        <nav className="nav-links" aria-label="primary">
          {links.map(([label, href]) => (
            <a key={href} className="nav-link" href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="icon-btn" href="https://github.com/isheraz" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHub size={14} />
          </a>
          <a className="icon-btn" href="https://linkedin.com/in/isheraz" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn size={14} />
          </a>
          <a className="icon-btn" href="mailto:sherazahmed93@gmail.com" aria-label="Email">
            <Mail size={14} />
          </a>
          <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a className="btn btn-accent" href="#hire" style={{ marginLeft: 4 }}>
            Hire me <Arrow size={13} />
          </a>
          <button
            className="nav-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M2 5h12M2 11h12" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="nav-mobile shell">
        {links.map(([label, href]) => (
          <a key={href} className="nav-link" href={href}>
            {label}
          </a>
        ))}
        <div className="nav-mobile-social">
          <a className="icon-btn" href="https://github.com/isheraz" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHub size={14} />
          </a>
          <a className="icon-btn" href="https://linkedin.com/in/isheraz" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn size={14} />
          </a>
          <a className="icon-btn" href="mailto:sherazahmed93@gmail.com" aria-label="Email">
            <Mail size={14} />
          </a>
        </div>
        <div className="nav-mobile-cta">
          <a className="btn btn-accent" href="#hire">
            Hire me <Arrow size={13} />
          </a>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <div className="nav-mark" style={{ marginBottom: 14 }}>
              <span className="dot"></span>
              <span>isheraz</span>
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
              <li><a href="https://stage.chasyr.com" target="_blank" rel="noreferrer">Chasyr ↗</a></li>
              <li><a href="https://adjudication.io" target="_blank" rel="noreferrer">Adjudication.io ↗</a></li>
              <li><a href="https://runoncadence.com" target="_blank" rel="noreferrer">Cadence ↗</a></li>
              <li><a href="https://www.column.us/" target="_blank" rel="noreferrer">Column ↗</a></li>
              <li><a href="https://floty.ai" target="_blank" rel="noreferrer">Floty ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Sheraz Ahmed · built in Lahore</span>
          <span>Last shipped: today</span>
        </div>
      </div>
    </footer>
  )
}
