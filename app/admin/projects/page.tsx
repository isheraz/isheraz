import { createClient } from '@/utils/supabase/server'
import { deleteProject, toggleFeatured } from './actions'
import Link from 'next/link'
import { DeleteButton } from '@/components/admin/delete-button'

export default async function ProjectsAdmin() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase.from('projects').select('*').order('year', { ascending: false })

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>Error loading projects: {error.message}</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Projects</h1>
          <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>Manage your portfolio items and case studies.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          style={{ 
            padding: '0.75rem 1.25rem', 
            background: 'var(--accent)', 
            color: '#fff', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontWeight: 500,
            transition: 'transform 0.2s',
            boxShadow: '0 4px 14px rgba(142, 192, 82, 0.2)'
          }}
        >
          + New Project
        </Link>
      </div>

      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '12px', 
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Year</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Featured</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500, fontSize: '1.125rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', marginTop: '0.25rem' }}>/{p.slug}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    background: p.status === 'live' ? 'rgba(142, 192, 82, 0.1)' : 'var(--border)', 
                    color: p.status === 'live' ? 'var(--accent)' : 'inherit',
                    borderRadius: '20px', 
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'capitalize'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--fg-muted)' }}>{p.year}</td>
                <td style={{ padding: '1rem' }}>
                  <form action={toggleFeatured.bind(null, p.id, p.is_featured)}>
                    <button style={{ 
                      background: p.is_featured ? 'var(--accent)' : 'transparent', 
                      color: p.is_featured ? '#fff' : 'var(--fg-muted)',
                      border: p.is_featured ? '1px solid var(--accent)' : '1px solid var(--border)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      {p.is_featured ? 'Featured' : 'Standard'}
                    </button>
                  </form>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link 
                      href={`/admin/projects/${p.id}`}
                      style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', textDecoration: 'underline' }}
                    >
                      Edit
                    </Link>
                    <form action={deleteProject.bind(null, p.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
