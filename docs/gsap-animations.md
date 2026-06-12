# GSAP Animation System — Documentation

## Overview
The GSAP animation system replaces the site's CSS-only animations with a cinematic, Awwwards-quality motion design layer. It uses GSAP (GreenSock Animation Platform) with Lenis smooth scroll for premium scrolling.

## Architecture

```
components/
├── gsap-provider.tsx          # Foundation: Lenis + GSAP plugin registration
├── loader-wrapper.tsx          # Phase 7: Cinematic loader exit
├── animations/
│   ├── hero-animations.tsx     # Phase 2: Hero entrance timeline
│   ├── scroll-animations.tsx   # Phase 3: Per-section ScrollTrigger
│   ├── card-interactions.tsx   # Phase 4: 3D tilt on project cards
│   ├── magnetic-cursor.tsx     # Phase 5: Custom cursor (desktop)
│   └── page-transition.tsx     # Phase 8: Route transition wrapper
```

## Dependencies
- `gsap` — Core animation engine + all plugins (free since April 2025)
- `@gsap/react` — Official React hook (`useGSAP`)
- `lenis` — Smooth scroll engine (~8KB)

## How It Works

### GSAPProvider (`gsap-provider.tsx`)
The foundation layer. Wraps the app and:
1. Registers all GSAP plugins (ScrollTrigger, Flip, CustomEase)
2. Initializes Lenis smooth scroll synced with GSAP's ticker
3. Provides context (`useGSAPContext()`) for child components
4. Respects `prefers-reduced-motion`

### Animation Components
Each animation component renders **no visible DOM**. They use `useEffect` to register GSAP timelines and ScrollTrigger instances that target existing DOM elements via class/data-attribute selectors.

### Event System
- `loader-complete`: Dispatched by LoaderWrapper when the exit animation is halfway done. HeroAnimations listens for this to begin the entrance timeline.
- `gsap-ready`: Dispatched by GSAPProvider when Lenis + GSAP are initialized.

### Data Attributes
Sections use `data-gsap-section="sectionName"` instead of the old `.reveal` class:
```html
<div data-gsap-section="projects"><Projects /></div>
<div data-gsap-section="essays"><Essays /></div>
```

## Custom Ease
A custom ease matching the site's design DNA:
```js
CustomEase.create('siteEase', 'M0,0 C0.22,0.61 0.36,1 1,1')
```
This is the GSAP equivalent of `cubic-bezier(.22,.61,.36,1)`.

## Theme System
- Auto-detects `prefers-color-scheme` on first visit
- Manual toggle persists to `localStorage`
- 0.3s cross-fade transition on theme change

## Accessibility
- All animations respect `prefers-reduced-motion: reduce`
- Custom cursor hidden on touch devices (`@media (hover: none)`)
- Content is always visible (opacity: 1) when reduced motion is active
- SplitText (if used) auto-applies `aria-label` and `aria-hidden`
