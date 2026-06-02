import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { deleteConsultingTier } from './actions'
import { DeleteButton } from '@/components/admin/delete-button'

export default async function ConsultingAdminPage() {
  const supabase = await createClient()
  
  const { data: items, error } = await supabase
    .from('consulting_tiers')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Consulting Tiers</h1>
        <Link 
          href="/admin/consulting/new" 
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
          + Add Tier
        </Link>
      </div>

      <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Price</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem' }}>Featured</th>
              <th style={{ padding: '1rem', fontWeight: 500, color: 'var(--fg-muted)', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', marginTop: '0.25rem' }}>{item.badge_text}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{item.price_label} {item.unit}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    background: item.is_featured ? 'rgba(142,192,82,0.1)' : 'transparent',
                    color: item.is_featured ? 'var(--accent)' : 'var(--fg-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}>
                    {item.is_featured ? 'Featured' : 'Standard'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Link 
                      href={`/admin/consulting/${item.id}`}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        fontSize: '0.875rem', 
                        fontWeight: 500, 
                        color: 'var(--fg)', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '6px', 
                        textDecoration: 'none',
                        transition: 'background 0.2s'
                      }}
                    >
                      Edit
                    </Link>
                    <form action={deleteConsultingTier.bind(null, item.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--fg-muted)' }}>
                  No consulting tiers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
