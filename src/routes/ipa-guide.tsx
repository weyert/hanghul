import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/ipa-guide')({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: '/en/ipa-guide',
      search: (search as Record<string, string>).from ? search : { from: 'legacy' },
      statusCode: 301,
    })
  },
})
