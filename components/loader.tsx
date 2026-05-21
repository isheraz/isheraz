'use client'

import React from 'react'

export function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-content">
        <div className="loader-orbits">
          {[0, 1, 2].map((i) => (
            <div key={i} className="loader-orbit" style={{ '--orbit-index': i } as React.CSSProperties}>
              <div className="loader-dot" />
            </div>
          ))}
        </div>
        <div className="loader-label">Loading</div>
      </div>
    </div>
  )
}
