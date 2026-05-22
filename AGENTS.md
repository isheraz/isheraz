<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Design System

### Colors & Branding
- **Accent color**: Sage green (#8ec052) — organic, intentional
- **Logo**: Abstract flowing symbol + wordmark (SVG)
- **Light background**: #fafaf9
- **Dark background**: #0a0a0a
- **Text (light)**: #0b0b0a
- **Text (dark)**: #f6f5f1

### Theme System
- **Light mode** — Default theme
- **Dark mode** — Toggled via nav, persists to localStorage
- **Theme detection**: `data-theme="light"` or `data-theme="dark"` on `<html>`

### Typography
- **Sans-serif**: Space Grotesk (headings), Geist (body)
- **Monospace**: JetBrains Mono (code, technical)
- **Serif**: Instrument Serif (editorial)

### Animations
- **Motion**: Smooth, organic motion using cubic-bezier easing
- **Loader**: Circular liquid-fill with multi-layer wave animation
- **Scroll reveal**: IntersectionObserver-based fade + slide animations
- **GPU acceleration**: Only transform/opacity properties

### Component Library
- **No external UI frameworks** — Custom CSS only
- **CSS custom properties** for theming
- **Responsive breakpoints**: 420px, 480px, 760px, 920px, 1200px+
- **Density modes**: Compact, regular, airy (responsive spacing)
