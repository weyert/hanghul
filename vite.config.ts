import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

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

export default defineConfig({
  server: {
    port: 3000,
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    plugins: ['./src/nitro/headers.ts'],
    routeRules: {
      '/**': {
        headers: SECURITY_HEADERS,
      },
      '/social/**': {
        headers: {
          ...SECURITY_HEADERS,
          'cache-control': 'public, max-age=2592000',
        },
      },
    },
  },
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    tanstackStart(),
    nitro(),
    viteReact({ include: /\.(jsx|tsx)$/ }),
    tailwindcss(),
  ],
})
