import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/vowels')({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: '/en/vowels',
      search: (search as Record<string, string>).from ? search : { from: 'legacy' },
      statusCode: 301,
    })
  },
})
