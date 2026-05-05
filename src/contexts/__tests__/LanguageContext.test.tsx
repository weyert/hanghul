// @vitest-environment happy-dom

import { act, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, useLanguage } from '../LanguageContext'
import type { Language } from '../LanguageContext'

const STORAGE_KEY = 'hangul-language'

function flushEffects() {
  return act(async () => {
    await Promise.resolve()
  })
}

function renderLanguageConsumer(onLanguage?: (language: Language) => void) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)

  function Consumer() {
    const { language, setLanguage } = useLanguage()

    useEffect(() => {
      onLanguage?.(language)
    }, [language])

    return (
      <button type="button" onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}>
        {language}
      </button>
    )
  }

  act(() => {
    root.render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>,
    )
  })

  return {
    button: () => host.querySelector('button')!,
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    localStorage.clear()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    localStorage.clear()
    document.body.innerHTML = ''
  })

  it('defaults to English when no stored preference exists', async () => {
    const rendered = renderLanguageConsumer()
    await flushEffects()

    expect(rendered.button().textContent).toBe('en')

    rendered.cleanup()
  })

  it('hydrates from a valid stored language preference', async () => {
    localStorage.setItem(STORAGE_KEY, 'nl')

    const rendered = renderLanguageConsumer()
    await flushEffects()

    expect(rendered.button().textContent).toBe('nl')

    rendered.cleanup()
  })

  it('ignores invalid stored language values', async () => {
    localStorage.setItem(STORAGE_KEY, 'ko')

    const rendered = renderLanguageConsumer()
    await flushEffects()

    expect(rendered.button().textContent).toBe('en')

    rendered.cleanup()
  })

  it('updates context state and persists language changes', async () => {
    const observed: Language[] = []
    const rendered = renderLanguageConsumer((language) => observed.push(language))
    await flushEffects()

    act(() => {
      rendered.button().click()
    })

    expect(rendered.button().textContent).toBe('nl')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('nl')
    expect(observed).toContain('nl')

    rendered.cleanup()
  })
})
