import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { allCharacters } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { useSpeech } from '../hooks/useSpeech'
import { SpeakButton } from '../components/SpeakButton'
import { useLanguage } from '../contexts/LanguageContext'
import { useAnalytics } from '../hooks/useAnalytics'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/learn')({
  component: LearnPage,
  head: () => createSeoHead({
    title: 'Guided Hangul Lessons',
    description: 'Follow a beginner-friendly Hangul lesson path that introduces Korean letters in a practical reading order.',
    path: '/learn',
  }),
})

// Curated teaching order: basic consonants and vowels interleaved so you
// can form syllables (나, 마, 거, 모…) after just the first handful.
const LEARN_CHAR_IDS = [
  'nieun', 'a', 'mieum', 'eo', 'giyeok', 'o', 'digeut', 'u',
  'rieul', 'i', 'siot', 'yo', 'ieung', 'yu', 'hieut', 'eu',
  'bieup', 'ya', 'jieut', 'yeo', 'chieut', 'kieuk', 'tieut', 'pieup-aspirated',
]

const LEARN_CHARS = LEARN_CHAR_IDS
  .map(id => allCharacters.find(c => c.id === id))
  .filter((c): c is HangulCharacter => c !== undefined)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildOptions(char: HangulCharacter): HangulCharacter[] {
  const isConsonant = char.category.includes('consonant')
  const sameCategory = LEARN_CHARS.filter(
    c => c.id !== char.id && c.category.includes(isConsonant ? 'consonant' : 'vowel'),
  )
  return shuffle([char, ...shuffle(sameCategory).slice(0, 3)])
}

// ─── Progress bar ────────────────────────────────────────────────────

