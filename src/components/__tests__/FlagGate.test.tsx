// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FlagGate } from '../FlagGate'

const flagMock = vi.hoisted(() => ({ enabled: true }))

vi.mock('@openfeature/react-sdk', () => ({
  useBooleanFlagValue: () => flagMock.enabled,
}))

function renderGate(flag?: string, enabled = true) {
  flagMock.enabled = enabled
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  act(() => {
    root.render(
      <FlagGate flag={flag as never}>
        <span data-testid="child">Content</span>
      </FlagGate>,
    )
  })
  return {
    host,
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('FlagGate', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders children when no flag key is provided', () => {
    const { host, cleanup } = renderGate(undefined)
    expect(host.querySelector('[data-testid="child"]')).not.toBeNull()
    cleanup()
  })

  it('renders children when the named flag is enabled', () => {
    const { host, cleanup } = renderGate('some-flag', true)
    expect(host.querySelector('[data-testid="child"]')).not.toBeNull()
    cleanup()
  })

  it('renders the disabled message instead of children when the flag is off', () => {
    const { host, cleanup } = renderGate('some-flag', false)
    expect(host.querySelector('[data-testid="child"]')).toBeNull()
    expect(host.textContent).toContain('This feature is not enabled.')
    cleanup()
  })
})
