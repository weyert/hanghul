# RFC: MDX Content Pages, Localization, and Feature-Flagged Navigation

## Status
- **Status**: Proposed
- **Author**: Codex
- **Date**: 2026-05-05

## 1. Summary
It is feasible to move prose-heavy React pages to Markdown/MDX. The current static guides mix content, layout atoms, navigation links, and feature checks inside route components, which makes translations and maintenance expensive.

This RFC proposes a content layer where MDX owns page copy, React owns reusable layout/components, and routing plus feature flags are driven from shared metadata. The target URL model is locale-prefixed routes such as `/en/romanization-guide` and `/nl/romanization-guide`.

Interactive learning tools should remain in TSX and typed data files. The first migration should focus on static instructional pages.

## 2. Goals
- Make static content pages easier to author, review, and translate.
- Support English and Dutch versions of static pages with predictable fallback behavior.
- Remove duplicated feature-flag plumbing from desktop and mobile navigation.
- Preserve TanStack Router, TanStack Start, OpenFeature, and the current visual system.
- Keep interactive pages maintainable by not forcing them into MDX.

## 3. Proposed Changes

### 3.1 Add MDX support
Add MDX support to the Vite/TanStack Start build using an MDX plugin. MDX files should be compiled at build time and imported through a small content registry rather than loaded as raw runtime text.

MDX pages may use a curated component set, for example:
- `Callout`
- `WordChip`
- `ExampleGrid`
- `ComparisonTable`
- `CtaCard`
- `SectionCard`
- `FeatureFlag` (re-exported from `@openfeature/react-sdk` — see Section 3.6)

These components should wrap the existing visual language so authors can write content without copying route-level JSX.

### 3.2 Introduce localized content files
Store localized static content with one folder per page slug:

```text
src/content/pages/<slug>/en.mdx
src/content/pages/<slug>/nl.mdx
```

Each MDX file should include frontmatter:

```yaml
title: Romanization: What It Is and Why to Move Past It
description: A tool for the first week, not a crutch for life
flag: romanization-guide
navLabel: Romanization
audience: general
```

The initial locale set should be expressed by renaming the existing `Language` type in
`src/contexts/LanguageContext.tsx` to `Locale` and re-exporting it from there. All current
consumers of `Language` should be updated to use `Locale`. This removes the dual-type
problem that would otherwise require casting at every boundary between the content registry
and the language switcher.

```ts
// src/contexts/LanguageContext.tsx (rename)
export type Locale = 'en' | 'nl'
```

English should be the fallback locale when a Dutch page is missing.

### 3.3 Use locale-prefixed routes
Adopt locale-prefixed URLs for static content pages:

```text
/en/<slug>
/nl/<slug>
```

This is preferable to language stored only in `localStorage` because it gives each localized page a shareable URL, improves SSR correctness, and makes future SEO work possible.

The existing language switcher should update the URL locale when the current route supports localization. `localStorage` should remain as the user's preferred locale for choosing a locale from non-localized entry points, but an explicit locale in the URL wins once the user is already on `/en/...` or `/nl/...`. This prevents a stored preference from fighting shareable localized URLs.

Legacy routes should redirect to the matching localized route. Because locale preference is
stored in `localStorage`, it is unavailable during SSR. Two redirect tiers are needed:

**Server-side (SSR/static):** Legacy routes redirect deterministically without reading
`localStorage`. Most legacy content routes redirect to the English variant. The Dutch
speaker guide is the exception because `/dutch-guide` is audience-specific and should keep
landing Dutch users on the Dutch-language route:
- `/english-guide` → `/en/english-guide`
- `/dutch-guide` → `/nl/dutch-guide`
- `/romanization-guide` → `/en/romanization-guide`
- `/ipa-guide` → `/en/ipa-guide`

**Client-side (after hydration):** A small legacy redirect component may refine the
server-side redirect using the stored locale preference, but only when the navigation is
known to have come from a legacy URL. For example, `/romanization-guide` can SSR redirect to
`/en/romanization-guide?from=legacy`; after hydration, a Dutch-preferring user can be
replaced to `/nl/romanization-guide` and the marker removed. Direct visits to
`/en/romanization-guide` or `/nl/romanization-guide` must not be rewritten based on
`localStorage`; the URL locale is the source of truth for localized URLs.

Storing locale preference in a cookie (in addition to `localStorage`) is explicitly out of
scope for this phase. The two-tier approach is sufficient for the current use case and avoids
introducing cookie management.

### 3.4 Centralize content and navigation metadata
Create a content registry that validates and exports page metadata:

