import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { deleteNowUpdate } from './actions'
import { DeleteButton } from '@/components/admin/delete-button'

export default async function NowAdminPage() {
  const supabase = await createClient()
  
  const { data: items, error } = await supabase
    .from('now_updates')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Now Updates</h1>
        <Link 
          href="/admin/now/new" 
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
          + Add Update
        </Link>
      </div>

      <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Tag</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Text</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Accent</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>{item.tag}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{item.text}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{item.accent}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link href={`/admin/now/${item.id}`} style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', textDecoration: 'none' }}>Edit</Link>
                    <form action={deleteNowUpdate.bind(null, item.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--fg-muted)' }}>
                  No updates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
