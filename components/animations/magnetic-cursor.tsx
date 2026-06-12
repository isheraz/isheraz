'use client'

/**
 * MagneticCursor — Custom cursor with magnetic pull and morph states.
 * 
 * Desktop only (hidden on touch devices). Creates two elements:
 * - A small inner dot that follows the cursor precisely
 * - A larger outer ring that follows with slight lag (gsap.quickTo)
 * 
 * Morph states:
 * - Default: small dot + ring
 * - Hovering links/buttons: ring enlarges, dot hides
 * - Hovering project cards: ring enlarges, shows "View" text
 * - Over text inputs: hidden, native cursor restored
 * 
 * Magnetic pull: when cursor is within 80px of a button/link,
 * the element subtly shifts toward the cursor.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAPContext } from '@/components/gsap-provider'

export function MagneticCursor() {
  const { prefersReducedMotion } = useGSAPContext()
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    // Only enable on devices with a fine pointer (mouse, not touch)
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Create cursor elements
    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    dot.setAttribute('aria-hidden', 'true')
    document.body.appendChild(dot)

    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    ring.setAttribute('aria-hidden', 'true')
    document.body.appendChild(ring)

    dotRef.current = dot
    ringRef.current = ring

    // Hide default cursor on body
    document.body.style.cursor = 'none'

    // gsap.quickTo for lag-free cursor following
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power3' })

    let currentTarget: Element | null = null

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)

      // Magnetic pull on buttons and links
      const target = e.target as HTMLElement
      const magnetic = target.closest('.btn, .icon-btn, .nav-link, .proj-card a')
      if (magnetic && magnetic !== currentTarget) {
        currentTarget = magnetic
        const rect = magnetic.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dist = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2)

        if (dist < 80) {
          // Pull element toward cursor (subtle magnetic effect)
          gsap.to(magnetic, {
            x: (e.clientX - centerX) * 0.15,
            y: (e.clientY - centerY) * 0.15,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      } else if (!magnetic && currentTarget) {
        // Reset magnetic pull
        gsap.to(currentTarget, {
          x: 0, y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        })
        currentTarget = null
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if hovering over an interactive element
      const isLink = target.closest('a, button, .btn, .icon-btn, .nav-link')
      const isCard = target.closest('.proj-card')
      const isInput = target.closest('input, textarea, select, [contenteditable]')

      if (isInput) {
        // Hide cursor on inputs — restore native cursor
        gsap.to(dot, { scale: 0, duration: 0.2 })
        gsap.to(ring, { scale: 0, duration: 0.2 })
        document.body.style.cursor = ''
      } else if (isCard) {
        // Enlarge ring on project cards
        gsap.to(ring, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.5, duration: 0.3 })
      } else if (isLink) {
        // Enlarge ring on links/buttons
        gsap.to(ring, { scale: 2, opacity: 0.8, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.5, duration: 0.3 })
      } else {
        // Default state
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
        gsap.to(dot, { scale: 1, duration: 0.3 })
        document.body.style.cursor = 'none'
      }
    }

    const onMouseLeave = () => {
      // Hide cursor when mouse leaves the viewport
      gsap.to(dot, { opacity: 0, duration: 0.2 })
      gsap.to(ring, { opacity: 0, duration: 0.2 })
    }

    const onMouseEnter = () => {
      gsap.to(dot, { opacity: 1, duration: 0.2 })
      gsap.to(ring, { opacity: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.body.style.cursor = ''
      dot.remove()
      ring.remove()
    }
  }, [prefersReducedMotion])

  return null // Cursor elements are created via DOM manipulation for performance
}
