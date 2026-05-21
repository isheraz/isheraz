'use client'

import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'default' | 'monochrome' | 'inverted'
}

export function Logo({ size = 32, variant = 'default' }: LogoProps) {
  const accentColor = '#8ec052'
  const bgColor = 'currentColor'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo"
    >
      <defs>
        <style>{`
          .logo-accent { fill: ${accentColor}; }
          .logo-neutral { fill: currentColor; opacity: 0.15; }
        `}</style>
      </defs>

      {/* Outer circle frame */}
      <circle cx="60" cy="60" r="58" stroke={accentColor} strokeWidth="1.5" fill="none" opacity="0.3" />

      {/* Primary organic shape - flowing S-like curve with growth motif */}
      <g className="logo-accent">
        {/* Upper flowing curve */}
        <path
          d="M 60 20 Q 75 30 78 45 Q 80 55 70 62 Q 60 68 50 65 Q 42 63 40 55 Q 38 48 45 42 Q 52 36 60 40"
          fill={accentColor}
        />

        {/* Lower flowing curve - mirror with offset */}
        <path
          d="M 60 100 Q 45 90 42 75 Q 40 65 50 58 Q 60 52 70 55 Q 78 57 80 65 Q 82 72 75 78 Q 68 84 60 80"
          fill={accentColor}
        />

        {/* Center connector - subtle vertical flow */}
        <path
          d="M 60 50 Q 62 58 60 65"
          stroke={accentColor}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Accent dots - growth nodes */}
      <circle cx="45" cy="40" r="2.5" className="logo-accent" opacity="0.6" />
      <circle cx="75" cy="80" r="2.5" className="logo-accent" opacity="0.6" />

      {/* Background subtle geometric hint */}
      <circle cx="60" cy="60" r="35" className="logo-neutral" />
    </svg>
  )
}

export function LogoText({ size = 32 }: { size?: number }) {
  return (
    <div className="logo-text" style={{ fontSize: size * 0.8 }}>
      <span style={{ color: '#8ec052', fontWeight: 700, letterSpacing: '-0.02em' }}>
        isheraz
      </span>
    </div>
  )
}

export function LogoWordmark({ size = 32 }: { size?: number }) {
  return (
    <div className="logo-wordmark" style={{ display: 'flex', alignItems: 'center', gap: size * 0.4 }}>
      <Logo size={size} />
      <LogoText size={size} />
    </div>
  )
}
