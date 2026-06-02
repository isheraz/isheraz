import React from 'react'
import Link from 'next/link'
import './admin.css'
import { signout } from '@/app/login/actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', borderRight: '1px solid var(--border)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ padding: '0 1rem' }}>
          <h2 style={{ fontWeight: 600, fontSize: '1.25rem' }}>Admin Shell</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link href="/admin" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Dashboard</Link>
          <Link href="/admin/projects" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Projects</Link>
          <Link href="/admin/essays" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Essays</Link>
          <Link href="/admin/education" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Education</Link>
          <Link href="/admin/consulting" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Consulting</Link>
          <Link href="/admin/now" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Now Updates</Link>
          <Link href="/admin/settings" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit', borderRadius: '4px' }}>Site Settings</Link>
        </nav>

        <div style={{ padding: '0 1rem' }}>
          <form action={signout}>
            <button style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Sign Out</button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
