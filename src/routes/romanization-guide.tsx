import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/romanization-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'romanization-guide' }, search: { from: 'legacy' }, statusCode: 301 })
  },
})
