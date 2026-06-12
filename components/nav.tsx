'use client'

import React from 'react'
import { Arrow, GitHub, LinkedIn, Mail, Sun, Moon } from './icons'
import { LogoWordmark } from './logo'
import { useTheme } from './providers'

const links = [
  ['Essays', '/#essays'],
  ['Projects', '/#projects'],
  ['Hire me', '/#hire'],
  ['Education', '/#education'],
  ['About', '/#about'],
]

export function Nav() {
  const { t, toggleTheme } = useTheme()
  const theme = t.dark ? 'dark' : 'light'
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className={open ? 'nav open' : 'nav'}>
      <div className="shell nav-inner">
        <a href="#top" className="nav-mark" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogoWordmark size={32} />
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
          <a className="icon-btn" href="mailto:sherazahmdd@gmail.com" aria-label="Email">
            <Mail size={14} />
          </a>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {mounted ? (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />) : <span style={{ width: 14, height: 14, display: 'inline-block' }} />}
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
          <a className="icon-btn" href="mailto:sherazahmdd@gmail.com" aria-label="Email">
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

