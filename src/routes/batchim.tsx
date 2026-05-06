import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/batchim')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'batchim' }, search: { from: undefined }, statusCode: 301 })
  },
})
