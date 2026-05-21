'use client'

import React from 'react'
import { Arrow } from './icons'

function HeroLight() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number, particles: any[] = []
    let w = 0, h = 0

    const BEAM = { angle: Math.atan2(1.2, 0.42) }
    const dirX = Math.cos(BEAM.angle)
    const dirY = Math.sin(BEAM.angle)

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

    const seed = (W: number, H: number) => {
      const count = Math.min(70, Math.max(28, Math.round((W * H) / 22000)))
      particles = []
      for (let i = 0; i < count; i++) particles.push(spawn(W, H, true))
    }

    const spawn = (W: number, H: number, initial = false) => {
      const t = initial ? Math.random() : -0.2 + Math.random() * 0.3
      const lat = (Math.random() - 0.5) * 0.55
      const ax = 0.08 * W + (0.5 - 0.08) * W * t + lat * W * 0.6
      const ay = -0.08 * H + (1.1 + 0.08) * H * t
      return {
        x: ax,
        y: ay,
        t,
        lat,
        size: 0.6 + Math.random() * 2.2,
        speed: 0.0006 + Math.random() * 0.0012,
        drift: (Math.random() - 0.5) * 0.0008,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.6 + Math.random() * 1.4,
        opacity: 0.18 + Math.random() * 0.7,
      }
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed(w, h)
    }

    let last = performance.now()
    const draw = (now: number) => {
      const dt = Math.min(64, now - last)
      last = now
      ctx!.clearRect(0, 0, w, h)

      const dark = isDark()
      const color = dark ? '255, 245, 215' : '180, 150, 90'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.t += p.speed * dt
        p.lat += p.drift * dt
        if (p.t > 1.2) {
          particles[i] = spawn(w, h)
          continue
        }
        const ax = 0.08 * w + (0.5 - 0.08) * w * p.t + p.lat * w * 0.6
        const ay = -0.08 * h + (1.1 + 0.08) * h * p.t
        p.x = ax
        p.y = ay

        const tw = 0.5 + 0.5 * Math.sin(now * 0.001 * p.twinkleSpeed + p.phase)
        const fade =
          p.t < 0.1 ? p.t / 0.1 : p.t > 0.9 ? Math.max(0, (1.1 - p.t) / 0.2) : 1
        const a = p.opacity * tw * fade

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${color}, ${a})`
        ctx!.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="hero-light" aria-hidden="true">
      <div className="hero-light-beam"></div>
      <div className="hero-light-glow"></div>
      <canvas ref={canvasRef} className="hero-light-dust"></canvas>
    </div>
  )
}

function HeroCopy() {
  return (
    <>
      <span className="hero-available">
        <span className="pulse"></span>
        Open for 1 consulting slot · Q3 2026
      </span>
      <h1>
        Software Architect.<br />
        AI product builder.<br />
        <em>11 years in. The syntax changes. The artistry doesn't.</em>
      </h1>
      <p className="hero-sub">
        I&rsquo;m <strong>Sheraz</strong>. I architect and ship full-stack, cloud-native, and AI-powered products at scale &mdash; from pre-seed startups to government systems. Currently building <strong>Chasyr</strong> (AI voice agents for invoice recovery) and advising the <strong>Punjab Government</strong> on AI in special-needs education.
      </p>
      <div className="hero-cta">
        <a className="btn btn-primary" href="#hire">
          Hire me for a project <Arrow size={13} />
        </a>
        <a className="btn" href="#essays">
          Read the essays
        </a>
        <a className="btn" href="#projects">
          See what I&rsquo;ve built
        </a>
      </div>
      <div className="hero-meta">
        <span><b>11+</b> years shipping</span>
        <span><b>3,238</b> GitHub contributions / year</span>
        <span><b>4</b> AI ventures in flight</span>
        <span><b>Lahore, PK</b> · UTC+5</span>
      </div>
    </>
  )
}

function HeroStat() {
  return (
    <div className="hero-stat">
      <div className="hero-stat-num">3,238</div>
      <div className="hero-stat-label">GitHub contributions, last 12 months — @isheraz</div>
      <div className="hero-stat-row">
        <div className="mini"><b>59</b><span>repositories</span></div>
        <div className="mini"><b>7</b><span>orgs · sociable-tech, pitb-iep, …</span></div>
        <div className="mini"><b>200+</b><span>Chasyr waitlist</span></div>
        <div className="mini"><b>$1M</b><span>largest project owned</span></div>
      </div>
    </div>
  )
}

export function Hero({ variant = 'default' }: { variant?: string }) {
  return (
    <section className="hero" data-variant={variant} id="top">
      <HeroLight />
      <div className="shell">
        {variant === 'split' ? (
          <div className="hero-grid">
            <HeroCopy />
            <HeroStat />
          </div>
        ) : (
          <HeroCopy />
        )}
      </div>
    </section>
  )
}
