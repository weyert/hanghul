import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { VOCAB_CATEGORIES } from '../data/vocabulary'
import type { VocabEntry } from '../data/vocabulary'
import { SpeakButton } from '../components/SpeakButton'
import { SENTENCE_PATTERNS } from '../data/beginnerContent'

export const Route = createFileRoute('/vocabulary')({
  component: VocabularyPage,
  head: () => ({
    meta: [{ title: 'Vocabulary — 한글 배우기' }],
  }),
})

const ACCENT_COLORS: Record<string, { text: string; border: string; bg: string; badge: string; num: string }> = {
  violet:  { text: '#c4b5fd', border: 'rgba(139,92,246,0.3)',  bg: 'rgba(109,40,217,0.12)',  badge: 'rgba(109,40,217,0.18)', num: '#7c3aed' },
  emerald: { text: '#6ee7b7', border: 'rgba(16,185,129,0.3)',  bg: 'rgba(5,150,105,0.12)',   badge: 'rgba(5,150,105,0.18)',  num: '#059669' },
  amber:   { text: '#fcd34d', border: 'rgba(245,158,11,0.3)',  bg: 'rgba(180,83,9,0.12)',    badge: 'rgba(180,83,9,0.18)',   num: '#b45309' },
  rose:    { text: '#fda4af', border: 'rgba(244,63,94,0.3)',   bg: 'rgba(190,18,60,0.12)',   badge: 'rgba(190,18,60,0.18)',  num: '#be123c' },
  orange:  { text: '#fdba74', border: 'rgba(249,115,22,0.3)',  bg: 'rgba(194,65,12,0.12)',   badge: 'rgba(194,65,12,0.18)',  num: '#c2410c' },
  teal:    { text: '#5eead4', border: 'rgba(20,184,166,0.3)',  bg: 'rgba(15,118,110,0.12)',  badge: 'rgba(15,118,110,0.18)', num: '#0f766e' },
  blue:    { text: '#93c5fd', border: 'rgba(59,130,246,0.3)',  bg: 'rgba(37,99,235,0.1)',    badge: 'rgba(37,99,235,0.15)',  num: '#1d4ed8' },
  pink:    { text: '#f9a8d4', border: 'rgba(236,72,153,0.3)',  bg: 'rgba(190,24,93,0.1)',    badge: 'rgba(190,24,93,0.15)',  num: '#be185d' },
  indigo:  { text: '#a5b4fc', border: 'rgba(99,102,241,0.3)',  bg: 'rgba(67,56,202,0.1)',    badge: 'rgba(67,56,202,0.15)',  num: '#4338ca' },
  red:     { text: '#fca5a5', border: 'rgba(239,68,68,0.3)',   bg: 'rgba(185,28,28,0.1)',    badge: 'rgba(185,28,28,0.15)',  num: '#dc2626' },
  sky:     { text: '#7dd3fc', border: 'rgba(14,165,233,0.3)',  bg: 'rgba(2,132,199,0.1)',    badge: 'rgba(2,132,199,0.15)',  num: '#0284c7' },
  purple:  { text: '#d8b4fe', border: 'rgba(168,85,247,0.3)',  bg: 'rgba(126,34,206,0.1)',   badge: 'rgba(126,34,206,0.15)', num: '#7e22ce' },
  // extended palette for advanced / K-drama categories
  lime:    { text: '#a3e635', border: 'rgba(163,230,53,0.30)', bg: 'rgba(77,124,15,0.12)',   badge: 'rgba(77,124,15,0.22)',   num: '#4d7c0f' },
  cyan:    { text: '#22d3ee', border: 'rgba(34,211,238,0.30)', bg: 'rgba(8,145,178,0.10)',   badge: 'rgba(8,145,178,0.18)',   num: '#0891b2' },
  coral:   { text: '#ff7966', border: 'rgba(255,100,80,0.35)', bg: 'rgba(220,60,40,0.10)',   badge: 'rgba(220,60,40,0.20)',   num: '#b83220' },
  fuchsia: { text: '#e879f9', border: 'rgba(232,121,249,0.30)',bg: 'rgba(134,25,143,0.10)',  badge: 'rgba(134,25,143,0.18)',  num: '#86197f' },
}

