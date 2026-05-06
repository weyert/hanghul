// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SpeakButton } from '../SpeakButton'

const mocks = vi.hoisted(() => ({
  speak: vi.fn(),
  track: vi.fn(),
  speaking: false,
}))

vi.mock('../../hooks/useSpeech', () => ({
  useSpeech: () => ({
    speak: mocks.speak,
    speaking: mocks.speaking,
  }),
}))

vi.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    track: mocks.track,
  }),
}))

function flushEffects() {
  return act(async () => {
    await Promise.resolve()
  })
}

function renderSpeakButton(props?: Partial<Parameters<typeof SpeakButton>[0]>) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)

  act(() => {
    root.render(<SpeakButton text="한글" {...props} />)
  })

  return {
    host,
    button: () => host.querySelector('button'),
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('SpeakButton', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    mocks.speak.mockReset()
    mocks.track.mockReset()
    mocks.speaking = false
    document.body.innerHTML = ''
    Reflect.deleteProperty(window, 'speechSynthesis')
  })

  afterEach(() => {
    document.body.innerHTML = ''
    Reflect.deleteProperty(window, 'speechSynthesis')
  })

  it('does not render until speech synthesis is available on the client', async () => {
    const rendered = renderSpeakButton()
    await flushEffects()

    expect(rendered.button()).toBeNull()

    rendered.cleanup()
  })

  it('renders an accessible pronunciation button when speech synthesis is available', async () => {
    Object.defineProperty(window, 'speechSynthesis', { value: {}, configurable: true })

    const rendered = renderSpeakButton({ size: 'lg', className: 'custom-class' })
    await flushEffects()

    expect(rendered.button()).not.toBeNull()
    expect(rendered.button()?.getAttribute('aria-label')).toBe('Play pronunciation')
    expect(rendered.button()?.className).toContain('custom-class')
    expect(rendered.host.querySelector('svg')?.getAttribute('class')).toContain('w-6 h-6')

    rendered.cleanup()
  })

  it('speaks and tracks the text without bubbling the click', async () => {
    Object.defineProperty(window, 'speechSynthesis', { value: {}, configurable: true })
    const parentClick = vi.fn()
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)

    act(() => {
      root.render(
        <div onClick={parentClick}>
          <SpeakButton text="가" />
        </div>,
      )
    })
    await flushEffects()

    act(() => {
      host.querySelector('button')!.click()
    })

    expect(mocks.speak).toHaveBeenCalledWith('가')
    expect(mocks.track).toHaveBeenCalledWith('pronunciation_played', { text: '가' })
    expect(parentClick).not.toHaveBeenCalled()

    act(() => root.unmount())
    host.remove()
  })

  it('reflects speaking state in the button and icon classes', async () => {
    Object.defineProperty(window, 'speechSynthesis', { value: {}, configurable: true })
    mocks.speaking = true

    const rendered = renderSpeakButton()
    await flushEffects()

    expect(rendered.button()?.className).toContain('text-violet-400')
    expect(rendered.host.querySelector('svg')?.getAttribute('class')).toContain('animate-pulse')

    rendered.cleanup()
  })
})
