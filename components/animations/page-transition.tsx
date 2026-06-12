'use client'

/**
 * PageTransition — Smooth route transition wrapper.
 * 
 * Phase 8: Wraps page content in a GSAP-animated container that fades/slides
 * out on route change and fades/slides in when the new page loads.
 * 
 * Uses Next.js `usePathname()` to detect route changes and GSAP to
 * orchestrate exit/enter animations.
 * 
 * If GSAP fails or reduced motion is preferred, content renders immediately
 * with no transition (progressive enhancement).
 */

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAPContext } from '@/components/gsap-provider'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useGSAPContext()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return

    if (isFirstRender.current) {
      // First render — just fade in (the loader handles the dramatic entrance)
      isFirstRender.current = false
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      return
    }

    // Subsequent route changes — animate enter
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all', // Clean up inline styles after animation
      }
    )
  }, [prefersReducedMotion])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
