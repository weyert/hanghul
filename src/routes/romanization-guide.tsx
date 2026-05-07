import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/romanization-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'romanization-guide' }, statusCode: 301 })
  },
})
