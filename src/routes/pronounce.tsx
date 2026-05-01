import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { analyzeText } from '../utils/hangul'
import type { SyllableAnalysis, OtherChar } from '../utils/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { useSpeech } from '../hooks/useSpeech'

export const Route = createFileRoute('/pronounce')({
  component: PronouncePage,
  head: () => ({
    meta: [{ title: 'Pronounce — 한글 배우기' }],
  }),
})

const EXAMPLES = [
  { label: '안녕하세요', text: '안녕하세요', meaning: 'Hello' },
  { label: '감사합니다', text: '감사합니다', meaning: 'Thank you' },
  { label: '한국어', text: '한국어', meaning: 'Korean' },
  { label: '사랑해요', text: '사랑해요', meaning: 'I love you' },
  { label: '학교', text: '학교', meaning: 'School' },
  { label: '서울', text: '서울', meaning: 'Seoul' },
]

function SyllableCard({ item }: { item: SyllableAnalysis | OtherChar }) {
  if (item.type === 'other') {
    if (item.char === ' ') return <div className="w-4" />
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-20 h-24 flex items-center justify-center rounded-xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-sub)' }}>
          <span className="text-3xl text-zinc-600">{item.char}</span>
        </div>
        <span className="text-xs text-zinc-600">—</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-20 rounded-xl overflow-hidden" style={{ background: 'var(--c-input)', border: '1px solid var(--c-border)' }}>
        {/* Syllable character */}
        <div className="flex items-center justify-center py-3 relative">
          <span className="text-4xl font-black korean-text" style={{ color: 'var(--c-1)' }}>{item.char}</span>
          <div className="absolute bottom-1 right-1">
            <SpeakButton text={item.char} size="sm" />
          </div>
        </div>
        {/* Breakdown */}
        <div style={{ borderTop: '1px solid var(--c-border-sub)' }}>
          <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
            <span className="text-xs font-bold text-violet-400 w-3">초</span>
            <span className="text-base korean-text font-bold text-violet-300">{item.initial || '—'}</span>
            <span className="text-xs text-violet-500 ml-auto">{item.initialRoman || ''}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
            <span className="text-xs font-bold text-emerald-400 w-3">중</span>
            <span className="text-base korean-text font-bold text-emerald-300">{item.vowel}</span>
            <span className="text-xs text-emerald-500 ml-auto">{item.vowelRoman}</span>
          </div>
          {item.finalIdx !== 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <span className="text-xs font-bold text-amber-400 w-3">종</span>
              <span className="text-base korean-text font-bold text-amber-300">{item.final}</span>
              <span className="text-xs text-amber-500 ml-auto">{item.finalRoman}</span>
            </div>
          )}
        </div>
      </div>
      <span className="text-xs font-bold" style={{ color: 'var(--c-2)' }}>{item.romanization}</span>
    </div>
  )
}

function PronouncePage() {
  const [input, setInput] = useState('')
  const [analyzed, setAnalyzed] = useState<Array<SyllableAnalysis | OtherChar>>([])
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { speak } = useSpeech()

  const handleAnalyze = (text: string) => {
    const trimmed = text.trim()
    setAnalyzed(trimmed ? analyzeText(trimmed) : [])
  }

  const romanization = analyzed
    .map((c) => c.romanization).join('').replace(/\s+/g, ' ').trim()

  const handleCopy = () => {
    navigator.clipboard.writeText(romanization).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const hasSyllables = analyzed.some((c) => c.type === 'syllable')

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Pronounce</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>발음 Bal-eum — Enter Korean text to see its syllable-by-syllable breakdown</p>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); handleAnalyze(e.target.value) }}
            placeholder="Type Korean here… e.g. 안녕하세요"
            className="flex-1 input-field rounded-xl px-4 py-3 text-lg korean-text"
          />
          {input && (
            <button
              onClick={() => { setInput(''); setAnalyzed([]); inputRef.current?.focus() }}
              className="px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
              style={{ background: 'var(--c-input)', border: '1px solid var(--c-border)' }}
              title="Clear"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
              </svg>
            </button>
          )}
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.text}
              onClick={() => { setInput(ex.text); handleAnalyze(ex.text) }}
              className="px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all"
              style={{ background: 'var(--c-input)', border: '1px solid var(--c-border)', color: 'var(--c-2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c-border-focus)'; e.currentTarget.style.color = 'var(--c-1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = 'var(--c-2)' }}
            >
              <span className="korean-text font-semibold">{ex.label}</span>
              <span className="text-zinc-600 text-xs ml-1.5">{ex.meaning}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {hasSyllables && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Syllable Breakdown</h2>
              <SpeakButton text={input.trim()} size="md" />
            </div>
            <div className="flex flex-wrap gap-3 items-start">
              {analyzed.map((item, i) => <SyllableCard key={i} item={item} />)}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 text-xs pt-4" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
            <span className="flex items-center gap-1.5 text-zinc-500"><span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />초성 initial</span>
            <span className="flex items-center gap-1.5 text-zinc-500"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />중성 vowel</span>
            <span className="flex items-center gap-1.5 text-zinc-500"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />종성 final</span>
          </div>

          {/* Romanization */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Romanization</span>
              <div className="flex items-center gap-2">
                <SpeakButton text={input.trim()} size="sm" />
                <button
                  onClick={handleCopy}
                  className="text-xs text-zinc-500 hover:text-violet-400 transition-colors px-2 py-1 rounded-md cursor-pointer"
                  style={{ background: copied ? 'rgba(139,92,246,0.15)' : undefined }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <p className="text-xl font-bold tracking-wide" style={{ color: 'var(--c-1)' }}>{romanization}</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasSyllables && !input && (
        <div className="text-center py-20">
          <div className="text-7xl korean-text font-black mb-4" style={{ color: 'var(--c-ambient)', textShadow: '0 0 40px rgba(139,92,246,0.15)' }}>한글</div>
          <p className="text-sm text-zinc-600">Type Korean above or pick an example word</p>
        </div>
      )}
    </div>
  )
}
