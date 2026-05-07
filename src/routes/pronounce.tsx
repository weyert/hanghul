import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { analyzeText } from '../utils/hangul'
import type { SyllableAnalysis, OtherChar } from '../utils/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { useSpeech } from '../hooks/useSpeech'
import { PageArtwork } from '../components/PageArtwork'
import { useLanguage } from '../contexts/LanguageContext'
import { createSeoHead } from '../seo'

function buildIpaTranscription(analyzed: Array<SyllableAnalysis | OtherChar>): string {
  const parts: string[] = []
  let currentSyllables: string[] = []

  for (const c of analyzed) {
    if (c.type === 'other') {
      if (c.char === ' ') {
        if (currentSyllables.length) {
          parts.push(currentSyllables.join('.'))
          currentSyllables = []
        }
        parts.push(' ')
      }
    } else {
      currentSyllables.push((c.initialIpa || '') + c.vowelIpa + (c.finalIpa || ''))
    }
  }
  if (currentSyllables.length) parts.push(currentSyllables.join('.'))
  return parts.join('').trim()
}

export const Route = createFileRoute('/pronounce')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/pronounce', params: { locale: 'en' }, statusCode: 301 })
  },
  component: PronouncePage,
  head: () => createSeoHead({
    title: 'Korean Pronunciation Tool',
    description: 'Break Korean words into syllables, initials, vowels, finals, romanization, and IPA pronunciation hints while learning Korean online.',
    path: '/pronounce',
    keywords: [
      'learning Korean',
      'how to learn Korean language',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
})

const EXAMPLES = [
  { label: '안녕하세요', text: '안녕하세요', meaning: { en: 'Hello', nl: 'Hallo' } },
  { label: '감사합니다', text: '감사합니다', meaning: { en: 'Thank you', nl: 'Dank je wel' } },
  { label: '한국어', text: '한국어', meaning: { en: 'Korean', nl: 'Koreaans' } },
  { label: '사랑해요', text: '사랑해요', meaning: { en: 'I love you', nl: 'Ik hou van je' } },
  { label: '학교', text: '학교', meaning: { en: 'School', nl: 'School' } },
  { label: '서울', text: '서울', meaning: { en: 'Seoul', nl: 'Seoel' } },
]

function SyllableCard({ item }: { item: SyllableAnalysis | OtherChar }) {
  if (item.type === 'other') {
    if (item.char === ' ') return <div className="w-4" />
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-20 h-24 flex items-center justify-center rounded-xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-sub)' }}>
          <span className="text-3xl text-zinc-600">{item.char}</span>
        </div>
        <span className="text-xs text-zinc-600">∅</span>
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
            <span className="text-xs font-bold w-3" style={{ color: 'var(--c-initial-text)' }}>초</span>
            <span className="text-base korean-serif font-bold" style={{ color: 'var(--c-initial-text)' }}>{item.initial || '∅'}</span>
            <span className="text-xs ml-auto" style={{ color: 'var(--c-initial)' }}>{item.initialRoman || ''}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
            <span className="text-xs font-bold w-3" style={{ color: 'var(--c-vowel-text)' }}>중</span>
            <span className="text-base korean-serif font-bold" style={{ color: 'var(--c-vowel-text)' }}>{item.vowel}</span>
            <span className="text-xs ml-auto" style={{ color: 'var(--c-vowel)' }}>{item.vowelRoman}</span>
          </div>
          {item.finalIdx !== 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <span className="text-xs font-bold w-3" style={{ color: 'var(--c-final-text)' }}>종</span>
              <span className="text-base korean-serif font-bold" style={{ color: 'var(--c-final-text)' }}>{item.final}</span>
              <span className="text-xs ml-auto" style={{ color: 'var(--c-final)' }}>{item.finalRoman}</span>
            </div>
          )}
        </div>
      </div>
      <span className="text-xs font-bold" style={{ color: 'var(--c-2)' }}>{item.romanization}</span>
    </div>
  )
}