function PhraseRow({ entry, accent }: { entry: VocabEntry; accent: string }) {
  const c = ACCENT_COLORS[accent]
  return (
    <tr
      style={{ borderBottom: '1px solid var(--c-border-sub)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--c-row-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '')}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl korean-text font-bold" style={{ color: 'var(--c-1)' }}>{entry.korean}</span>
          <SpeakButton text={entry.korean} size="sm" />
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-semibold" style={{ color: c.text }}>{entry.romanized}</td>
      <td className="px-4 py-3 text-sm" style={{ color: 'var(--c-3)' }}>{entry.meaning}</td>
    </tr>
  )
}

function VocabularyPage() {
  const enabled = useBooleanFlagValue(FLAGS.VOCABULARY, false)
  const sentencePatterns = useBooleanFlagValue(FLAGS.SENTENCE_PATTERNS, false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  const visible = activeCategory
    ? VOCAB_CATEGORIES.filter((c) => c.id === activeCategory)
    : VOCAB_CATEGORIES

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Vocabulary</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>어휘 Eo-hwi — Tourist phrases, K-drama expressions, emotions, and more — with audio</p>
      </div>

      {sentencePatterns && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>Beginner sentence patterns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SENTENCE_PATTERNS.map((pattern) => (
              <div key={pattern.id} className="glass-card rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl korean-text font-black" style={{ color: 'var(--c-1)' }}>{pattern.pattern}</span>
                  <SpeakButton text={pattern.pattern} size="sm" />
                </div>
                <p className="text-sm font-mono font-bold" style={{ color: 'var(--c-accent-text)' }}>{pattern.romanized}</p>
                <p className="text-sm" style={{ color: 'var(--c-2)' }}>{pattern.meaning}</p>
                <div className="pt-2" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
                  <p className="text-xs korean-text font-semibold" style={{ color: 'var(--c-1)' }}>{pattern.example}</p>
                  <p className="text-xs font-mono mt-1" style={{ color: 'var(--c-3)' }}>{pattern.exampleRomanized}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--c-4)' }}>{pattern.exampleMeaning}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
          style={activeCategory === null
            ? { background: 'var(--c-accent)', color: '#fff' }
            : { background: 'var(--c-surface)', color: 'var(--c-3)', border: '1px solid var(--c-border-card)' }
          }
        >
          All
        </button>
        {VOCAB_CATEGORIES.map((cat) => {
          const c = ACCENT_COLORS[cat.accent]
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
              style={isActive
                ? { background: c.badge, color: c.num, border: `1px solid ${c.border}` }
                : { background: 'var(--c-surface)', color: 'var(--c-3)', border: '1px solid var(--c-border-card)' }
              }
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-1)' }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-3)' }}
            >
              {cat.label}
              <span className="ml-1.5 korean-text text-xs opacity-70">{cat.korean}</span>
            </button>
          )
        })}
      </div>

      {/* Tables */}
      <div className="space-y-8">
        {visible.map((cat) => {
          const c = ACCENT_COLORS[cat.accent]
          return (
            <section key={cat.id}>
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-full text-xs font-black"
                  style={{ background: c.badge, color: c.num, border: `1px solid ${c.border}` }}>
                  {cat.entries.length}
                </span>
                <span style={{ color: 'var(--c-1)' }}>{cat.label}</span>
                <span className="korean-text font-normal text-xs" style={{ color: 'var(--c-3)' }}>{cat.korean}</span>
              </h2>
              <div className="glass-card rounded-2xl overflow-hidden" style={{ borderColor: c.border }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--c-border-sub)', background: 'var(--c-surface)' }}>
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-zinc-600 uppercase tracking-wide">Korean</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-zinc-600 uppercase tracking-wide">Romanization</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-zinc-600 uppercase tracking-wide hidden sm:table-cell">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.entries.map((e) => (
                      <PhraseRow key={e.id} entry={e} accent={cat.accent} />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
