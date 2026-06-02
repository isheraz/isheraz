'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NovelEditor from '@/components/admin/editor'
import { updateEssay } from '../actions'
import { createClient } from '@/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'

export default function EditEssayPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [essay, setEssay] = useState<any>(null)
  const [contentHtml, setContentHtml] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('essays').select('*').eq('id', id).single()
      if (data) {
        setEssay(data)
        setContentHtml(data.content)
      }
      setLoading(false)
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    await updateEssay(id, {
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      read_time: formData.get('read_time'),
      is_published: formData.get('is_published') === 'on',
      published_at: formData.get('published_at') || new Date().toISOString(),
      content: contentHtml
    })
  }

  if (loading) return <div>Loading...</div>
  if (!essay) return <div>Essay not found</div>

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/essays" style={{ textDecoration: 'none', color: 'var(--fg-muted)', fontSize: '1.25rem' }}>←</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Edit Essay</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="title" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Title</label>
            <input id="title" name="title" defaultValue={essay.title} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="slug" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>URL Slug</label>
            <input id="slug" name="slug" defaultValue={essay.slug} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="subtitle" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Subtitle / Excerpt</label>
          <textarea id="subtitle" name="subtitle" defaultValue={essay.subtitle} required rows={2} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="category" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Category</label>
            <input id="category" name="category" defaultValue={essay.category} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="read_time" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Read Time</label>
            <input id="read_time" name="read_time" defaultValue={essay.read_time} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="published_at" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Publish Date</label>
          <input id="published_at" name="published_at" type="date" defaultValue={essay.published_at?.split('T')[0]} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Content</label>
          <div style={{ color: 'black' }}>
            <NovelEditor initialValue={essay.content} onChange={(html) => setContentHtml(html)} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input type="checkbox" id="is_published" name="is_published" defaultChecked={essay.is_published} style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }} />
          <label htmlFor="is_published" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Publish immediately</label>
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
