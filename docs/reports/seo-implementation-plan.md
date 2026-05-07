# SEO Implementation Plan

**Based on:** `seo-audit-2026-05-07.md`
**Total items:** 27 recommendations across 4 priority tiers

This plan is ordered by impact-to-effort ratio. Complete Critical items first — several block search engines from correctly understanding the site's structure.

---

## Critical — Fix before next crawl

These issues actively harm indexability. They are all code changes in known files.

---

### C-1: Remove duplicate canonical from root layout

**Impact:** Critical — Google may collapse the entire site to the homepage URL
**Effort:** 15 min
**File:** `src/routes/__root.tsx`

The root `head()` function calls `createSeoHead()` which emits a `<link rel="canonical">` tag. Child routes call it again with the correct page URL. Result: two conflicting canonicals on every content page.

**Fix:** Remove the `canonical` property from the `createSeoHead()` call inside the root `head()` function. The root layout should only emit metadata that does not conflict with child routes (viewport, charset, preconnect, the global WebSite JSON-LD). Each leaf route already manages its own canonical correctly.

---

### C-2: Remove sitewide hreflang override from root layout

**Impact:** Critical — Google sees `/en/consonants` as the language alternate for every page
**Effort:** 10 min
**File:** `src/routes/__root.tsx`

Three hardcoded `<link rel="alternate" hreflang="...">` lines in the root `head()` point every page's alternates to `/en/consonants` and `/nl/consonants`. Child routes emit their own correct alternates, but these appear after the root's incorrect ones.

**Fix:** Delete the three static `<link rel="alternate">` lines from the root `head()`. Each route already manages its own hreflang alternates correctly.

---

### C-3: Enable brotli/gzip compression on the server

**Impact:** Critical — main JS bundle is 426 KB served raw; ~110 KB with brotli
**Effort:** 30 min
**Location:** Server/nginx config or deployment platform config

The server returns no `Content-Encoding` header even when `Accept-Encoding: br` is sent. Every JS and CSS asset is transferred at full size.

**Fix options:**
- **nginx:** Add to server block:
  ```nginx
  brotli on;
  brotli_comp_level 6;
  brotli_types text/html text/css application/javascript application/json;
  gzip on;
  gzip_types text/html text/css application/javascript application/json;
  ```
- **Cloudflare (free tier):** Compression is automatic once proxied
- **Vercel/Netlify:** Automatic — no config needed

---

### C-4: Convert hero images to WebP/AVIF

**Impact:** Critical — 1.28 MB PNG hero image is likely the LCP element
**Effort:** 1 hour
**Files:** `public/social/hangul-og-syllables.png`, `public/social/hangul-og.png`

Both OG images are ~1.3 MB PNG files with no modern format alternative. As WebP they would be ~140–150 KB.

**Fix:**
1. Generate WebP and AVIF variants (use `cwebp` / `avifenc` or `sharp` in a build script)
2. Update the hero `<img>` to a `<picture>` element:
   ```html
   <picture>
     <source srcset="/social/hangul-og-syllables.avif" type="image/avif"/>
     <source srcset="/social/hangul-og-syllables.webp" type="image/webp"/>
     <img src="/social/hangul-og-syllables.png" fetchpriority="high" loading="eager"
          width="1200" height="630" alt="..."/>
   </picture>
   ```
3. Add `Cache-Control: public, max-age=2592000` to all `/social/` image responses

---

### C-5: Create `/llms.txt`

**Impact:** Critical — affects Perplexity, Claude browsing, and ChatGPT browsing source quality assessment
**Effort:** 30 min
**File:** Create `public/llms.txt`

No `llms.txt` exists. This is the primary GEO gap.

**Content:**
```
# 한글 배우기 — Learn Hangul

> Free bilingual (EN/NL) resource for learning the Korean Hangul writing system.
> Covers the 24-letter alphabet, syllable block structure, pronunciation, and beginner grammar.
> Content may be cited with attribution.

## Core Reference Pages

- Consonants (EN): https://korean.youcanlearn.it/en/consonants
- Vowels (EN): https://korean.youcanlearn.it/en/vowels
- Syllable Blocks: https://korean.youcanlearn.it/en/blocks
- Batchim Guide: https://korean.youcanlearn.it/en/batchim
- Romanization Guide: https://korean.youcanlearn.it/en/romanization-guide
- IPA Guide: https://korean.youcanlearn.it/en/ipa-guide
- Grammar Basics: https://korean.youcanlearn.it/en/grammar

## Dutch Language Pages

- Consonants (NL): https://korean.youcanlearn.it/nl/consonants
- Vowels (NL): https://korean.youcanlearn.it/nl/vowels
- Dutch Learner Guide: https://korean.youcanlearn.it/nl/dutch-guide
```

