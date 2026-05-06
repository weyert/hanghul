import type { Locale } from '../contexts/LanguageContext'
import type { FlagKey } from '../flags'
import { FLAGS } from '../flags'

// ─── Types ────────────────────────────────────────────────────────────

export type ContentPageFrontmatter = {
  title: string
  description: string
  flag?: FlagKey
  navLabel: string
  audience?: string
  exclusiveToLocale?: Locale
  hideFromNav?: boolean
}

export type ContentPageModule = {
  default: React.ComponentType<{ components?: Record<string, unknown> }>
  frontmatter: ContentPageFrontmatter
}

export type ContentPageMeta = {
  slug: string
  locale: Locale
  title: string
  description: string
  flag?: FlagKey
  navLabel: Record<Locale, string>
  audience?: string
  exclusiveToLocale?: Locale
}

// ─── MDX imports ─────────────────────────────────────────────────────
// All content modules are imported statically so the registry is
// available synchronously during SSR and build.

import * as romanizationEn from './pages/romanization-guide/en.mdx'
import * as ipaEn from './pages/ipa-guide/en.mdx'
import * as englishEn from './pages/english-guide/en.mdx'
import * as dutchNl from './pages/dutch-guide/nl.mdx'
import * as grammarEn from './pages/grammar/en.mdx'
import * as batchimEn from './pages/batchim/en.mdx'
import * as blocksEn from './pages/blocks/en.mdx'
import * as consonantsEn from './pages/consonants/en.mdx'
import * as consonantsNl from './pages/consonants/nl.mdx'
import * as vowelsEn from './pages/vowels/en.mdx'
import * as vowelsNl from './pages/vowels/nl.mdx'

// ─── Frontmatter validation ───────────────────────────────────────────

const FLAG_VALUES = new Set<string>(Object.values(FLAGS))

function validateFrontmatter(value: unknown, source: string): ContentPageFrontmatter {
  if (!value || typeof value !== 'object') {
    throw new Error(`Missing frontmatter in ${source}`)
  }
  const fm = value as Record<string, unknown>

  if (typeof fm.title !== 'string' || !fm.title) throw new Error(`Missing "title" in ${source}`)
  if (typeof fm.description !== 'string') throw new Error(`Missing "description" in ${source}`)
  if (typeof fm.navLabel !== 'string') throw new Error(`Missing "navLabel" in ${source}`)

  if (fm.flag !== undefined) {
    if (typeof fm.flag !== 'string' || !FLAG_VALUES.has(fm.flag)) {
      throw new Error(`Unknown flag "${String(fm.flag)}" in ${source}`)
    }
  }

  if (fm.exclusiveToLocale !== undefined) {
    if (fm.exclusiveToLocale !== 'en' && fm.exclusiveToLocale !== 'nl') {
      throw new Error(`Invalid exclusiveToLocale "${String(fm.exclusiveToLocale)}" in ${source}`)
    }
  }

  return fm as unknown as ContentPageFrontmatter
}

// ─── Registry ────────────────────────────────────────────────────────

type SlugLocaleMap = Partial<Record<Locale, ContentPageModule>>

const PAGES: Record<string, SlugLocaleMap> = {
  'romanization-guide': {
    en: romanizationEn as unknown as ContentPageModule,
  },
  'ipa-guide': {
    en: ipaEn as unknown as ContentPageModule,
  },
  'english-guide': {
    en: englishEn as unknown as ContentPageModule,
  },
  'dutch-guide': {
    nl: dutchNl as unknown as ContentPageModule,
  },
  'grammar': {
    en: grammarEn as unknown as ContentPageModule,
  },
  'batchim': {
    en: batchimEn as unknown as ContentPageModule,
  },
  'blocks': {
    en: blocksEn as unknown as ContentPageModule,
  },
  'consonants': {
    en: consonantsEn as unknown as ContentPageModule,
    nl: consonantsNl as unknown as ContentPageModule,
  },
  'vowels': {
    en: vowelsEn as unknown as ContentPageModule,
    nl: vowelsNl as unknown as ContentPageModule,
  },
}

