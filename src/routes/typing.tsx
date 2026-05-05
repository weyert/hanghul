import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { allCharacters } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { useAnalytics } from '../hooks/useAnalytics'

export const Route = createFileRoute('/typing')({
  component: TypingPracticePage,
  head: () => ({
    meta: [{ title: 'Typing Practice — 한글 배우기' }],
  }),
})

const ROUND_LENGTH = 10

// Curated beginner teaching order: same interleaved sequence as the learn page
const BEGINNER_POOL_IDS = [
  'nieun', 'a', 'mieum', 'eo', 'giyeok', 'o', 'digeut', 'u',
  'rieul', 'i', 'siot', 'yo', 'ieung', 'yu', 'hieut', 'eu',
  'bieup', 'ya', 'jieut', 'yeo', 'chieut', 'kieuk', 'tieut', 'pieup-aspirated',
]

const BEGINNER_POOL = BEGINNER_POOL_IDS
  .map(id => allCharacters.find(c => c.id === id))
  .filter((c): c is HangulCharacter => c !== undefined)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function checkRomanization(input: string, romanization: string): boolean {
  const variants = romanization.toLowerCase().split('/').map((s) => s.trim())
  return variants.some((v) => v === input.toLowerCase().trim())
}

function TypingPracticePage() {
  const enabled              = useBooleanFlagValue(FLAGS.TYPING_PRACTICE, false)
  const beginnerFlagEnabled  = useBooleanFlagValue(FLAGS.TYPING_BEGINNER, false)
  const { track } = useAnalytics()

  const [queue, setQueue]               = useState<HangulCharacter[]>([])
  const [current, setCurrent]           = useState<HangulCharacter | null>(null)
  const [input, setInput]               = useState('')
  const [feedback, setFeedback]         = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore]               = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [finished, setFinished]         = useState(false)
  const [started, setStarted]           = useState(false)
  const [typingMode, setTypingMode]     = useState<'beginner' | 'all'>('all')
  const [unlockedCount, setUnlockedCount] = useState(5)

  // Ref so nextQuestion always uses the current pool without a stale closure
  const activePoolRef = useRef<HangulCharacter[]>(allCharacters)
  const inputRef = useRef<HTMLInputElement>(null)

  const nextQuestion = useCallback((q: HangulCharacter[], n: number) => {
    if (n > ROUND_LENGTH) { setFinished(true); return }
    const [next, ...rest] = q.length ? q : shuffle(activePoolRef.current)
    setCurrent(next)
    setQueue(rest)
    setInput('')
    setFeedback(null)
    setQuestionNumber(n)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const start = useCallback((mode: 'beginner' | 'all' = 'all', newUnlockedCount?: number) => {
    track('typing_started', { mode })
    const m     = mode
    const count = newUnlockedCount ?? unlockedCount
    setTypingMode(m)
    setScore(0)
    setFinished(false)
    setStarted(true)
    const pool = (beginnerFlagEnabled && m === 'beginner')
      ? BEGINNER_POOL.slice(0, count)
      : allCharacters
    activePoolRef.current = pool
    nextQuestion(shuffle(pool), 1)
  }, [nextQuestion, beginnerFlagEnabled, unlockedCount, track])

  const handleSubmit = () => {
    if (!current || feedback) return
    const correct = checkRomanization(input, current.romanization)
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) setScore((s) => s + 1)
  }

  const handleNext = useCallback(() => {
    nextQuestion(queue, questionNumber + 1)
  }, [queue, questionNumber, nextQuestion])

  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(handleNext, feedback === 'correct' ? 600 : 1400)
    return () => clearTimeout(t)
  }, [feedback, handleNext])

  useEffect(() => {
    if (finished) {
      track('typing_completed', { mode: typingMode, score, total: ROUND_LENGTH, pct: Math.round((score / ROUND_LENGTH) * 100) })
    }
  }, [finished, typingMode, score, track])

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  // ── Start screen ─────────────────────────────────────────────────

  if (!started) {
    if (beginnerFlagEnabled) {
      return (
        <div className="max-w-lg mx-auto space-y-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Typing Practice</h1>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>타이핑 연습 — See a character, type its romanization</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => start('beginner')}
              className="glass-card glass-card-hover rounded-2xl p-6 text-left cursor-pointer w-full space-y-3"
            >
              <div className="text-4xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>ㄱ→g</div>
              <div>
                <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>Beginner</h2>
                <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--c-accent-text)' }}>Start small</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>
                {unlockedCount} of {BEGINNER_POOL.length} characters unlocked.
                Score ≥70% to add 5 more.
              </p>
              <div className="w-full rounded-full h-1" style={{ background: 'var(--c-border-card)' }}>
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${(unlockedCount / BEGINNER_POOL.length) * 100}%`, background: 'var(--c-accent)' }}
                />
              </div>
            </button>

            <button
              onClick={() => start('all')}
              className="glass-card glass-card-hover rounded-2xl p-6 text-left cursor-pointer w-full space-y-3"
            >
              <div className="text-4xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>한글</div>
              <div>
                <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>All Characters</h2>
                <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--c-accent-text)' }}>Full challenge</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>
                All 40 characters — consonants, vowels, tense, and compound.
              </p>
            </button>
          </div>

          <p className="text-xs text-center" style={{ color: 'var(--c-4)' }}>
            Type the romanization and press{' '}
            <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>Enter</kbd>
            {' '}— accepted answers follow the site romanization; some consonants allow both common values (for example, g or k for ㄱ)
          </p>
        </div>
      )
    }

    return (
      <div className="max-w-lg mx-auto space-y-8 py-10 text-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Typing Practice</h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>타이핑 연습 — See a character, type its romanization</p>
        </div>
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <div className="text-6xl korean-text font-black" style={{ color: 'var(--c-1)', textShadow: '0 0 40px rgba(167,139,250,0.3)' }}>ㄱ→g</div>
          <p className="text-sm" style={{ color: 'var(--c-2)' }}>
            A character appears — type its romanization and press{' '}
            <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>Enter</kbd>.
            Accepted answers follow the site romanization, and some consonants allow both common values (for example, <em>g</em> or <em>k</em> for ㄱ).
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--c-3)' }}>{ROUND_LENGTH} questions per round · all 40 characters</p>
        </div>
        <button onClick={() => start('all')} className="btn-primary px-10 py-3.5 rounded-xl font-bold text-white cursor-pointer text-sm">
          Start Practice
        </button>
      </div>
    )
  }

  // ── Results screen ────────────────────────────────────────────────

  if (finished) {
    const pct = Math.round((score / ROUND_LENGTH) * 100)
    const grade =
      pct >= 90 ? { korean: '완벽해요!', msg: 'Outstanding', color: '#6ee7b7' } :
      pct >= 70 ? { korean: '잘했어요!', msg: 'Great job',   color: '#a78bfa' } :
      pct >= 50 ? { korean: '계속해요!', msg: 'Keep going',  color: '#fcd34d' } :
                  { korean: '다시 해요', msg: 'Try again',   color: '#f87171' }

    const inBeginner   = beginnerFlagEnabled && typingMode === 'beginner'
    const canUnlock    = inBeginner && pct >= 70 && unlockedCount < BEGINNER_POOL.length
    const newCount     = Math.min(unlockedCount + 5, BEGINNER_POOL.length)
    const unlockCount  = newCount - unlockedCount

    return (
      <div className="max-w-sm mx-auto text-center space-y-6 py-10">
        <div>
          <div className="text-4xl sm:text-5xl korean-text font-black mb-2" style={{ color: grade.color }}>{grade.korean}</div>
          <p className="text-sm" style={{ color: 'var(--c-3)' }}>{grade.msg}</p>
        </div>
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <div className="text-6xl font-black" style={{ color: grade.color }}>
            {score}<span className="text-2xl text-zinc-600">/{ROUND_LENGTH}</span>
          </div>
          <div className="text-base" style={{ color: 'var(--c-2)' }}>{pct}% correct</div>
          <div className="w-full rounded-full h-1.5" style={{ background: 'var(--c-border-card)' }}>
            <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: grade.color }} />
          </div>
          {inBeginner && (
            <p className="text-xs" style={{ color: 'var(--c-3)' }}>
              Beginner pool: {unlockedCount} of {BEGINNER_POOL.length} characters
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          {canUnlock ? (
            <button
              onClick={() => {
                setUnlockedCount(newCount)
                start('beginner', newCount)
              }}
              className="btn-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
            >
              Unlock {unlockCount} more →
            </button>
          ) : (
            <button onClick={() => start(typingMode)} className="btn-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer text-sm">
              Try Again
            </button>
          )}
          <button
            onClick={() => setStarted(false)}
            className="btn-ghost px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
            style={{ color: 'var(--c-1)' }}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  if (!current) return null

  // ── Practice screen ───────────────────────────────────────────────

  const bgColor = feedback === 'correct'
    ? 'rgba(16,185,129,0.12)'
    : feedback === 'wrong'
    ? 'rgba(239,68,68,0.1)'
    : undefined

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="space-y-2">
        <div className="flex justify-between text-xs" style={{ color: 'var(--c-3)' }}>
          <span>Question {questionNumber} of {ROUND_LENGTH}</span>
          <div className="flex items-center gap-2">
            {beginnerFlagEnabled && typingMode === 'beginner' && (
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--c-accent-muted)', color: 'var(--c-accent-text)' }}>
                {unlockedCount} chars
              </span>
            )}
            <span className="font-semibold" style={{ color: 'var(--c-2)' }}>Score: {score}</span>
          </div>
        </div>
        <div className="rounded-full h-1" style={{ background: 'var(--c-border-card)' }}>
          <div className="h-1 rounded-full transition-all duration-300"
            style={{ width: `${((questionNumber - 1) / ROUND_LENGTH) * 100}%`, background: 'var(--c-accent)' }} />
        </div>
      </div>

      <div
        className="glass-card rounded-2xl py-14 px-6 text-center relative transition-colors duration-200"
        style={{ background: bgColor }}
      >
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5 font-bold">
          {feedback === 'correct' ? '✓ Correct!' : feedback === 'wrong' ? `✗  It's "${current.romanization}"` : 'Type the romanization'}
        </p>
        <div
          className="korean-text font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--c-1)', textShadow: '0 0 60px rgba(167,139,250,0.35)' }}
        >
          {current.char}
        </div>
        <p className="text-xs text-zinc-600 mt-4">{current.name}</p>
        <div className="absolute bottom-4 right-4">
          <SpeakButton text={current.char} size="md" />
        </div>
      </div>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
          placeholder="Type romanization…"
          disabled={!!feedback}
          className="flex-1 input-field rounded-xl px-4 py-3 text-lg font-bold"
          autoComplete="off"
          autoCapitalize="none"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || !!feedback}
          className="px-5 py-3 rounded-xl font-bold text-sm btn-primary text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check
        </button>
      </div>

      <p className="text-xs text-center text-zinc-600">
        Press <kbd className="px-1 py-0.5 rounded font-mono text-xs" style={{ border: '1px solid var(--c-border)' }}>Enter</kbd> to submit · answer auto-advances after feedback
      </p>
    </div>
  )
}
