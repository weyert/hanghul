import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/consonants')({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: '/en/consonants',
      search: (search as Record<string, string>).from ? search : { from: 'legacy' },
      statusCode: 301,
    })
  },
})
