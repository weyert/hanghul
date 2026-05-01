import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { consonants, vowels, allCharacters } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { useLanguage } from '../contexts/LanguageContext'
import { SpeakButton } from '../components/SpeakButton'
import { useSpacedRepetition } from '../hooks/useSpacedRepetition'

export const Route = createFileRoute('/quiz')({
  component: QuizPage,
  head: () => ({
    meta: [{ title: 'Quiz — 한글 배우기' }],
  }),
})

const QUIZ_LENGTH = 10

type QuizMode = 'consonants' | 'vowels' | 'all'

interface Question {
  correct: HangulCharacter
  options: HangulCharacter[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildQuestion(pool: HangulCharacter[], pick: (pool: HangulCharacter[]) => HangulCharacter): Question {
  const correct = pick(pool)
  const wrongs = shuffle(pool.filter((c) => c.id !== correct.id)).slice(0, 3)
  return { correct, options: shuffle([...wrongs, correct]) }
}

function getPool(mode: QuizMode): HangulCharacter[] {
  if (mode === 'consonants') return consonants
  if (mode === 'vowels') return vowels
  return allCharacters
}

interface ModeCardProps {
  mode: QuizMode; label: string; subLabel: string; count: string; char: string
  onStart: (mode: QuizMode) => void
}

function ModeCard({ mode, label, subLabel, count, char, onStart }: ModeCardProps) {
  return (
    <button
      onClick={() => onStart(mode)}
      className="glass-card glass-card-hover rounded-2xl p-6 text-center cursor-pointer w-full"
    >
      <div className="text-4xl korean-text font-black mb-3 leading-none" style={{ color: 'var(--c-1)', textShadow: '0 0 20px rgba(167,139,250,0.25)' }}>
        {char}
      </div>
      <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{label}</h2>
      <p className="text-xs font-semibold text-violet-400 mt-0.5">{subLabel}</p>
      <p className="text-xs text-zinc-600 mt-1.5">{count}</p>
    </button>
  )
}

function QuizPage() {
  const srEnabled = useBooleanFlagValue(FLAGS.SPACED_REPETITION, false)
  const { pick, record, getStats, reset: resetSRS } = useSpacedRepetition()

  const [mode, setMode] = useState<QuizMode | null>(null)
  const [question, setQuestion] = useState<Question | null>(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const { language } = useLanguage()

  const pickFn = useCallback(
    (pool: HangulCharacter[]) => (srEnabled ? pick(pool) : pool[Math.floor(Math.random() * pool.length)]),
    [srEnabled, pick],
  )

  const startQuiz = useCallback((m: QuizMode) => {
    setMode(m); setScore(0); setQuestionNumber(1)
    setSelected(null); setFinished(false)
    setQuestion(buildQuestion(getPool(m), pickFn))
  }, [pickFn])

  const handleSelect = (id: string) => {
    if (selected !== null || !question) return
    setSelected(id)
    const correct = id === question.correct.id
    if (correct) setScore((s) => s + 1)
    if (srEnabled) record(question.correct.id, correct)
  }

  const handleNext = useCallback(() => {
    if (!mode) return
    if (questionNumber >= QUIZ_LENGTH) { setFinished(true); return }
    setQuestionNumber((n) => n + 1)
    setSelected(null)
    setQuestion(buildQuestion(getPool(mode), pickFn))
  }, [mode, questionNumber, pickFn])

  /* ── Mode selection ──────────────────────────────────── */
  if (!mode) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Quiz</h1>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>연습 Yeon-seup — Choose what to practice</p>
          </div>
          {srEnabled && (
            <button onClick={resetSRS} className="text-xs text-zinc-600 hover:text-red-400 transition-colors mt-1 cursor-pointer">
              Reset progress
            </button>
          )}
        </div>

        {srEnabled && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
            <span><strong>Spaced repetition on</strong> — characters you struggle with appear more often.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ModeCard mode="consonants" label="Consonants" subLabel="자음" count="19 characters" char="ㄱㄴㄷ" onStart={startQuiz} />
          <ModeCard mode="vowels"     label="Vowels"     subLabel="모음" count="21 characters" char="ㅏㅓㅗ" onStart={startQuiz} />
          <ModeCard mode="all"        label="All"        subLabel="전체" count="40 characters" char="한글"   onStart={startQuiz} />
        </div>

        <div className="rounded-xl px-4 py-3 text-sm" style={{ color: 'var(--c-2)', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          Each quiz is <strong style={{ color: 'var(--c-1)' }}>{QUIZ_LENGTH} questions</strong>. See a character, pick the correct romanization from 4 options.
        </div>
      </div>
    )
  }

  /* ── Results ─────────────────────────────────────────── */
  if (finished) {
    const pct = Math.round((score / QUIZ_LENGTH) * 100)
    const grade = pct >= 90 ? { korean: '완벽해요!', msg: 'Outstanding', color: '#6ee7b7' } :
                  pct >= 70 ? { korean: '잘했어요!', msg: 'Great job',   color: '#a78bfa' } :
                  pct >= 50 ? { korean: '계속해요!', msg: 'Keep going',  color: '#fcd34d' } :
                              { korean: '다시 해요', msg: 'Try again',   color: '#f87171' }
    return (
      <div className="max-w-sm mx-auto text-center space-y-6 py-10">
        <div>
          <div className="text-4xl sm:text-5xl korean-text font-black mb-2" style={{ color: grade.color }}>{grade.korean}</div>
          <p className="text-sm" style={{ color: 'var(--c-3)' }}>{grade.msg}</p>
        </div>
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <div className="text-6xl font-black" style={{ color: grade.color }}>
            {score}<span className="text-2xl text-zinc-600">/{QUIZ_LENGTH}</span>
          </div>
          <div className="text-base" style={{ color: 'var(--c-2)' }}>{pct}% correct</div>
          <div className="w-full rounded-full h-1.5" style={{ background: 'var(--c-border-card)' }}>
            <div className="h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: grade.color }} />
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => startQuiz(mode)} className="btn-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer text-sm">
            Try Again
          </button>
          <button onClick={() => setMode(null)} className="btn-ghost px-6 py-3 rounded-xl font-bold cursor-pointer text-sm" style={{ color: 'var(--c-1)' }}>
            Change Mode
          </button>
        </div>
      </div>
    )
  }

  if (!question) return null

  const isAnswered = selected !== null
  const isCorrect  = selected === question.correct.id
  const stats      = srEnabled ? getStats(question.correct.id) : null

  /* ── Active question ─────────────────────────────────── */
  return (
    <div className="max-w-lg mx-auto space-y-5">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs" style={{ color: 'var(--c-3)' }}>
          <span>Question {questionNumber} of {QUIZ_LENGTH}</span>
          <div className="flex items-center gap-3">
            {stats && (stats.correct + stats.incorrect) > 0 && (
              <span className="text-zinc-600">{stats.correct}✓ {stats.incorrect}✗</span>
            )}
            <span className="font-semibold" style={{ color: 'var(--c-2)' }}>Score: {score}</span>
          </div>
        </div>
        <div className="rounded-full h-1" style={{ background: 'var(--c-border-card)' }}>
          <div className="h-1 rounded-full transition-all duration-300"
            style={{ width: `${((questionNumber - 1) / QUIZ_LENGTH) * 100}%`, background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="glass-card rounded-2xl py-12 px-6 text-center relative">
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5 font-bold">Romanization?</p>
        <div
          className="korean-text font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--c-1)', textShadow: '0 0 60px rgba(167,139,250,0.35)' }}
        >
          {question.correct.char}
        </div>
        <p className="text-xs text-zinc-600 mt-4">{question.correct.name}</p>
        <div className="absolute bottom-4 right-4">
          <SpeakButton text={question.correct.examples[0]?.korean ?? question.correct.char} size="md" />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2.5">
        {question.options.map((option) => {
          const isThisSelected = selected === option.id
          const isThisCorrect  = option.id === question.correct.id
          let style: React.CSSProperties = {}
          let cls = 'rounded-xl border p-4 text-center font-bold text-base transition-all '

          if (!isAnswered) {
            style = { background: 'var(--c-input)', borderColor: 'var(--c-border)', color: 'var(--c-1)' }
            cls += 'hover:border-violet-400/50 hover:bg-violet-500/10 cursor-pointer'
          } else if (isThisCorrect) {
            style = { background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.4)', color: '#6ee7b7' }
          } else if (isThisSelected) {
            style = { background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }
          } else {
            style = { background: 'var(--c-surface)', borderColor: 'var(--c-border-sub)', color: 'var(--c-4)' }
          }

          return (
            <button key={option.id} className={cls} style={style}
              onClick={() => handleSelect(option.id)} disabled={isAnswered}
            >
              {option.romanization}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className="space-y-3">
          <div className="rounded-xl p-4 text-center" style={
            isCorrect
              ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }
              : { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }
          }>
            {isCorrect ? (
              <p className="font-bold text-emerald-400">Correct! 정답이에요!</p>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <p className="font-bold text-red-400">
                    The answer is <strong className="text-red-300">{question.correct.romanization}</strong>
                  </p>
                  <SpeakButton text={question.correct.examples[0]?.korean ?? question.correct.char} size="sm" className="text-red-500 hover:text-red-300" />
                </div>
                <p className="text-xs text-red-500/80">{question.correct.descriptions[language]}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleNext}
            className="btn-primary w-full text-white py-3.5 rounded-xl font-bold cursor-pointer text-sm"
          >
            {questionNumber >= QUIZ_LENGTH ? 'See Results' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  )
}
