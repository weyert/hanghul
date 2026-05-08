import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import {
  CHOSEONG, CHOSEONG_ROMAN,
  JUNGSEONG, JUNGSEONG_ROMAN,
  JONGSEONG, JONGSEONG_ROMAN,
  JONGSEONG_SIMPLE, JONGSEONG_CLUSTER,
  composeSyllable,
} from '../utils/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { PageArtwork } from '../components/PageArtwork'
import { useLanguage } from '../contexts/LanguageContext'
import { getPronunciationHints, type PronunciationHints } from '../data/pronunciationHints'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/builder')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/builder', params: { locale: 'en' }, statusCode: 301 })
  },
  component: BuilderPage,
  head: () => createSeoHead({
    title: 'Hangul Syllable Builder',
    description: 'Build Korean syllable blocks from initial consonants, vowels, and final consonants, then hear the result aloud as part of learning Korean.',
    path: '/builder',
    keywords: [
      'learn Korean',
      'learning Korean',
      'how to learn Korean language',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
})

function PickButton({
  selected, onClick, char, label, accent, title,
}: {
  selected: boolean; onClick: () => void; char: string; label: string
  title?: string
  accent: 'initial' | 'vowel' | 'final'
}) {
  const vars = {
    initial: { activeBg: 'var(--c-accent-muted)', activeBorder: 'var(--c-accent-border)', labelColor: 'var(--c-initial-text)' },
    vowel:   { activeBg: 'rgba(74,158,138,0.15)',  activeBorder: 'rgba(74,158,138,0.35)',  labelColor: 'var(--c-vowel-text)' },
    final:   { activeBg: 'rgba(196,154,60,0.15)',  activeBorder: 'rgba(196,154,60,0.35)',  labelColor: 'var(--c-final-text)' },
  }[accent]

  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title ?? `${char} ${label}`}
      className="rounded-lg py-2 flex flex-col items-center gap-0.5 transition-all cursor-pointer"
      style={selected
        ? { background: vars.activeBg, border: `1px solid ${vars.activeBorder}` }
        : { background: 'var(--c-surface)', border: '1px solid var(--c-border-card)' }
      }
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.borderColor = vars.activeBorder
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.borderColor = 'var(--c-border-card)'
      }}
    >
      <span className="text-xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{char}</span>
      <span className="text-xs font-semibold" style={{ color: selected ? vars.labelColor : 'var(--c-4)' }}>{label}</span>
    </button>
  )
}

