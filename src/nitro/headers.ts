import { definePlugin } from 'nitro'

const SECURITY_HEADERS = {
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'content-security-policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "frame-ancestors 'self'",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
  ].join('; '),
}

function setSecurityHeaders(headers: Headers) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value)
  }
}

function setStaticAssetHeaders(pathname: string, headers: Headers) {
  if (pathname.startsWith('/assets/')) {
    headers.set('cache-control', 'public, max-age=31536000, immutable')
  }

  if (pathname.startsWith('/social/') || pathname === '/favicon.ico') {
    headers.set('cache-control', 'public, max-age=2592000, immutable')
  }

  if (pathname.endsWith('.avif')) headers.set('content-type', 'image/avif')
  if (pathname.endsWith('.webp')) headers.set('content-type', 'image/webp')
  if (pathname.endsWith('.ico')) headers.set('content-type', 'image/x-icon')
}

export default definePlugin((nitroApp) => {
  nitroApp.hooks.hook('response', (response, event) => {
    const { pathname } = new URL(event.req.url)
    setSecurityHeaders(response.headers)
    setStaticAssetHeaders(pathname, response.headers)
  })
})
