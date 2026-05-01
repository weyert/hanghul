import { useState, useCallback } from 'react'

interface CardStats {
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

// Weight toward cards with a high error rate. New cards (no history) get weight 2.
function weightedPick<T extends { id: string }>(pool: T[], stats: Record<string, CardStats>): T {
  const weights = pool.map((item) => {
    const s = stats[item.id]
    if (!s) return 2
    const total = s.correct + s.incorrect
    if (total === 0) return 2
    return 1 + s.incorrect / total
  })
  const total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
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
      const existing = prev[id] ?? { correct: 0, incorrect: 0 }
      const next = {
        ...prev,
        [id]: {
          correct: existing.correct + (correct ? 1 : 0),
          incorrect: existing.incorrect + (correct ? 0 : 1),
        },
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
