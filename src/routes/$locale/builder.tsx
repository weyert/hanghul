import { createFileRoute } from '@tanstack/react-router'
import { BuilderPage } from '../builder'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/builder')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'builder',
    title: 'Hangul Syllable Builder',
    description: 'Build Korean syllable blocks from initial consonants, vowels, and final consonants, then hear the result aloud as part of learning Korean.',
    keywords: [
      'learn Korean',
      'learning Korean',
      'how to learn Korean language',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
  component: BuilderPage,
})
