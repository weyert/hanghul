import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { allCharacters } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { useAnalytics } from '../hooks/useAnalytics'
import { PageArtwork } from '../components/PageArtwork'
import { useLanguage } from '../contexts/LanguageContext'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/typing')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/typing', params: { locale: 'en' }, statusCode: 301 })
  },
  component: TypingPracticePage,
  head: () => createSeoHead({
    title: 'Hangul Typing Practice',
    description: 'Practice typing Korean letter romanizations and build faster recall for Hangul consonants and vowels while learning Korean.',
    path: '/typing',
    keywords: [
      'learning Korean',
      'how to learn Korean language',
      'Korean language learning',
      'learn Korean online',
    ],
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

export function TypingPracticePage() {
  const enabled              = useBooleanFlagValue(FLAGS.TYPING_PRACTICE, false)
  const beginnerFlagEnabled  = useBooleanFlagValue(FLAGS.TYPING_BEGINNER, false)
  const { language } = useLanguage()
  const { track } = useAnalytics()
  const copy = language === 'nl'
    ? {
        disabled: 'Deze functie is niet ingeschakeld.',
        title: 'Typoefening',
        intro: '타이핑 연습. Zie een teken en typ de romanisering.',
        artAlt: 'Hangul-oefentegels en toetsenbordachtige invoerstukken voor typoefening.',
        beginner: 'Beginner',
        startSmall: 'Begin klein',
        unlocked: 'tekens vrijgespeeld',
        scoreToUnlock: 'Score >=70% om er 5 bij te krijgen.',
        allCharacters: 'Alle tekens',
        fullChallenge: 'Volledige uitdaging',
        allCharactersDesc: 'Alle 40 tekens: medeklinkers, klinkers, gespannen tekens en samengestelde klinkers.',
        typeInstruction: 'Typ de romanisering en druk op',
        accepted: 'Geaccepteerde antwoorden volgen de romanisering van de site; sommige medeklinkers hebben twee gangbare waarden, bijvoorbeeld g of k voor ㄱ.',
        startPractice: 'Start oefening',
        questionsPerRound: `${ROUND_LENGTH} vragen per ronde · alle 40 tekens`,
        outstanding: 'Uitstekend',
        great: 'Goed gedaan',
        keepGoing: 'Blijf oefenen',
        tryAgainMsg: 'Probeer opnieuw',
        correctPct: 'goed',
        beginnerPool: 'Beginnerreeks',
        of: 'van',
        unlock: 'Speel vrij',
        more: 'meer',
        tryAgain: 'Opnieuw',
        back: 'Terug',
        question: 'Vraag',
        score: 'Score',
        chars: 'tekens',
        correct: '✓ Goed',
        answerIs: '✗ Het is',
        prompt: 'Typ de romanisering',
        placeholder: 'Typ romanisering...',
        check: 'Controleer',
        enterHint: 'Druk op Enter om te antwoorden · na feedback ga je automatisch door',
      }
    : {
        disabled: 'This feature is not enabled.',
        title: 'Typing Practice',
        intro: '타이핑 연습. See a character, type its romanization.',
        artAlt: 'Hangul practice tiles and keyboard-like input pieces arranged for typing practice.',
        beginner: 'Beginner',
        startSmall: 'Start small',
        unlocked: 'characters unlocked',
        scoreToUnlock: 'Score >=70% to add 5 more.',
        allCharacters: 'All Characters',
        fullChallenge: 'Full challenge',
        allCharactersDesc: 'All 40 characters: consonants, vowels, tense, and compound.',
        typeInstruction: 'Type the romanization and press',
        accepted: 'Accepted answers follow the site romanization; some consonants allow both common values (for example, g or k for ㄱ).',
        startPractice: 'Start Practice',
        questionsPerRound: `${ROUND_LENGTH} questions per round · all 40 characters`,
        outstanding: 'Outstanding',
        great: 'Great job',
        keepGoing: 'Keep going',
        tryAgainMsg: 'Try again',
        correctPct: 'correct',
        beginnerPool: 'Beginner pool',
        of: 'of',
        unlock: 'Unlock',
        more: 'more',
        tryAgain: 'Try Again',
        back: 'Back',
        question: 'Question',
        score: 'Score',
        chars: 'chars',
        correct: '✓ Correct!',
        answerIs: '✗  It\'s',
        prompt: 'Type the romanization',
        placeholder: 'Type romanization...',
        check: 'Check',
        enterHint: 'Press Enter to submit · answer auto-advances after feedback',
      }

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
        <p className="text-base font-medium">{copy.disabled}</p>
      </div>
    )
  }

  // ── Start screen ─────────────────────────────────────────────────

  if (!started) {
    if (beginnerFlagEnabled) {
      return (
        <div className="max-w-lg mx-auto space-y-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{copy.title}</h1>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>{copy.intro}</p>
          </div>
          <PageArtwork
            src="/artwork/typing.jpg"
            alt={copy.artAlt}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => start('beginner')}
              className="glass-card glass-card-hover rounded-2xl p-6 text-left cursor-pointer w-full space-y-3"
            >
              <div className="text-4xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>ㄱ→g</div>
              <div>
                <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{copy.beginner}</h2>
                <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--c-accent-text)' }}>{copy.startSmall}</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>
                {unlockedCount} {copy.of} {BEGINNER_POOL.length} {copy.unlocked}.
                {copy.scoreToUnlock}
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
                <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{copy.allCharacters}</h2>
                <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--c-accent-text)' }}>{copy.fullChallenge}</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>
                {copy.allCharactersDesc}
              </p>
            </button>
          </div>

          <p className="text-xs text-center" style={{ color: 'var(--c-4)' }}>
            {copy.typeInstruction}{' '}
            <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>Enter</kbd>
            {' '}{copy.accepted}
          </p>
        </div>
      )
    }

    return (
      <div className="max-w-lg mx-auto space-y-8 py-10 text-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{copy.title}</h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>{copy.intro}</p>
        </div>
        <PageArtwork
          src="/artwork/typing.jpg"
          alt={copy.artAlt}
        />
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <div className="text-6xl korean-text font-black" style={{ color: 'var(--c-1)', textShadow: '0 0 40px rgba(167,139,250,0.3)' }}>ㄱ→g</div>
          <p className="text-sm" style={{ color: 'var(--c-2)' }}>
            {language === 'nl' ? 'Er verschijnt een teken. Typ de romanisering en druk op' : 'A character appears. Type its romanization and press'}{' '}
            <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>Enter</kbd>.
            {copy.accepted}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--c-3)' }}>{copy.questionsPerRound}</p>
        </div>
        <button onClick={() => start('all')} className="btn-primary px-10 py-3.5 rounded-xl font-bold text-white cursor-pointer text-sm">
          {copy.startPractice}
        </button>
      </div>
    )
  }

  // ── Results screen ────────────────────────────────────────────────

  if (finished) {
    const pct = Math.round((score / ROUND_LENGTH) * 100)
    const grade =
      pct >= 90 ? { korean: '완벽해요!', msg: copy.outstanding, color: '#6ee7b7' } :
      pct >= 70 ? { korean: '잘했어요!', msg: copy.great,       color: '#a78bfa' } :
      pct >= 50 ? { korean: '계속해요!', msg: copy.keepGoing,   color: '#fcd34d' } :
                  { korean: '다시 해요', msg: copy.tryAgainMsg, color: '#f87171' }

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
          <div className="text-base" style={{ color: 'var(--c-2)' }}>{pct}% {copy.correctPct}</div>
          <div className="w-full rounded-full h-1.5" style={{ background: 'var(--c-border-card)' }}>
            <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: grade.color }} />
          </div>
          {inBeginner && (
            <p className="text-xs" style={{ color: 'var(--c-3)' }}>
              {copy.beginnerPool}: {unlockedCount} {copy.of} {BEGINNER_POOL.length} {language === 'nl' ? 'tekens' : 'characters'}
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
              {copy.unlock} {unlockCount} {copy.more} →
            </button>
          ) : (
            <button onClick={() => start(typingMode)} className="btn-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer text-sm">
              {copy.tryAgain}
            </button>
          )}
          <button
            onClick={() => setStarted(false)}
            className="btn-ghost px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
            style={{ color: 'var(--c-1)' }}
          >
            {copy.back}
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
          <span>{copy.question} {questionNumber} {copy.of} {ROUND_LENGTH}</span>
          <div className="flex items-center gap-2">
            {beginnerFlagEnabled && typingMode === 'beginner' && (
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--c-accent-muted)', color: 'var(--c-accent-text)' }}>
                {unlockedCount} {copy.chars}
              </span>
            )}
            <span className="font-semibold" style={{ color: 'var(--c-2)' }}>{copy.score}: {score}</span>
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
          {feedback === 'correct' ? copy.correct : feedback === 'wrong' ? `${copy.answerIs} "${current.romanization}"` : copy.prompt}
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
          placeholder={copy.placeholder}
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
          {copy.check}
        </button>
      </div>

      <p className="text-xs text-center text-zinc-600">
        {copy.enterHint}
      </p>
    </div>
  )
}
