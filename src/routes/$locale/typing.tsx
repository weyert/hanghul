import { createFileRoute } from '@tanstack/react-router'
import { TypingPracticePage } from '../typing'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/typing')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'typing',
    title: 'Hangul Typing Practice',
    description: 'Practice typing Korean letter romanizations and build faster recall for Hangul consonants and vowels while learning Korean.',
    keywords: [
      'learning Korean',
      'how to learn Korean language',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
  component: TypingPracticePage,
})
