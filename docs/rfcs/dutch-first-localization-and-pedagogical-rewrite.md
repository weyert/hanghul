# RFC: Dutch-First Localization and Pedagogical Rewrite

## Status
- **Status**: Proposed
- **Author**: Codex
- **Date**: 2026-05-07

## 1. Summary
This RFC proposes a full Dutch-language experience for the site when the language switcher is set to `NL`.

The goal is not a literal English-to-Dutch translation pass. The content should be rewritten for native Dutch speakers and teach Korean in a way that fits Dutch classroom expectations, Dutch phonology, and Dutch terminology. In practice, this means:

- all user-visible copy in the `nl` locale is Dutch
- page structure stays the same, but the wording is rewritten rather than translated word-for-word
- examples, comparisons, and explanations are framed around how native Dutch speakers hear and learn sounds
- metadata, alt text, navigation labels, empty states, and microcopy are localized too

## 2. Problem Statement
The site already supports a Dutch locale at the routing level, but the content and teaching voice are still largely English-first. That creates two problems:

1. The `NL` experience does not feel native to Dutch speakers.
2. A direct translation of English learning copy often produces weak pedagogy, especially for phonetics and grammar.

This is most visible in the explanation-heavy pages:

- consonants and vowels
- romanization and IPA
- batchim and syllable blocks
- quiz and pronunciation tools
- vocabulary and grammar guidance

If these pages are simply translated, they will keep the English teaching model and lose the chance to teach Korean through Dutch mental models.

## 3. Goals
- Make the `NL` locale read fully in Dutch for all user-visible content.
- Write Dutch content for native Dutch speakers, not as translated English copy.
- Keep the English locale intact.
- Preserve the current route structure, SSR behavior, and locale-prefixed URLs.
- Maintain a consistent glossary so the same Korean concept is described the same way throughout the site.
- Keep the translation workflow manageable for future updates.

## 4. Non-Goals
- Rebuilding the interactive learning logic.
- Translating internal developer docs, tests, or code comments unless they are user-visible.
- Adding a new language beyond English and Dutch.
- Introducing machine translation as the production source of truth.

## 5. Pedagogical Principles For Dutch Content
The Dutch content should assume the reader is a native Dutch speaker learning Korean from scratch.

### 5.1 Teach through Dutch, not through English
The NL version should explain Korean using Dutch terms where they are natural:

- `medeklinker`
- `klinker`
- `lettergreepblok`
- `uitspraak`
- `romanisering`
- `schrijfvolgorde`
- `onderwerp`
- `onderwerpmarkeerder`
- `voorwerpsmarkeerder`
- `klankverandering`

Use Korean terms alongside Dutch when the Korean term is standard or useful, but do not rely on English as the explanatory bridge.

### 5.2 Compare Korean with Dutch sound patterns
When explaining pronunciation, use Dutch sound intuition carefully:

- point out where Korean sounds do not map cleanly to Dutch sounds
- explain aspiration, tense consonants, and final consonant simplification with Dutch-friendly wording
- avoid comparisons that sound exact when they are only approximate
- use short, practical examples rather than long phonetic theory blocks

### 5.3 Keep transliteration and IPA practical
For Dutch learners:

- romanization is a support tool, not the destination
- IPA is a reference layer, not required memorization
- examples should show how the sound is actually pronounced in context

### 5.4 Use Dutch teaching tone
The NL locale should feel like a Dutch learning resource:

- direct, clear, and calm
- practical over academic
- careful with jargon
- no English filler phrases left in the UI unless they are established terms

## 6. Scope
This RFC covers everything a Dutch user can see when `NL` is active.

### 6.1 Content pages
The following pages should be rewritten in Dutch:

- `consonants`
- `vowels`
- `blocks`
- `batchim`
- `romanization-guide`
- `ipa-guide`
- `grammar`
- `english-guide`
- `dutch-guide`

### 6.2 Interactive pages
The following pages should also be localized in Dutch:

- `learn`
- `quiz`
- `pronounce`
- `builder`
- `syllable-chart`
- `typing`
- `stroke-order`
- `vocabulary`
- `progress`
- `contrast-drills`
- `korea-facts`

### 6.3 Shell and support UI
Also localize:

- header navigation labels
- button labels
- empty states
- CTA text
- 404 page
- form labels and helper text
- alt text and image captions
- SEO titles and descriptions

## 7. Route and Audience Rules
The locale should remain the source of truth for visible language.