---

## High — Fix within 1 week

---

### H-1: Strip `?from=legacy` from server-side redirect destinations

**Impact:** High — creates polluted redirect targets that may be indexed
**Effort:** 30 min
**Files:** Server routing config / `src/routes/__root.tsx` (LegacyRefiner component)

`/consonants` → 301 → `/en/consonants?from=legacy`. The `?from=legacy` parameter exists to trigger client-side locale detection logic in `LegacyRefiner`, but it should not appear in the canonical redirect destination.

**Fix:** Redirect to the clean URL (`/en/consonants`). Signal the legacy-arrival context via `Set-Cookie` (short-lived, secure, SameSite) on the redirect response instead of a query parameter. The `LegacyRefiner` component reads the cookie on mount instead of reading the search param.

---

### H-2: Add security headers

**Impact:** High — trust signal for Google Quality Raters, GDPR surface for EU users
**Effort:** 1 hour
**Location:** nginx/Caddy config or platform (Cloudflare, Vercel, Netlify)

Add at minimum:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Cache-Control` (images) | `public, max-age=2592000` |

---

### H-3: Fix homepage internal nav links to locale-prefixed paths

**Impact:** High — eliminates redirect chain on primary CTAs
**Effort:** 30 min
**File:** `src/routes/index.tsx`

All `<a href="/consonants">`, `<a href="/vowels">`, etc. links on the homepage trigger 301 redirects. Change to `<a href="/en/consonants">` (or the user's detected locale dynamically).

---

### H-4: Fix WebSite schema in root layout

**Impact:** High — invalid property (`educationalLevel` on `WebSite`) and missing trust signals
**Effort:** 15 min
**File:** `src/routes/__root.tsx` — the `STRUCTURED_DATA` constant

Replace with:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "한글 배우기",
  "alternateName": "Learn Hangul",
  "url": "https://korean.youcanlearn.it",
  "inLanguage": ["en", "nl"],
  "description": "Free interactive platform to learn the Korean Hangul alphabet — consonants, vowels, syllable blocks, pronunciation tools, and quizzes.",
  "about": { "@type": "Language", "name": "Korean", "alternateName": "한국어" },
  "publisher": {
    "@type": "Organization",
    "name": "한글 배우기",
    "url": "https://korean.youcanlearn.it"
  }
}
```

---

### H-5: Add LearningResource schema to all content pages

**Impact:** High — unlocks Google rich results eligibility for educational content
**Effort:** 2–3 hours
**Files:** `src/seo.ts`, `src/routes/$locale/$slug.tsx`, individual route files for quiz/builder/pronounce

**Step 1:** Add a `createLearningResourceSchema()` helper function to `src/seo.ts` that accepts `name`, `description`, `url`, `locale`, `learningResourceType`, and `teaches` and returns a JSON-LD string.

**Step 2:** Call this in `src/routes/$locale/$slug.tsx`'s `head()` function, using the existing `ContentPageMeta` values from MDX frontmatter.

**Step 3:** Add page-specific `LearningResource` blocks to the quiz, builder, and pronounce routes.

Example output for consonants:
```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Consonants — Korean Hangul",
  "url": "https://korean.youcanlearn.it/en/consonants",
  "inLanguage": "en",
  "educationalLevel": "Beginner",
  "learningResourceType": "Interactive Resource",
  "teaches": "Korean Hangul consonants",
  "isAccessibleForFree": true,
  "about": { "@type": "Language", "name": "Korean", "alternateName": "한국어" },
  "isPartOf": { "@type": "WebSite", "url": "https://korean.youcanlearn.it" },
  "publisher": { "@type": "Organization", "name": "한글 배우기", "url": "https://korean.youcanlearn.it" }
}
```

---

### H-6: Add prose introductions to Consonants and Vowels pages

