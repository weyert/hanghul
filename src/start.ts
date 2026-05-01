import { createStart, createMiddleware } from '@tanstack/react-start'
import { FLAG_DEFINITIONS } from './flagDefinitions'

const OFREP_PATH = '/ofrep/v1/evaluate/flags'

function fnv1a(str: string): string {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16)
}

const ofrepMiddleware = createMiddleware().server(async ({ request, next }: any) => {
  const { pathname } = new URL(request.url)

  if (pathname !== OFREP_PATH || request.method !== 'POST') {
    return next()
  }

  await request.json().catch(() => ({}))

  const etag = `"${fnv1a(JSON.stringify(FLAG_DEFINITIONS))}"`

  if (request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } })
  }

  const flags = Object.entries(FLAG_DEFINITIONS).map(([key, def]) => {
    if (def.disabled) {
      return { key, errorCode: 'FLAG_NOT_FOUND', errorDetails: 'Flag is disabled' }
    }
    return {
      key,
      value: def.variants[def.defaultVariant],
      variant: def.defaultVariant,
      reason: 'STATIC',
    }
  })

  return new Response(JSON.stringify({ flags }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ETag: etag },
  })
})

export const startInstance = createStart(() => ({
  requestMiddleware: [ofrepMiddleware],
}))
