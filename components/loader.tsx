'use client'

import React from 'react'

export function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-container">
        <div className="meteor-shower">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="meteor" style={{ '--meteor-index': i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  )
}