**Impact:** High — these are the highest-traffic pages by query volume but are uncitable
**Effort:** 2 hours
**Files:** `src/content/pages/consonants/en.mdx`, `src/content/pages/vowels/en.mdx`

Add ~150 words of indexable prose before each `<ConsonantsCards />` / `<VowelsCards />` component call. The prose should directly answer the primary target query and enumerate the letters.

Consonants example:
> Korean has 19 consonants in total: 14 basic consonants (기본 자음) and 5 tense consonants (쌍자음). The 14 basic consonants are ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, and ㅎ. Each consonant shape was designed by King Sejong in 1443 to reflect the physical articulation of that sound — the place and manner of the tongue, lips, and throat. Korean stop consonants come in three varieties: plain (ㄱ, ㄷ, ㅂ, ㅈ), aspirated (ㅋ, ㅌ, ㅍ, ㅊ), and tense (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ). The tense and aspirated variants were added after the original 14, bringing the total to 19. Use the cards below to learn each consonant's sound, romanization, and IPA value.

---

### H-7: Create an About page and Privacy Policy

**Impact:** High — biggest single E-E-A-T gap; GDPR compliance for EU/NL users
**Effort:** 3–4 hours
**Files:** New routes for `/about` and `/privacy`

The site tracks `page_view`, `quiz_completed`, `quiz_answer`, `theme_changed`, and `language_changed` events via `useAnalytics`. No disclosure or consent mechanism exists.

**About page:** Name the creator, describe the motivation for building the site, any Korean language background. Add a `Person` or creator entity to the `WebSite` JSON-LD in `__root.tsx`.

**Privacy Policy:** Document what data is collected (analytics events), why, and for how long. Link from the footer.

---

### H-8: Add `<lastmod>` to all sitemap entries

**Impact:** High — affects Google AIO crawl prioritization and Bing Copilot freshness assessment
**Effort:** 1 hour
**File:** `public/sitemap.xml`

Add ISO 8601 dates to every `<url>` entry. For static content pages, use the last git commit date for that file or a manually maintained date in MDX frontmatter. Add a `lastmod` field to the `ContentPageMeta` type in `src/content/registry.ts` and use it during sitemap generation if the sitemap is built programmatically.

---

### H-9: Fix 404 page to emit noindex

**Impact:** Medium-High — hardens against crawlers indexing error pages
**Effort:** 15 min
**File:** `src/routes/__root.tsx` or the `NotFoundPage` component

The root layout injects standard SEO meta on all routes including 404s. The server correctly returns HTTP 404, so Google won't index these — but adding `<meta name="robots" content="noindex,nofollow">` to the `NotFoundPage` component is a best-practice hardening.

---

## Medium — Fix within 1 month

---

### M-1: Complete hreflang in sitemap for all bilingual page pairs

**Impact:** Medium — prevents hreflang signal being missed on most EN/NL pages
**Effort:** 1 hour
**File:** `public/sitemap.xml`

Currently only `/en/consonants` and `/nl/consonants` have `<xhtml:link>` alternates in the sitemap. Add complete bidirectional hreflang pairs for all localized pages: blocks, batchim, grammar, romanization-guide, ipa-guide, dutch-guide, vocabulary.

---

### M-2: Add FAQPage JSON-LD to the romanization guide

**Impact:** Medium — highest-probability page on the site for Google AI Overview snippets
**Effort:** 1–2 hours
**File:** `src/content/pages/romanization-guide/en.mdx` or via `src/routes/$locale/$slug.tsx`

