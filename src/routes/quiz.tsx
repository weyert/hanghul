import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useEffect } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { consonants, vowels, allCharacters } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { QUIZ_VOCAB } from '../data/vocabulary'
import type { VocabEntry } from '../data/vocabulary'
import { useLanguage } from '../contexts/LanguageContext'
import { SpeakButton } from '../components/SpeakButton'
import { useSpeech } from '../hooks/useSpeech'
import { useSpacedRepetition } from '../hooks/useSpacedRepetition'

export const Route = createFileRoute('/quiz')({
  component: QuizPage,
  head: () => ({
    meta: [{ title: 'Quiz — 한글 배우기' }],
  }),
})

const QUIZ_LENGTH = 10

type QuizMode = 'consonants' | 'vowels' | 'all' | 'listen' | 'words'

interface Question    { correct: HangulCharacter; options: HangulCharacter[] }
interface WordQuestion { correct: VocabEntry;        options: VocabEntry[] }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildQuestion(pool: HangulCharacter[], pick: (pool: HangulCharacter[]) => HangulCharacter): Question {
  const correct = pick(pool)
  const wrongs = shuffle(pool.filter((c) => c.id !== correct.id)).slice(0, 3)
  return { correct, options: shuffle([...wrongs, correct]) }
}

function buildWordQuestion(): WordQuestion {
  const shuffled = shuffle(QUIZ_VOCAB)
  const correct  = shuffled[0]
  const wrongs   = shuffled.slice(1, 4)
  return { correct, options: shuffle([...wrongs, correct]) }
}

function getCharPool(mode: 'consonants' | 'vowels' | 'all' | 'listen'): HangulCharacter[] {
  if (mode === 'consonants') return consonants
  if (mode === 'vowels') return vowels
  return allCharacters
}

// ── Mode card ──────────────────────────────────────────────────────

interface ModeCardProps {
  mode: QuizMode; label: string; subLabel: string; count: string; char: React.ReactNode
  accent?: 'violet' | 'emerald' | 'amber'
  onStart: (mode: QuizMode) => void
}

function ModeCard({ mode, label, subLabel, count, char, accent = 'violet', onStart }: ModeCardProps) {
  const glows = {
    violet: 'rgba(167,139,250,0.25)',
    emerald: 'rgba(52,211,153,0.25)',
    amber: 'rgba(251,191,36,0.25)',
  }[accent]
  return (
    <button
      onClick={() => onStart(mode)}
      className="glass-card glass-card-hover rounded-2xl p-6 text-center cursor-pointer w-full"
    >
      <div className="text-4xl korean-text font-black mb-3 leading-none" style={{ color: 'var(--c-1)', textShadow: `0 0 20px ${glows}` }}>
        {char}
      </div>
      <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{label}</h2>
      <p className="text-xs font-semibold text-violet-400 mt-0.5">{subLabel}</p>
      <p className="text-xs text-zinc-600 mt-1.5">{count}</p>
    </button>
  )
}

// ── QuizPage ───────────────────────────────────────────────────────

