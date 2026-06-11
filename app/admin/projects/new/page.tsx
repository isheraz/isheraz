import { createProject } from '../actions'
import Link from 'next/link'

export default function NewProjectPage() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/projects" style={{ textDecoration: 'none', color: 'var(--fg-muted)', fontSize: '1.25rem' }}>←</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>New Project</h1>
      </div>

      <form action={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Project Name</label>
            <input id="name" name="name" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="slug" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>URL Slug</label>
            <input id="slug" name="slug" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="description" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Short Description</label>
          <textarea id="description" name="description" required rows={3} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="tag" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Tag (e.g. AI SaaS)</label>
            <input id="tag" name="tag" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="year" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Year</label>
            <input id="year" name="year" type="number" defaultValue={new Date().getFullYear()} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="status" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Internal Status</label>
            <select id="status" name="status" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }}>
              <option value="live">Live</option>
              <option value="beta">Beta</option>
              <option value="building">Building</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="status_label" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Display Status Label</label>
            <input id="status_label" name="status_label" placeholder="e.g. Shipped" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="href" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>External Link</label>
            <input id="href" name="href" type="url" placeholder="https://" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="role" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Your Role</label>
            <input id="role" name="role" placeholder="Architect" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input type="checkbox" id="is_featured" name="is_featured" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }} />
          <label htmlFor="is_featured" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Feature this project on the homepage</label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
          <input type="checkbox" id="hide_url" name="hide_url" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }} />
          <label htmlFor="hide_url" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Hide external link on project cards</label>
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
          Create Project
        </button>
      </form>
    </div>
  )
}
