import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/consonants')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'consonants' }, search: { from: 'legacy' }, statusCode: 301 })
  },
})
