import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { allCharacters, consonants, vowels } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/progress')({
  component: ProgressPage,
  head: () => createSeoHead({
    title: 'Hangul Progress',
    description: 'Track your Hangul quiz progress and see which Korean letters are mastered, learning, or still new.',
    path: '/progress',
  }),
})

interface CardStats { correct: number; incorrect: number }
type Mastery = 'mastered' | 'learning' | 'struggling' | 'new'

function getMastery(stats: CardStats | undefined): Mastery {
  if (!stats) return 'new'
  const total = stats.correct + stats.incorrect
  if (total < 3) return 'new'
  const acc = stats.correct / total
  if (acc >= 0.8 && total >= 5) return 'mastered'
  if (acc >= 0.5) return 'learning'
  return 'struggling'
}

const MASTERY_CONFIG: Record<Mastery, { label: string; color: string; bg: string; border: string }> = {
  mastered:   { label: 'Mastered',   color: '#6ee7b7', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)' },
  learning:   { label: 'Learning',   color: '#a78bfa', bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.3)' },
  struggling: { label: 'Struggling', color: '#f87171', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)' },
  new:        { label: 'Not yet seen', color: 'var(--c-4)', bg: 'var(--c-surface)', border: 'var(--c-border-card)' },
}

function CharBadge({ char, stats }: { char: HangulCharacter; stats: CardStats | undefined }) {
  const mastery = getMastery(stats)
  const cfg = MASTERY_CONFIG[mastery]
  const total = stats ? stats.correct + stats.incorrect : 0
  const acc = total > 0 ? Math.round((stats!.correct / total) * 100) : null

  return (
    <div
      className="flex flex-col items-center gap-1 p-2 rounded-xl"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      title={`${char.name} — ${mastery}${acc !== null ? ` (${acc}% correct, ${total} attempts)` : ''}`}
    >
      <span className="text-xl korean-text font-black" style={{ color: cfg.color }}>{char.char}</span>
      <span className="text-xs font-bold" style={{ color: cfg.color, opacity: 0.7 }}>{char.romanization}</span>
      {total > 0 && (
        <span className="text-xs" style={{ color: cfg.color, opacity: 0.55 }}>{acc}%</span>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <SpeakButton text={char.char} size="sm" />
      </div>
    </div>
  )
}

function StatPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="glass-card rounded-xl px-4 py-3 text-center">
      <div className="text-2xl font-black" style={{ color }}>{value}</div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--c-3)' }}>{label}</div>
    </div>
  )
}

function ProgressPage() {
  const enabled = useBooleanFlagValue(FLAGS.PROGRESS_DASHBOARD, false)
  const [statsMap, setStatsMap] = useState<Record<string, CardStats>>({})

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('hangul-srs') ?? '{}')
      setStatsMap(stored)
    } catch {
      setStatsMap({})
    }
  }, [])

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  const masteryCount: Record<Mastery, number> = { mastered: 0, learning: 0, struggling: 0, new: 0 }
  allCharacters.forEach((c) => { masteryCount[getMastery(statsMap[c.id])]++ })

  const totalAttempts = Object.values(statsMap).reduce((sum, s) => sum + s.correct + s.incorrect, 0)
  const totalCorrect  = Object.values(statsMap).reduce((sum, s) => sum + s.correct, 0)
  const overallAcc    = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null

  const groups: Array<{ title: string; mastery: Mastery; chars: HangulCharacter[] }> = [
    { title: 'Mastered',   mastery: 'mastered',   chars: allCharacters.filter((c) => getMastery(statsMap[c.id]) === 'mastered') },
    { title: 'Learning',   mastery: 'learning',   chars: allCharacters.filter((c) => getMastery(statsMap[c.id]) === 'learning') },
    { title: 'Struggling', mastery: 'struggling', chars: allCharacters.filter((c) => getMastery(statsMap[c.id]) === 'struggling') },
    { title: 'Not yet seen', mastery: 'new',      chars: allCharacters.filter((c) => getMastery(statsMap[c.id]) === 'new') },
  ]

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Progress</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>진행 Jin-haeng — Your quiz performance across all 40 characters</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatPill value={masteryCount.mastered}   label="Mastered"     color="#6ee7b7" />
        <StatPill value={masteryCount.learning}   label="Learning"     color="#a78bfa" />
        <StatPill value={masteryCount.struggling} label="Struggling"   color="#f87171" />
        <StatPill value={masteryCount.new}        label="Not seen"     color="var(--c-3)" />
      </div>

      {/* Overall accuracy bar */}
      {totalAttempts > 0 && (
        <div className="glass-card rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs font-semibold" style={{ color: 'var(--c-3)' }}>
            <span>Overall accuracy</span>
            <span style={{ color: 'var(--c-1)' }}>{overallAcc}% across {totalAttempts} attempts</span>
          </div>
          <div className="rounded-full h-2" style={{ background: 'var(--c-border-card)' }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${overallAcc}%`, background: 'var(--c-accent)' }}
            />
          </div>
        </div>
      )}

      {totalAttempts === 0 && (
        <div className="text-center py-12 rounded-2xl" style={{ border: '1px dashed var(--c-border-card)' }}>
          <div className="text-5xl korean-text font-black mb-3" style={{ color: 'var(--c-border-card)' }}>한글</div>
          <p className="text-sm text-zinc-600">Complete some quizzes to see your progress here.</p>
        </div>
      )}

      {/* Character groups */}
      {groups.filter((g) => g.chars.length > 0).map((group) => {
        const cfg = MASTERY_CONFIG[group.mastery]
        const consInGroup = group.chars.filter((c) => consonants.some((x) => x.id === c.id))
        const vowsInGroup = group.chars.filter((c) => vowels.some((x) => x.id === c.id))

        return (
          <section key={group.mastery}>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--c-3)' }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: cfg.color }} />
              {group.title}
              <span className="px-1.5 py-0.5 rounded-full text-xs font-black"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                {group.chars.length}
              </span>
            </h2>
            {consInGroup.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-zinc-600 mb-1.5">Consonants</p>
                <div className="flex flex-wrap gap-2">
                  {consInGroup.map((c) => <CharBadge key={c.id} char={c} stats={statsMap[c.id]} />)}
                </div>
              </div>
            )}
            {vowsInGroup.length > 0 && (
              <div>
                <p className="text-xs text-zinc-600 mb-1.5">Vowels</p>
                <div className="flex flex-wrap gap-2">
                  {vowsInGroup.map((c) => <CharBadge key={c.id} char={c} stats={statsMap[c.id]} />)}
                </div>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
