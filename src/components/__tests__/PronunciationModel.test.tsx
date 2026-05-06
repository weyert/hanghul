// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { PronunciationModel } from '../PronunciationModel'

function renderPronunciationModel(props?: { compact?: boolean }) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)

  act(() => {
    root.render(<PronunciationModel {...props} />)
  })

  return {
    host,
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('PronunciationModel', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the beginner model by default', () => {
    const rendered = renderPronunciationModel()

    expect(rendered.host.textContent).toContain('Beginner view')
    expect(rendered.host.textContent).toContain('Three consonant families')
    expect(rendered.host.textContent).toContain('Read by blocks')
    expect(rendered.host.textContent).not.toContain('Plain / lax stops')

    rendered.cleanup()
  })

  it('switches to the technical model when selected', () => {
    const rendered = renderPronunciationModel()
    const technicalButton = Array.from(rendered.host.querySelectorAll('button')).find(
      (button) => button.textContent === 'Technical',
    )

    expect(technicalButton).toBeDefined()
    act(() => {
      technicalButton!.click()
    })

    expect(rendered.host.textContent).toContain('Technical view')
    expect(rendered.host.textContent).toContain('Plain / lax stops')
    expect(rendered.host.textContent).toContain('Aspirated stops')
    expect(rendered.host.textContent).not.toContain('Three consonant families')

    rendered.cleanup()
  })
})
