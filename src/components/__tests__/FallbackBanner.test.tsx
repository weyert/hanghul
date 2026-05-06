// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FallbackBanner } from '../FallbackBanner'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <a href={String(to)} {...props}>
      {children}
    </a>
  ),
}))

function renderBanner(slug: string) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  act(() => {
    root.render(<FallbackBanner slug={slug} />)
  })
  return {
    host,
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('FallbackBanner', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the Dutch fallback message', () => {
    const { host, cleanup } = renderBanner('romanization-guide')
    expect(host.textContent).toContain('nog niet vertaald')
    cleanup()
  })

  it('links to the English version of the given slug', () => {
    const { host, cleanup } = renderBanner('ipa-guide')
    const link = host.querySelector('a')
    expect(link?.getAttribute('href')).toBe('/en/ipa-guide')
    cleanup()
  })

  it('uses the slug verbatim in the link href', () => {
    const { host, cleanup } = renderBanner('grammar')
    expect(host.querySelector('a')?.getAttribute('href')).toBe('/en/grammar')
    cleanup()
  })
})
