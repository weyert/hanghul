// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useSpacedRepetition } from '../useSpacedRepetition'

const STORAGE_KEY = 'hangul-srs'

function renderHook() {
  let api!: ReturnType<typeof useSpacedRepetition>

  function Harness() {
    api = useSpacedRepetition()
    return null
  }

  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  act(() => {
    root.render(<Harness />)
  })

  return {
    api: () => api,
    cleanup: () => {
      act(() => root.unmount())
      host.remove()
    },
  }
}

describe('useSpacedRepetition hook', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    localStorage.clear()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    localStorage.clear()
    document.body.innerHTML = ''
  })

  it('getStats returns zero counts for cards with no history', () => {
    const { api, cleanup } = renderHook()
    expect(api().getStats('unseen')).toEqual({ correct: 0, incorrect: 0 })
    cleanup()
  })

  it('record accumulates correct and incorrect counts independently', () => {
    const { api, cleanup } = renderHook()

    act(() => { api().record('card-1', true) })
    act(() => { api().record('card-1', true) })
    act(() => { api().record('card-1', false) })

    expect(api().getStats('card-1')).toEqual({ correct: 2, incorrect: 1 })
    cleanup()
  })

  it('record persists stats to localStorage after each update', () => {
    const { api, cleanup } = renderHook()

    act(() => { api().record('card-1', true) })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(stored).toMatchObject({ 'card-1': { correct: 1, incorrect: 0 } })
    cleanup()
  })

  it('loads persisted stats from localStorage on mount', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ 'card-1': { correct: 3, incorrect: 1 } }),
    )

    const { api, cleanup } = renderHook()

    expect(api().getStats('card-1')).toEqual({ correct: 3, incorrect: 1 })
    cleanup()
  })

  it('reset clears all stats from state and removes the localStorage entry', () => {
    const { api, cleanup } = renderHook()

    act(() => { api().record('card-1', true) })
    act(() => { api().reset() })

    expect(api().getStats('card-1')).toEqual({ correct: 0, incorrect: 0 })
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    cleanup()
  })

  it('pick always returns the single item in a one-item pool', () => {
    const { api, cleanup } = renderHook()
    const pool = [{ id: 'only' }]
    expect(api().pick(pool)).toEqual({ id: 'only' })
    cleanup()
  })

  it('pick reflects recorded stats — heavily penalised cards appear in picks', () => {
    const { api, cleanup } = renderHook()

    for (let i = 0; i < 10; i++) {
      act(() => { api().record('weak', false) })
    }

    const pool = [{ id: 'strong' }, { id: 'weak' }]
    const results = Array.from({ length: 20 }, () => api().pick(pool))
    expect(results.some((r) => r.id === 'weak')).toBe(true)
    cleanup()
  })
})
