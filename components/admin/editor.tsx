'use client'

import React from 'react'
import {
  EditorRoot,
  EditorContent,
  StarterKit
} from 'novel'

interface NovelEditorProps {
  initialValue?: any
  onChange: (html: string) => void
}

const defaultContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }]
}

export default function NovelEditor({ initialValue, onChange }: NovelEditorProps) {
  const isJson = initialValue && typeof initialValue === 'object' && !Array.isArray(initialValue)

  return (
    <EditorRoot>
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
