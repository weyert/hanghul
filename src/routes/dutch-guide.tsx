import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dutch-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/nl/dutch-guide', statusCode: 301 })
  },
})
