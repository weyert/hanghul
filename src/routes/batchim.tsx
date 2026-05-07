import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/batchim')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'batchim' }, statusCode: 301 })
  },
})
