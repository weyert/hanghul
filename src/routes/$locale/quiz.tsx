import { createFileRoute } from '@tanstack/react-router'
import { QuizPage } from '../quiz'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/quiz')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'quiz',
    title: 'Hangul Quiz',
    description: 'Test Korean consonants, vowels, words, and listening skills with a short adaptive Hangul quiz for learning Korean.',
    keywords: [
      'learn Korean',
      'learning Korean',
      'best app to learn Korean',
      'how to learn Korean language',
      'Korean language learning',
    ],
  }),
  component: QuizPage,
})
