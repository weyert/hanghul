import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { vowels } from '../data/hangul'
import type { HangulCharacter } from '../data/hangul'
import { useLanguage } from '../contexts/LanguageContext'
import { SpeakButton } from '../components/SpeakButton'

export const Route = createFileRoute('/vowels')({
  component: VowelsPage,
  head: () => ({
    meta: [{ title: 'Vowels — 한글 배우기' }],
  }),
})

function CharacterCard({ char }: { char: HangulCharacter }) {
  const [flipped, setFlipped] = useState(false)
  const { language } = useLanguage()
  const speakText = char.examples[0]?.korean ?? char.char

  return (
    <div
      className="flip-card"
      style={{ height: '10rem' }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
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
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.35)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--c-border-card)')}
        >
          <div className="text-5xl font-black korean-text leading-none" style={{ color: 'var(--c-1)', textShadow: '0 0 30px rgba(52,211,153,0.3)' }}>
            {char.char}
          </div>
          <div className="text-xs mt-2" style={{ color: 'var(--c-4)' }}>tap to flip</div>
          <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={speakText} />
          </div>
        </div>
        {/* Back */}
        <div
          className="flip-card-back flex flex-col items-center justify-center gap-0.5 p-2 relative"
          style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.3), rgba(6,182,212,0.2))', border: '1px solid rgba(52,211,153,0.3)' }}
        >
          <div className="text-2xl font-black text-white korean-text">{char.char}</div>
          <div className="text-sm font-bold text-emerald-300">{char.romanization}</div>
          <div className="text-xs text-zinc-400 text-center font-medium">{char.name}</div>
          <div className="text-xs text-zinc-400 text-center leading-snug mt-0.5 px-1 line-clamp-2">
            {char.descriptions[language]}
          </div>
          {char.examples[0] && (
            <div className="mt-0.5 text-xs text-center">
              <span className="korean-text font-semibold text-zinc-200">{char.examples[0].korean}</span>
              <span className="mx-1 text-zinc-600">·</span>
              <span className="text-zinc-500">{char.examples[0].meaning}</span>
            </div>
          )}
          <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={speakText} />
          </div>
        </div>
      </div>
    </div>
  )
}

function VowelsPage() {
  const { language } = useLanguage()
  const basic = vowels.filter((v) => v.category === 'basic-vowel')
  const compound = vowels.filter((v) => v.category === 'compound-vowel')

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Vowels</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>모음 Mo-eum — Tap a card to reveal details, tap the speaker to hear an example word</p>
      </div>

      <section>
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2.5" style={{ color: 'var(--c-2)' }}>
          <span className="px-2 py-0.5 rounded-full text-xs font-black"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' }}
          >10</span>
          Basic Vowels
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {basic.map((char) => <CharacterCard key={char.id} char={char} />)}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold mb-2 flex items-center gap-2.5" style={{ color: 'var(--c-2)' }}>
          <span className="px-2 py-0.5 rounded-full text-xs font-black"
            style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.3)', color: '#5eead4' }}
          >11</span>
          Compound Vowels — 이중모음
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--c-3)' }}>Formed by combining two basic vowels — the sound glides from one to the other.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {compound.map((char) => <CharacterCard key={char.id} char={char} />)}
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
                        <SpeakButton text={char.examples[0]?.korean ?? char.char} />
                      </div>
                    </td>
                    <td className="px-5 py-3 font-bold text-emerald-400">{char.romanization}</td>
                    <td className="px-5 py-3 text-zinc-400 hidden sm:table-cell">{char.name}</td>
                    <td className="px-5 py-3 text-zinc-500 hidden md:table-cell max-w-xs">{char.descriptions[language]}</td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      {char.examples[0] && (
                        <span>
                          <span className="korean-text font-semibold text-zinc-200">{char.examples[0].korean}</span>
                          {' '}
                          <span className="text-zinc-600">({char.examples[0].meaning})</span>
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
    </div>
  )
}