```ts
type ContentPageMeta = {
  slug: string
  locale: Locale
  title: string
  description: string
  flag?: FlagKey
  navLabel: Record<Locale, string>
  audience?: string
}
```

The registry should provide:
- `getContentPage(slug, locale)` to load the compiled MDX module.
- `getContentPageMeta(slug, locale)` for route head tags and navigation.
- `CONTENT_NAV_ITEMS` as the single source for content navigation entries.

Frontmatter validation should happen at the registry boundary. The registry imports the
compiled MDX modules, parses their `frontmatter` through a typed validator, and asserts that
`flag`, when present, is one of the exported `FLAGS` values:

```ts
const FLAG_VALUES = new Set<string>(Object.values(FLAGS))

function parseContentFrontmatter(value: unknown): ContentPage['frontmatter'] {
  const frontmatter = ContentFrontmatterSchema.parse(value)
  if (frontmatter.flag && !FLAG_VALUES.has(frontmatter.flag)) {
    throw new Error(`Unknown content flag: ${frontmatter.flag}`)
  }
  return frontmatter as ContentPage['frontmatter']
}
```

If the project does not add a schema library for this, the same check can be implemented
with a small local type guard. The important contract is that invalid frontmatter fails
`pnpm build` instead of silently producing broken navigation or flag checks.

Navigation should combine always-on app routes with flagged route metadata. This removes the current pattern where desktop and mobile navigation each read many flags manually.

### 3.5 Keep audience-specific guides distinct from translations
The English speaker guide and Dutch speaker guide are not simple translations of the same page; they teach different pronunciation transfer issues. They should remain separate slugs.

For example:
- `/en/english-guide`
- `/nl/english-guide`
- `/en/dutch-guide`
- `/nl/dutch-guide`

If only one language version exists initially, the content registry should fall back to English and make that fallback explicit in code.

### 3.6 Feature flag gating — two tiers

Feature flags operate at two distinct levels: the whole page and sections within a page.

#### Tier 1 — page-level gating (route wrapper)

The shared MDX route wrapper reads `flag` from the content registry and evaluates it before
rendering any content. If the flag is off the user sees the existing disabled-state UI; if
the flag is absent the page always renders. This keeps the gate co-located with routing, not
scattered across every MDX file.

```tsx
// src/routes/$locale/$slug.tsx (sketch)
function ContentPage() {
  const { locale, slug } = Route.useParams()
  const meta = getContentPageMeta(slug, locale as Locale)
  const { default: MDXContent } = getContentPage(slug, locale as Locale)

  return (
    <ContentPageGate flag={meta.flag}>
      <MDXContent components={MDX_COMPONENTS} />
    </ContentPageGate>
  )
}

function ContentPageGate({ flag, children }: { flag?: FlagKey; children: React.ReactNode }) {
  if (!flag) return <>{children}</>

  return <FlaggedContentPage flag={flag}>{children}</FlaggedContentPage>
}

function FlaggedContentPage({ flag, children }: { flag: FlagKey; children: React.ReactNode }) {
  const flagEnabled = useBooleanFlagValue(flag, true)
  return flagEnabled ? <>{children}</> : <DisabledPage />
}
```

The `flag` value from frontmatter is validated against `FlagKey` at build time by the
content registry, so an unknown flag key fails the build rather than becoming a silent
runtime miss.

#### Tier 2 — content-level gating (`<FeatureFlag>` in MDX)

For conditional sections *within* a page, OpenFeature's `FeatureFlag` component from
`@openfeature/react-sdk` is exposed as part of the curated MDX component set. Content
authors can gate any block of prose or components directly in the MDX file without touching
TypeScript:

```mdx
Standard content visible to everyone.

<FeatureFlag flagKey="hangul-first" defaultValue={false}>
  <Callout>
    Try switching to Hangul-first mode in the quiz — prompts will appear in Korean only.
  </Callout>
</FeatureFlag>
```

The `fallback` prop renders alternative content when the flag is off:

```mdx
<FeatureFlag flagKey="ipa-display" defaultValue={false} fallback={<p>IPA display coming soon.</p>}>
  <IpaTable />
</FeatureFlag>
```

`FeatureFlag` is already provided by `@openfeature/react-sdk` — no new dependency is
required. It must be included in the `MDX_COMPONENTS` map passed to `<MDXContent>` so that
MDX can resolve it without an explicit import in each file.

#### Summary of responsibilities

