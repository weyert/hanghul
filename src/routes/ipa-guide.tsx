import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/ipa-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/$slug', params: { locale: 'en', slug: 'ipa-guide' }, statusCode: 301 })
  },
})
