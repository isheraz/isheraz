'use client'
import { NOW_ITEMS } from '@/lib/data'

export function NowStrip() {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return (
    <div className="now-strip">
      <div className="shell now-shell">
        <div className="now-head">
          <span className="now-tag">/ Now</span>
          <span className="now-stamp">Updated {today} · Lahore</span>
        </div>
        <div className="now-items">
          {NOW_ITEMS.map((item: any, i: number) => (
            <div key={i} className="now-item" data-accent={item.accent}>
              <span className="now-pip"></span>
              <span className="now-itag">{item.tag}</span>
              <span className="now-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
