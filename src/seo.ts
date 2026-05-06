export const SITE_URL = 'https://korean.youcanlearn.it'
export const SITE_NAME = '한글 배우기'
export const DEFAULT_TITLE = '한글 배우기 — Learn Hangul'
export const DEFAULT_DESCRIPTION = 'Learn the Korean Hangul alphabet with flashcards, syllable tools, pronunciation breakdowns, and quizzes.'
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/social/hangul-og.png`

type SeoOptions = {
  title?: string
  description?: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('https://') || path.startsWith('http://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageTitle(title?: string) {
  return title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE
}

export function createSeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = 'Elegant Hangul learning tiles on a warm dark study surface.',
  type = 'website',
}: SeoOptions = {}) {
  const fullTitle = pageTitle(title)
  const url = absoluteUrl(path)

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:url', content: url },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
