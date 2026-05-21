'use client'

import React from 'react'

export function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-content">
        <svg className="loader-circle" viewBox="0 0 140 140" width="140" height="140">
          {/* Circle outline */}
          <circle cx="70" cy="70" r="68" fill="none" stroke="currentColor" strokeWidth="2" className="loader-border" />

          {/* Clipping region for liquid */}
          <defs>
            <clipPath id="liquidClip">
              <circle cx="70" cy="70" r="68" />
            </clipPath>
          </defs>

          {/* Liquid fill group */}
          <g clipPath="url(#liquidClip)">
            {/* Animated liquid rectangle */}
            <rect className="loader-liquid" x="2" y="2" width="136" height="136" />

            {/* Primary wave - larger, slower */}
            <path
              className="loader-wave loader-wave-primary"
              d="M 0,70 Q 35,60 70,70 T 140,70 L 140,140 L 0,140 Z"
              fill="currentColor"
            />

            {/* Secondary wave - smaller, faster, offset phase */}
            <path
              className="loader-wave loader-wave-secondary"
              d="M 0,70 Q 35,65 70,70 T 140,70 L 140,140 L 0,140 Z"
              fill="currentColor"
              opacity="0.4"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
