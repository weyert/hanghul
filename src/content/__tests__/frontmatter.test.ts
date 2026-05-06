import { describe, it, expect } from 'vitest'
import {
  getContentPage,
  getContentPageMeta,
  getStaticRoutes,
  CONTENT_NAV_ITEMS,
} from '../registry'

describe('MDX Frontmatter Extraction', () => {
  it('extracts frontmatter correctly from romanization-guide', () => {
    const meta = getContentPageMeta('romanization-guide', 'en')
    expect(meta.title).toBe('Romanization: What It Is and Why to Move Past It')
    expect(meta.flag).toBe('romanization-guide')
    expect(meta.navLabel).toEqual({ en: 'Romanization', nl: 'Romanization' })
  })

  it('extracts frontmatter from dutch-guide (nl only)', () => {
    const meta = getContentPageMeta('dutch-guide', 'nl')
    expect(meta.title).toBe('Hangul leren voor Nederlandstaligen')
    expect(meta.exclusiveToLocale).toBe('nl')
  })
})

describe('getContentPage fallback', () => {
  it('returns the English module directly when requested locale exists', () => {
    const result = getContentPage('romanization-guide', 'en')
    expect(result.fallback).toBe(false)
  })

  it('falls back to English when no Dutch content exists for a slug', () => {
    const result = getContentPage('romanization-guide', 'nl')
    expect(result.fallback).toBe(true)
    expect(result.module.frontmatter.title).toContain('Romanization')
  })

  it('returns Dutch content directly for dutch-guide', () => {
    const result = getContentPage('dutch-guide', 'nl')
    expect(result.fallback).toBe(false)
  })

  it('throws for an unknown slug', () => {
    expect(() => getContentPage('nonexistent-slug', 'en')).toThrow('Unknown content slug')
  })

  it('throws when a slug has no content for any locale', () => {
    // dutch-guide has no English version, requesting English should throw
    expect(() => getContentPage('dutch-guide', 'en')).toThrow()
  })
})

describe('CONTENT_NAV_ITEMS audience filtering', () => {
  it('english-guide is marked exclusiveToLocale en', () => {
    const item = CONTENT_NAV_ITEMS.find((i) => i.slug === 'english-guide')
    expect(item?.exclusiveToLocale).toBe('en')
  })

  it('dutch-guide is marked exclusiveToLocale nl', () => {
    const item = CONTENT_NAV_ITEMS.find((i) => i.slug === 'dutch-guide')
    expect(item?.exclusiveToLocale).toBe('nl')
  })

  it('includes all seven content pages (consonants and vowels excluded via hideFromNav)', () => {
    const slugs = CONTENT_NAV_ITEMS.map((i) => i.slug)
    expect(slugs).toContain('romanization-guide')
    expect(slugs).toContain('ipa-guide')
    expect(slugs).toContain('english-guide')
    expect(slugs).toContain('dutch-guide')
    expect(slugs).toContain('grammar')
    expect(slugs).toContain('batchim')
    expect(slugs).toContain('blocks')
    // consonants and vowels are hidden from the More dropdown (hideFromNav: true)
    expect(slugs).not.toContain('consonants')
    expect(slugs).not.toContain('vowels')
  })

  it('english-guide is hidden when filtering by nl locale', () => {
    const visible = CONTENT_NAV_ITEMS.filter(
      (i) => !i.exclusiveToLocale || i.exclusiveToLocale === 'nl',
    )
    expect(visible.find((i) => i.slug === 'english-guide')).toBeUndefined()
    expect(visible.find((i) => i.slug === 'dutch-guide')).toBeDefined()
  })

  it('dutch-guide is hidden when filtering by en locale', () => {
    const visible = CONTENT_NAV_ITEMS.filter(
      (i) => !i.exclusiveToLocale || i.exclusiveToLocale === 'en',
    )
    expect(visible.find((i) => i.slug === 'dutch-guide')).toBeUndefined()
    expect(visible.find((i) => i.slug === 'english-guide')).toBeDefined()
  })
})

describe('getStaticRoutes (sitemap support)', () => {
  it('returns an entry for each real content file', () => {
    const routes = getStaticRoutes()
    expect(routes).toContainEqual({
      path: '/en/romanization-guide',
      slug: 'romanization-guide',
      locale: 'en',
    })
    expect(routes).toContainEqual({
      path: '/nl/dutch-guide',
      slug: 'dutch-guide',
      locale: 'nl',
    })
    expect(routes).toContainEqual({ path: '/en/ipa-guide', slug: 'ipa-guide', locale: 'en' })
    expect(routes).toContainEqual({
      path: '/en/english-guide',
      slug: 'english-guide',
      locale: 'en',
    })
    expect(routes).toContainEqual({ path: '/en/grammar', slug: 'grammar', locale: 'en' })
    expect(routes).toContainEqual({ path: '/en/batchim', slug: 'batchim', locale: 'en' })
    expect(routes).toContainEqual({ path: '/en/blocks', slug: 'blocks', locale: 'en' })
    expect(routes).toContainEqual({ path: '/en/consonants', slug: 'consonants', locale: 'en' })
    expect(routes).toContainEqual({ path: '/nl/consonants', slug: 'consonants', locale: 'nl' })
    expect(routes).toContainEqual({ path: '/en/vowels', slug: 'vowels', locale: 'en' })
    expect(routes).toContainEqual({ path: '/nl/vowels', slug: 'vowels', locale: 'nl' })
  })

  it('does not fabricate fallback routes (no /nl/romanization-guide)', () => {
    const routes = getStaticRoutes()
    expect(routes.find((r) => r.path === '/nl/romanization-guide')).toBeUndefined()
  })

  it('returns only paths that have actual MDX files', () => {
    const routes = getStaticRoutes()
    for (const route of routes) {
      expect(['en', 'nl']).toContain(route.locale)
      expect(route.path).toBe(`/${route.locale}/${route.slug}`)
    }
  })
})
