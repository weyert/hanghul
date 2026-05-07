import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState, useCallback, useMemo } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { KOREA_FACTS, CATEGORY_META, getKoreaFactText } from '../data/koreaFacts'
import type { FactCategory } from '../data/koreaFacts'
import { PageArtwork } from '../components/PageArtwork'
import { useLanguage } from '../contexts/LanguageContext'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/korea-facts')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale/korea-facts', params: { locale: 'en' }, statusCode: 301 })
  },
  component: KoreaFactsPage,
  head: () => createSeoHead({
    title: 'Korea Facts',
    description: 'Learn cultural, historical, language, food, and society facts about Korea alongside your Hangul practice and Korean language learning.',
    path: '/korea-facts',
    keywords: [
      'learning Korean',
      'Korean language learning',
      'learn Korean online',
    ],
  }),
})

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function formatEra(era: string, language: 'en' | 'nl') {
  if (language === 'en') return era

  return era
    .replaceAll('Ancient', 'Oudheid')
    .replaceAll('Three Kingdoms', 'Drie Koninkrijken')
    .replaceAll('Unified Silla', 'Verenigd Silla')
    .replaceAll('Joseon Dynasty', 'Joseon-dynastie')
    .replaceAll('Japanese Colonial Period', 'Japanse koloniale periode')
    .replaceAll('March First Movement', '1 maart-beweging')
    .replaceAll('Korean War', 'Koreaanse Oorlog')
    .replaceAll('Modern', 'Modern')
    .replaceAll('century', 'eeuw')
    .replaceAll('June', 'juni')
    .replaceAll('September', 'september')
    .replaceAll('November', 'november')
    .replaceAll('December', 'december')
    .replaceAll('May', 'mei')
    .replaceAll('c.', 'ca.')
    .replaceAll('BC', 'v.Chr.')
    .replaceAll('AD', 'n.Chr.')
}

// ─── Category pill ────────────────────────────────────────────────────

function CategoryPill({
  category, active, count, onClick, allLabel, language,
}: {
  category: FactCategory | 'all'
  active: boolean
  count: number
  onClick: () => void
  allLabel: string
  language: 'en' | 'nl'
}) {
  const meta = category === 'all' ? null : CATEGORY_META[category]
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
      style={active
        ? meta
          ? { background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }
          : { background: 'var(--c-accent)', color: '#fff' }
        : { background: 'var(--c-surface)', color: 'var(--c-3)', border: '1px solid var(--c-border-card)' }
      }
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--c-1)' }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--c-3)' }}
    >
      {category === 'all' ? allLabel : (language === 'nl' ? meta!.labelNl : meta!.label)}
      {meta && <span className="ml-1 korean-text text-xs opacity-70">{meta.korean}</span>}
      <span className="ml-1.5 text-xs opacity-60">{count}</span>
    </button>
  )
}

// ─── Fact card ────────────────────────────────────────────────────────