- If the route locale is `nl`, the page content should be Dutch.
- `lang="nl"` should be emitted on the document.
- canonical URLs and `hreflang` should remain locale-specific.
- route slugs can stay stable, but the text must not assume English readers.

Audience-specific pages should be handled carefully:

- `dutch-guide` stays a Dutch-speaker guide and should be prioritized in the `NL` locale
- `english-guide` should not leak English-first pedagogy into `NL`
- if a guide is not ready in Dutch, the page should either show a Dutch rewrite or be hidden from Dutch navigation until it is ready

## 8. Content Model
The cleanest implementation is to keep the current locale-specific content structure and rewrite the `nl` files in place.

### Recommended structure

```text
src/content/pages/<slug>/en.mdx
src/content/pages/<slug>/nl.mdx
```

### Translation source of truth
- MDX owns prose and teaching narrative.
- React components own reusable layout and interactive pieces.
- Shared content strings for buttons, labels, and status messages should live in a translation layer or locale string map instead of being copied into components.

### Glossary
A shared glossary should be created before the rewrite starts so terms stay consistent.

Suggested baseline terms:

| Korean concept | Preferred Dutch |
|---|---|
| Hangul | Hangul / Koreaanse schrift |
| consonant | medeklinker |
| vowel | klinker |
| syllable block | lettergreepblok |
| pronunciation | uitspraak |
| romanization | romanisering |
| stroke order | schrijfrichting / schrijfvolgorde |
| batchim | batchim / eindmedeklinker |
| grammar | grammatica |
| quiz | quiz / oefentoets |

## 9. Pedagogical Rewrite Rules
The rewrite should follow these rules:

1. Write for Dutch learners first, not English learners translated into Dutch.
2. Keep terminology consistent across pages.
3. Prefer short, concrete explanations over long abstractions.
4. Use Dutch examples when they help the explanation.
5. Keep Korean script visible early and often.
6. Use English only where the term is standard or the translation would be clumsy.
7. Remove leftover English copy from buttons, subtitles, empty states, and tooltips.

## 10. Implementation Plan

### Phase 1 - Content inventory
- audit every visible string on `nl` pages
- list all hard-coded English copy in routes and shared components
- identify pages that already have a Dutch version and pages that still reuse English phrasing

### Phase 2 - Dutch glossary
- define the canonical Dutch terminology
- decide which technical terms remain untranslated
- capture example phrasing for phonetics, grammar, and vocabulary pages

### Phase 3 - Rewrite the content pages
- rewrite the MDX pages for the Dutch locale
- make sure the `NL` versions are not just translated sentence by sentence
- adapt examples and explanations to Dutch learners where it improves clarity

### Phase 4 - Localize the app shell
- translate navigation labels, CTA labels, empty states, and error states
- localize metadata, alt text, and social descriptions
- verify the language switcher stays on Dutch when `NL` is selected

### Phase 5 - QA and content review
- review the `NL` locale page by page
- confirm there are no English leftovers in user-facing copy
- verify mobile and desktop layouts still work with longer Dutch text
- validate SEO metadata, `lang` attribute, and localized URLs

## 11. Acceptance Criteria
The work is done when:

- switching to `NL` shows Dutch on all user-facing pages
- the Dutch copy reads naturally to native Dutch speakers
- the same Korean concept is described consistently across the site
- navigation, buttons, and helper text are also localized
- no page in the `NL` experience depends on English as its main explanation layer
- build and preview checks pass after the localization changes

## 12. Risks
- A literal translation could make the content feel stiff or unnatural.
- Some phonetic concepts do not map cleanly to Dutch sound categories and need careful explanation.
- Longer Dutch copy may affect layout density on smaller screens.
- Keeping one glossary consistent across many pages will require editorial discipline.

## 13. Open Questions
- Should `english-guide` remain visible in the Dutch locale, or should it be hidden there entirely?
- Should we keep `romanization` as `romanisering`, or use a more learner-friendly phrase in some contexts?
- Do we want a single translation pass for all pages, or should the highest-traffic pages ship first?

## 14. Suggested Rollout Order
1. `consonants` and `vowels`
2. `blocks`, `batchim`, `romanization-guide`, `ipa-guide`
3. `grammar`, `builder`, `pronounce`
4. `quiz`, `typing`, `progress`, `learn`
5. `vocabulary`, `stroke-order`, `syllable-chart`, `contrast-drills`, `korea-facts`
6. shell copy, metadata, and QA cleanup
