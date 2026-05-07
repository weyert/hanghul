import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { CHOSEONG, CHOSEONG_ROMAN, JUNGSEONG, JUNGSEONG_ROMAN, composeSyllable } from '../utils/hangul'
import { SpeakButton } from '../components/SpeakButton'
import { PageArtwork } from '../components/PageArtwork'
import { useLanguage } from '../contexts/LanguageContext'
import { createSeoHead } from '../seo'
import { localePath } from '../utils/localizedRoutes'

export const Route = createFileRoute('/syllable-chart')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/syllable-chart', params: { locale: 'en' }, statusCode: 301 })
  },
  component: SyllableChartPage,
  head: () => createSeoHead({
    title: 'Hangul Syllable Chart',
    description: 'Explore Korean syllable combinations in a chart of initial consonants and vowels, with audio for each block while learning Korean.',
    path: '/syllable-chart',
    keywords: [
      'learning Korean',
      'Korean language learning',
      'learn Korean online',
      'how to learn Korean',
    ],
  }),
})

export function SyllableChartPage() {
  const enabled = useBooleanFlagValue(FLAGS.SYLLABLE_CHART, false)
  const { language } = useLanguage()
  const [highlighted, setHighlighted] = useState<{ row: number; col: number } | null>(null)
  const copy = language === 'nl'
    ? {
        disabled: 'Deze functie is niet ingeschakeld.',
        title: 'Lettergreeptabel',
        intro: '음절표. Elke combinatie van beginmedeklinker en klinker. Klik op een cel om die te horen.',
        artAlt: 'Een raster met Hangul-combinaties van medeklinkers en klinkers, opgezet als lettergreeptabel.',
        noteStart: 'Beweeg over een cel om de rij (초성) en kolom (중성) te markeren. Elke cel toont de basislettergreep zonder eindmedeklinker. Voeg er een toe in de',
        builder: 'Bouwer',
      }
    : {
        disabled: 'This feature is not enabled.',
        title: 'Syllable Chart',
        intro: '음절표. Every initial consonant x vowel combination. Click a cell to hear it.',
        artAlt: 'A grid of Hangul consonant and vowel combinations arranged like a syllable chart.',
        noteStart: 'Hover a cell to highlight its row (초성) and column (중성). Each cell shows the basic syllable without a final consonant. Add one in the',
        builder: 'Builder',
      }

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">{copy.disabled}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{copy.title}</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>{copy.intro}</p>
      </div>
      <PageArtwork
        src="/artwork/syllable-chart.jpg"
        alt={copy.artAlt}
      />

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
                      background: highlighted?.row === ci ? 'var(--c-accent-muted)' : undefined,
                      borderRadius: 6, padding: '2px 6px',
                      transition: 'background 0.15s',
                    }}>
                      <div className="korean-serif text-sm font-black" style={{ color: highlighted?.row === ci ? 'var(--c-accent-text)' : 'var(--c-initial)' }}>{c}</div>
                      <div className="text-xs font-medium" style={{ color: highlighted?.row === ci ? 'var(--c-accent-text)' : 'var(--c-3)', fontSize: '0.6rem' }}>
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
                            ? 'rgba(200,67,43,0.18)'
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
                          style={{ color: isExact ? 'var(--c-1)' : isColHighlighted ? 'var(--c-vowel-text)' : isRowHighlighted ? 'var(--c-accent-text)' : 'var(--c-2)' }}
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
        {copy.noteStart}{' '}
        <Link to={localePath(language, '/builder')} className="underline underline-offset-2" style={{ color: 'var(--c-accent-text)' }}>{copy.builder}</Link>.
      </p>
    </div>
  )
}
