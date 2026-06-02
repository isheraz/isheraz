import { createConsultingTier } from '../actions'
import Link from 'next/link'

export default function NewConsultingPage() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/consulting" style={{ textDecoration: 'none', color: 'var(--fg-muted)', fontSize: '1.25rem' }}>←</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>New Consulting Tier</h1>
      </div>

      <form action={createConsultingTier} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Name</label>
            <input id="name" name="name" placeholder="Architecture Audit" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="price_label" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Price Label (Optional if syncing Stripe)</label>
            <input id="price_label" name="price_label" placeholder="$1,500" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="stripe_product_id" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Stripe Product ID (Optional)</label>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '0.25rem' }}>If provided, we will fetch the price dynamically from Stripe. Leave blank to auto-create.</div>
            <input id="stripe_product_id" name="stripe_product_id" placeholder="prod_..." style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="stripe_price_id" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Stripe Price ID (Optional)</label>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '0.25rem' }}>Required for checkout if manually setting Product ID without Stripe Secret Key.</div>
            <input id="stripe_price_id" name="stripe_price_id" placeholder="price_..." style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="unit" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Unit</label>
            <input id="unit" name="unit" placeholder="/ engagement" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="badge_text" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Badge Text (Optional)</label>
            <input id="badge_text" name="badge_text" placeholder="2 of 3 slots filled" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="description" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Description</label>
          <textarea id="description" name="description" required rows={3} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', resize: 'vertical' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="features" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Features (JSON Array)</label>
          <textarea id="features" name="features" required rows={3} placeholder='["Feature 1", "Feature 2"]' style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="cta_text" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>CTA Text</label>
            <input id="cta_text" name="cta_text" placeholder="Book a call" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="sort_order" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Sort Order</label>
            <input id="sort_order" name="sort_order" type="number" defaultValue={0} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input type="checkbox" id="is_featured" name="is_featured" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }} />
          <label htmlFor="is_featured" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Is Featured Tier</label>
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
          Create Tier
        </button>
      </form>
    </div>
  )
}
