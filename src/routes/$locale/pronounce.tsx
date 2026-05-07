import { createFileRoute } from '@tanstack/react-router'
import { PronouncePage } from '../pronounce'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/pronounce')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'pronounce',
    title: 'Korean Pronunciation Tool',
    description: 'Break down Korean text into Hangul sounds, romanization, pronunciation hints, and optional IPA while learning Korean.',
    keywords: [
      'Korean pronunciation',
      'learn Korean',
      'learning Korean',
      'Korean language learning',
    ],
  }),
  component: PronouncePage,
})