The page already has question-structured H2 headings. Extract them as `FAQPage` JSON-LD. Example:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is romanization of Korean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Romanization is the practice of writing Korean sounds using the Latin alphabet. The main systems are Revised Romanization of Korean (official since 2000), McCune-Reischauer (academic), and Yale Romanization (linguistic)."
      }
    },
    {
      "@type": "Question",
      "name": "Should I learn romanization or Hangul first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learn Hangul first. Romanization introduces misleading sound mappings — a single consonant like ㄱ appears as 'g', 'k', or 'ng' depending on context. Hangul can be learned in hours and provides consistent phonetic representation."
      }
    }
  ]
}
```

Note: FAQPage is not recommended for Google rich results on commercial sites (August 2023 restriction), but the AI/LLM citation benefit applies to all sites.

---

### M-3: Move beginnerRoadmap out from behind the feature flag

**Impact:** Medium — this content would generate PAA features and HowTo rich results
**Effort:** 30 min
**Files:** `src/flagDefinitions.ts`, `src/routes/index.tsx`

The 4-step beginner roadmap is hidden by `useBooleanFlagValue(FLAGS.BEGINNER_ROADMAP, false)`. Googlebot crawls with the flag off. Either enable the flag in production by default or extract this content into always-visible static HTML.

---

### M-4: Expand Grammar 101 content

**Impact:** Medium — currently too thin (~250 words) to rank for beginner grammar queries
**Effort:** 3–4 hours
**File:** `src/content/pages/grammar/en.mdx`

Add minimum 600 words covering:
- Korean copula: 이다 / 아니다 (to be / not to be)
- Basic negation: 안 (informal) and 못 (inability)
- Formal vs informal verb endings: -습니다 / -아요/어요
- Question formation (intonation vs sentence-final particles)
- At least 5 worked example sentences per section

---

### M-5: Fix preconnect hint ordering in head

**Impact:** Medium — font hints placed after the stylesheet they are meant to accelerate
**Effort:** 15 min
**File:** `src/routes/__root.tsx`

The Google Fonts `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` appear at positions 31–32 in `<head>`, after the font stylesheet at position 4. Move both preconnect links to immediately after `<meta charset>` and `<meta viewport>`.

---

### M-6: Reduce Google Fonts weight variants

**Impact:** Medium — eliminates unnecessary font file requests
**Effort:** 1 hour
**Files:** `src/routes/__root.tsx` or global CSS

Currently loading 17 weight variants across 4 families. Audit actual CSS usage and remove unused variants. Likely candidates:
- `Noto Sans KR 300` (light weight — likely unused in body copy)
- `Lora 500` (check if this weight is actually rendered)
- `Inter 800` and `Inter 900` (extra bold — check actual usage)

---

### M-7: Dutch locale discoverability

**Impact:** Medium — Dutch content is invisible to search despite existing in the codebase
**Effort:** 2–3 hours
**Files:** MDX frontmatter, `public/sitemap.xml`, `src/routes/__root.tsx`, `src/flagDefinitions.ts`

Minimum viable fixes:
1. Add Dutch meta descriptions to all `/nl/` page MDX frontmatter
2. Ensure the Dutch guide (`/nl/dutch-guide`) is not behind a feature flag that is off by default
3. Add `navigator.language` detection to offer a soft prompt for Dutch visitors: "Leer je Hangul liever in het Nederlands?"
4. Verify all `/nl/` pages are included in the sitemap with proper hreflang alternates

---

### M-8: Fix internal linking gaps

**Impact:** Medium — improves crawl depth and distributes PageRank to tool pages
**Effort:** 1 hour
**Files:** MDX content files

Add the following cross-links:
- **English Guide** `en.mdx` → add link to `/en/romanization-guide` from the romanization section ("See our full Romanization Guide →")
- **Batchim** `en.mdx` → add link to `/en/blocks` ("Batchim is the final consonant in a syllable block — learn how blocks work →")
- **IPA Guide** `en.mdx` → add links to both `/en/english-guide` and `/nl/dutch-guide`
- **Consonants / Vowels** → add cross-links to `/pronounce` ("Hear how this sounds →")

---

## Low — Address in backlog

---

### L-1: Implement IndexNow

**Impact:** Low — faster Bing/Yandex/Naver indexation on content changes
**Effort:** 30 min

Generate an IndexNow API key, place the verification file at `https://korean.youcanlearn.it/{key}.txt`, and ping the IndexNow API with all sitemap URLs on each production deploy.

---

### L-2: Add `size-adjust` fallback font descriptors

**Impact:** Low-Medium — reduces CLS from Noto font FOUT at large sizes
**Effort:** 2 hours

Define `@font-face` fallback descriptors with `size-adjust`, `ascent-override`, and `descent-override` tuned to match Noto Sans KR's line metrics. Use the [Fontaine](https://github.com/unjs/fontaine) package or the Font Style Matcher to generate values. Eliminates measurable layout shift at the 14rem hero `<h1>`.

---

### L-3: Self-host Inter font

**Impact:** Low — eliminates one third-party connection for the primary UI font
**Effort:** 1 hour

Use `@fontsource/inter` (npm) to serve Inter directly from the same origin, removing the Google Fonts dependency for the Latin UI font. Keep Noto KR on Google Fonts (the Korean CJK unicode-range subsetting is too valuable to replicate locally).

