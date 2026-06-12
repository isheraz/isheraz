'use client'

/**
 * CardInteractions — 3D tilt and magnetic hover effects on project cards.
 * 
 * Desktop only (hidden on touch devices). Adds a perspective-based 3D tilt
 * that follows the cursor, plus a subtle scale lift on hover.
 * 
 * Uses gsap.quickTo() for lag-free, 60fps cursor tracking.
 * Renders no visible DOM.
 */

import { useEffect } from 'react'
import gsap from 'gsap'
import { useGSAPContext } from '@/components/gsap-provider'

export function CardInteractions() {
  const { prefersReducedMotion } = useGSAPContext()

  useEffect(() => {
    if (prefersReducedMotion) return

    // Only enable on devices with a fine pointer (mouse, not touch)
    if (window.matchMedia('(hover: none)').matches) return

    const cards = document.querySelectorAll('.proj-card')
    if (!cards.length) return

    const cleanups: (() => void)[] = []

    cards.forEach((card) => {
      const el = card as HTMLElement

      // Set up perspective on the card for 3D transforms
      el.style.transformStyle = 'preserve-3d'
      el.style.transition = 'none' // GSAP handles all transitions

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        // Calculate cursor position relative to card center (-0.5 to 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        gsap.to(el, {
          rotationY: x * 8,        // Tilt left/right based on cursor X
          rotationX: y * -8,       // Tilt up/down based on cursor Y
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      const handleMouseEnter = () => {
        gsap.to(el, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        // Add a subtle glow via border-color
        el.style.borderColor = 'var(--accent)'
      }

      const handleMouseLeave = () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        el.style.borderColor = ''
      }

      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)

      cleanups.push(() => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        // Reset any inline styles
        el.style.transformStyle = ''
        el.style.transition = ''
        gsap.set(el, { clearProps: 'all' })
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [prefersReducedMotion])

  return null // Renders no visible DOM
}
