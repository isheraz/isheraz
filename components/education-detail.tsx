'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EDU_ALL, EDU_BODIES } from '@/lib/data'
import { Arrow } from './icons'

export default function EducationDetail({ id }: { id: number }) {
  const router = useRouter()
  const item = EDU_ALL[id]
  const body = EDU_BODIES[id] || []

  if (!item) return null

  return (
    <div className="education-detail">
      <div className="shell">
        <button className="close-btn" onClick={() => router.push('/#education')} aria-label="Close">
          ✕
        </button>
        <div className="detail-head">
          <div className="detail-kind">
            <span className="kind-dot"></span>
            {item.meta[0]}
          </div>
          <h1>{item.title}</h1>
          <p className="detail-desc">{item.desc}</p>
          <div className="detail-meta">
            <span>{item.meta[1]}</span>
            {item.category && <span className="detail-cat">{item.category}</span>}
          </div>
        </div>

        {body.length > 0 && (
          <div className="detail-body">
            {body.map((section: any, i: number) => {
              if (section.type === 'h2') return <h2 key={i}>{section.text}</h2>
              if (section.type === 'p') return <p key={i}>{section.text}</p>
              if (section.type === 'lede') return <p key={i} className="detail-lede">{section.text}</p>
              if (section.type === 'pull') return <blockquote key={i}>{section.text}</blockquote>
              if (section.type === 'ul') return (
                <ul key={i}>
                  {section.items.map((item: string, j: number) => <li key={j}>{item}</li>)}
                </ul>
              )
              return null
            })}
          </div>
        )}

        <div className="detail-more">
          <h3>More resources</h3>
          <div className="more-grid">
            {EDU_ALL.map((edu, idx) => {
              if (idx === id || edu.title === item.title) return null
              return (
                <Link key={idx} href={`/education/${idx}`} className="more-card">
                  <div className="more-kind">
                    <span className="kind-dot"></span>
                    {edu.meta[0]}
                  </div>
                  <h4>{edu.title}</h4>
                  <p>{edu.desc}</p>
                  <span className="more-meta">{edu.meta[1]}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