function FactCard({
  text, category, era, index, total, language,
}: {
  text: string
  category: FactCategory
  era?: string
  index: number
  total: number
  language: 'en' | 'nl'
}) {
  const meta = CATEGORY_META[category]
  return (
    <div
      className="glass-card rounded-2xl p-7 sm:p-9 flex flex-col gap-5"
      style={{ border: `1px solid ${meta.border}`, minHeight: '18rem' }}
    >
      {/* Meta row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }}
          >
            {language === 'nl' ? meta.labelNl : meta.label}
            <span className="ml-1 korean-text opacity-75">{meta.korean}</span>
          </span>
          {era && (
            <span className="text-xs" style={{ color: 'var(--c-4)' }}>{formatEra(era, language)}</span>
          )}
        </div>
        <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--c-4)' }}>
          {index + 1} / {total}
        </span>
      </div>

      {/* Fact text */}
      <p
        className="flex-1 text-base sm:text-lg leading-relaxed font-medium"
        style={{ color: 'var(--c-1)' }}
      >
        {text}
      </p>

      {/* Progress dots (max 10 visible) */}
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {Array.from({ length: Math.min(total, 15) }).map((_, i) => {
          const mapped = Math.round((i / 14) * (total - 1))
          const isActive = mapped === index
          return (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 20 : 6,
                height: 6,
                background: isActive ? meta.color : 'var(--c-border-card)',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

export function KoreaFactsPage() {
  const enabled = useBooleanFlagValue(FLAGS.KOREA_FACTS, false)
  const { language } = useLanguage()

  const [activeCategory, setActiveCategory] = useState<FactCategory | 'all'>('all')
  const [indices, setIndices]               = useState<number[]>(() => shuffle(KOREA_FACTS.map((_, i) => i)))
  const [cursor, setCursor]                 = useState(0)

  const filtered = useMemo(() => {
    const base = activeCategory === 'all'
      ? KOREA_FACTS
      : KOREA_FACTS.filter(f => f.category === activeCategory)
    return base
  }, [activeCategory])

  // Shuffled order for the filtered set
  const [shuffledFiltered, setShuffledFiltered] = useState(() => shuffle(KOREA_FACTS.map((_, i) => i)))
  const copy = language === 'nl'
    ? {
        disabled: 'Deze functie is niet ingeschakeld.',
        title: 'Feiten over Korea',
        intro: (count: number) => `한국 이야기. ${count} feiten over geschiedenis, cultuur, eten, technologie en dagelijks leven.`,
        shuffle: 'Schud',
        shuffleTitle: 'Volgorde schudden',
        artAlt: 'Een redactionele collage van Koreaanse culturele, historische en moderne studieobjecten.',
        all: 'Alles',
        previous: 'Vorige',
        of: 'van',
        next: 'Volgend feit',
      }
    : {
        disabled: 'This feature is not enabled.',
        title: 'Korea Facts',
        intro: (count: number) => `한국 이야기. ${count} facts across history, culture, food, tech, and daily life.`,
        shuffle: 'Shuffle',
        shuffleTitle: 'Shuffle order',
        artAlt: 'A curated editorial collage of Korean cultural, historical, and modern study objects.',
        all: 'All',
        previous: 'Previous',
        of: 'of',
        next: 'Next fact',
      }

  const getFilteredIndices = useCallback((cat: FactCategory | 'all') => {
    const base = cat === 'all'
      ? KOREA_FACTS.map((_, i) => i)
      : KOREA_FACTS.map((f, i) => ({ f, i })).filter(({ f }) => f.category === cat).map(({ i }) => i)
    return shuffle(base)
  }, [])

  const handleCategoryChange = useCallback((cat: FactCategory | 'all') => {
    setActiveCategory(cat)
    setShuffledFiltered(getFilteredIndices(cat))
    setCursor(0)
  }, [getFilteredIndices])

  const handleShuffle = () => {
    setShuffledFiltered(getFilteredIndices(activeCategory))
    setCursor(0)
  }

  const factCount = filtered.length
  const currentIdx = shuffledFiltered[cursor % shuffledFiltered.length] ?? 0
  const fact = KOREA_FACTS[currentIdx]

  const prev = () => setCursor(c => (c - 1 + factCount) % factCount)
  const next = () => setCursor(c => (c + 1) % factCount)

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<FactCategory | 'all', number>> = { all: KOREA_FACTS.length }
    for (const f of KOREA_FACTS) {
      counts[f.category] = (counts[f.category] ?? 0) + 1
    }
    return counts
  }, [])

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">{copy.disabled}</p>
      </div>
    )
  }

  if (!fact) return null

  return (
    <div className="space-y-8 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{copy.title}</h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>
            {copy.intro(KOREA_FACTS.length)}
          </p>
        </div>
        <button
          onClick={handleShuffle}
          title={copy.shuffleTitle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer mt-1 flex-shrink-0"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-card)', color: 'var(--c-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-3)')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
          {copy.shuffle}
        </button>
      </div>
      <PageArtwork
        src="/artwork/korea-facts.jpg"
        alt={copy.artAlt}
      />

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        <CategoryPill
          category="all"
          active={activeCategory === 'all'}
          count={categoryCounts.all ?? 0}
          onClick={() => handleCategoryChange('all')}
          allLabel={copy.all}
          language={language}
        />
        {(Object.keys(CATEGORY_META) as FactCategory[]).map(cat => (
          <CategoryPill
            key={cat}
            category={cat}
            active={activeCategory === cat}
            count={categoryCounts[cat] ?? 0}
            onClick={() => handleCategoryChange(cat)}
            allLabel={copy.all}
            language={language}
          />
        ))}
      </div>

      {/* Fact card */}
      <FactCard
        key={currentIdx}
        text={getKoreaFactText(fact, language)}
        category={fact.category}
        era={fact.era}
        index={cursor % factCount}
        total={factCount}
        language={language}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={prev}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-card)', color: 'var(--c-2)' }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'var(--c-1)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border-focus)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'var(--c-2)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border-card)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="7" x2="2" y2="7" />
            <polyline points="6,3 2,7 6,11" />
          </svg>
          {copy.previous}
        </button>

        <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--c-4)' }}>
          {(cursor % factCount) + 1} {copy.of} {factCount}
        </span>

        <button
          onClick={next}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer btn-primary text-white"
        >
          {copy.next}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="7" x2="12" y2="7" />
            <polyline points="8,3 12,7 8,11" />
          </svg>
        </button>
      </div>

    </div>
  )
}
