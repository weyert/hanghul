import { createFileRoute } from '@tanstack/react-router'
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
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/builder')({
  component: BuilderPage,
  head: () => createSeoHead({
    title: 'Hangul Syllable Builder',
    description: 'Build Korean syllable blocks from initial consonants, vowels, and final consonants, then hear the result aloud.',
    path: '/builder',
  }),
})

function PickButton({
  selected, onClick, char, label, accent,
}: {
  selected: boolean; onClick: () => void; char: string; label: string
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

function SectionHeader({ dot, title }: { dot: 'initial' | 'vowel' | 'final'; title: string; accent?: string }) {
  const dotColor = { initial: 'var(--c-initial)', vowel: 'var(--c-vowel)', final: 'var(--c-final)' }[dot]
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest mb-2.5 flex items-center gap-2" style={{ color: 'var(--c-3)' }}>
      <span className="w-2 h-2 rounded-full inline-block" style={{ background: dotColor }} />
      {title}
    </h2>
  )
}

function BuilderPage() {
  const [initialIdx, setInitialIdx] = useState<number | null>(null)
  const [vowelIdx, setVowelIdx] = useState<number | null>(null)
  const [finalIdx, setFinalIdx] = useState<number>(0)
  const [showClusters, setShowClusters] = useState(false)

  const canCompose = initialIdx !== null && vowelIdx !== null
  const syllable    = canCompose ? composeSyllable(initialIdx, vowelIdx, finalIdx) : null
  const romanization = canCompose
    ? (CHOSEONG_ROMAN[initialIdx] || '') + JUNGSEONG_ROMAN[vowelIdx] + JONGSEONG_ROMAN[finalIdx]
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
      <div className="text-xl font-bold" style={{ color: 'var(--c-2)' }}>{romanization}</div>
      <div className="w-full space-y-2.5 pt-4" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-xs" style={{ color: 'var(--c-initial-text)' }}>초성</span>
          <span className="korean-serif font-black text-xl" style={{ color: 'var(--c-initial-text)' }}>{CHOSEONG[initialIdx!]}</span>
          <span className="text-xs" style={{ color: 'var(--c-initial)' }}>{CHOSEONG_ROMAN[initialIdx!] || 'silent'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-xs" style={{ color: 'var(--c-vowel-text)' }}>중성</span>
          <span className="korean-serif font-black text-xl" style={{ color: 'var(--c-vowel-text)' }}>{JUNGSEONG[vowelIdx!]}</span>
          <span className="text-xs" style={{ color: 'var(--c-vowel)' }}>{JUNGSEONG_ROMAN[vowelIdx!]}</span>
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
        <button onClick={reset} className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer">Reset</button>
      </div>
    </>
  ) : (
    <div className="text-center space-y-2">
      <div className="text-6xl korean-text font-black" style={{ color: 'var(--c-border-card)' }}>?</div>
      <p className="text-xs text-zinc-600">
        {initialIdx === null ? 'Pick an initial consonant' : 'Now pick a vowel'}
      </p>
    </div>
  )

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Builder</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>조합 Jo-hap — Pick a consonant + vowel to compose a syllable block</p>
      </div>
      <PageArtwork
        src="/artwork/syllable-tools.jpg"
        alt="Initial, vowel, and final consonant pieces sliding together into a Hangul syllable block."
      />

      {/* Mobile preview */}
      <div className="lg:hidden glass-card rounded-2xl p-6 flex items-center justify-center gap-6 min-h-[7rem]">
        <PreviewContent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selectors */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <SectionHeader dot="initial" title="Initial Consonant — 초성" />
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {CHOSEONG.map((ch, i) => (
                <PickButton key={i} char={ch} label={CHOSEONG_ROMAN[i] || 'ø'} accent="initial"
                  selected={initialIdx === i} onClick={() => setInitialIdx(initialIdx === i ? null : i)}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader dot="vowel" title="Vowel — 중성" />
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {JUNGSEONG.map((ch, i) => (
                <PickButton key={i} char={ch} label={JUNGSEONG_ROMAN[i]} accent="vowel"
                  selected={vowelIdx === i} onClick={() => setVowelIdx(vowelIdx === i ? null : i)}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-2.5">
              <SectionHeader dot="final" title="Final Consonant — 종성 (optional)" />
              <button
                onClick={() => setShowClusters((s) => !s)}
                className="text-xs text-zinc-600 hover:text-zinc-300 underline underline-offset-2 cursor-pointer"
              >
                {showClusters ? 'Hide clusters' : 'Show clusters'}
              </button>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
              <PickButton char="—" label="none" accent="final" selected={finalIdx === 0} onClick={() => setFinalIdx(0)} />
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
            <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Preview</h2>
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-5 min-h-[16rem] justify-center">
              <PreviewContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
