import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blocks')({
  beforeLoad: () => {
    throw redirect({ to: '/en/blocks', statusCode: 301 })
  },
})