function QuizPage() {
  const srEnabled      = useBooleanFlagValue(FLAGS.SPACED_REPETITION, false)
  const listenEnabled  = useBooleanFlagValue(FLAGS.LISTEN_QUIZ, false)
  const wordEnabled    = useBooleanFlagValue(FLAGS.WORD_QUIZ, false)
  const { pick, record, getStats, reset: resetSRS } = useSpacedRepetition()
  const { speak } = useSpeech()

  const [mode, setMode]               = useState<QuizMode | null>(null)
  const [question, setQuestion]       = useState<Question | null>(null)
  const [wordQuestion, setWordQuestion] = useState<WordQuestion | null>(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore]             = useState(0)
  const [selected, setSelected]       = useState<string | null>(null)
  const [finished, setFinished]       = useState(false)
  const { language } = useLanguage()

  const pickFn = useCallback(
    (pool: HangulCharacter[]) => (srEnabled ? pick(pool) : pool[Math.floor(Math.random() * pool.length)]),
    [srEnabled, pick],
  )

  // Auto-play in listen mode when a new question loads
  useEffect(() => {
    if (mode === 'listen' && question && !selected) {
      speak(question.correct.char)
    }
  }, [question, mode, selected, speak])

  const startQuiz = useCallback((m: QuizMode) => {
    setMode(m); setScore(0); setQuestionNumber(1)
    setSelected(null); setFinished(false)
    if (m === 'words') {
      setWordQuestion(buildWordQuestion())
      setQuestion(null)
    } else {
      setQuestion(buildQuestion(getCharPool(m), pickFn))
      setWordQuestion(null)
    }
  }, [pickFn])

  const handleSelect = (id: string) => {
    if (selected !== null) return
    setSelected(id)
    const correct = wordQuestion ? id === wordQuestion.correct.id : id === question!.correct.id
    if (correct) setScore((s) => s + 1)
    if (srEnabled && question) record(question.correct.id, correct)
  }

  const handleNext = useCallback(() => {
    if (!mode) return
    if (questionNumber >= QUIZ_LENGTH) { setFinished(true); return }
    setQuestionNumber((n) => n + 1)
    setSelected(null)
    if (mode === 'words') {
      setWordQuestion(buildWordQuestion())
    } else {
      setQuestion(buildQuestion(getCharPool(mode), pickFn))
    }
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

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-3)' }}>Character Recognition</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ModeCard mode="consonants" label="Consonants" subLabel="자음" count="19 characters" char="ㄱㄴㄷ" onStart={startQuiz} />
            <ModeCard mode="vowels"     label="Vowels"     subLabel="모음" count="21 characters" char="ㅏㅓㅗ" onStart={startQuiz} />
            <ModeCard mode="all"        label="All"        subLabel="전체" count="40 characters" char="한글"   onStart={startQuiz} />
          </div>
        </div>

        {(listenEnabled || wordEnabled) && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-3)' }}>More Modes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listenEnabled && (
                <ModeCard
                  mode="listen"
                  label="Listen"
                  subLabel="듣기 Deut-gi"
                  count="Hear a sound → pick the character"
                  accent="emerald"
                  char={
                    <svg className="w-10 h-10 mx-auto" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                      <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                    </svg>
                  }
                  onStart={startQuiz}
                />
              )}
              {wordEnabled && (
                <ModeCard
                  mode="words"
                  label="Vocabulary"
                  subLabel="어휘 Eo-hwi"
                  count="Korean word → English meaning"
                  accent="amber"
                  char="가방→bag"
                  onStart={startQuiz}
                />
              )}
            </div>
          </div>
        )}

        <div className="rounded-xl px-4 py-3 text-sm" style={{ color: 'var(--c-2)', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          Each quiz is <strong style={{ color: 'var(--c-1)' }}>{QUIZ_LENGTH} questions</strong>. Character modes: see a character, pick the romanization. Listen: hear it, pick the character. Vocabulary: see a word, pick the meaning.
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

  /* ── Word quiz ────────────────────────────────────────── */
  if (mode === 'words' && wordQuestion) {
    const isAnswered = selected !== null
    const isCorrect  = selected === wordQuestion.correct.id

    return (
      <div className="max-w-lg mx-auto space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs" style={{ color: 'var(--c-3)' }}>
            <span>Question {questionNumber} of {QUIZ_LENGTH}</span>
            <span className="font-semibold" style={{ color: 'var(--c-2)' }}>Score: {score}</span>
          </div>
          <div className="rounded-full h-1" style={{ background: 'var(--c-border-card)' }}>
            <div className="h-1 rounded-full transition-all duration-300"
              style={{ width: `${((questionNumber - 1) / QUIZ_LENGTH) * 100}%`, background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
          </div>
        </div>

        <div className="glass-card rounded-2xl py-12 px-6 text-center relative">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5 font-bold">What does this mean?</p>
          <div className="korean-text font-black leading-none" style={{ fontSize: 'clamp(3rem, 12vw, 5.5rem)', color: 'var(--c-1)', textShadow: '0 0 60px rgba(251,191,36,0.25)' }}>
            {wordQuestion.correct.korean}
          </div>
          <p className="text-sm mt-3 font-medium" style={{ color: 'var(--c-3)' }}>{wordQuestion.correct.romanized}</p>
          <div className="absolute bottom-4 right-4">
            <SpeakButton text={wordQuestion.correct.korean} size="md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {wordQuestion.options.map((option) => {
            const isThisSelected = selected === option.id
            const isThisCorrect  = option.id === wordQuestion.correct.id
            let style: React.CSSProperties = {}
            let cls = 'rounded-xl border p-4 text-center font-semibold text-sm transition-all '

            if (!isAnswered) {
              style = { background: 'var(--c-input)', borderColor: 'var(--c-border)', color: 'var(--c-1)' }
              cls += 'hover:border-amber-400/50 hover:bg-amber-500/10 cursor-pointer'
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
                {option.meaning}
              </button>
            )
          })}
        </div>

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
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <p className="font-bold text-red-400">
                    It means <strong className="text-red-300">{wordQuestion.correct.meaning}</strong>
                  </p>
                  <SpeakButton text={wordQuestion.correct.korean} size="sm" className="text-red-500 hover:text-red-300" />
                </div>
              )}
            </div>
            <button onClick={handleNext} className="btn-primary w-full text-white py-3.5 rounded-xl font-bold cursor-pointer text-sm">
              {questionNumber >= QUIZ_LENGTH ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (!question) return null

  const isAnswered = selected !== null
  const isCorrect  = selected === question.correct.id
  const stats      = srEnabled ? getStats(question.correct.id) : null
  const isListen   = mode === 'listen'

  /* ── Listen / character quiz ─────────────────────────── */
  return (
    <div className="max-w-lg mx-auto space-y-5">
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
            style={{
              width: `${((questionNumber - 1) / QUIZ_LENGTH) * 100}%`,
              background: isListen ? 'linear-gradient(90deg, #059669, #10b981)' : 'linear-gradient(90deg, #7c3aed, #4f46e5)',
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="glass-card rounded-2xl py-12 px-6 text-center relative">
        {isListen ? (
          <>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-6 font-bold">Which character is this?</p>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => speak(question.correct.char)}
                className="w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(52,211,153,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(16,185,129,0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(16,185,129,0.15)')}
                aria-label="Play sound"
              >
                <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                  <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                </svg>
              </button>
              <p className="text-xs text-zinc-600">Tap to replay</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5 font-bold">Romanization?</p>
            <div className="korean-text font-black leading-none" style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--c-1)', textShadow: '0 0 60px rgba(167,139,250,0.35)' }}>
              {question.correct.char}
            </div>
            <p className="text-xs text-zinc-600 mt-4">{question.correct.name}</p>
            <div className="absolute bottom-4 right-4">
              <SpeakButton text={question.correct.char} size="md" />
            </div>
          </>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2.5">
        {question.options.map((option) => {
          const isThisSelected = selected === option.id
          const isThisCorrect  = option.id === question.correct.id
          let style: React.CSSProperties = {}
          let cls = 'rounded-xl border p-4 text-center font-bold transition-all '

          if (!isAnswered) {
            style = { background: 'var(--c-input)', borderColor: 'var(--c-border)', color: 'var(--c-1)' }
            cls += isListen
              ? 'hover:border-emerald-400/50 hover:bg-emerald-500/10 cursor-pointer'
              : 'hover:border-violet-400/50 hover:bg-violet-500/10 cursor-pointer'
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
              {isListen ? (
                <span className="text-2xl korean-text">{option.char}</span>
              ) : (
                <span className="text-base">{option.romanization}</span>
              )}
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
                    {isListen
                      ? <>That is <strong className="text-red-300 korean-text text-xl">{question.correct.char}</strong> ({question.correct.romanization})</>
                      : <>The answer is <strong className="text-red-300">{question.correct.romanization}</strong></>
                    }
                  </p>
                  <SpeakButton text={question.correct.char} size="sm" className="text-red-500 hover:text-red-300" />
                </div>
                <p className="text-xs text-red-500/80">{question.correct.descriptions[language]}</p>
              </div>
            )}
          </div>
          <button onClick={handleNext} className="btn-primary w-full text-white py-3.5 rounded-xl font-bold cursor-pointer text-sm">
            {questionNumber >= QUIZ_LENGTH ? 'See Results' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  )
}
