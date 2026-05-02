import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { vowels } from '../data/hangul'
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

export const Route = createFileRoute('/vowels')({
  component: VowelsPage,
  head: () => ({
    meta: [{ title: 'Vowels — 한글 배우기' }],
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
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--c-accent-border)')}
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
          style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-vowel)', borderColor: 'rgba(74,158,138,0.35)' }}
        >
          <div className="text-2xl font-black korean-serif" style={{ color: 'var(--c-1)' }}>{char.char}</div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm font-bold" style={{ color: 'var(--c-vowel-text)' }}>{char.romanization}</span>
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
              <SpeakButton text={char.examples[0].korean} size="sm" className="text-zinc-500 hover:text-[var(--c-vowel-text)]" />
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

function VowelsPage() {
  const { language } = useLanguage()
  const ipaEnabled      = useBooleanFlagValue(FLAGS.IPA_DISPLAY, false)
  const culturalEnabled = useBooleanFlagValue(FLAGS.CULTURAL_CONTEXT, false)
  const basic = vowels.filter((v) => v.category === 'basic-vowel')
  const compound = vowels.filter((v) => v.category === 'compound-vowel')

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Vowels</h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>모음 Mo-eum — Tap a card to reveal details. Speaker plays the vowel sound; the example word has its own speaker on the back.</p>
        </div>
        {culturalEnabled && (
          <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-accent-text)' }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--c-2)' }}>Did you know?</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>
                The ten basic vowels are built from three philosophical symbols: ㆍ (sky/heaven), ㅡ (earth), and ㅣ (human standing between them). Their combinations reflect the Neo-Confucian cosmology of 15th-century Korea, where harmony between heaven, earth, and humanity was a guiding principle. You can see this logic in ㅏ (ㅣ + ㆍ to the right) and ㅓ (ㆍ to the left of ㅣ).
              </p>
            </div>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2.5" style={{ color: 'var(--c-2)' }}>
          <span className="px-2 py-0.5 rounded-full text-xs font-black"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' }}
          >10</span>
          Basic Vowels
          <span className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' }}>
            Beginner
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {basic.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} />)}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold mb-2 flex items-center gap-2.5" style={{ color: 'var(--c-2)' }}>
          <span className="px-2 py-0.5 rounded-full text-xs font-black"
            style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.3)', color: '#5eead4' }}
          >11</span>
          Compound Vowels — 이중모음
          <span className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d' }}>
            Advanced
          </span>
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--c-3)' }}>Formed by combining two basic vowels — the sound glides from one to the other.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {compound.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} />)}
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
                {vowels.map((char) => (
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
                      <div className="font-bold" style={{ color: 'var(--c-vowel-text)' }}>{char.romanization}</div>
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
                          <SpeakButton text={char.examples[0].korean} className="text-zinc-600 hover:text-[var(--c-vowel-text)]" />
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
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Ready to build syllables?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            You know the alphabet — now combine consonants and vowels into full syllable blocks.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            to="/builder"
            className="btn-primary whitespace-nowrap inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer"
          >
            Syllable Builder <ArrowRight />
          </Link>
          <Link
            to="/quiz"
            className="btn-ghost whitespace-nowrap inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer"
            style={{ color: 'var(--c-1)' }}
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
