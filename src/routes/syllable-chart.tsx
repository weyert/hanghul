import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { CHOSEONG, CHOSEONG_ROMAN, JUNGSEONG, JUNGSEONG_ROMAN, composeSyllable } from '../utils/hangul'
import { SpeakButton } from '../components/SpeakButton'

export const Route = createFileRoute('/syllable-chart')({
  component: SyllableChartPage,
  head: () => ({
    meta: [{ title: 'Syllable Chart — 한글 배우기' }],
  }),
})

function SyllableChartPage() {
  const enabled = useBooleanFlagValue(FLAGS.SYLLABLE_CHART, false)
  const [highlighted, setHighlighted] = useState<{ row: number; col: number } | null>(null)

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Syllable Chart</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>음절표 — Every initial consonant × vowel combination. Click a cell to hear it.</p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <div className="inline-block min-w-full">
          <table className="border-collapse text-center text-sm">
            <thead>
              <tr>
                <th className="w-14 h-10" />
                {JUNGSEONG.map((v, vi) => (
                  <th key={vi} className="w-11 h-10" style={{ transition: 'background 0.15s' }}>
                    <div style={{ background: highlighted?.col === vi ? 'rgba(52,211,153,0.12)' : undefined, borderRadius: 6, padding: '2px 4px' }}>
                      <div className="korean-text text-sm font-black" style={{ color: highlighted?.col === vi ? '#6ee7b7' : '#34d399' }}>{v}</div>
                      <div className="text-xs font-medium" style={{ color: highlighted?.col === vi ? '#6ee7b7' : '#065f46', fontSize: '0.6rem' }}>{JUNGSEONG_ROMAN[vi]}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHOSEONG.map((c, ci) => (
                <tr key={ci}>
                  <td className="h-11 px-2">
                    <div style={{
                      background: highlighted?.row === ci ? 'rgba(167,139,250,0.12)' : undefined,
                      borderRadius: 6, padding: '2px 6px',
                      transition: 'background 0.15s',
                    }}>
                      <div className="korean-text text-sm font-black" style={{ color: highlighted?.row === ci ? '#c4b5fd' : '#7c3aed' }}>{c}</div>
                      <div className="text-xs font-medium" style={{ color: highlighted?.row === ci ? '#c4b5fd' : '#4c1d95', fontSize: '0.6rem' }}>
                        {CHOSEONG_ROMAN[ci] || 'ø'}
                      </div>
                    </div>
                  </td>
                  {JUNGSEONG.map((_, vi) => {
                    const syllable = composeSyllable(ci, vi, 0)
                    const isRowHighlighted = highlighted?.row === ci
                    const isColHighlighted = highlighted?.col === vi
                    const isExact = isRowHighlighted && isColHighlighted
                    const isCross = isRowHighlighted || isColHighlighted

                    return (
                      <td
                        key={vi}
                        className="h-11 w-11 relative cursor-pointer group"
                        style={{
                          border: '1px solid var(--c-border-sub)',
                          background: isExact
                            ? 'rgba(139,92,246,0.25)'
                            : isCross
                            ? 'var(--c-row-hover)'
                            : undefined,
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={() => setHighlighted({ row: ci, col: vi })}
                        onMouseLeave={() => setHighlighted(null)}
                      >
                        <span
                          className="korean-text font-black text-base"
                          style={{ color: isExact ? '#e9d5ff' : isColHighlighted ? '#6ee7b7' : isRowHighlighted ? '#c4b5fd' : 'var(--c-2)' }}
                        >
                          {syllable}
                        </span>
                        <div className="absolute inset-0 flex items-end justify-end p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <SpeakButton text={syllable} size="sm" />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-zinc-600">
        Hover a cell to highlight its row (초성) and column (중성). Each cell shows the basic syllable without a final consonant — add one in the{' '}
        <Link to="/builder" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Builder</Link>.
      </p>
    </div>
  )
}
