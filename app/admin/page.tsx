export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--fg-muted)', marginBottom: '2rem' }}>
        Welcome to your new CMS. Select an item from the sidebar to manage your content.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Content Migration</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)' }}>Static content has been successfully migrated to Supabase.</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Edge Functions</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)' }}>Stripe webhook endpoints are pending deployment.</p>
        </div>
      </div>
    </div>
  )
}
