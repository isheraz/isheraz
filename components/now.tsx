'use client'
import { NOW_ITEMS } from '@/lib/data'

export function NowStrip({ updates = [] }: { updates?: any[] }) {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const itemsToRender = updates.length > 0 ? updates : NOW_ITEMS

  return (
    <div className="now-strip">
      <div className="shell now-shell">
        <div className="now-head">
          <span className="now-tag">/ Now</span>
          <span className="now-stamp">Updated {today} · Lahore</span>
        </div>
        <div className="now-items">
          {itemsToRender.map((item: any, i: number) => (
            <div key={item.id || i} className="now-item" data-accent={item.accent}>
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
