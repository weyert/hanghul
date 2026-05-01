import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { consonants, vowels } from '../data/hangul'
import { STROKE_ORDER } from '../data/strokeOrder'
import { SpeakButton } from '../components/SpeakButton'

export const Route = createFileRoute('/stroke-order')({
  component: StrokeOrderPage,
  head: () => ({
    meta: [{ title: 'Stroke Order — 한글 배우기' }],
  }),
})

const RULES = [
  { icon: '→', text: 'Left to right — horizontal strokes always go left → right' },
  { icon: '↓', text: 'Top to bottom — vertical strokes always go top → bottom' },
  { icon: '↺', text: 'Circles — written counterclockwise, starting from the top' },
  { icon: '↙↘', text: 'Diagonals — both strokes of ㅅ/ㅈ written from the center outward' },
]

function StrokeOrderPage() {
  const enabled = useBooleanFlagValue(FLAGS.STROKE_ORDER, false)
  const [selected, setSelected] = useState<string | null>(null)
  const [step, setStep] = useState(0)

  const data = selected ? STROKE_ORDER[selected] : null

  const select = (char: string) => {
    setSelected(char)
    setStep(0)
  }

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Stroke Order</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>획순 Hoek-sun — Select any character to see how it is written stroke by stroke</p>
      </div>

      {/* Universal rules */}
      <div className="glass-card rounded-2xl p-5">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-3)' }}>Universal Rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RULES.map((r) => (
            <div key={r.icon} className="flex items-start gap-2.5">
              <span className="text-violet-400 font-black text-sm w-8 flex-shrink-0">{r.icon}</span>
              <span className="text-sm" style={{ color: 'var(--c-2)' }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Character selector grid */}
        <div className="lg:col-span-3 space-y-4">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2.5 flex items-center gap-2" style={{ color: 'var(--c-3)' }}>
              <span className="w-2 h-2 rounded-full inline-block bg-violet-400" />
              Consonants — 자음
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {consonants.map((c) => (
                <button
                  key={c.id}
                  onClick={() => select(c.char)}
                  className="w-11 h-11 rounded-lg korean-text text-lg font-black cursor-pointer transition-all"
                  style={selected === c.char
                    ? { background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(167,139,250,0.5)', color: '#e9d5ff' }
                    : { background: 'var(--c-surface)', border: '1px solid var(--c-border-card)', color: 'var(--c-1)' }
                  }
                >
                  {c.char}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2.5 flex items-center gap-2" style={{ color: 'var(--c-3)' }}>
              <span className="w-2 h-2 rounded-full inline-block bg-emerald-400" />
              Vowels — 모음
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {vowels.map((v) => (
                <button
                  key={v.id}
                  onClick={() => select(v.char)}
                  className="w-11 h-11 rounded-lg korean-text text-lg font-black cursor-pointer transition-all"
                  style={selected === v.char
                    ? { background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(52,211,153,0.5)', color: '#6ee7b7' }
                    : { background: 'var(--c-surface)', border: '1px solid var(--c-border-card)', color: 'var(--c-1)' }
                  }
                >
                  {v.char}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            {data ? (
              <div className="glass-card rounded-2xl p-5 space-y-4">
                {/* Character + meta */}
                <div className="flex items-center gap-4">
                  <div
                    className="korean-text font-black leading-none flex-shrink-0"
                    style={{ fontSize: '4.5rem', color: 'var(--c-1)', textShadow: '0 0 40px rgba(167,139,250,0.35)' }}
                  >
                    {data.char}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-black"
                        style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' }}>
                        {data.strokes} {data.strokes === 1 ? 'stroke' : 'strokes'}
                      </span>
                      <SpeakButton text={data.char} size="sm" />
                    </div>
                    {(() => {
                      const c = [...consonants, ...vowels].find((x) => x.char === data.char)
                      return c ? (
                        <div className="text-xs" style={{ color: 'var(--c-3)' }}>{c.name} · {c.romanization}</div>
                      ) : null
                    })()}
                  </div>
                </div>

                {/* Step-through */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Stroke order</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs cursor-pointer disabled:opacity-30"
                        style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
                      >‹</button>
                      <span className="text-xs font-semibold" style={{ color: 'var(--c-2)' }}>
                        {step === 0 ? 'All' : `${step}/${data.strokes}`}
                      </span>
                      <button
                        onClick={() => setStep((s) => Math.min(data.strokes, s + 1))}
                        disabled={step === data.strokes}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs cursor-pointer disabled:opacity-30"
                        style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
                      >›</button>
                    </div>
                  </div>

                  <ol className="space-y-1.5">
                    {data.steps.map((s, i) => {
                      const strokeNum = i + 1
                      const isActive = step === 0 || step === strokeNum
                      const isPast   = step > 0 && strokeNum < step
                      return (
                        <li
                          key={i}
                          onClick={() => setStep(strokeNum)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all"
                          style={{
                            background: isActive && step === strokeNum
                              ? 'rgba(139,92,246,0.15)'
                              : 'transparent',
                            border: isActive && step === strokeNum
                              ? '1px solid rgba(139,92,246,0.3)'
                              : '1px solid transparent',
                            opacity: step === 0 || isActive ? 1 : 0.3,
                          }}
                        >
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                            style={{
                              background: isPast
                                ? 'rgba(16,185,129,0.2)'
                                : isActive && step === strokeNum
                                ? 'rgba(139,92,246,0.3)'
                                : 'var(--c-surface)',
                              color: isPast ? '#6ee7b7' : '#c4b5fd',
                              border: `1px solid ${isPast ? 'rgba(52,211,153,0.3)' : 'rgba(139,92,246,0.2)'}`,
                            }}
                          >
                            {strokeNum}
                          </span>
                          <span className="text-sm" style={{ color: isActive ? 'var(--c-1)' : 'var(--c-3)' }}>{s}</span>
                        </li>
                      )
                    })}
                  </ol>
                </div>

                <p className="text-xs text-zinc-600">Click a stroke to highlight it, or use ‹ › to step through.</p>
              </div>
            ) : (
              <div
                className="rounded-2xl p-8 text-center"
                style={{ border: '1px dashed var(--c-border-card)' }}
              >
                <div className="text-5xl korean-text font-black mb-3" style={{ color: 'var(--c-border-card)' }}>획</div>
                <p className="text-sm text-zinc-600">Select a character to see its stroke order</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
