import { useEffect } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { getContentPage, getContentPageLocales, getContentPageMeta } from '../../content/registry'
import { MDX_COMPONENTS } from '../../components/mdx'
import { useLanguage } from '../../contexts/LanguageContext'
import type { Locale } from '../../contexts/LanguageContext'
import { FlagGate } from '../../components/FlagGate'
import { FallbackBanner } from '../../components/FallbackBanner'
import { CONTENT_ARTWORK, PageArtwork } from '../../components/PageArtwork'
import { SITE_URL, createSeoHead } from '../../seo'

const VALID_LOCALES = new Set<string>(['en', 'nl'])
export const Route = createFileRoute('/$locale/$slug')({
  beforeLoad: ({ params }) => {
    if (!VALID_LOCALES.has(params.locale)) throw notFound()
  },
  head: ({ params }) => {
    try {
      const meta = getContentPageMeta(params.slug, params.locale as Locale)
      const locales = getContentPageLocales(params.slug)
      const alternates = locales.map(l => ({
        rel: 'alternate',
        hrefLang: l,
        href: `${SITE_URL}/${l}/${params.slug}`,
      }))
      const defaultLocale = locales.includes('en') ? 'en' : (locales[0] ?? 'en')
      const seo = createSeoHead({
        title: meta.title,
        description: meta.description,
        path: `/${meta.locale}/${params.slug}`,
        type: 'article',
      })
      return {
        ...seo,
        links: [
          ...seo.links,
          ...alternates,
          { rel: 'alternate', hrefLang: 'x-default', href: `${SITE_URL}/${defaultLocale}/${params.slug}` },
        ],
      }
    } catch {
      return {}
    }
  },
  component: ContentPage,
})

// ─── Locale sync ──────────────────────────────────────────────────────
// Keeps LanguageContext in sync with the URL locale so nav active states
// and the language switcher reflect the current page locale.

function LocaleSync({ locale }: { locale: Locale }) {
  const { setLanguage } = useLanguage()
  useEffect(() => {
    setLanguage(locale)
  }, [locale, setLanguage])
  return null
}

// ─── Page ─────────────────────────────────────────────────────────────

function ContentPage() {
  const { locale, slug } = Route.useParams()

  let result
  try {
    result = getContentPage(slug, locale as Locale)
  } catch {
    throw notFound()
  }

  const meta = getContentPageMeta(slug, locale as Locale)
  const MDXContent = result.module.default
  const artwork = slug === 'consonants' || slug === 'vowels'
    ? null
    : CONTENT_ARTWORK[slug]

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <LocaleSync locale={locale as Locale} />
      {result.fallback && <FallbackBanner slug={slug} />}
      {artwork && <PageArtwork {...artwork} />}
      <FlagGate flag={meta.flag}>
        <MDXContent components={MDX_COMPONENTS as Record<string, unknown>} />
      </FlagGate>
    </div>
  )
}
