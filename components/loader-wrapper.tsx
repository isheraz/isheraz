'use client'

/**
 * LoaderWrapper — Cinematic loader exit with GSAP handoff to hero.
 * 
 * Phase 7: Instead of a simple CSS fade-out, the loader now uses GSAP
 * to orchestrate a clipPath wipe upward. The hero entrance timeline
 * (in hero-animations.tsx) begins 0.4s before the loader fully disappears,
 * creating a seamless choreographed reveal with zero dead time.
 * 
 * The loader dispatches a 'loader-complete' CustomEvent when finished,
 * which hero-animations.tsx listens for.
 */

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Loader } from './loader'

export function LoaderWrapper() {
  const [show, setShow] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion — if so, skip loader entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false)
      ;(window as any).__loader_completed = true
      window.dispatchEvent(new CustomEvent('loader-complete'))
      return
    }

    // Wait for the liquid fill animation to complete (2.4s),
    // then trigger the GSAP exit animation
    const fillTimer = setTimeout(() => {
      const loaderEl = loaderRef.current
      if (!loaderEl) {
        setShow(false)
        ;(window as any).__loader_completed = true
        window.dispatchEvent(new CustomEvent('loader-complete'))
        return
      }

      // Cinematic exit: clipPath wipes upward to reveal content beneath
      gsap.to(loaderEl, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
        onStart: () => {
          // Dispatch loader-complete 0.4s into the exit animation
          // so the hero entrance can start mid-wipe (overlap for seamlessness)
          setTimeout(() => {
            ;(window as any).__loader_completed = true
            window.dispatchEvent(new CustomEvent('loader-complete'))
          }, 400)
        },
        onComplete: () => {
          setShow(false)
        }
      })
    }, 2400) // Match the existing liquid-fill animation duration

    return () => clearTimeout(fillTimer)
  }, [])

  if (!show) return null

  return (
    <div ref={loaderRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, clipPath: 'inset(0 0 0 0)', pointerEvents: 'none' }}>
      <Loader />
    </div>
  )
}
