'use client'

/**
 * ScrollAnimations — Per-section GSAP ScrollTrigger choreography.
 * 
 * Each homepage section gets a unique entrance animation triggered by scroll.
 * This replaces the old IntersectionObserver-based `.reveal` system with
 * bespoke, cinematic per-section reveals.
 * 
 * Renders no visible DOM — only registers ScrollTrigger instances.
 */

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAPContext } from '@/components/gsap-provider'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger defaults for all section reveals:
 * - start: trigger when element's top hits 85% of viewport
 * - toggleActions: play once on enter, don't reverse
 */
const ST_DEFAULTS = {
  start: 'top 85%',
  toggleActions: 'play none none none' as const,
}

export function ScrollAnimations() {
  const { prefersReducedMotion, isReady } = useGSAPContext()

  useEffect(() => {
    if (prefersReducedMotion || !isReady) return

    // Wait a tick for DOM to be ready after hydration
    const rafId = requestAnimationFrame(() => {
      // ─── Projects Section ─────────────────────────────────────
      // Horizontal scroll for featured projects on homepage
      const projectsSection = document.querySelector('[data-gsap-section="projects"]')
      if (projectsSection) {
        // First, reveal the section header
        const sectionHead = projectsSection.querySelector('.section-head')
        if (sectionHead) {
          gsap.fromTo(sectionHead,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              scrollTrigger: { trigger: sectionHead, ...ST_DEFAULTS }
            }
          )
        }

        // Then reveal project cards with staggered 3D tilt entrance
        const projCards = projectsSection.querySelectorAll('.proj-card')
        if (projCards.length > 0) {
          gsap.fromTo(projCards,
            { y: 60, opacity: 0, rotationX: 3 },
            {
              y: 0, opacity: 1, rotationX: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'siteEase',
              scrollTrigger: {
                trigger: projectsSection.querySelector('.proj-grid'),
                ...ST_DEFAULTS,
              }
            }
          )
        }

        // Set section wrapper to visible (was hidden by [data-gsap-section] CSS)
        gsap.set(projectsSection, { opacity: 1, y: 0 })
      }

      // ─── Essays Section ───────────────────────────────────────
      const essaysSection = document.querySelector('[data-gsap-section="essays"]')
      if (essaysSection) {
        const sectionHead = essaysSection.querySelector('.section-head')
        if (sectionHead) {
          gsap.fromTo(sectionHead,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              scrollTrigger: { trigger: sectionHead, ...ST_DEFAULTS }
            }
          )
        }

        // Essay filter pills slide in from left
        const filterPills = essaysSection.querySelector('.essay-filters')
        if (filterPills) {
          gsap.fromTo(filterPills,
            { x: -30, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.6, ease: 'siteEase',
              scrollTrigger: { trigger: filterPills, ...ST_DEFAULTS }
            }
          )
        }

        // Essay rows slide in with staggered horizontal mask effect
        const essayRows = essaysSection.querySelectorAll('.essay-row')
        if (essayRows.length > 0) {
          gsap.fromTo(essayRows,
            { x: -40, opacity: 0 },
            {
              x: 0, opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: essaysSection.querySelector('.essay-list'),
                ...ST_DEFAULTS,
              }
            }
          )
        }

        gsap.set(essaysSection, { opacity: 1, y: 0 })
      }

      // ─── Hire / Consulting Section ────────────────────────────
      const hireSection = document.querySelector('[data-gsap-section="hire"]')
      if (hireSection) {
        // Pitch block fades up
        const pitch = hireSection.querySelector('.hire-pitch')
        if (pitch) {
          gsap.fromTo(pitch,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              scrollTrigger: { trigger: pitch, ...ST_DEFAULTS }
            }
          )
        }

        // Tier cards fan in from scale with stagger
        const tiers = hireSection.querySelectorAll('.hire-card')
        if (tiers.length > 0) {
          gsap.fromTo(tiers,
            { y: 50, opacity: 0, scale: 0.92 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: hireSection.querySelector('.hire-grid') || hireSection,
                ...ST_DEFAULTS,
              }
            }
          )
        }

        gsap.set(hireSection, { opacity: 1, y: 0 })
      }

      // ─── Education Section ────────────────────────────────────
      const eduSection = document.querySelector('[data-gsap-section="education"]')
      if (eduSection) {
        const sectionHead = eduSection.querySelector('.section-head')
        if (sectionHead) {
          gsap.fromTo(sectionHead,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              scrollTrigger: { trigger: sectionHead, ...ST_DEFAULTS }
            }
          )
        }

        // Education cards rise with stagger
        const eduCards = eduSection.querySelectorAll('.edu-card')
        if (eduCards.length > 0) {
          gsap.fromTo(eduCards,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'siteEase',
              scrollTrigger: {
                trigger: eduSection.querySelector('.edu-grid') || eduSection,
                ...ST_DEFAULTS,
              }
            }
          )
        }

        gsap.set(eduSection, { opacity: 1, y: 0 })
      }

      // ─── GitHub Section ───────────────────────────────────────
      const githubSection = document.querySelector('[data-gsap-section="github"]')
      if (githubSection) {
        const sectionHead = githubSection.querySelector('.section-head')
        if (sectionHead) {
          gsap.fromTo(sectionHead,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              scrollTrigger: { trigger: sectionHead, ...ST_DEFAULTS }
            }
          )
        }

        // GitHub heatmap grid cells animate in a diagonal wave
        const gridCells = githubSection.querySelectorAll('.gh-cell')
        if (gridCells.length > 0) {
          gsap.fromTo(gridCells,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1,
              duration: 0.4,
              stagger: {
                each: 0.01,
                from: 'start',
              },
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: githubSection.querySelector('.gh-grid') || githubSection,
                ...ST_DEFAULTS,
              }
            }
          )
        }

        // Stats cards stagger in
        const statCards = githubSection.querySelectorAll('.gh-stat')
        if (statCards.length > 0) {
          gsap.fromTo(statCards,
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'siteEase',
              scrollTrigger: {
                trigger: githubSection.querySelector('.gh-stats') || githubSection,
                ...ST_DEFAULTS,
              }
            }
          )
        }

        gsap.set(githubSection, { opacity: 1, y: 0 })
      }

      // ─── Newsletter Section ───────────────────────────────────
      const newsSection = document.querySelector('[data-gsap-section="newsletter"]')
      if (newsSection) {
        gsap.fromTo(newsSection.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'siteEase',
            scrollTrigger: { trigger: newsSection, ...ST_DEFAULTS }
          }
        )
        gsap.set(newsSection, { opacity: 1, y: 0 })
      }

      // ─── About Section ────────────────────────────────────────
      const aboutSection = document.querySelector('[data-gsap-section="about"]')
      if (aboutSection) {
        // Left column (bio text) slides in from left
        const aboutContent = aboutSection.querySelector('.about-content')
        if (aboutContent) {
          gsap.fromTo(aboutContent,
            { x: -40, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              scrollTrigger: { trigger: aboutSection, ...ST_DEFAULTS }
            }
          )
        }

        // Right column (metadata) slides in from right
        const aboutMeta = aboutSection.querySelector('.about-meta')
        if (aboutMeta) {
          gsap.fromTo(aboutMeta,
            { x: 40, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.8, ease: 'siteEase',
              delay: 0.15,
              scrollTrigger: { trigger: aboutSection, ...ST_DEFAULTS }
            }
          )
        }

        gsap.set(aboutSection, { opacity: 1, y: 0 })
      }

      // ─── Footer ───────────────────────────────────────────────
      const footer = document.querySelector('.footer')
      if (footer) {
        const footerCols = footer.querySelectorAll('.footer-col')
        if (footerCols.length > 0) {
          gsap.fromTo(footerCols,
            { y: 25, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'siteEase',
              scrollTrigger: { trigger: footer, ...ST_DEFAULTS }
            }
          )
        }
      }

      // ─── Section Eyebrow Parallax ─────────────────────────────
      // Subtle parallax on section eyebrows for depth
      document.querySelectorAll('.section-eyebrow').forEach(eyebrow => {
        gsap.to(eyebrow, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: eyebrow,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      })

      // Refresh ScrollTrigger after all animations are registered
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      // Kill all ScrollTrigger instances created by this component
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [prefersReducedMotion, isReady])

  return null // This component renders no visible DOM
}
