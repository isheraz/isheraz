# Sheraz Ahmed — Solutions Architect & AI Product Builder

A refined, minimal portfolio showcasing 11+ years of shipping full-stack, cloud-native, and AI-powered products at scale—from pre-seed startups to government systems.

**Visit**: https://isheraz.com

---

## About

I architect and ship products that matter. Currently building **Chasyr** (AI voice agents for invoice recovery) and advising the **Punjab Government** on AI in special-needs education.

**Open for**: 1 consulting slot in Q3 2026

### Expertise

- **Full-stack architecture** — From distributed systems to user-facing interfaces
- **AI/ML integration** — LLMs, agents, voice systems, vector search
- **Cloud infrastructure** — AWS, serverless, multi-region deployments
- **Open source** — 3,238 GitHub contributions/year across 59 repositories
- **Leadership** — Technical strategy, team scaling, stakeholder alignment

---

## Portfolio Sections

- **Essays** — Long-form thinking on architecture, AI, and building at scale
- **Projects** — Selected work: Chasyr, Adjudication.io, Cadence, Column, Floty
- **GitHub Activity** — 3,238 contributions/year · 1.2k PRs reviewed · 312 issues closed
- **Education** — Stanford, AWS certifications, continuous learning
- **Now** — What I'm building and advising on right now

---

## Tech Stack

| Category | Technology | Details |
|----------|-----------|---------|
| **Framework** | Next.js 16 | App Router, Turbopack, SSR/Static Generation |
| **Runtime** | React 18 | Hooks, Client Components, Server Components |
| **Styling** | Custom CSS | CSS variables, Dark/Light modes, Responsive design |
| **Typography** | Space Grotesk | Sans-serif, geometric, bold headings |
| | JetBrains Mono | Monospace, code blocks and technical text |
| | Geist | System font, accessible fallback |
| **Animations** | CSS Keyframes | GPU-accelerated (transform/opacity) |
| | IntersectionObserver | Scroll reveal, lazy animations |
| **Hosting** | Vercel | Edge deployment, auto-HTTPS, analytics |
| | GitHub Pages | Fallback static hosting |
| **Performance** | Lighthouse | 95+ scores across all metrics |
| | Bundle Size | Optimized via tree-shaking, code splitting |
| **Developer Tools** | pnpm | Fast, efficient package management |
| | TypeScript | Type-safe development |
| | Git | Version control, deployment automation |

### Design System

- **Accent color**: Orange (#ff5b1f) — used sparingly, purposefully
- **Theme system**: Light mode default, dark mode support
- **Density modes**: Compact, regular, airy (responsive spacing)
- **Animations**: Smooth, organic motion using cubic-bezier easing
- **Loader**: Circular liquid-fill with multi-layer wave animation
- **Component library**: Custom CSS, no external UI frameworks

---

## Development

### Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open browser
open http://localhost:3000
```

The site auto-refreshes as you edit files.

### Key Features

- **Dark mode** — Toggle via nav, persists to localStorage
- **Responsive design** — Mobile-first, tested at 375px through 1400px
- **Scroll reveal animations** — Sections animate in as you scroll
- **Essay reader** — Full-screen overlay with progress tracking
- **GitHub graph** — Interactive contribution history
- **Loader animation** — Circular liquid-fill with organic wave motion
- **Premium loader** — SVG-based with three-layer wave system

### Project Structure

```
app/
├── page.tsx          # Main portfolio
├── layout.tsx        # Root layout with theme init
└── globals.css       # Design system, animations, responsive rules

components/
├── hero.tsx          # Hero with particle effects
├── projects.tsx      # Featured work
├── essays.tsx        # Long-form content
├── github.tsx        # Contribution graph
├── nav.tsx           # Navigation + footer
├── loader.tsx        # Liquid-fill loader
└── [10+ other sections]

lib/
└── data.ts           # Projects, essays, education
```

---

## Customization

### Colors & Branding

Edit CSS variables in `app/globals.css`:

```css
:root {
  --accent: #ff5b1f;           /* Primary brand color */
  --bg: #fafaf9;               /* Light background */
  --fg: #0b0b0a;               /* Light text */
}

[data-theme="dark"] {
  --bg: #0a0a0a;               /* Dark background */
  --fg: #f6f5f1;               /* Dark text */
}
```

### Responsive Breakpoints

- **420px** — Mobile
- **480px** — Phone landscape
- **760px** — Tablet
- **920px** — Desktop
- **1200px+** — Wide desktop

### Typography

Fonts load from Google Fonts in `app/layout.tsx`:
- **Geist** (sans) — Primary font
- **Space Grotesk** (sans) — Bold, geometric alternative
- **JetBrains Mono** (mono) — Code
- **Instrument Serif** (serif) — Editorial

---

## Performance

- **Lighthouse**: 95+ across all metrics
- **Page load**: <1s on 4G
- **Animations**: GPU-accelerated (transform/opacity only)
- **Responsive**: Mobile-optimized at all breakpoints

---

## Deployment

### Vercel (Recommended)

```bash
git push origin main
# Auto-deploys on push
```

### Manual Build

```bash
pnpm build
pnpm start
```

---

## Contact

- **Email**: sherazahmed93@gmail.com
- **GitHub**: [@isheraz](https://github.com/isheraz)
- **LinkedIn**: [@isheraz](https://linkedin.com/in/isheraz)
- **Phone**: +92-312-450-1070
- **Location**: Lahore, Pakistan (UTC+5)

---

## License

Personal portfolio. Design and code are proprietary.

---

**Last updated**: May 2026  
*Built with intention. Shipped with care.*
