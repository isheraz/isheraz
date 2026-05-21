'use client'
import { useState } from 'react'
import { EDU, EDU_ALL } from '@/lib/data'
import Link from 'next/link'
import { Tutorial, Talk, Resource } from './icons'

export function Education() {
  const [tab, setTab] = useState('Tutorials')
  const items = (EDU as any)[tab]
  const icons: any = { Tutorials: Tutorial, Talks: Talk, Resources: Resource }

  const getItemIndex = (item: any) => {
    return EDU_ALL.findIndex(edu => edu.title === item.title)
  }

  return (
    <section id="education">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Education / Learning</div>
            <h2 className="section-title">What I'm teaching — and what I send to engineers I mentor.</h2>
            <p className="section-sub">Tutorials I've written, talks I've given, and the resource lists I'd hand a younger version of myself.</p>
          </div>
        </div>
        <div className="edu-tabs" role="tablist">
          {['Tutorials', 'Talks', 'Resources'].map(t => {
            const Ico = icons[t]
            const count = (EDU as any)[t].length
            return (
              <button key={t} className="edu-tab" onClick={() => setTab(t)} role="tab" aria-pressed={tab === t}>
                <Ico /> {t} <span className="count">{count}</span>
              </button>
            )
          })}
        </div>
        <div className="edu-grid">
          {items.map((it: any, i: number) => {
            const itemIndex = getItemIndex(it)
            return (
              <Link key={i} className="edu-card" href={`/education/${itemIndex}`}>
                <div className="edu-kind">
                  <span className="kind-dot"></span>
                  {it.meta[0]}
                </div>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
                <div className="edu-meta">
                  <span>{it.meta[1]}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
