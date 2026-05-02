import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { consonants } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { useLanguage } from '../contexts/LanguageContext'
import { SpeakButton } from '../components/SpeakButton'

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="7" x2="12" y2="7" />
      <polyline points="8,3 12,7 8,11" />
    </svg>
  )
}

export const Route = createFileRoute('/consonants')({
  component: ConsonantsPage,
  head: () => ({
    meta: [{ title: 'Consonants — 한글 배우기' }],
  }),
})

function CharacterCard({ char, ipaEnabled }: { char: HangulCharacter; ipaEnabled: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const { language } = useLanguage()
  const toggle = () => setFlipped((f) => !f)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
  }

  return (
    <div
      className="flip-card"
      style={{ height: '10rem' }}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${char.char} — click to reveal`}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div
          className="flip-card-front flex flex-col items-center justify-center p-2 relative"
          style={{
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border-card)',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--c-border-focus)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--c-border-card)')}
        >
          <div className="text-5xl font-black korean-serif leading-none" style={{ color: 'var(--c-1)' }}>
            {char.char}
          </div>
          <div className="text-xs mt-2" style={{ color: 'var(--c-4)' }}>tap to flip</div>
          <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={char.char} />
          </div>
        </div>
        {/* Back */}
        <div
          className="flip-card-back flex flex-col items-center justify-center gap-0.5 p-2 relative"
          style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-accent-border)' }}
        >
          <div className="text-2xl font-black korean-serif" style={{ color: 'var(--c-1)' }}>{char.char}</div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm font-bold" style={{ color: 'var(--c-accent-text)' }}>{char.romanization}</span>
            {ipaEnabled && (
              <span className="text-xs font-mono" style={{ color: 'var(--c-3)' }}>/{char.ipa}/</span>
            )}
          </div>
          <div className="text-xs text-zinc-400 text-center font-medium">{char.name}</div>
          <div className="text-xs text-zinc-400 text-center leading-snug mt-0.5 px-1 line-clamp-2">
            {char.descriptions[language]}
          </div>
          {char.examples[0] && (
            <div className="mt-0.5 text-xs text-center flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <span className="korean-text font-semibold text-zinc-200">{char.examples[0].korean}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-500">{char.examples[0].meaning}</span>
              <SpeakButton text={char.examples[0].korean} size="sm" className="text-zinc-500 hover:text-[var(--c-accent-text)]" />
            </div>
          )}
          <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={char.char} />
          </div>
        </div>
      </div>
    </div>
  )
}

const DIFFICULTY_STYLES = {
  beginner: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#6ee7b7', label: 'Beginner' },
  advanced: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fcd34d', label: 'Advanced' },
}

function SectionLabel({ count, label, difficulty }: { count: number; label: string; color?: string; difficulty?: keyof typeof DIFFICULTY_STYLES }) {
  const d = difficulty ? DIFFICULTY_STYLES[difficulty] : null
  return (
    <h2 className="text-sm font-bold mb-4 flex items-center gap-2.5" style={{ color: 'var(--c-2)' }}>
      <span className="px-2 py-0.5 rounded-full text-xs font-black tag-badge">{count}</span>
      {label}
      {d && (
        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: d.bg, border: `1px solid ${d.border}`, color: d.text }}>
          {d.label}
        </span>
      )}
    </h2>
  )
}

function ConsonantsPage() {
  const { language } = useLanguage()
  const ipaEnabled     = useBooleanFlagValue(FLAGS.IPA_DISPLAY, false)
  const culturalEnabled = useBooleanFlagValue(FLAGS.CULTURAL_CONTEXT, false)
  const basic = consonants.filter((c) => c.category === 'basic-consonant')
  const tense = consonants.filter((c) => c.category === 'tense-consonant')

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Consonants</h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>자음 Ja-eum — Tap a card to reveal details. Speaker plays the letter; the example word has its own speaker on the back.</p>
        </div>
        {culturalEnabled && (
          <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-accent-text)' }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--c-2)' }}>Did you know?</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>
                Each consonant shape was designed to mirror the position of the tongue and lips when producing the sound — ㅁ traces closed lips, ㄴ shows the tongue tip touching the palate, ㄱ depicts the back of the tongue raised toward the throat. King Sejong's 1443 commission made Hangul one of the most scientifically designed writing systems ever created.
              </p>
            </div>
          </div>
        )}
      </div>

      <section>
        <SectionLabel count={14} label="Basic Consonants" difficulty="beginner" />
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2.5">
          {basic.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} />)}
        </div>
      </section>

      <section>
        <SectionLabel count={5} label="Tense Consonants — 쌍자음" difficulty="advanced" />
        <p className="text-sm mb-4" style={{ color: 'var(--c-3)' }}>
          Doubled consonants with a tense, unaspirated quality — like holding tension just before the sound.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {tense.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} />)}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-2)' }}>Full Reference</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
                  <th className="text-left px-5 py-3 text-xs font-bold text-zinc-600 uppercase tracking-wide">Char</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-zinc-600 uppercase tracking-wide">Roman.</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-zinc-600 uppercase tracking-wide hidden sm:table-cell">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-zinc-600 uppercase tracking-wide hidden md:table-cell">Sound</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-zinc-600 uppercase tracking-wide hidden lg:table-cell">Example</th>
                </tr>
              </thead>
              <tbody>
                {consonants.map((char) => (
                  <tr key={char.id} className="transition-colors" style={{ borderBottom: '1px solid var(--c-border-sub)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--c-row-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl korean-text font-bold" style={{ color: 'var(--c-1)' }}>{char.char}</span>
                        <SpeakButton text={char.char} />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-bold" style={{ color: 'var(--c-accent-text)' }}>{char.romanization}</div>
                      {ipaEnabled && (
                        <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--c-3)' }}>/{char.ipa}/</div>
                      )}
                    </td>
                    <td className="px-5 py-3 text-zinc-400 hidden sm:table-cell">{char.name}</td>
                    <td className="px-5 py-3 text-zinc-500 hidden md:table-cell max-w-xs">{char.descriptions[language]}</td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      {char.examples[0] && (
                        <span className="flex items-center gap-1.5">
                          <span className="korean-text font-semibold text-zinc-200">{char.examples[0].korean}</span>
                          <span className="text-zinc-600">({char.examples[0].meaning})</span>
                          <SpeakButton text={char.examples[0].korean} className="text-zinc-600 hover:text-[var(--c-accent-text)]" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Next Step ─────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Ready for vowels?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            You've seen all 19 consonants. Learn the 21 vowels to start building syllable blocks.
          </p>
        </div>
        <Link
          to="/vowels"
          className="btn-primary whitespace-nowrap inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer"
        >
          Learn Vowels <ArrowRight />
        </Link>
      </div>
    </div>
  )
}
