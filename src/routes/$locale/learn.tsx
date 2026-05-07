import { createFileRoute } from '@tanstack/react-router'
import { LearnPage } from '../learn'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/learn')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'learn',
    title: 'Learn Korean Online',
    description: 'Follow a beginner-friendly Korean learning path with Hangul lessons, syllable practice, pronunciation, vocabulary, and quizzes.',
    keywords: [
      'learn Korean',
      'learn Korean online',
      'learning Korean',
      'how to learn Korean',
      'Korean language learning',
    ],
  }),
  component: LearnPage,
})
