import { createFileRoute } from '@tanstack/react-router'
import { StrokeOrderPage } from '../stroke-order'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/stroke-order')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'stroke-order',
    title: 'Hangul Stroke Order',
    description: 'Practice Korean Hangul stroke order with animated writing guides for consonants and vowels.',
    keywords: [
      'Hangul stroke order',
      'learn Korean',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
  component: StrokeOrderPage,
})