function SectionHeader({ dot, title, flush = false }: { dot: 'initial' | 'vowel' | 'final'; title: string; flush?: boolean }) {
  const dotColor = { initial: 'var(--c-initial)', vowel: 'var(--c-vowel)', final: 'var(--c-final)' }[dot]
  return (
    <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${flush ? '' : 'mb-2.5'}`} style={{ color: 'var(--c-3)' }}>
      <span className="w-2 h-2 rounded-full inline-block" style={{ background: dotColor }} />
      {title}
    </h2>
  )
}

function getVowelLabel(index: number, pronunciationFriendly: boolean, hints: PronunciationHints) {
  const official = JUNGSEONG_ROMAN[index]
  const sound = hints.vowelLabels[index]
  if (!pronunciationFriendly || official === sound) return official
  return `${official} (${sound})`
}

function getVowelTitle(index: number, hints: PronunciationHints, language: 'en' | 'nl') {
  const labels = language === 'nl'
    ? { official: 'officiële RR', hint: 'uitspraakhulp' }
    : { official: 'official RR', hint: 'pronunciation hint' }
  return `${JUNGSEONG[index]} - ${labels.official}: ${JUNGSEONG_ROMAN[index]}; ${labels.hint}: ${hints.vowelTips[index]}`
}

function getPronunciationFriendlyRomanization(initialIdx: number, vowelIdx: number, finalIdx: number, hints: PronunciationHints) {
  return (CHOSEONG_ROMAN[initialIdx] || '') + hints.vowelLabels[vowelIdx] + JONGSEONG_ROMAN[finalIdx]
}

export function BuilderPage() {
  const { language } = useLanguage()
  const pronunciationHints = getPronunciationHints(language)
  const [initialIdx, setInitialIdx] = useState<number | null>(null)
  const [vowelIdx, setVowelIdx] = useState<number | null>(null)
  const [finalIdx, setFinalIdx] = useState<number>(0)
  const [showClusters, setShowClusters] = useState(false)
  const [pronunciationFriendly, setPronunciationFriendly] = useState(true)
  const copy = language === 'nl'
    ? {
        title: 'Bouwer',
        intro: '조합 Jo-hap. Kies een medeklinker en klinker om een lettergreepblok te bouwen.',
        artAlt: 'Losse begin-, klinker- en eindklankstukken die samen een Hangul-lettergreepblok vormen.',
        silent: 'stil',
        reset: 'Reset',
        pickInitial: 'Kies een beginmedeklinker',
        pickVowel: 'Kies nu een klinker',
        initial: 'Beginmedeklinker: 초성',
        vowel: 'Klinker: 중성',
        final: 'Eindmedeklinker: 종성 (optioneel)',
        hideClusters: 'Verberg clusters',
        showClusters: 'Toon clusters',
        none: 'geen',
        preview: 'Voorbeeld',
        pronunciationMode: 'Uitspraakhulp',
        officialRomanization: 'Officiële romanisering',
        soundsLike: 'Klinkt ongeveer als',
      }
    : {
        title: 'Builder',
        intro: '조합 Jo-hap. Pick a consonant and vowel to build a syllable block.',
        artAlt: 'Initial, vowel, and final consonant pieces sliding together into a Hangul syllable block.',
        silent: 'silent',
        reset: 'Reset',
        pickInitial: 'Pick an initial consonant',
        pickVowel: 'Now pick a vowel',
        initial: 'Initial Consonant: 초성',
        vowel: 'Vowel: 중성',
        final: 'Final Consonant: 종성 (optional)',
        hideClusters: 'Hide clusters',
        showClusters: 'Show clusters',
        none: 'none',
        preview: 'Preview',
        pronunciationMode: 'Pronunciation-friendly',
        officialRomanization: 'Official romanization',
        soundsLike: 'Sounds like',
      }

  const canCompose = initialIdx !== null && vowelIdx !== null
  const syllable    = canCompose ? composeSyllable(initialIdx, vowelIdx, finalIdx) : null
  const romanization = canCompose
    ? (CHOSEONG_ROMAN[initialIdx] || '') + JUNGSEONG_ROMAN[vowelIdx] + JONGSEONG_ROMAN[finalIdx]
    : null
  const pronunciationRomanization = canCompose && pronunciationFriendly
    ? getPronunciationFriendlyRomanization(initialIdx, vowelIdx, finalIdx, pronunciationHints)
    : null
  const reset = () => { setInitialIdx(null); setVowelIdx(null); setFinalIdx(0) }

  const PreviewContent = () => syllable ? (
    <>
      <div
        className="korean-serif font-black leading-none"
        style={{ fontSize: 'clamp(4rem, 12vw, 6rem)', color: 'var(--c-1)' }}
      >
        {syllable}
      </div>
      <div className="text-center">
        <div className="text-xl font-bold" style={{ color: 'var(--c-2)' }}>{romanization}</div>
        {pronunciationRomanization && pronunciationRomanization !== romanization && (
          <div className="text-sm font-semibold" style={{ color: 'var(--c-vowel-text)' }}>
            {pronunciationRomanization}
          </div>
        )}
      </div>
      <div className="w-full space-y-2.5 pt-4" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold" style={{ color: 'var(--c-4)' }}>{copy.officialRomanization}</span>
          <span className="font-bold" style={{ color: 'var(--c-2)' }}>{romanization}</span>
        </div>
        {pronunciationRomanization && pronunciationRomanization !== romanization && (
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold" style={{ color: 'var(--c-4)' }}>{copy.soundsLike}</span>
            <span className="font-bold" style={{ color: 'var(--c-vowel-text)' }}>{pronunciationRomanization}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-xs" style={{ color: 'var(--c-initial-text)' }}>초성</span>
          <span className="korean-serif font-black text-xl" style={{ color: 'var(--c-initial-text)' }}>{CHOSEONG[initialIdx!]}</span>
          <span className="text-xs" style={{ color: 'var(--c-initial)' }}>{CHOSEONG_ROMAN[initialIdx!] || copy.silent}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-xs" style={{ color: 'var(--c-vowel-text)' }}>중성</span>
          <span className="korean-serif font-black text-xl" style={{ color: 'var(--c-vowel-text)' }}>{JUNGSEONG[vowelIdx!]}</span>
          <span className="text-xs" style={{ color: 'var(--c-vowel)' }}>{getVowelLabel(vowelIdx!, pronunciationFriendly, pronunciationHints)}</span>
        </div>
        {finalIdx !== 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-xs" style={{ color: 'var(--c-final-text)' }}>종성</span>
            <span className="korean-serif font-black text-xl" style={{ color: 'var(--c-final-text)' }}>{JONGSEONG[finalIdx]}</span>
            <span className="text-xs" style={{ color: 'var(--c-final)' }}>{JONGSEONG_ROMAN[finalIdx]}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <SpeakButton text={syllable} size="lg" />
        <button onClick={reset} className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer">{copy.reset}</button>
      </div>
    </>
  ) : (
    <div className="text-center space-y-2">
      <div className="text-6xl korean-text font-black" style={{ color: 'var(--c-border-card)' }}>?</div>
      <p className="text-xs text-zinc-600">
        {initialIdx === null ? copy.pickInitial : copy.pickVowel}
      </p>
    </div>
  )

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{copy.title}</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>{copy.intro}</p>
      </div>
      <PageArtwork
        src="/artwork/syllable-tools.jpg"
        alt={copy.artAlt}
      />

      {/* Mobile preview */}
      <div className="lg:hidden glass-card rounded-2xl p-6 flex flex-col items-center justify-center gap-5 min-h-[7rem]">
        <PreviewContent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selectors */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <SectionHeader dot="initial" title={copy.initial} />
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {CHOSEONG.map((ch, i) => (
                <PickButton key={i} char={ch} label={CHOSEONG_ROMAN[i] || 'ø'} accent="initial"
                  selected={initialIdx === i} onClick={() => setInitialIdx(initialIdx === i ? null : i)}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <SectionHeader dot="vowel" title={copy.vowel} flush />
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer" style={{ color: 'var(--c-4)' }}>
                <input
                  type="checkbox"
                  checked={pronunciationFriendly}
                  onChange={(e) => setPronunciationFriendly(e.currentTarget.checked)}
                  className="h-4 w-4 accent-emerald-700 cursor-pointer"
                />
                {copy.pronunciationMode}
              </label>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {JUNGSEONG.map((ch, i) => (
                <PickButton
                  key={i}
                  char={ch}
                  label={getVowelLabel(i, pronunciationFriendly, pronunciationHints)}
                  title={getVowelTitle(i, pronunciationHints, language)}
                  accent="vowel"
                  selected={vowelIdx === i} onClick={() => setVowelIdx(vowelIdx === i ? null : i)}
                />
              ))}
            </div>
            <p className="mt-2 text-xs" style={{ color: 'var(--c-4)' }}>{pronunciationHints.builderExamples}</p>
          </section>

          <section>
            <div className="flex items-center justify-between mb-2.5">
              <SectionHeader dot="final" title={copy.final} />
              <button
                onClick={() => setShowClusters((s) => !s)}
                className="text-xs text-zinc-600 hover:text-zinc-300 underline underline-offset-2 cursor-pointer"
              >
                {showClusters ? copy.hideClusters : copy.showClusters}
              </button>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
              <PickButton char="∅" label={copy.none} accent="final" selected={finalIdx === 0} onClick={() => setFinalIdx(0)} />
              {JONGSEONG_SIMPLE.map((idx) => (
                <PickButton key={idx} char={JONGSEONG[idx]} label={JONGSEONG_ROMAN[idx]} accent="final"
                  selected={finalIdx === idx} onClick={() => setFinalIdx(finalIdx === idx ? 0 : idx)}
                />
              ))}
              {showClusters && JONGSEONG_CLUSTER.map((idx) => (
                <PickButton key={idx} char={JONGSEONG[idx]} label={JONGSEONG_ROMAN[idx]} accent="final"
                  selected={finalIdx === idx} onClick={() => setFinalIdx(finalIdx === idx ? 0 : idx)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Desktop preview */}
        <div className="hidden lg:flex flex-col">
          <div className="sticky top-24">
            <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">{copy.preview}</h2>
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-5 min-h-[16rem] justify-center">
              <PreviewContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
