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

            {/* Wave layer 1 - primary wave with smooth sine motion */}
            <path
              className="loader-wave loader-wave-1"
              d="M 0,70 C 15,65 25,75 35,70 C 45,65 55,75 70,70 C 85,65 95,75 105,70 C 115,65 125,75 140,70 L 140,140 L 0,140 Z"
              fill="currentColor"
            />

            {/* Wave layer 2 - secondary wave offset and smoother */}
            <path
              className="loader-wave loader-wave-2"
              d="M 0,72 C 20,68 30,76 50,72 C 70,68 80,76 100,72 C 120,68 135,76 140,72 L 140,140 L 0,140 Z"
              fill="currentColor"
              opacity="0.35"
            />

            {/* Wave layer 3 - tertiary wave for turbulence */}
            <path
              className="loader-wave loader-wave-3"
              d="M 0,71 C 25,67 35,75 60,71 C 85,67 95,75 120,71 C 130,70 140,72 140,71 L 140,140 L 0,140 Z"
              fill="currentColor"
              opacity="0.2"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
