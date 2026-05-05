import { useState, useCallback } from 'react'

export interface CardStats {
  correct: number
  incorrect: number
}

const STORAGE_KEY = 'hangul-srs'

function loadStats(): Record<string, CardStats> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function saveStats(stats: Record<string, CardStats>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
}

export function nextCardStats(existing: CardStats | undefined, correct: boolean): CardStats {
  return {
    correct: (existing?.correct ?? 0) + (correct ? 1 : 0),
    incorrect: (existing?.incorrect ?? 0) + (correct ? 0 : 1),
  }
}

export function cardWeight(id: string, stats: Record<string, CardStats>): number {
  const s = stats[id]
  if (!s) return 2
  const total = s.correct + s.incorrect
  if (total === 0) return 2
  return 1 + s.incorrect / total
}

// Weight toward cards with a high error rate. New cards (no history) get weight 2.
export function weightedPick<T extends { id: string }>(
  pool: T[],
  stats: Record<string, CardStats>,
  random = Math.random,
): T {
  const weights = pool.map((item) => {
    return cardWeight(item.id, stats)
  })
  const total = weights.reduce((a, b) => a + b, 0)
  let r = random() * total
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i]
    if (r <= 0) return pool[i]
  }
  return pool[pool.length - 1]
}

export function useSpacedRepetition() {
  const [stats, setStats] = useState<Record<string, CardStats>>(loadStats)

  const record = useCallback((id: string, correct: boolean) => {
    setStats((prev) => {
      const next = {
        ...prev,
        [id]: nextCardStats(prev[id], correct),
      }
      saveStats(next)
      return next
    })
  }, [])

  const pick = useCallback(
    <T extends { id: string }>(pool: T[]): T => weightedPick(pool, stats),
    [stats],
  )

  const getStats = useCallback(
    (id: string): CardStats => stats[id] ?? { correct: 0, incorrect: 0 },
    [stats],
  )

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setStats({})
  }, [])

  return { pick, record, getStats, reset }
}
