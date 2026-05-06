// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAnalytics } from '../useAnalytics'

function renderAnalyticsConsumer(properties?: Record<string, unknown>) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)

  function Consumer() {
    const { track } = useAnalytics()

    return (
      <button type="button" onClick={() => track('lesson_started', properties)}>
        Track
      </button>
    )
  }

  act(() => {
    root.render(<Consumer />)
  })

  return {
    button: () => host.querySelector('button')!,
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('useAnalytics', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-05T12:00:00.000Z'))
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('posts analytics events with properties and a timestamp', () => {
    const fetch = vi.fn(() => Promise.resolve({ ok: true }))
    vi.stubGlobal('fetch', fetch)
    const rendered = renderAnalyticsConsumer({ slug: 'quiz', mode: 'practice' })

    act(() => {
      rendered.button().click()
    })

    expect(fetch).toHaveBeenCalledWith('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'lesson_started',
        properties: { slug: 'quiz', mode: 'practice' },
        timestamp: new Date('2026-05-05T12:00:00.000Z').getTime(),
      }),
    })

    rendered.cleanup()
  })

  it('omits properties from the payload when none are provided', () => {
    const fetch = vi.fn(() => Promise.resolve({ ok: true }))
    vi.stubGlobal('fetch', fetch)
    const rendered = renderAnalyticsConsumer()

    act(() => {
      rendered.button().click()
    })

    const [, options] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(JSON.parse(options.body as string)).toEqual({
      event: 'lesson_started',
      timestamp: new Date('2026-05-05T12:00:00.000Z').getTime(),
    })

    rendered.cleanup()
  })

  it('swallows failed analytics requests', () => {
    const fetch = vi.fn(() => Promise.reject(new Error('network failed')))
    vi.stubGlobal('fetch', fetch)
    const rendered = renderAnalyticsConsumer()

    expect(() => {
      act(() => {
        rendered.button().click()
      })
    }).not.toThrow()

    expect(fetch).toHaveBeenCalledOnce()

    rendered.cleanup()
  })
})
