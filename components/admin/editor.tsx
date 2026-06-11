'use client'

import React from 'react'
import {
  EditorRoot,
  EditorContent,
  StarterKit,
  useEditor
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

const Toolbar = () => {
  const { editor } = useEditor()
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-1 mb-2 p-1 border border-gray-200 rounded-md bg-gray-50 text-sm w-full max-w-screen-lg">
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><Bold size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><Italic size={16} /></button>
      <div className="w-px h-5 bg-gray-300 mx-1" />
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><Heading1 size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><Heading2 size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><Heading3 size={16} /></button>
      <div className="w-px h-5 bg-gray-300 mx-1" />
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><Quote size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><List size={16} /></button>
      <button type="button" onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }} className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-black' : 'text-gray-600'}`}><ListOrdered size={16} /></button>
    </div>
  )
}

export default function NovelEditor({ initialValue, onChange }: NovelEditorProps) {
  const isJson = initialValue && typeof initialValue === 'object' && !Array.isArray(initialValue)

  return (
    <EditorRoot>
      <Toolbar />
      <EditorContent
        extensions={[StarterKit]}
        initialContent={isJson ? initialValue : defaultContent}
        onCreate={({ editor }) => {
          if (editor && typeof initialValue === 'string' && initialValue.trim().length > 0) {
            editor.commands.setContent(initialValue)
          }
        }}
        onUpdate={({ editor }) => {
          if (editor) {
            onChange(editor.getHTML())
          }
        }}
        className="relative min-h-[400px] w-full max-w-screen-lg rounded-lg border border-gray-200 bg-white p-4 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400"
      />
    </EditorRoot>
  )
}