| Concern | Mechanism |
|---|---|
| Whole page hidden from nav | `CONTENT_NAV_ITEMS` filters by flag at render time |
| Whole page blocks direct visit | Route wrapper evaluates `meta.flag` before rendering |
| Section of page conditionally shown | `<FeatureFlag>` component in MDX body |

## 4. Migration Plan
1. Add MDX build support. Create the reusable MDX component set (`Callout`, `WordChip`,
   `ExampleGrid`, `ComparisonTable`, `CtaCard`, `SectionCard`) as new React components —
   these do not exist yet and must be built before any MDX content can be authored.
2. Rename `Language` to `Locale` in `src/contexts/LanguageContext.tsx` and update all
   consumers. Add the content registry and route metadata model.
3. Implement localized routing under `/$locale/<slug>`.
4. Update the language switcher to sync route locale, document language, and `localStorage`.
5. Replace duplicated desktop/mobile flagged navigation with a shared nav registry.
6. Convert `romanization-guide` first to prove routing, frontmatter, MDX rendering, flag gating, and redirects.
7. Convert `ipa-guide`, `english-guide`, `dutch-guide`, and `grammar` after the first page is verified.

Interactive routes such as quiz, learn, vocabulary drills, Korea facts, stroke order, and builder should not be migrated in this phase.

## 5. Public Interfaces

### Locale
```ts
export type Locale = 'en' | 'nl'
```

### Content page metadata
```ts
export type ContentPageMeta = {
  slug: string
  locale: Locale
  title: string
  description: string
  flag?: FlagKey
  navLabel: Record<Locale, string>
  audience?: string
}
```

`navLabel` is `Record<Locale, string>` so that navigation items can render the correct label
for the active locale without a second registry lookup. All MDX frontmatter files declare
`navLabel` as a string for the file's own locale; the registry merges the per-locale files
into the combined `Record<Locale, string>` shape when building `CONTENT_NAV_ITEMS`.

### Content page module
```ts
export type ContentPage = {
  /** The compiled MDX React component. */
  default: React.ComponentType
  /** Frontmatter values parsed at build time. */
  frontmatter: {
    title: string
    description: string
    flag?: FlagKey
    navLabel: string
    audience?: string
  }
}
```

### Content loading
```ts
export function getContentPage(slug: string, locale: Locale): ContentPage
export function getContentPageMeta(slug: string, locale: Locale): ContentPageMeta
```

### Navigation metadata
```ts
export const CONTENT_NAV_ITEMS: ReadonlyArray<{
  slug: string
  flag?: FlagKey
  navLabel: Record<Locale, string>
}>
```

## 6. Testing
- `pnpm build` passes with MDX imports and TanStack route generation.
- `/en/<slug>` and `/nl/<slug>` render the expected localized content.
- Legacy URLs redirect to locale-prefixed routes.
- Unknown locales (e.g. `/ko/romanization-guide` where `ko` is not in the `Locale` union) result in a 404, not a silent fallback to English. The `/$locale` route parameter should be validated against the `Locale` union at the route loader level before any content lookup is attempted.
- Disabled content pages are hidden from desktop and mobile navigation.
- Direct visits to disabled content pages show the existing disabled-state behavior (tier-1 gate).
- A `<FeatureFlag>` block inside MDX renders its children when the flag is on and its `fallback` when the flag is off, without affecting the rest of the page (tier-2 gate).
- A `<FeatureFlag>` block with no `fallback` renders nothing when the flag is off.
- Switching language updates the URL locale, updates `<html lang>`, and preserves the current slug when the translated page exists.
- MDX content can render Korean text, IPA symbols, emphasis, tables/cards, and internal React Router links without hydration errors.

## 7. Alternatives Considered

### Keep content in TSX
This avoids adding MDX dependencies but keeps prose, layout, localization, and feature checks coupled in route files. It does not solve the maintenance problem.

### Use one URL and render from `LanguageContext`
This is the smallest migration, but localized pages are not shareable, SSR has less information, and search engines cannot distinguish localized content cleanly.

### Use translated slugs
Routes such as `/nl/romanisering` are more readable, but they add redirect and lookup complexity. Locale-prefixed stable slugs are simpler for the first implementation.

### Use raw Markdown only
Plain Markdown is simpler than MDX but cannot easily express the current cards, chips, callouts, and Korean examples without custom syntax. MDX better fits the existing page design.

## 8. Assumptions
- Locale-prefixed URLs are the target strategy.
- English is the fallback locale.
- MDX is only for static instructional content in this phase.
- OpenFeature remains the feature flag system.
- The implementation must preserve existing uncommitted work and avoid broad rewrites outside the content/navigation layer.
