'use client'

import React, { useState, useEffect, useReducer } from 'react'
import {
  EditorRoot,
  EditorContent,
  StarterKit
} from 'novel'
import { Bold, Italic, Heading1, Heading2, Heading3, Quote, List, ListOrdered } from 'lucide-react'

interface NovelEditorProps {
  initialValue?: any
  onChange: (html: string) => void
}

const defaultContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }]
}

const Toolbar = ({ editor }: { editor: any }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    if (!editor) return
    const update = () => forceUpdate()
    editor.on('transaction', update)
    return () => { editor.off('transaction', update) }
  }, [editor])

  if (!editor) return null

  const btnClass = (isActive: boolean) => 
    `p-2 rounded transition-colors ${isActive ? 'bg-[var(--accent)] text-[var(--accent-fg)]' : 'hover:bg-[var(--bg-elev)] text-[var(--fg-2)]'}`

  return (
    <div className="flex flex-wrap items-center gap-1 mb-4 p-2 border border-[var(--border)] rounded-md bg-[var(--bg-subtle)] text-sm w-full max-w-screen-lg sticky top-0 z-10">
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }} className={btnClass(editor.isActive('bold'))}><Bold size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }} className={btnClass(editor.isActive('italic'))}><Italic size={16} /></button>
      <div className="w-px h-5 bg-[var(--border)] mx-1" />
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run() }} className={btnClass(editor.isActive('heading', { level: 1 }))}><Heading1 size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }} className={btnClass(editor.isActive('heading', { level: 2 }))}><Heading2 size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }} className={btnClass(editor.isActive('heading', { level: 3 }))}><Heading3 size={16} /></button>
      <div className="w-px h-5 bg-[var(--border)] mx-1" />
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }} className={btnClass(editor.isActive('blockquote'))}><Quote size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }} className={btnClass(editor.isActive('bulletList'))}><List size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }} className={btnClass(editor.isActive('orderedList'))}><ListOrdered size={16} /></button>
    </div>
  )
}

export default function NovelEditor({ initialValue, onChange }: NovelEditorProps) {
  const isJson = initialValue && typeof initialValue === 'object' && !Array.isArray(initialValue)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  return (
    <EditorRoot>
      <div className="w-full max-w-screen-lg flex flex-col">
        {editorInstance && <Toolbar editor={editorInstance} />}
        <EditorContent
          extensions={[StarterKit]}
          initialContent={isJson ? initialValue : defaultContent}
          onCreate={({ editor }) => {
            setEditorInstance(editor)
            if (editor && typeof initialValue === 'string' && initialValue.trim().length > 0) {
              editor.commands.setContent(initialValue)
            }
          }}
          onUpdate={({ editor }) => {
            if (editor) {
              onChange(editor.getHTML())
            }
          }}
          className="relative min-h-[400px] w-full rounded-lg border border-[var(--border)] bg-transparent p-6 shadow-sm outline-none reader-body focus-within:border-[var(--border-strong)]"
        />
      </div>
    </EditorRoot>
  )
}
