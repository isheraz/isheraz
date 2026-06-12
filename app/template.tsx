/**
 * App Template — wraps all pages with GSAP page transition animation.
 * 
 * Unlike layout.tsx, template.tsx re-mounts on every route change,
 * which is exactly what we need for enter/exit animations.
 * The PageTransition component handles the GSAP fade/slide.
 */

import { PageTransition } from '@/components/animations/page-transition'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
}
