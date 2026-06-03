export function formatRelativeDate(isoDateString?: string | null): string {
  if (!isoDateString) return 'today'
  const d = new Date(isoDateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - d.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  return `${diffDays} days ago`
}

export function parseSideBets(sideBetsRaw?: string | null): { number: string, text: string } {
  const fallback = { number: '4', text: ' AI ventures in flight' }
  if (!sideBetsRaw) return fallback
  
  const match = sideBetsRaw.match(/^(\d+)/)
  if (!match) return { number: '', text: sideBetsRaw }
  
  const numStr = match[0]
  const textStr = sideBetsRaw.substring(numStr.length)
  return { number: numStr, text: textStr }
}
