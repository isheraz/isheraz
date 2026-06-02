'use client'

import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'default' | 'monochrome' | 'inverted'
}

export function Logo({ size = 32, variant = 'default' }: LogoProps) {
  return (
    <div style={{ 
      width: size, 
      height: size, 
      borderRadius: '50%', 
      overflow: 'hidden', 
      position: 'relative', 
      background: 'var(--accent)',
      display: 'grid',
      justifyContent: 'center'
    }}>
      <img 
        src="/photo-logo.png" 
        alt="Logo" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          // filter: 'grayscale(100%) contrast(1.1)',
          display: 'block',
          transform: 'scale(1.2)',
          transformOrigin: 'top center'
        }} 
      />
    </div>
  )
}

export function LogoText({ size = 28 }: { size?: number }) {
  return (
    <div className="logo-text" style={{ fontSize: size * 0.8 }}>
      <span style={{ color: '#8ec052', fontWeight: 700, letterSpacing: '-0.02em' }}>
        Sheraz
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
