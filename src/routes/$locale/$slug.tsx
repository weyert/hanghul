import { useEffect } from 'react'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { getContentPage, getContentPageMeta } from '../../content/registry'
import { MDX_COMPONENTS } from '../../components/mdx'
import { useLanguage } from '../../contexts/LanguageContext'
import type { Locale } from '../../contexts/LanguageContext'
import { FlagGate } from '../../components/FlagGate'
import { FallbackBanner } from '../../components/FallbackBanner'

const VALID_LOCALES = new Set<string>(['en', 'nl'])
const STORAGE_KEY = 'hangul-language'

export const Route = createFileRoute('/$locale/$slug')({
  validateSearch: (search: Record<string, unknown>) => ({
    from: typeof search.from === 'string' ? search.from : undefined,
  }),
  beforeLoad: ({ params }) => {
    if (!VALID_LOCALES.has(params.locale)) throw notFound()
  },
  head: ({ params }) => {
    try {
      const meta = getContentPageMeta(params.slug, params.locale as Locale)
      const alternates = (['en', 'nl'] as Locale[]).map(l => ({
        rel: 'alternate',
        hreflang: l,
        href: `/${l}/${params.slug}`,
      }))
      return {
        meta: [
          { title: `${meta.title} — 한글 배우기` },
          { name: 'description', content: meta.description },
        ],
        links: [
          { rel: 'canonical', href: `/${params.locale}/${params.slug}` },
          ...alternates,
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

// ─── Legacy refiner ───────────────────────────────────────────────────
// When a user arrives via a legacy redirect (?from=legacy), read the
// stored locale preference and silently navigate to the preferred locale.
// This runs only once on mount (client-side only) so that direct visits
// to /en/... or /nl/... are never rewritten by localStorage.

function LegacyRefiner({ locale, slug }: { locale: Locale; slug: string }) {
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const preferred: Locale = stored === 'nl' ? 'nl' : 'en'
    void navigate({ to: `/${preferred}/${slug}`, replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

// ─── Page ─────────────────────────────────────────────────────────────

function ContentPage() {
  const { locale, slug } = Route.useParams()
  const { from } = Route.useSearch()

  let result
  try {
    result = getContentPage(slug, locale as Locale)
  } catch {
    throw notFound()
  }

  const meta = getContentPageMeta(slug, locale as Locale)
  const MDXContent = result.module.default

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <LocaleSync locale={locale as Locale} />
      {from === 'legacy' && <LegacyRefiner locale={locale as Locale} slug={slug} />}
      {result.fallback && <FallbackBanner slug={slug} />}
      <FlagGate flag={meta.flag}>
        <MDXContent components={MDX_COMPONENTS as Record<string, unknown>} />
      </FlagGate>
    </div>
  )
}
