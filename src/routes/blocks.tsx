import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blocks')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'blocks' }, search: { from: undefined }, statusCode: 301 })
  },
})
