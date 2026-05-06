import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/grammar')({
  beforeLoad: () => {
    throw redirect({ to: '/en/grammar', statusCode: 301 })
  },
})
