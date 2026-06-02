'use client'

import React from 'react'

export function DeleteButton() {
  return (
    <button 
      type="submit"
      style={{
        background: 'transparent',
        border: 'none',
        color: '#ef4444',
        cursor: 'pointer',
        fontSize: '0.875rem',
        padding: '0.5rem'
      }}
      onClick={(e) => {
        if(!confirm('Are you sure you want to delete this item?')) {
          e.preventDefault()
        }
      }}
    >
      Delete
    </button>
  )
}
