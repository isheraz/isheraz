# isheraz.com — AI Context Catalog

> This file serves as a context index for AI assistants working on this codebase.

## Project Overview
Personal portfolio website for Sheraz Ahmed — Solutions Architect & AI Product Builder.
Built with **Next.js 16** (App Router), **Supabase** (database + auth), **Stripe** (payments), and **GSAP** (animations).

## Architecture Index

### Frontend (Next.js App Router)
| Path | Description |
|------|-------------|
| `app/page.tsx` | Home — single-page portfolio with all sections |
| `app/projects/` | All projects archive (paginated) |
| `app/essays/[id]/` | Individual essay reader |
| `app/education/[slug]/` | Education detail pages |
| `app/admin/` | CMS dashboard (essays, projects, education, consulting, now, settings) |
| `app/template.tsx` | GSAP page transition wrapper |
| `app/layout.tsx` | Root layout (fonts, metadata, theme-init, loader) |
| `app/globals.css` | Design system (tokens, components, animations, responsive) |

### Components
| Path | Description |
|------|-------------|
| `components/hero.tsx` + `hero-client.tsx` | Hero section with atmospheric effects |
| `components/nav.tsx` | Sticky nav with theme toggle |
| `components/projects.tsx` | Featured project cards |
| `components/essays.tsx` + `essays-client.tsx` | Essay list with filters |
| `components/essay-reader.tsx` | Full-screen essay reader overlay |
| `components/hire.tsx` + `hire-client.tsx` | Consulting tiers + Stripe |
| `components/education.tsx` | Education section |
| `components/github.tsx` | GitHub contribution heatmap |
| `components/newsletter.tsx` | Newsletter signup |
| `components/about.tsx` | Bio section |
| `components/loader.tsx` + `loader-wrapper.tsx` | Liquid-fill loader with GSAP exit |
| `components/providers.tsx` | ThemeProvider |
| `components/gsap-provider.tsx` | GSAP + Lenis initialization |

### Animation System (GSAP)
| Path | Description |
|------|-------------|
| `components/gsap-provider.tsx` | Foundation: Lenis + plugin registration |
| `components/animations/hero-animations.tsx` | Cinematic hero entrance timeline |
| `components/animations/scroll-animations.tsx` | Per-section ScrollTrigger choreography |
| `components/animations/card-interactions.tsx` | 3D tilt on project cards |
| `components/animations/magnetic-cursor.tsx` | Custom cursor (desktop only) |
| `components/animations/page-transition.tsx` | Route transition wrapper |

### Backend / API
| Path | Description |
|------|-------------|
| `app/api/github/route.ts` | GitHub contribution data API |
| `supabase/functions/create-checkout/` | Stripe checkout edge function |
| `supabase/functions/stripe-webhook/` | Stripe webhook handler |

### Database
| Path | Description |
|------|-------------|
| `supabase/migrations/` | SQL migrations (schema-init, hide_url) |
| Tables: `projects`, `essays`, `education`, `now_items`, `consulting_tiers`, `site_settings` |

### Documentation
| Path | Description |
|------|-------------|
| `docs/gsap-animations.md` | GSAP animation system architecture |
| `docs/readme.ai.md` | This file — AI context catalog |

## Design System
- **Accent**: `#8ec052` (sage green)
- **Fonts**: Space Grotesk (headings), Geist (body), JetBrains Mono (code), Instrument Serif (editorial)
- **Themes**: Light (`#fafaf9`) / Dark (`#0a0a0a`), auto-detected from OS preference
- **CSS Variables**: `--bg`, `--fg`, `--accent`, `--border`, `--d-pad`, `--d-section`, etc.
- **Animations**: GSAP + Lenis smooth scroll (replaces CSS-only system)

## Key Dependencies
| Package | Purpose |
|---------|---------|
| `next` | Framework (v16, App Router) |
| `gsap` + `@gsap/react` | Animation engine |
| `lenis` | Smooth scroll |
| `@supabase/ssr` | Database client |
| `stripe` | Payments |
| `novel` | Rich text editor (admin) |
| `marked` + `sanitize-html` | Markdown/HTML processing |
