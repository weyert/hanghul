import { createFileRoute } from '@tanstack/react-router'
import { ContrastDrillsPage } from '../contrast-drills'
import type { Locale } from '../../contexts/LanguageContext'
import { assertLocale, localizedToolHead } from '../../utils/localizedRoutes'

export const Route = createFileRoute('/$locale/contrast-drills')({
  beforeLoad: ({ params }) => assertLocale(params.locale),
  head: ({ params }) => localizedToolHead({
    locale: params.locale as Locale,
    slug: 'contrast-drills',
    title: 'Korean Pronunciation Contrast Drills',
    description: 'Practice tricky Korean sound contrasts and improve Hangul pronunciation with focused listening drills.',
    keywords: [
      'Korean pronunciation',
      'learn Korean',
      'Hangul pronunciation',
      'Korean language learning',
    ],
  }),
  component: ContrastDrillsPage,
})
