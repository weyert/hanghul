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

export const Route = createFileRoute('/builder')({
  component: BuilderPage,
  head: () => ({
    meta: [{ title: 'Builder — 한글 배우기' }],
  }),
})

function PickButton({
  selected, onClick, char, label, accent,
}: {
  selected: boolean; onClick: () => void; char: string; label: string
  accent: 'violet' | 'emerald' | 'amber'
}) {
  const colors = {
    violet: { active: 'rgba(109,40,217,0.3)', activeBorder: 'rgba(167,139,250,0.5)', labelColor: '#c4b5fd' },
    emerald: { active: 'rgba(5,150,105,0.25)', activeBorder: 'rgba(52,211,153,0.5)', labelColor: '#6ee7b7' },
    amber: { active: 'rgba(180,100,0,0.25)', activeBorder: 'rgba(252,211,77,0.5)', labelColor: '#fcd34d' },
  }[accent]

  return (
    <button
      onClick={onClick}
      className="rounded-lg py-2 flex flex-col items-center gap-0.5 transition-all cursor-pointer"
      style={selected
        ? { background: colors.active, border: `1px solid ${colors.activeBorder}`, boxShadow: `0 0 12px ${colors.active}` }
        : { background: 'var(--c-surface)', border: '1px solid var(--c-border-card)' }
      }
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.borderColor = colors.activeBorder
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.borderColor = 'var(--c-border-card)'
      }}
    >
      <span className="text-xl korean-text font-black" style={{ color: 'var(--c-1)' }}>{char}</span>
      <span className="text-xs font-semibold" style={{ color: selected ? colors.labelColor : 'var(--c-4)' }}>{label}</span>
    </button>
  )
}

function SectionHeader({ dot, title, accent }: { dot: string; title: string; accent: 'violet' | 'emerald' | 'amber' }) {
  const dotColor = { violet: '#a78bfa', emerald: '#34d399', amber: '#fbbf24' }[accent]
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
        className="korean-text font-black leading-none"
        style={{ fontSize: 'clamp(4rem, 12vw, 6rem)', color: 'var(--c-1)', textShadow: '0 0 60px rgba(167,139,250,0.4)' }}
      >
        {syllable}
      </div>
      <div className="text-xl font-bold" style={{ color: 'var(--c-2)' }}>{romanization}</div>
      <div className="w-full space-y-2.5 pt-4" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-violet-400 font-bold text-xs">초성</span>
          <span className="korean-text font-black text-violet-300 text-xl">{CHOSEONG[initialIdx!]}</span>
          <span className="text-violet-500 text-xs">{CHOSEONG_ROMAN[initialIdx!] || 'silent'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-400 font-bold text-xs">중성</span>
          <span className="korean-text font-black text-emerald-300 text-xl">{JUNGSEONG[vowelIdx!]}</span>
          <span className="text-emerald-500 text-xs">{JUNGSEONG_ROMAN[vowelIdx!]}</span>
        </div>
        {finalIdx !== 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-amber-400 font-bold text-xs">종성</span>
            <span className="korean-text font-black text-amber-300 text-xl">{JONGSEONG[finalIdx]}</span>
            <span className="text-amber-500 text-xs">{JONGSEONG_ROMAN[finalIdx]}</span>
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

      {/* Mobile preview */}
      <div className="lg:hidden glass-card rounded-2xl p-6 flex items-center justify-center gap-6 min-h-[7rem]">
        <PreviewContent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selectors */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <SectionHeader dot="violet" title="Initial Consonant — 초성" accent="violet" />
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {CHOSEONG.map((ch, i) => (
                <PickButton key={i} char={ch} label={CHOSEONG_ROMAN[i] || 'ø'} accent="violet"
                  selected={initialIdx === i} onClick={() => setInitialIdx(initialIdx === i ? null : i)}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader dot="emerald" title="Vowel — 중성" accent="emerald" />
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {JUNGSEONG.map((ch, i) => (
                <PickButton key={i} char={ch} label={JUNGSEONG_ROMAN[i]} accent="emerald"
                  selected={vowelIdx === i} onClick={() => setVowelIdx(vowelIdx === i ? null : i)}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-2.5">
              <SectionHeader dot="amber" title="Final Consonant — 종성 (optional)" accent="amber" />
              <button
                onClick={() => setShowClusters((s) => !s)}
                className="text-xs text-zinc-600 hover:text-zinc-300 underline underline-offset-2 cursor-pointer"
              >
                {showClusters ? 'Hide clusters' : 'Show clusters'}
              </button>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
              <PickButton char="—" label="none" accent="amber" selected={finalIdx === 0} onClick={() => setFinalIdx(0)} />
              {JONGSEONG_SIMPLE.map((idx) => (
                <PickButton key={idx} char={JONGSEONG[idx]} label={JONGSEONG_ROMAN[idx]} accent="amber"
                  selected={finalIdx === idx} onClick={() => setFinalIdx(finalIdx === idx ? 0 : idx)}
                />
              ))}
              {showClusters && JONGSEONG_CLUSTER.map((idx) => (
                <PickButton key={idx} char={JONGSEONG[idx]} label={JONGSEONG_ROMAN[idx]} accent="amber"
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
