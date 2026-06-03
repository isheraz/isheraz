import { NOW_ITEMS } from '@/lib/data'
import { createClient } from '@/utils/supabase/server'

export async function NowStrip() {
  const supabase = await createClient()
  const { data: updates } = await supabase.from('now_updates').select('*').order('created_at', { ascending: false })
  
  const items = updates || []
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const itemsToRender = items.length > 0 ? items : NOW_ITEMS

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