function ProgressBar({
  charIdx, total, score, badge,
}: {
  charIdx: number; total: number; score: number; badge: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs" style={{ color: 'var(--c-3)' }}>
        <span>Character {charIdx + 1} of {total}</span>
        <div className="flex items-center gap-2">
          {badge}
          <span className="font-semibold" style={{ color: 'var(--c-2)' }}>Score: {score}</span>
        </div>
      </div>
      <div className="rounded-full h-1" style={{ background: 'var(--c-border-card)' }}>
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${(charIdx / total) * 100}%`, background: 'var(--c-accent)' }}
        />
      </div>
    </div>
  )
}

// ─── Landing screen ──────────────────────────────────────────────────

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-lg mx-auto space-y-8 py-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Guided Lessons</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>배우기 — Meet each character, then test yourself right away</p>
      </div>

      <div className="glass-card rounded-2xl p-8 space-y-5">
        <div className="flex items-center gap-5">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl korean-serif font-black"
            style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent-text)' }}
          >
            ㄴ
          </div>
          <div className="space-y-1">
            <p className="font-bold" style={{ color: 'var(--c-1)' }}>See it. Hear it. Test it.</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Each character gets a full introduction with audio, then a single quiz question — before you move on.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center pt-1">
          {([
            { stat: '24', sub: 'Basic characters' },
            { stat: '2 steps', sub: 'Intro + quiz' },
            { stat: 'Audio', sub: 'Every sound' },
          ] as const).map(({ stat, sub }) => (
            <div key={stat} className="rounded-xl p-3" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>{stat}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--c-3)' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="btn-primary px-10 py-3.5 rounded-xl font-bold text-white cursor-pointer text-sm w-full max-w-xs"
        >
          Start Learning →
        </button>
        <p className="text-xs" style={{ color: 'var(--c-4)' }}>No account · takes about 15 minutes</p>
      </div>
    </div>
  )
}

function koreanName(char: HangulCharacter) {
  return char.name.split(' ')[0]
}

// ─── Intro screen ────────────────────────────────────────────────────

function IntroScreen({
  char, charIdx, total, score, language, onReady, hangulFirst,
}: {
  char: HangulCharacter
  charIdx: number
  total: number
  score: number
  language: string
  onReady: () => void
  hangulFirst: boolean
}) {
  const { speak } = useSpeech()
  const isConsonant = char.category.includes('consonant')

  const accent = isConsonant
    ? { bg: 'var(--c-accent-muted)', border: 'var(--c-accent-border)', text: 'var(--c-accent-text)' }
    : { bg: 'rgba(74,158,138,0.15)', border: 'rgba(74,158,138,0.35)', text: 'var(--c-vowel-text)' }

  useEffect(() => {
    const t = setTimeout(() => speak(char.char), 450)
    return () => clearTimeout(t)
  }, [char.char, speak])

  const badge = (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-bold"
      style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}
    >
      {isConsonant ? 'Consonant' : 'Vowel'}
    </span>
  )

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <ProgressBar charIdx={charIdx} total={total} score={score} badge={badge} />

      <div
        className="glass-card rounded-2xl py-12 px-6 text-center relative"
        style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
      >
        <p className="text-xs uppercase tracking-widest font-bold mb-5" style={{ color: accent.text }}>
          New character
        </p>
        <div
          className="korean-serif font-black leading-none mb-4"
          style={{ fontSize: 'clamp(6rem, 20vw, 10rem)', color: 'var(--c-1)' }}
        >
          {char.char}
        </div>
        {hangulFirst ? (
          <>
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="text-3xl font-black korean-text" style={{ color: accent.text }}>{koreanName(char)}</span>
            </div>
            <p className="text-sm font-mono" style={{ color: 'var(--c-3)' }}>/{char.ipa}/</p>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="text-2xl font-bold font-mono" style={{ color: accent.text }}>{char.romanization}</span>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--c-3)' }}>{char.name}</p>
          </>
        )}
        <div className="absolute bottom-4 right-4">
          <SpeakButton text={char.char} size="md" />
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-2)' }}>
          {char.descriptions[language as 'en' | 'nl'] ?? char.descriptions.en}
        </p>
        {char.examples[0] && (
          <div
            className="flex items-center gap-2 pt-2 flex-wrap"
            style={{ borderTop: '1px solid var(--c-border-sub)' }}
          >
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--c-4)' }}>Example</span>
            <span className="korean-text font-bold" style={{ color: 'var(--c-1)' }}>{char.examples[0].korean}</span>
            <span className="text-xs font-mono" style={{ color: 'var(--c-3)' }}>{char.examples[0].romanized}</span>
            <span className="text-xs" style={{ color: 'var(--c-4)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--c-3)' }}>{char.examples[0].meaning}</span>
            <SpeakButton text={char.examples[0].korean} size="sm" />
          </div>
        )}
      </div>

      <button
        onClick={onReady}
        className="btn-primary w-full py-3.5 rounded-xl font-bold text-white cursor-pointer text-sm"
      >
        Test me! →
      </button>
    </div>
  )
}

// ─── Quiz screen ─────────────────────────────────────────────────────

function QuizScreen({
  char, charIdx, total, score, onNext, hangulFirst,
}: {
  char: HangulCharacter
  charIdx: number
  total: number
  score: number
  onNext: (correct: boolean) => void
  hangulFirst: boolean
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [options] = useState(() => buildOptions(char))
  const { speak } = useSpeech()

  const isAnswered = selected !== null
  const isCorrect  = selected === char.id

  const handleSelect = (id: string) => {
    if (selected !== null) return
    setSelected(id)
    if (id === char.id) setTimeout(() => speak(char.char), 300)
  }

  const badge = (
    <span className="text-xs font-semibold" style={{ color: 'var(--c-3)' }}>
      Quiz
    </span>
  )

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <ProgressBar charIdx={charIdx} total={total} score={score} badge={badge} />

      <div className="glass-card rounded-2xl py-12 px-6 text-center relative">
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5 font-bold">
          {hangulFirst ? '이름? Korean name' : 'Romanization?'}
        </p>
        <div
          className="korean-serif font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', color: 'var(--c-1)' }}
        >
          {char.char}
        </div>
        <p className="text-xs text-zinc-600 mt-4">{char.name}</p>
        <div className="absolute bottom-4 right-4">
          <SpeakButton text={char.char} size="md" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {options.map((option) => {
          const isThisSelected = selected === option.id
          const isThisCorrect  = option.id === char.id
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
              {hangulFirst
                ? <span className="text-xl korean-text font-black">{koreanName(option)}</span>
                : <span className="text-base">{option.romanization}</span>
              }
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className="space-y-3">
          <div
            className="rounded-xl p-4 text-center"
            style={isCorrect
              ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }
              : { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }
            }
          >
            {isCorrect ? (
              <p className="font-bold text-[var(--c-vowel-text)]">Correct! 정답이에요!</p>
            ) : (
              <div className="space-y-1">
                <p className="font-bold text-red-400">
                  {hangulFirst
                    ? <>It's <strong className="text-red-300 korean-text text-xl">{koreanName(char)}</strong></>
                    : <>It's <strong className="text-red-300">{char.romanization}</strong></>
                  }
                </p>
                <p className="text-xs" style={{ color: 'var(--c-3)' }}>Tap the character above to hear it</p>
              </div>
            )}
          </div>
          <button
            onClick={() => onNext(isCorrect)}
            className="btn-primary w-full text-white py-3.5 rounded-xl font-bold cursor-pointer text-sm"
          >
            {charIdx + 1 >= total ? 'See Results' : 'Next Character →'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Finished screen ─────────────────────────────────────────────────

function FinishedScreen({
  score, total, onRestart,
}: {
  score: number; total: number; onRestart: () => void
}) {
  const pct = Math.round((score / total) * 100)
  const grade =
    pct >= 90 ? { korean: '완벽해요!', msg: 'Outstanding — you know your basics!', color: '#6ee7b7' } :
    pct >= 70 ? { korean: '잘했어요!', msg: 'Great work — keep going!',             color: '#a78bfa' } :
    pct >= 50 ? { korean: '계속해요!', msg: 'Good effort — try once more.',          color: '#fcd34d' } :
                { korean: '다시 해요', msg: 'Keep practicing — you\'ll get it.',      color: '#f87171' }

  return (
    <div className="max-w-sm mx-auto text-center space-y-6 py-10">
      <div>
        <div className="text-4xl sm:text-5xl korean-text font-black mb-2" style={{ color: grade.color }}>
          {grade.korean}
        </div>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>{grade.msg}</p>
      </div>

      <div className="glass-card rounded-2xl p-8 space-y-4">
        <div className="text-6xl font-black" style={{ color: grade.color }}>
          {score}<span className="text-2xl text-zinc-600">/{total}</span>
        </div>
        <div className="text-base" style={{ color: 'var(--c-2)' }}>{pct}% first-try correct</div>
        <div className="w-full rounded-full h-1.5" style={{ background: 'var(--c-border-card)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: grade.color }}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={onRestart}
          className="btn-primary text-white px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
        >
          Try Again
        </button>
        <Link
          to="/quiz"
          className="btn-ghost px-6 py-3 rounded-xl font-bold cursor-pointer text-sm"
          style={{ color: 'var(--c-1)' }}
        >
          Take the Quiz
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

function LearnPage() {
  const enabled      = useBooleanFlagValue(FLAGS.GUIDED_LEARN, false)
  const hangulFirst  = useBooleanFlagValue(FLAGS.HANGUL_FIRST, false)
  const { language } = useLanguage()
  const { track } = useAnalytics()

  const [phase, setPhase]     = useState<'landing' | 'lesson' | 'finished'>('landing')
  const [charIdx, setCharIdx] = useState(0)
  const [step, setStep]       = useState<'intro' | 'quiz'>('intro')
  const [score, setScore]     = useState(0)

  useEffect(() => {
    if (phase === 'finished') {
      track('lesson_completed', { score, total: LEARN_CHARS.length, pct: Math.round((score / LEARN_CHARS.length) * 100) })
    }
  }, [phase, score, track])

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  const char = LEARN_CHARS[charIdx]

  const handleStart = () => {
    track('lesson_started', {})
    setCharIdx(0); setStep('intro'); setScore(0); setPhase('lesson')
  }

  const handleQuizNext = (correct: boolean) => {
    if (correct) setScore(s => s + 1)
    if (charIdx + 1 >= LEARN_CHARS.length) {
      setPhase('finished')
    } else {
      setCharIdx(i => i + 1)
      setStep('intro')
    }
  }

  if (phase === 'landing') return <LandingScreen onStart={handleStart} />

  if (phase === 'finished') {
    return <FinishedScreen score={score} total={LEARN_CHARS.length} onRestart={handleStart} />
  }

  if (!char) return null

  if (step === 'intro') {
    return (
      <IntroScreen
        key={`intro-${charIdx}`}
        char={char}
        charIdx={charIdx}
        total={LEARN_CHARS.length}
        score={score}
        language={language}
        onReady={() => setStep('quiz')}
        hangulFirst={hangulFirst}
      />
    )
  }

  return (
    <QuizScreen
      key={`quiz-${charIdx}`}
      char={char}
      charIdx={charIdx}
      total={LEARN_CHARS.length}
      score={score}
      onNext={handleQuizNext}
      hangulFirst={hangulFirst}
    />
  )
}
