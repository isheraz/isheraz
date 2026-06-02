import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { deleteEssay, togglePublished } from './actions'
import { DeleteButton } from '@/components/admin/delete-button'

export default async function EssaysAdminPage() {
  const supabase = await createClient()
  
  const { data: essays, error } = await supabase
    .from('essays')
    .select('*')
    .order('published_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Essays</h1>
        <Link 
          href="/admin/essays/new" 
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: 'var(--accent)', 
            color: '#fff', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontWeight: 500,
            transition: 'transform 0.2s',
            boxShadow: '0 4px 14px rgba(142, 192, 82, 0.2)'
          }}
        >
          + New Essay
        </Link>
      </div>

      <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Title</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Read Time</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Published</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {essays?.map((essay) => (
              <tr key={essay.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500 }}>{essay.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', marginTop: '0.25rem' }}>/{essay.slug}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{essay.category}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{essay.read_time}</td>
                <td style={{ padding: '1rem' }}>
                  <form action={togglePublished.bind(null, essay.id, essay.is_published)}>
                    <button 
                      type="submit"
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        background: essay.is_published ? 'rgba(142, 192, 82, 0.1)' : 'rgba(128,128,128,0.1)',
                        color: essay.is_published ? 'var(--accent)' : 'var(--fg-muted)'
                      }}
                    >
                      {essay.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link 
                      href={`/admin/essays/${essay.id}`}
                      style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', textDecoration: 'underline' }}
                    >
                      Edit
                    </Link>
                    <form action={deleteEssay.bind(null, essay.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!essays || essays.length === 0) && (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--fg-muted)' }}>
                  No essays found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
