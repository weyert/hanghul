import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/english-guide')({
  beforeLoad: () => {
    throw redirect({ to: '/en/english-guide', statusCode: 301 })
  },
})
