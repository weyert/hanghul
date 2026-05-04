import { useCallback } from 'react'

export function useAnalytics() {
  const track = useCallback((event: string, properties?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties, timestamp: Date.now() }),
    }).catch(() => {})
  }, [])

  return { track }
}