// Validate all frontmatter at module load time — fails pnpm build on bad content.
for (const [slug, locales] of Object.entries(PAGES)) {
  for (const [locale, mod] of Object.entries(locales) as [Locale, ContentPageModule][]) {
    validateFrontmatter(mod.frontmatter, `${slug}/${locale}.mdx`)
  }
}

// ─── Public API ───────────────────────────────────────────────────────

/** Returns the MDX module for a slug/locale, falling back to English. */
export function getContentPage(
  slug: string,
  locale: Locale,
): { module: ContentPageModule; fallback: boolean } {
  const locales = PAGES[slug]
  if (!locales) throw new Error(`Unknown content slug: "${slug}"`)

  if (locales[locale]) return { module: locales[locale]!, fallback: false }
  if (locale !== 'en' && locales.en) return { module: locales.en, fallback: true }

  throw new Error(`No content found for "${slug}" in any locale`)
}

/** Returns merged metadata for a slug, combining both locale files. */
export function getContentPageMeta(slug: string, locale: Locale): ContentPageMeta {
  const locales = PAGES[slug]
  if (!locales) throw new Error(`Unknown content slug: "${slug}"`)

  const effectiveLocale: Locale = locales[locale] ? locale : 'en'
  const fm = locales[effectiveLocale]!.frontmatter

  const navLabel: Record<Locale, string> = { en: fm.navLabel, nl: fm.navLabel }
  const otherLocale: Locale = locale === 'en' ? 'nl' : 'en'
  const otherMod = locales[otherLocale]
  if (otherMod) navLabel[otherLocale] = otherMod.frontmatter.navLabel

  return {
    slug,
    locale: effectiveLocale,
    title: fm.title,
    description: fm.description,
    flag: fm.flag,
    navLabel,
    audience: fm.audience,
    exclusiveToLocale: fm.exclusiveToLocale,
  }
}

/** Returns all slugs with a page available for the given locale (or English fallback). */
export function getAllSlugs(): string[] {
  return Object.keys(PAGES)
}

// ─── Sitemap support ──────────────────────────────────────────────────
// Returns one entry per slug+locale combination that has its own MDX file.
// English fallbacks are NOT duplicated — only routes with real content appear.

export type StaticRoute = {
  path: string
  slug: string
  locale: Locale
}

export function getStaticRoutes(): StaticRoute[] {
  return Object.entries(PAGES).flatMap(([slug, locales]) =>
    (Object.keys(locales) as Locale[]).map((locale) => ({
      path: `/${locale}/${slug}`,
      slug,
      locale,
    })),
  )
}

// ─── Navigation items ─────────────────────────────────────────────────
// Single source of truth for content guide links in the navigation.
// The MoreDropdown and mobile nav filter this by flag and exclusiveToLocale.

export type ContentNavItem = {
  slug: string
  flag?: FlagKey
  navLabel: Record<Locale, string>
  exclusiveToLocale?: Locale
  hideFromNav?: boolean
}

export const CONTENT_NAV_ITEMS: ReadonlyArray<ContentNavItem> = Object.entries(PAGES)
  .filter(([, locales]) => {
    const primaryFm = locales.en?.frontmatter ?? locales.nl?.frontmatter
    return !primaryFm?.hideFromNav
  })
  .map(([slug, locales]) => {
    const enFm = locales.en?.frontmatter
    const nlFm = locales.nl?.frontmatter
    const primaryFm = enFm ?? nlFm!

    const navLabel: Record<Locale, string> = {
      en: enFm?.navLabel ?? nlFm!.navLabel,
      nl: nlFm?.navLabel ?? enFm!.navLabel,
    }

    return {
      slug,
      flag: primaryFm.flag,
      navLabel,
      exclusiveToLocale: primaryFm.exclusiveToLocale,
      hideFromNav: primaryFm.hideFromNav,
    }
  })
