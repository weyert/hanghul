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

type QuizMode = 'consonants' | 'vowels' | 'all' | 'listen' | 'words' | 'mixed'

interface Question    { correct: HangulCharacter; options: HangulCharacter[] }
interface WordQuestion { correct: VocabEntry;       options: VocabEntry[] }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildQuestion(pool: HangulCharacter[], pick: (pool: HangulCharacter[]) => HangulCharacter): Question {
  const correct = pick(pool)
  const wrongs = shuffle(pool.filter((c) => c.id !== correct.id)).slice(0, 3)
  return { correct, options: shuffle([...wrongs, correct]) }
}

function buildWordQuestion(pickFn?: (pool: VocabEntry[]) => VocabEntry): WordQuestion {
  const correct = pickFn ? pickFn(QUIZ_VOCAB) : shuffle(QUIZ_VOCAB)[0]
  const wrongs  = shuffle(QUIZ_VOCAB.filter((e) => e.id !== correct.id)).slice(0, 3)
  return { correct, options: shuffle([...wrongs, correct]) }
}

function getCharPool(mode: 'consonants' | 'vowels' | 'all' | 'listen'): HangulCharacter[] {
  if (mode === 'consonants') return consonants
  if (mode === 'vowels') return vowels
  return allCharacters
}

// ── Tip toggle (feature 5) ─────────────────────────────────────────

