import { createFileRoute } from '@tanstack/react-router'
import { SyllableChartPage } from '../syllable-chart'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/syllable-chart')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'syllable-chart',
    title: 'Hangul Syllable Chart',
    description: 'Explore Korean Hangul syllable blocks and see how initial consonants and vowels combine into readable Korean syllables.',
    keywords: [
      'Hangul syllable chart',
      'learn Korean',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
  component: SyllableChartPage,
})