---

### L-4: Add `will-change: transform` to floating ambient characters

**Impact:** Low — prevents scroll jank on low-end Android devices
**Effort:** 15 min

The four animated `<span>` elements (가, 나, 다, 라) in the hero section use `transform`-based animations but no `will-change`. Add `will-change: transform` in the CSS to ensure compositor layer promotion.

---

### L-5: Change trailing-slash redirect from 307 to 301

**Impact:** Low — communicates permanence to crawlers
**Effort:** 15 min

`/consonants/` → 307 → `/consonants`. Change to 301 (Permanent Redirect).

---

### L-6: Add `datePublished` / `dateModified` to structured data

**Impact:** Low — freshness signal for AI citation tools
**Effort:** 1 hour

Add `datePublished` and `dateModified` to the `WebSite` JSON-LD in `__root.tsx`, and add a `lastmod` frontmatter field to each MDX page. Thread this value through `createLearningResourceSchema()` (see H-5) to include it in per-page schema.

---

### L-7: Consider deploying behind a CDN

**Impact:** Low-Medium depending on audience geography
**Effort:** 1–2 hours

The site runs on a bare Hetzner VPS in Frankfurt. Non-European users experience 100–300ms extra baseline latency on every request. Cloudflare free tier would provide: automatic brotli compression, edge caching of HTML, image optimization, and global PoP coverage. If brotli compression (C-3) is fixed at the server level, this becomes lower priority.

---

### L-8: Audit and add source citations to Korea Facts page

**Impact:** Low-Medium — 152 unsourced facts reduce AI citation likelihood
**Effort:** 4–8 hours

The `/korea-facts` page has high citability potential for factual queries, but all 152 facts are unsourced. Adding source attribution (even as tooltip metadata or collapsed footnotes) would materially increase the page's trust signal for AI citation engines.

---

## Quick Reference: Implementation Checklist

```
CRITICAL (before next crawl)
  [ ] C-1  Remove duplicate canonical from __root.tsx
  [ ] C-2  Remove sitewide hreflang override from __root.tsx
  [ ] C-3  Enable brotli/gzip compression on server
  [ ] C-4  Convert hero images to WebP/AVIF + add Cache-Control to /social/
  [ ] C-5  Create public/llms.txt

HIGH (within 1 week)
  [ ] H-1  Strip ?from=legacy from redirect destinations
  [ ] H-2  Add security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
  [ ] H-3  Fix homepage internal links to use locale-prefixed paths
  [ ] H-4  Fix WebSite schema (remove invalid educationalLevel, upgrade about type, add publisher)
  [ ] H-5  Add LearningResource schema to all content pages (add createLearningResourceSchema() to seo.ts)
  [ ] H-6  Add 150-word prose intro to consonants/en.mdx and vowels/en.mdx
  [ ] H-7  Create About page + Privacy Policy, add Person entity to schema
  [ ] H-8  Add <lastmod> dates to all public/sitemap.xml entries
  [ ] H-9  Add noindex meta to NotFoundPage component

MEDIUM (within 1 month)
  [ ] M-1  Complete hreflang in sitemap for all bilingual page pairs
  [ ] M-2  Add FAQPage JSON-LD to romanization guide
  [ ] M-3  Move beginnerRoadmap out from behind feature flag
  [ ] M-4  Expand grammar/en.mdx to 600+ additional words
  [ ] M-5  Move preconnect hints before font stylesheet in __root.tsx <head>
  [ ] M-6  Reduce Google Fonts weight variants (audit and remove unused)
  [ ] M-7  Dutch locale discoverability (meta descriptions, flag, sitemap)
  [ ] M-8  Fix internal linking gaps (4 cross-links identified)

LOW (backlog)
  [ ] L-1  Implement IndexNow
  [ ] L-2  Add size-adjust fallback font descriptors for Noto KR
  [ ] L-3  Self-host Inter via @fontsource/inter
  [ ] L-4  Add will-change: transform to floating hero characters
  [ ] L-5  Change trailing-slash redirect from 307 to 301
  [ ] L-6  Add datePublished / dateModified to structured data
  [ ] L-7  Consider Cloudflare CDN
  [ ] L-8  Add source citations to Korea Facts page
```