function TipToggle({ char, language }: { char: HangulCharacter; language: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-2 text-center">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1 text-xs cursor-pointer transition-colors"
        style={{ color: 'var(--c-4)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-accent-text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-4)')}
      >
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform 0.15s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          <polyline points="2,4 6,8 10,4" />
        </svg>
        {open ? 'Hide tip' : 'Memory tip'}
      </button>
      {open && (
        <div className="mt-2 space-y-1 text-xs" style={{ color: 'var(--c-3)' }}>
          <p>{char.descriptions[language as 'en' | 'nl'] ?? char.descriptions.en}</p>
          {char.examples[0] && (
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="korean-text font-semibold" style={{ color: 'var(--c-2)' }}>
                {char.examples[0].korean}
              </span>
              <span style={{ color: 'var(--c-4)' }}>·</span>
              <span>{char.examples[0].meaning}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Mode card ──────────────────────────────────────────────────────

interface ModeCardProps {
  mode: QuizMode; label: string; subLabel: string; count: string; char: React.ReactNode
  accent?: 'violet' | 'emerald' | 'amber'
  onStart: (mode: QuizMode) => void
}

function ModeCard({ mode, label, subLabel, count, char, onStart }: ModeCardProps) {
  return (
    <button
      onClick={() => onStart(mode)}
      className="glass-card glass-card-hover rounded-2xl p-6 text-center cursor-pointer w-full"
    >
      <div className="text-4xl korean-serif font-black mb-3 leading-none" style={{ color: 'var(--c-1)' }}>
        {char}
      </div>
      <h2 className="text-sm font-bold font-display" style={{ color: 'var(--c-1)' }}>{label}</h2>
      <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--c-accent-text)' }}>{subLabel}</p>
      <p className="text-xs mt-1.5" style={{ color: 'var(--c-3)' }}>{count}</p>
    </button>
  )
}

// ── QuizPage ───────────────────────────────────────────────────────

function QuizPage() {
  const srEnabled         = useBooleanFlagValue(FLAGS.SPACED_REPETITION, false)
  const listenEnabled     = useBooleanFlagValue(FLAGS.LISTEN_QUIZ, false)
  const wordEnabled       = useBooleanFlagValue(FLAGS.WORD_QUIZ, false)
  const mixedEnabled      = useBooleanFlagValue(FLAGS.MIXED_QUIZ, false)
  const retryWrongEnabled = useBooleanFlagValue(FLAGS.QUIZ_RETRY_WRONG, false)
  const autoAudioEnabled  = useBooleanFlagValue(FLAGS.QUIZ_AUTO_AUDIO, false)
  const correctTipEnabled = useBooleanFlagValue(FLAGS.QUIZ_CORRECT_TIP, false)

  const { pick, record, getStats, reset: resetSRS } = useSpacedRepetition()
  const { speak } = useSpeech()

  const [mode, setMode]                   = useState<QuizMode | null>(null)
  const [question, setQuestion]           = useState<Question | null>(null)
  const [wordQuestion, setWordQuestion]   = useState<WordQuestion | null>(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore]                 = useState(0)
  const [selected, setSelected]           = useState<string | null>(null)
  const [finished, setFinished]           = useState(false)
  const [mixedIsWord, setMixedIsWord]     = useState(false)
  // Feature 2: track characters answered wrong during a round
  const [wrongChars, setWrongChars]       = useState<HangulCharacter[]>([])
  // Optional custom pool (used when retrying wrong answers)
  const [activePool, setActivePool]       = useState<HangulCharacter[] | null>(null)

  const { language } = useLanguage()

  const pickFn = useCallback(
    (pool: HangulCharacter[]) => (srEnabled ? pick(pool) : pool[Math.floor(Math.random() * pool.length)]),
    [srEnabled, pick],
  )

  useEffect(() => {
    if (mode === 'listen' && question && !selected) {
      speak(question.correct.char)
    }
  }, [question, mode, selected, speak])

  const wordPickFn = useCallback(
    (pool: VocabEntry[]) => pick(pool),
    [pick],
  )

  const startQuiz = useCallback((m: QuizMode, customPool?: HangulCharacter[]) => {
    setMode(m); setScore(0); setQuestionNumber(1)
    setSelected(null); setFinished(false); setMixedIsWord(false)
    setWrongChars([])
    setActivePool(customPool ?? null)
    const pool = customPool ?? (m === 'mixed' ? allCharacters : m !== 'words' ? getCharPool(m) : null)
    if (m === 'words') {
      setWordQuestion(buildWordQuestion(srEnabled ? wordPickFn : undefined))
      setQuestion(null)
    } else if (m === 'mixed') {
      setQuestion(buildQuestion(pool!, pickFn))
      setWordQuestion(null)
    } else {
      setQuestion(buildQuestion(pool!, pickFn))
      setWordQuestion(null)
    }
  }, [pickFn, srEnabled, wordPickFn])

  const handleSelect = (id: string) => {
    if (selected !== null) return
    setSelected(id)
    const correct = wordQuestion ? id === wordQuestion.correct.id : id === question!.correct.id
    if (correct) {
      setScore((s) => s + 1)
      // Feature 4: auto-play audio after correct character answer
      if (autoAudioEnabled && question) {
        setTimeout(() => speak(question.correct.char), 350)
      }
    } else {
      // Feature 2: track wrong characters for retry
      if (retryWrongEnabled && question) {
        setWrongChars(prev =>
          prev.some(c => c.id === question.correct.id) ? prev : [...prev, question.correct],
        )
      }
    }
    if (srEnabled) {
      if (question) record(question.correct.id, correct)
      else if (wordQuestion) record(wordQuestion.correct.id, correct)
    }
  }

  const handleNext = useCallback(() => {
    if (!mode) return
    if (questionNumber >= QUIZ_LENGTH) { setFinished(true); return }
    const nextNum = questionNumber + 1
    setQuestionNumber(nextNum)
    setSelected(null)
    if (mode === 'words') {
      setWordQuestion(buildWordQuestion(srEnabled ? wordPickFn : undefined))
    } else if (mode === 'mixed') {
      const nextIsWord = nextNum % 3 === 0
      setMixedIsWord(nextIsWord)
      if (nextIsWord) {
        setWordQuestion(buildWordQuestion(srEnabled ? wordPickFn : undefined))
        setQuestion(null)
      } else {
        setQuestion(buildQuestion(activePool ?? allCharacters, pickFn))
        setWordQuestion(null)
      }
    } else {
      setQuestion(buildQuestion(activePool ?? getCharPool(mode), pickFn))
    }
  }, [mode, questionNumber, pickFn, srEnabled, wordPickFn, activePool])

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
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
            style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent-text)' }}
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

        {(listenEnabled || wordEnabled || mixedEnabled) && (
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
              {mixedEnabled && (
                <ModeCard
                  mode="mixed"
                  label="Mixed"
                  subLabel="혼합 Honhap"
                  count="Characters + vocabulary interleaved"
                  char="가→ㄱ"
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
    const grade =
      pct >= 90 ? { korean: '완벽해요!', msg: 'Outstanding', color: '#6ee7b7' } :
      pct >= 70 ? { korean: '잘했어요!', msg: 'Great job',   color: '#a78bfa' } :
      pct >= 50 ? { korean: '계속해요!', msg: 'Keep going',  color: '#fcd34d' } :
                  { korean: '다시 해요', msg: 'Try again',   color: '#f87171' }

    const hasWrong = retryWrongEnabled && wrongChars.length > 0

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
          {hasWrong && (
            <p className="text-xs" style={{ color: 'var(--c-3)' }}>
              {wrongChars.length} character{wrongChars.length > 1 ? 's' : ''} missed:{' '}
              <span className="korean-text font-bold" style={{ color: 'var(--c-1)' }}>
                {wrongChars.map(c => c.char).join(' ')}
              </span>
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => startQuiz(mode)} className="btn-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer text-sm">
            Try Again
          </button>
          {hasWrong && (
            <button
              onClick={() => startQuiz(mode, wrongChars)}
              className="px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
            >
              Retry {wrongChars.length} wrong →
            </button>
          )}
          <button onClick={() => setMode(null)} className="btn-ghost px-6 py-3 rounded-xl font-bold cursor-pointer text-sm" style={{ color: 'var(--c-1)' }}>
            Change Mode
          </button>
        </div>
      </div>
    )
  }

  /* ── Word quiz ───────────────────────────────────────── */
  if ((mode === 'words' || (mode === 'mixed' && mixedIsWord)) && wordQuestion) {
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
              style={{ width: `${((questionNumber - 1) / QUIZ_LENGTH) * 100}%`, background: 'var(--c-accent)' }} />
          </div>
        </div>

        <div className="glass-card rounded-2xl py-12 px-6 text-center relative">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5 font-bold">What does this mean?</p>
          <div className="korean-serif font-black leading-none" style={{ fontSize: 'clamp(3rem, 12vw, 5.5rem)', color: 'var(--c-1)' }}>
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
              cls += 'hover:border-[var(--c-accent-border)] hover:bg-[var(--c-accent-muted)] cursor-pointer'
            } else if (isThisCorrect) {
              style = { background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.4)', color: '#6ee7b7' }
            } else if (isThisSelected) {
              style = { background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }
            } else {
              style = { background: 'var(--c-surface)', borderColor: 'var(--c-border-sub)', color: 'var(--c-4)' }
            }

            return (
              <button key={option.id} className={cls} style={style}
                onClick={() => handleSelect(option.id)} disabled={isAnswered}>
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
                <p className="font-bold text-[var(--c-vowel-text)]">Correct! 정답이에요!</p>
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
            style={{ width: `${((questionNumber - 1) / QUIZ_LENGTH) * 100}%`, background: 'var(--c-accent)' }} />
        </div>
      </div>

      <div className="glass-card rounded-2xl py-12 px-6 text-center relative">
        {isListen ? (
          <>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-6 font-bold">Which character is this?</p>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => speak(question.correct.char)}
                className="w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{ background: 'var(--c-accent-muted)', border: '2px solid var(--c-accent-border)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,67,43,0.18)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--c-accent-muted)')}
                aria-label="Play sound"
              >
                <svg className="w-10 h-10" style={{ color: 'var(--c-accent-text)' }} viewBox="0 0 24 24" fill="currentColor">
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
            <div className="korean-serif font-black leading-none" style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--c-1)' }}>
              {question.correct.char}
            </div>
            <p className="text-xs text-zinc-600 mt-4">{question.correct.name}</p>
            <div className="absolute bottom-4 right-4">
              <SpeakButton text={question.correct.char} size="md" />
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {question.options.map((option) => {
          const isThisSelected = selected === option.id
          const isThisCorrect  = option.id === question.correct.id
          let style: React.CSSProperties = {}
          let cls = 'rounded-xl border p-4 text-center font-bold transition-all '

          if (!isAnswered) {
            style = { background: 'var(--c-input)', borderColor: 'var(--c-border)', color: 'var(--c-1)' }
            cls += 'hover:border-[var(--c-accent-border)] hover:bg-[var(--c-accent-muted)] cursor-pointer'
          } else if (isThisCorrect) {
            style = { background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.4)', color: '#6ee7b7' }
          } else if (isThisSelected) {
            style = { background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }
          } else {
            style = { background: 'var(--c-surface)', borderColor: 'var(--c-border-sub)', color: 'var(--c-4)' }
          }

          return (
            <button key={option.id} className={cls} style={style}
              onClick={() => handleSelect(option.id)} disabled={isAnswered}>
              {isListen ? (
                <span className="text-2xl korean-text">{option.char}</span>
              ) : (
                <span className="text-base">{option.romanization}</span>
              )}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className="space-y-3">
          <div className="rounded-xl p-4" style={
            isCorrect
              ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }
              : { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }
          }>
            {isCorrect ? (
              <div className="text-center">
                <p className="font-bold text-[var(--c-vowel-text)]">Correct! 정답이에요!</p>
                {/* Feature 5: memory tip on correct answers */}
                {correctTipEnabled && !isListen && (
                  <TipToggle char={question.correct} language={language} />
                )}
              </div>
            ) : (
              <div className="space-y-1 text-center">
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
