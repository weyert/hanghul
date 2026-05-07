import { createFileRoute } from '@tanstack/react-router'
import { VocabularyPage } from '../vocabulary'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/vocabulary')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'vocabulary',
    title: 'Korean Vocabulary',
    description: 'Study beginner Korean vocabulary by category with Hangul, romanization, English meanings, and audio in a browser-based learn Korean words app.',
    keywords: [
      'learn Korean words app',
      'learn Korean words',
      'learning Korean',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
  component: VocabularyPage,
})
