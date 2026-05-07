import { createFileRoute } from '@tanstack/react-router'
import { KoreaFactsPage } from '../korea-facts'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/korea-facts')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'korea-facts',
    title: 'Korea Facts',
    description: 'Learn short cultural and language facts about Korea while studying Hangul and Korean.',
    keywords: [
      'Korea facts',
      'learn Korean',
      'Korean culture',
      'Korean language learning',
    ],
  }),
  component: KoreaFactsPage,
})
