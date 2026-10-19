/** Canonical host. Bare https://isheraz.com 308-redirects here. */
export const SITE_URL = 'https://www.isheraz.com'

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/photo-logo.png`,
  width: 1200,
  height: 630,
  alt: 'Sheraz Ahmed',
}

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

/** Strip markup for meta descriptions. Does not add copy that is not in the source. */
export function plainText(value: unknown, max = 160): string {
  if (typeof value !== 'string') return ''
  const text = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()
}
