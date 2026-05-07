import { createFileRoute } from '@tanstack/react-router'
import { ProgressPage } from '../progress'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/progress')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'progress',
    title: 'Korean Learning Progress',
    description: 'Track your Hangul learning progress, quiz performance, and Korean study practice over time.',
    keywords: [
      'learn Korean',
      'Korean learning progress',
      'Hangul quiz',
      'Korean language learning',
    ],
  }),
  component: ProgressPage,
})
