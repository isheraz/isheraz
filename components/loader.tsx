'use client'

import React from 'react'

export function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-content">
        <div className="loader-bars">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="loader-bar"
              style={{ '--bar-index': i, '--bar-height': ['60%', '80%', '100%', '75%'][i] } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
