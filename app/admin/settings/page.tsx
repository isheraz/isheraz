import { updateSiteSettings } from './actions'
import { createClient } from '@/utils/supabase/server'

export default async function SettingsAdminPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').maybeSingle()

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Site Settings</h1>
      </div>

      <form action={updateSiteSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        {settings?.id && <input type="hidden" name="id" value={settings.id} />}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="bio_text" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Bio Text (HTML allowed)</label>
          <textarea 
            id="bio_text" 
            name="bio_text" 
            defaultValue={settings?.bio_text || ''} 
            rows={10}
            placeholder="<p><strong>Sheraz Ahmed.</strong> ...</p>"
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_currently" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Currently</label>
            <input type="text" id="meta_currently" name="meta_currently" defaultValue={settings?.meta_currently || 'Sr. Solutions Engineer, 9T5'} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_based_in" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Based in</label>
            <input type="text" id="meta_based_in" name="meta_based_in" defaultValue={settings?.meta_based_in || 'Lahore, Pakistan · UTC+5'} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_education" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Education</label>
            <input type="text" id="meta_education" name="meta_education" defaultValue={settings?.meta_education || 'BS SE, Lancaster & COMSATS'} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_stack" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Stack</label>
            <input type="text" id="meta_stack" name="meta_stack" defaultValue={settings?.meta_stack || 'TS · Next · Supabase · AWS'} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_side_bets" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Side bets</label>
            <input type="text" id="meta_side_bets" name="meta_side_bets" defaultValue={settings?.meta_side_bets || '4 in flight'} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_reading" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Reading</label>
            <input type="text" id="meta_reading" name="meta_reading" defaultValue={settings?.meta_reading || 'A Philosophy of Software Design'} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          <label htmlFor="last_shipped_date" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Last Shipped Date</label>
          <input 
            type="date" 
            id="last_shipped_date" 
            name="last_shipped_date" 
            defaultValue={settings?.last_shipped_date ? new Date(settings.last_shipped_date).toISOString().split('T')[0] : ''} 
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: '0.875rem', maxWidth: '300px' }} 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <input 
            type="checkbox" 
            id="is_accepting_projects" 
            name="is_accepting_projects" 
            defaultChecked={settings?.is_accepting_projects ?? true}
            style={{ width: '1rem', height: '1rem', accentColor: 'var(--accent)' }}
          />
          <label htmlFor="is_accepting_projects" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg)' }}>
            Accepting new projects (Controls 'Open to' visibility)
          </label>
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
          Save Settings
        </button>
      </form>
    </div>
  )
}
