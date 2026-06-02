'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Arrow } from './icons'

export default function EducationDetail({ item, moreItems }: { item: any, moreItems: any[] }) {
  const router = useRouter()

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
            {item.meta_tags?.[0]}
          </div>
          <h1>{item.title}</h1>
          <div className="detail-meta">
            <span>{item.meta_tags?.[1]}</span>
            {item.type && <span className="detail-cat">{item.type}</span>}
          </div>
        </div>

        {item.description && (
          <div className="detail-body" dangerouslySetInnerHTML={{ __html: item.description }} />
        )}

        <div className="detail-more">
          <h3>More resources</h3>
          <div className="more-grid">
            {moreItems.map((edu: any) => {
              const strippedDesc = typeof edu.description === 'string' 
                ? edu.description.replace(/<[^>]*>?/gm, '') 
                : ''
              return (
                <Link key={edu.id} href={`/education/${edu.slug}`} className="more-card">
                  <div className="more-kind">
                    <span className="kind-dot"></span>
                    {edu.meta_tags?.[0]}
                  </div>
                  <h4>{edu.title}</h4>
                  <p>{strippedDesc.length > 120 ? strippedDesc.slice(0, 120) + '...' : strippedDesc}</p>
                  <span className="more-meta">{edu.meta_tags?.[1]}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
