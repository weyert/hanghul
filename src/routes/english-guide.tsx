import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/english-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'english-guide' }, statusCode: 301 })
  },
})