export function PronouncePage() {
  const { language } = useLanguage()
  const [input, setInput] = useState('')
  const [analyzed, setAnalyzed] = useState<Array<SyllableAnalysis | OtherChar>>([])
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { speak } = useSpeech()
  const ipaEnabled = useBooleanFlagValue(FLAGS.IPA_DISPLAY, false)
  const copy = language === 'nl'
    ? {
        title: 'Uitspreken',
        intro: '발음 Bal-eum. Voer Koreaanse tekst in en splits die per lettergreep.',
        artAlt: 'Hangul-tegels met een abstracte uitspraakgolf en fonetische studiemarkeringen.',
        placeholder: 'Typ hier Koreaans... bijvoorbeeld 안녕하세요',
        clear: 'Wissen',
        breakdown: 'Lettergrepen',
        initial: 'begin',
        vowel: 'klinker',
        final: 'eind',
        romanization: 'Romanisering',
        copied: 'Gekopieerd',
        copy: 'Kopieer',
        ipa: 'IPA-transcriptie',
        phonemic: 'fonemisch',
        ipaNote: 'Canonieke waarden. Uitspraak verandert wanneer klanken elkaar over lettergreepgrenzen heen raken.',
        empty: 'Typ hierboven Koreaans of kies een voorbeeldwoord.',
      }
    : {
        title: 'Pronounce',
        intro: '발음 Bal-eum. Enter Korean text and split it by syllable.',
        artAlt: 'Hangul tiles with abstract pronunciation waveform and phonetic study marks.',
        placeholder: 'Type Korean here... e.g. 안녕하세요',
        clear: 'Clear',
        breakdown: 'Syllable Breakdown',
        initial: 'initial',
        vowel: 'vowel',
        final: 'final',
        romanization: 'Romanization',
        copied: 'Copied!',
        copy: 'Copy',
        ipa: 'IPA Transcription',
        phonemic: 'phonemic',
        ipaNote: 'Canonical values. Pronunciation changes when sounds meet across syllable boundaries.',
        empty: 'Type Korean above or pick an example word',
      }

  const handleAnalyze = (text: string) => {
    const trimmed = text.trim()
    setAnalyzed(trimmed ? analyzeText(trimmed) : [])
  }

  const romanization = analyzed
    .map((c) => c.romanization).join('').replace(/\s+/g, ' ').trim()

  const ipaTranscription = ipaEnabled ? buildIpaTranscription(analyzed) : ''

  const handleCopy = async () => {
    if (!romanization) return

    const resetCopied = () => setTimeout(() => setCopied(false), 2000)

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(romanization)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = romanization
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)

        const selection = document.getSelection()
        const originalRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

        textarea.select()
        textarea.setSelectionRange(0, textarea.value.length)

        const success = document.execCommand('copy')

        if (originalRange) {
          selection?.removeAllRanges()
          selection?.addRange(originalRange)
        }

        document.body.removeChild(textarea)

        if (!success) throw new Error('Copy command failed')
      }

      setCopied(true)
      resetCopied()
    } catch (error) {
      console.error('Failed to copy text', error)
      setCopied(false)
    }
  }

  const hasSyllables = analyzed.some((c) => c.type === 'syllable')

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{copy.title}</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>{copy.intro}</p>
      </div>
      <PageArtwork
        src="/artwork/ipa-guide.jpg"
        alt={copy.artAlt}
      />

      {/* Input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); handleAnalyze(e.target.value) }}
            placeholder={copy.placeholder}
            className="flex-1 input-field rounded-xl px-4 py-3 text-lg korean-text"
          />
          {input && (
            <button
              onClick={() => { setInput(''); setAnalyzed([]); inputRef.current?.focus() }}
              className="px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
              style={{ background: 'var(--c-input)', border: '1px solid var(--c-border)' }}
              title={copy.clear}
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
              <span className="text-zinc-600 text-xs ml-1.5">{ex.meaning[language]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {hasSyllables && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{copy.breakdown}</h2>
              <SpeakButton text={input.trim()} size="md" />
            </div>
            <div className="flex flex-wrap gap-3 items-start">
              {analyzed.map((item, i) => <SyllableCard key={i} item={item} />)}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 text-xs pt-4" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--c-3)' }}><span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--c-initial)' }} />초성 {copy.initial}</span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--c-3)' }}><span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--c-vowel)' }} />중성 {copy.vowel}</span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--c-3)' }}><span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--c-final)' }} />종성 {copy.final}</span>
          </div>

          {/* Romanization */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{copy.romanization}</span>
              <div className="flex items-center gap-2">
                <SpeakButton text={input.trim()} size="sm" />
                <button
                  onClick={handleCopy}
                  className="text-xs transition-colors px-2 py-1 rounded-md cursor-pointer"
                  style={{ color: copied ? 'var(--c-accent-text)' : 'var(--c-3)', background: copied ? 'var(--c-accent-muted)' : undefined }}
                >
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>
            </div>
            <p className="text-xl font-bold tracking-wide" style={{ color: 'var(--c-1)' }}>{romanization}</p>
          </div>

          {/* IPA Transcription */}
          {ipaEnabled && ipaTranscription && (
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{copy.ipa}</span>
                <span className="text-xs" style={{ color: 'var(--c-4)' }}>{copy.phonemic}</span>
              </div>
              <p className="text-xl font-mono tracking-wide" style={{ color: 'var(--c-1)' }}>/{ipaTranscription}/</p>
              <p className="text-xs mt-2" style={{ color: 'var(--c-4)' }}>
                {copy.ipaNote}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!hasSyllables && !input && (
        <div className="text-center py-20">
          <div className="text-7xl korean-text font-black mb-4" style={{ color: 'var(--c-ambient)', textShadow: '0 0 40px rgba(139,92,246,0.15)' }}>한글</div>
          <p className="text-sm text-zinc-600">{copy.empty}</p>
        </div>
      )}
    </div>
  )
}
