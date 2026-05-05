import { describe, expect, it } from 'vitest'
import { cardWeight, nextCardStats, weightedPick } from '../useSpacedRepetition'

describe('spaced repetition helpers', () => {
  it('increments correct and incorrect counts without mutating existing stats', () => {
    const existing = { correct: 2, incorrect: 1 }

    expect(nextCardStats(existing, true)).toEqual({ correct: 3, incorrect: 1 })
    expect(nextCardStats(existing, false)).toEqual({ correct: 2, incorrect: 2 })
    expect(existing).toEqual({ correct: 2, incorrect: 1 })
  })

  it('starts new cards from zero counts', () => {
    expect(nextCardStats(undefined, true)).toEqual({ correct: 1, incorrect: 0 })
    expect(nextCardStats(undefined, false)).toEqual({ correct: 0, incorrect: 1 })
  })

  it('weights new and unattempted cards higher than mastered cards', () => {
    const stats = {
      mastered: { correct: 10, incorrect: 0 },
      missed: { correct: 1, incorrect: 3 },
      unattempted: { correct: 0, incorrect: 0 },
    }

    expect(cardWeight('new-card', stats)).toBe(2)
    expect(cardWeight('unattempted', stats)).toBe(2)
    expect(cardWeight('mastered', stats)).toBe(1)
    expect(cardWeight('missed', stats)).toBe(1.75)
  })

  it('picks according to cumulative weighted ranges', () => {
    const pool = [{ id: 'new' }, { id: 'mastered' }, { id: 'missed' }]
    const stats = {
      mastered: { correct: 10, incorrect: 0 },
      missed: { correct: 0, incorrect: 1 },
    }

    expect(weightedPick(pool, stats, () => 0)).toEqual({ id: 'new' })
    expect(weightedPick(pool, stats, () => 0.39)).toEqual({ id: 'new' })
    expect(weightedPick(pool, stats, () => 0.41)).toEqual({ id: 'mastered' })
    expect(weightedPick(pool, stats, () => 0.99)).toEqual({ id: 'missed' })
  })

  it('falls back to the last card when random lands exactly at the total boundary', () => {
    const pool = [{ id: 'first' }, { id: 'last' }]

    expect(weightedPick(pool, {}, () => 1)).toEqual({ id: 'last' })
  })
})
