import { createNowUpdate } from '../actions'
import Link from 'next/link'

export default function NewNowUpdatePage() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/now" style={{ textDecoration: 'none', color: 'var(--fg-muted)', fontSize: '1.25rem' }}>←</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>New Now Update</h1>
      </div>

      <form action={createNowUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="tag" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Tag</label>
            <input id="tag" name="tag" placeholder="SHIPPING" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="accent" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Accent Color Name</label>
            <input id="accent" name="accent" placeholder="live" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="text" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Update Text</label>
          <input id="text" name="text" placeholder="Chasyr voice agents closing real $$" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="sort_order" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Sort Order</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={0} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: 'var(--accent)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 14px rgba(142, 192, 82, 0.2)'
          }}
        >
          Add Update
        </button>
      </form>
    </div>
  )
}
