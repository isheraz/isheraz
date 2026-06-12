'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Logo } from './logo'

export function Loader() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.loader-liquid-group', { y: -140 })
      return
    }

    // 1. Rise animation for the entire liquid group
    gsap.fromTo('.loader-liquid-group', 
      { y: 140 }, 
      { y: -10, duration: 2.2, ease: 'power2.inOut' }
    )

    // 2. Horizontal oscillating waves
    gsap.to('.loader-wave-1', {
      x: -140, // Move left by 140px (width of SVG)
      duration: 1.5,
      ease: 'none',
      repeat: -1
    })

    gsap.to('.loader-wave-2', {
      x: -140,
      duration: 2.5,
      ease: 'none',
      repeat: -1
    })

    gsap.to('.loader-wave-3', {
      x: -140,
      duration: 2.0,
      ease: 'none',
      repeat: -1
    })

  }, { scope: containerRef })

  return (
    <div className="loader-screen" ref={containerRef}>
      <div className="loader-content">
        {/* Logo floating above loader */}
        <div className="loader-logo" style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <Logo size={48} />
        </div>

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
            <g className="loader-liquid-group">
              {/* Animated liquid rectangle */}
              <rect className="loader-liquid" x="-140" y="70" width="420" height="140" fill="currentColor" />

              {/* To make the wave continuous, we need the path to be 3x wider (420px) 
                  so we can translate it left by 140px seamlessly. */}
              {/* Wave layer 1 - primary wave */}
              <path
                className="loader-wave-1"
                d="M -140,70 C -125,65 -115,75 -105,70 C -95,65 -85,75 -70,70 C -55,65 -45,75 -35,70 C -25,65 -15,75 0,70 C 15,65 25,75 35,70 C 45,65 55,75 70,70 C 85,65 95,75 105,70 C 115,65 125,75 140,70 C 155,65 165,75 175,70 C 185,65 195,75 210,70 C 225,65 235,75 245,70 C 255,65 265,75 280,70 L 280,140 L -140,140 Z"
                fill="currentColor"
              />

              {/* Wave layer 2 - secondary wave offset and smoother */}
              <path
                className="loader-wave-2"
                d="M -140,72 C -120,68 -110,76 -90,72 C -70,68 -60,76 -40,72 C -20,68 -5,76 0,72 C 20,68 30,76 50,72 C 70,68 80,76 100,72 C 120,68 135,76 140,72 C 160,68 170,76 190,72 C 210,68 220,76 240,72 C 260,68 275,76 280,72 L 280,140 L -140,140 Z"
                fill="currentColor"
                opacity="0.35"
              />

              {/* Wave layer 3 - tertiary wave for turbulence */}
              <path
                className="loader-wave-3"
                d="M -140,71 C -115,67 -105,75 -80,71 C -55,67 -45,75 -20,71 C -10,70 0,72 0,71 C 25,67 35,75 60,71 C 85,67 95,75 120,71 C 130,70 140,72 140,71 C 165,67 175,75 200,71 C 225,67 235,75 260,71 C 270,70 280,72 280,71 L 280,140 L -140,140 Z"
                fill="currentColor"
                opacity="0.2"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

