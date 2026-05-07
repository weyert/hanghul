# Continue Later

**Date:** 2026-05-07
**Project:** `korean.youcanlearn.it`

## What was captured

- SEO audit notes are in `docs/reports/seo-audit-2026-05-07.md`
- The implementation plan is in `docs/reports/seo-implementation-plan.md`
- Seed keywords are in `docs/seo-keywords.txt`

## Open work

### SEO

- Audit the current page-level metadata for duplicate or conflicting canonicals and hreflang tags.
- Add a proper `llms.txt` entry point if we want better AI search coverage.
- Add `lastmod` values to sitemap entries.
- Convert large social and artwork images to WebP or AVIF variants where possible.
- Add any missing page schema for educational pages.
- Add About and Privacy pages if we want stronger trust and compliance signals.

### Page artwork

- Add matching illustration banners to remaining guide and tool pages.
- Keep the visual language consistent with the existing Hangul social art: warm dark surfaces, ivory cards, restrained Korean red, muted teal, and antique gold.
- Prefer one strong header image per page instead of small scattered decorations.

### Suggested page list

- `ipa-guide`
- `dutch-guide`
- `english-guide`
- `vocabulary`
- `quiz`
- `pronounce`
- `builder`
- `stroke-order`
- `typing`
- `korea-facts`

## Next pass

1. Review the current rendered pages and decide which ones should get a hero image versus a smaller section image.
2. Generate any missing page-specific artwork.
3. Wire the images into the relevant routes and test the mobile layout.
4. Commit the follow-up batch with a short note so the next session can pick up cleanly.
