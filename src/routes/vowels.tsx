import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/vowels')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'vowels' }, search: { from: 'legacy' }, statusCode: 301 })
  },
})
