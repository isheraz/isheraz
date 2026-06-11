'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import NovelEditor from '@/components/admin/editor'
import { createEssay } from '../actions'
import { marked } from 'marked'

export default function NewEssayPage() {
  const [contentHtml, setContentHtml] = useState('')
  const [editorKey, setEditorKey] = useState(0)

  const handleImportMarkdown = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const html = await marked.parse(text)
    setContentHtml(html)
    setEditorKey(prev => prev + 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // We intercept to manually call the server action or just append to FormData
    // Since createEssay is a Server Action that takes a payload, we can just call it directly.
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    await createEssay({
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      read_time: formData.get('read_time'),
      is_published: formData.get('is_published') === 'on',
      published_at: formData.get('published_at') || new Date().toISOString(),
      linkedin_post_url: formData.get('linkedin_post_url') || null,
      likes_count: parseInt(formData.get('likes_count') as string, 10) || 0,
      content: contentHtml
    })
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/essays" style={{ textDecoration: 'none', color: 'var(--fg-muted)', fontSize: '1.25rem' }}>←</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>New Essay</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="title" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Title</label>
            <input id="title" name="title" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="slug" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>URL Slug</label>
            <input id="slug" name="slug" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="subtitle" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Subtitle / Excerpt</label>
          <textarea id="subtitle" name="subtitle" required rows={2} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="category" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Category</label>
            <input id="category" name="category" placeholder="Technical" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="linkedin_post_url" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>LinkedIn Post URL</label>
            <input id="linkedin_post_url" name="linkedin_post_url" placeholder="https://linkedin.com/..." style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="published_at" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Publish Date (YYYY-MM-DD)</label>
            <input id="published_at" name="published_at" type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="likes_count" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Initial Likes</label>
            <input id="likes_count" name="likes_count" type="number" defaultValue={0} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-muted)' }}>Content</label>
            <label style={{ fontSize: '0.75rem', cursor: 'pointer', background: 'var(--bg-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
              Import .md
              <input type="file" accept=".md" onChange={handleImportMarkdown} style={{ display: 'none' }} />
            </label>
          </div>
          <div style={{ color: 'black' }}>
            <NovelEditor key={editorKey} initialValue={contentHtml} onChange={(html) => setContentHtml(html)} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input type="checkbox" id="is_published" name="is_published" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }} />
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
          Create Essay
        </button>
      </form>
    </div>
  )
}
