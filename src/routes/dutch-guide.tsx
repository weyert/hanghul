import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dutch-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'nl', slug: 'dutch-guide' }, search: { from: undefined }, statusCode: 301 })
  },
})
