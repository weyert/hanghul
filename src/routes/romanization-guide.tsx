import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/romanization-guide')({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: '/en/romanization-guide',
      search: (search as Record<string, string>).from ? search : { from: 'legacy' },
      statusCode: 301,
    })
  },
})
