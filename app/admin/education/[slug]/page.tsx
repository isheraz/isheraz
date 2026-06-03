'use client'

import React, { useState, use } from 'react'
import Link from 'next/link'
import NovelEditor from '@/components/admin/editor'
import { updateEducation } from '../actions'
import { createClient } from '@/utils/supabase/client'

export default function EditEducationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [item, setItem] = useState<any>(null)
  const [descriptionHtml, setDescriptionHtml] = useState('')
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    async function fetchItem() {
      const supabase = createClient()
      const { data } = await supabase.from('education').select('*').eq('slug', slug).single()
      if (data) {
        setItem(data)
        setDescriptionHtml(data.description || '')
      }
      setLoading(false)
    }
    fetchItem()
  }, [slug])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    await updateEducation(item.id, {
      type: formData.get('type'),
      title: formData.get('title'),
      description: descriptionHtml,
      meta_tags: formData.get('meta_tags') ? JSON.parse(formData.get('meta_tags') as string) : [],
      sort_order: parseInt(formData.get('sort_order') as string, 10),
      is_published: formData.get('is_published') === 'on',
    })
  }

  if (loading) return <div>Loading...</div>
  if (!item) return <div>Item not found</div>

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/education" style={{ textDecoration: 'none', color: 'var(--fg-muted)', fontSize: '1.25rem' }}>←</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Edit Education Item</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="title" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Title</label>
            <input id="title" name="title" defaultValue={item.title} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="type" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Type</label>
            <select id="type" name="type" defaultValue={item.type} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }}>
              <option value="tutorial">Tutorial</option>
              <option value="talk">Talk</option>
              <option value="resource">Resource</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="meta_tags" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Meta Tags (JSON Array)</label>
            <input id="meta_tags" name="meta_tags" defaultValue={JSON.stringify(item.meta_tags || [])} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="sort_order" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Sort Order</label>
            <input id="sort_order" name="sort_order" type="number" defaultValue={item.sort_order} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Description (Novel Editor)</label>
          <div style={{ color: 'black' }}>
            <NovelEditor initialValue={item.description} onChange={(html) => setDescriptionHtml(html)} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" id="is_published" name="is_published" defaultChecked={item.is_published} style={{ width: '1.2rem', height: '1.2rem' }} />
          <label htmlFor="is_published" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Published</label>
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
          Save Changes
        </button>
      </form>
    </div>
  )
}
