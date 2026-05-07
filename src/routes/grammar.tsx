import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/grammar')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'grammar' }, statusCode: 301 })
  },
})
