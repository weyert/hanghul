import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/batchim')({
  beforeLoad: () => {
    throw redirect({ to: '/en/batchim', statusCode: 301 })
  },
})
