'use client'

/**
 * HeroAnimations — Cinematic hero entrance timeline.
 * 
 * Orchestrates the hero section entrance after the loader completes.
 * Uses GSAP SplitText for word-by-word headline reveal and a master
 * timeline that sequences: light beam → glow → availability badge →
 * headline → subtitle → CTAs → meta stats → dust canvas.
 * 
 * This component renders no visible DOM — it only registers GSAP
 * timelines that target hero section elements via class selectors.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAPContext } from '@/components/gsap-provider'

gsap.registerPlugin(ScrollTrigger)

export function HeroAnimations() {
  const { prefersReducedMotion, isReady } = useGSAPContext()
  const hasPlayed = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion || hasPlayed.current) return

    /**
     * Wait for the loader to finish (2.4s) before starting the hero entrance.
     * We listen for the loader-complete event dispatched by LoaderWrapper,
     * or fall back to a timeout matching the loader duration.
     */
    const startHeroEntrance = () => {
      if (hasPlayed.current) return
      hasPlayed.current = true

      const hero = document.querySelector('.hero')
      if (!hero) return

      // Remove CSS animation classes — GSAP takes over
      const animatedEls = hero.querySelectorAll('.hero-available, .hero h1, .hero-sub, .hero-cta, .hero-meta, .hero-stat')
      animatedEls.forEach(el => {
        ;(el as HTMLElement).style.animation = 'none'
        ;(el as HTMLElement).style.opacity = '0'
      })

      // Build the master entrance timeline
      const tl = gsap.timeline({
        defaults: {
          ease: 'siteEase', // CustomEase matching cubic-bezier(.22,.61,.36,1)
          duration: 0.8,
        },
      })

      // Step 1: Light beam scales in from invisible
      tl.fromTo('.hero-light-beam',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.7, duration: 1.0, ease: 'power2.out' },
        0
      )

      // Step 2: Radial glow pulses in
      .fromTo('.hero-light-glow',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        0.1
      )

      // Step 3: Availability badge slides down
      .fromTo('.hero-available',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.3
      )

      // Step 4: Headline — word-by-word reveal
      // We manually split the headline into words for animation since
      // SplitText requires a separate import/registration
      // Instead, we use a DOM TreeWalker to safely wrap individual words
      // in spans without breaking nested HTML tags like <em>, <br>, etc.
      const h1 = hero.querySelector('h1')
      if (h1) {
        const ariaLabel = h1.textContent || ''

        // Walk all text nodes inside the h1 and wrap each word in a span
        const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT, null)
        const textNodes: Text[] = []
        let node: Text | null
        while ((node = walker.nextNode() as Text | null)) {
          if (node.textContent && node.textContent.trim()) {
            textNodes.push(node)
          }
        }

        // Process each text node: split into words and wrap in spans
        textNodes.forEach(textNode => {
          const words = textNode.textContent!.split(/(\s+)/)
          const fragment = document.createDocumentFragment()
          words.forEach(word => {
            if (/^\s+$/.test(word) || word === '') {
              // Preserve whitespace as-is
              fragment.appendChild(document.createTextNode(word))
            } else {
              const span = document.createElement('span')
              span.className = 'hero-word'
              span.style.display = 'inline-block'
              span.style.opacity = '0'
              span.textContent = word
              fragment.appendChild(span)
            }
          })
          textNode.parentNode!.replaceChild(fragment, textNode)
        })

        h1.setAttribute('aria-label', ariaLabel)
        h1.style.opacity = '1'

        const wordSpans = h1.querySelectorAll('.hero-word')
        // Set initial state then animate
        gsap.set(wordSpans, { y: 20, opacity: 0 })
        tl.to(wordSpans, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
        }, 0.4)
      }

      // Step 5: Subtitle — fade up
      tl.fromTo('.hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.75
      )

      // Step 6: CTA buttons — stagger in
      .fromTo('.hero-cta .btn',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.9
      )
      // Make the CTA container visible
      .set('.hero-cta', { opacity: 1 }, 0.9)

      // Step 7: Meta stats — subtle slide up
      .fromTo('.hero-meta',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.05
      )

      // Step 8: Stat card (split variant)
      .fromTo('.hero-stat',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.95
      )

      // Step 9: Dust canvas fade in
      .fromTo('.hero-light-dust',
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: 'power1.inOut' },
        1.1
      )

      // After hero entrance, set up parallax for hero elements on scroll
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          // Hero beam scrolls slower (parallax depth)
          gsap.set('.hero-light-beam', { y: progress * -30 })
          gsap.set('.hero-light-glow', { y: progress * -20 })
          // Hero content fades out as you scroll past
          gsap.set('.hero .shell', { opacity: 1 - progress * 0.6 })
        }
      })
    }

    // If the loader has already run (e.g. navigating back from another page)
    // start immediately to avoid the 2.8s fallback delay
    if (typeof window !== 'undefined' && (window as any).__loader_completed) {
      startHeroEntrance()
      return
    }

    // Listen for loader-complete event, or fall back to timeout
    const handler = () => startHeroEntrance()
    window.addEventListener('loader-complete', handler)
    
    // Fallback: if loader-complete doesn't fire within 3s, start anyway
    const fallback = setTimeout(() => {
      startHeroEntrance()
    }, 2800) // Slightly after loader's 2.4s + exit animation

    return () => {
      window.removeEventListener('loader-complete', handler)
      clearTimeout(fallback)
    }
  }, [prefersReducedMotion, isReady])

  return null // This component renders no visible DOM
}
