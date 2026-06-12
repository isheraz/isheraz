'use client'

/**
 * GSAPProvider — Foundation layer for all GSAP animations on the site.
 * 
 * Responsibilities:
 * 1. Registers all GSAP plugins globally (ScrollTrigger, SplitText, Flip, CustomEase)
 * 2. Initializes Lenis smooth scroll and syncs it with GSAP's ticker
 * 3. Provides Lenis instance via React context for child components
 * 4. Respects `prefers-reduced-motion` — disables all animations if user prefers
 * 5. Dispatches a custom 'gsap-ready' event when initialization is complete
 *    (used by hero-animations.tsx to trigger the entrance timeline)
 */

import React, { createContext, useContext, useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

// Register all GSAP plugins once at module level
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, CustomEase)

// Custom ease matching the site's existing cubic-bezier(.22,.61,.36,1)
CustomEase.create('siteEase', 'M0,0 C0.22,0.61 0.36,1 1,1')

// Context to expose Lenis instance and reduced-motion state to child components
type GSAPContextType = {
  lenis: Lenis | null
  prefersReducedMotion: boolean
  isReady: boolean
}

const GSAPContext = createContext<GSAPContextType>({
  lenis: null,
  prefersReducedMotion: false,
  isReady: false,
})

export function useGSAPContext() {
  return useContext(GSAPContext)
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mql.addEventListener('change', handleChange)

    // If user prefers reduced motion, skip Lenis + GSAP setup entirely
    if (mql.matches) {
      // Make all content visible immediately
      document.querySelectorAll('[data-gsap-section]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      setIsReady(true)
      return () => mql.removeEventListener('change', handleChange)
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,           // Scroll duration (higher = smoother/slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      touchMultiplier: 2,      // Touch scroll sensitivity
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll position with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Connect Lenis to GSAP's ticker (shared rAF loop — no extra frame requests)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // GSAP ticker uses seconds, Lenis expects milliseconds
    })
    gsap.ticker.lagSmoothing(0) // Disable lag smoothing for smooth scroll fidelity

    // Signal that GSAP + Lenis are ready
    setIsReady(true)
    window.dispatchEvent(new CustomEvent('gsap-ready'))

    return () => {
      mql.removeEventListener('change', handleChange)
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  const pathname = usePathname()

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
      // Delay refresh slightly to allow DOM to settle
      setTimeout(() => ScrollTrigger.refresh(), 50)
    }
  }, [pathname])

  return (
    <GSAPContext.Provider value={{ 
      lenis: lenisRef.current, 
      prefersReducedMotion, 
      isReady 
    }}>
      {children}
    </GSAPContext.Provider>
  )
}
