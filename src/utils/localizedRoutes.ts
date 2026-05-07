import { notFound } from '@tanstack/react-router'
import type { Locale } from '../contexts/LanguageContext'
import { SITE_URL, createSeoHead } from '../seo'

export const VALID_LOCALES = new Set<string>(['en', 'nl'])

export function assertLocale(locale: string): asserts locale is Locale {
  if (!VALID_LOCALES.has(locale)) throw notFound()
}

export function localizedToolHead({
  locale,
  slug,
  title,
  description,
  keywords,
}: {
  locale: Locale
  slug: string
  title: string
  description: string
  keywords?: string[]
}) {
  const seo = createSeoHead({
    title,
    description,
    path: `/${locale}/${slug}`,
    keywords,
  })

  return {
    ...seo,
    links: [
      ...seo.links,
      { rel: 'alternate', hrefLang: 'en', href: `${SITE_URL}/en/${slug}` },
      { rel: 'alternate', hrefLang: 'nl', href: `${SITE_URL}/nl/${slug}` },
      { rel: 'alternate', hrefLang: 'x-default', href: `${SITE_URL}/en/${slug}` },
    ],
  }
}

export function localePath(locale: Locale, path: string) {
  if (path === '/') return '/'
  if (path.startsWith('/en/') || path.startsWith('/nl/')) return path
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
}
