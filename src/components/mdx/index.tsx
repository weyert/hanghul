import { useState, type KeyboardEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { FeatureFlag, useBooleanFlagValue } from '@openfeature/react-sdk'
import { SpeakButton } from '../SpeakButton'
import { PronunciationModel } from '../PronunciationModel'
import { PageArtwork } from '../PageArtwork'
import { consonants, vowels } from '../../data/hangul'
import type { HangulCharacter } from '../../data/hangul'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAnalytics } from '../../hooks/useAnalytics'
import { FLAGS } from '../../flags'
export { PronunciationModel }

export type { FeatureFlag }

// ─── Design token maps ───────────────────────────────────────────────

type SemanticVariant = 'primary' | 'warning' | 'danger' | 'success' | 'muted'

const BORDER_COLORS: Record<SemanticVariant, string> = {
  primary: 'rgba(99,102,241,0.6)',
  warning: 'rgba(245,158,11,0.5)',
  danger:  'rgba(239,68,68,0.5)',
  success: 'rgba(16,185,129,0.6)',
  muted:   'rgba(156,163,175,0.5)',
}

const BADGE_BG: Record<SemanticVariant, string> = {
  primary: 'rgba(99,102,241,0.15)',
  warning: 'rgba(245,158,11,0.12)',
  danger:  'rgba(239,68,68,0.15)',
  success: 'rgba(16,185,129,0.15)',
  muted:   'rgba(156,163,175,0.15)',
}

const BADGE_TEXT: Record<SemanticVariant, string> = {
  primary: '#a5b4fc',
  warning: '#fcd34d',
  danger:  '#fca5a5',
  success: '#6ee7b7',
  muted:   'var(--c-3)',
}

// ─── PageHeader ──────────────────────────────────────────────────────

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>{title}</h1>
      {subtitle && (
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>{subtitle}</p>
      )}
    </div>
  )
}

// ─── Callout ─────────────────────────────────────────────────────────

interface CalloutProps {
  type?: 'info' | 'warning' | 'success'
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const variantMap: Record<NonNullable<CalloutProps['type']>, SemanticVariant> = {
    info: 'primary', warning: 'warning', success: 'success',
  }
  const v = variantMap[type]
  return (
    <div className="rounded-2xl p-6 space-y-3"
      style={{ background: BADGE_BG[v], border: `1px solid ${BORDER_COLORS[v]}` }}>
      {title && <p className="font-bold" style={{ color: BADGE_TEXT[v] }}>{title}</p>}
      <div className="text-sm space-y-2" style={{ color: 'var(--c-2)' }}>{children}</div>
    </div>
  )
}

// ─── SectionCard ─────────────────────────────────────────────────────

interface SectionCardProps {
  variant?: SemanticVariant
  title?: string
  badge?: string
  badgeVariant?: SemanticVariant
  children: React.ReactNode
}

export function SectionCard({ variant, title, badge, badgeVariant, children }: SectionCardProps) {
  const effectiveBadgeVariant = badgeVariant ?? variant
  return (
    <div className="glass-card rounded-2xl p-5"
      style={variant ? { borderLeft: `3px solid ${BORDER_COLORS[variant]}` } : undefined}>
      {(title || badge) && (
        <div className="flex items-center gap-2 mb-2">
          {title && <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>{title}</p>}
          {badge && effectiveBadgeVariant && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: BADGE_BG[effectiveBadgeVariant], color: BADGE_TEXT[effectiveBadgeVariant] }}>
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="space-y-2 text-sm" style={{ color: 'var(--c-2)' }}>{children}</div>
    </div>
  )
}

// ─── WordChip ────────────────────────────────────────────────────────

interface WordChipProps {
  korean: string
  gloss: string
}

export function WordChip({ korean, gloss }: WordChipProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <span className="korean-text font-bold" style={{ color: 'var(--c-1)' }}>{korean}</span>
      <span style={{ color: 'var(--c-4)' }}>·</span>
      <span style={{ color: 'var(--c-3)' }}>{gloss}</span>
    </div>
  )
}

// ─── CodeChip ────────────────────────────────────────────────────────

export function CodeChip({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded px-1.5 py-0.5 text-sm font-mono"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-2)' }}>
      {children}
    </code>
  )
}

// ─── ExampleGrid ─────────────────────────────────────────────────────

interface ExampleGridProps {
  cols?: 1 | 2 | 3 | 4
  children: React.ReactNode
}

export function ExampleGrid({ cols = 2, children }: ExampleGridProps) {
  const colClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }
  return (
    <div className={`grid ${colClass[cols]} gap-3`}>{children}</div>
  )
}

// ─── ComparisonTable ─────────────────────────────────────────────────

interface ComparisonTableProps {
  headers: string[]
  rows: string[][]
  /** Zero-based column index that contains Korean text */
  koreanColumn?: number
  /** Zero-based column index that contains romanization/code */
  codeColumn?: number
}

export function ComparisonTable({ headers, rows, koreanColumn, codeColumn }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--c-border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }}>
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--c-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--c-border)' }}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3"
                  style={{
                    color: j === koreanColumn ? 'var(--c-1)' : 'var(--c-2)',
                    fontWeight: j === koreanColumn ? 'bold' : undefined,
                  }}
                  {...(j === koreanColumn ? { className: 'px-4 py-3 korean-text font-bold' } : {})}
                >
                  {j === codeColumn ? <CodeChip>{cell}</CodeChip> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── CtaCard ─────────────────────────────────────────────────────────

interface CtaCardProps {
  title: string
  description: string
  primaryTo: string
  primaryLabel: string
  secondaryTo?: string
  secondaryLabel?: string
}

export function CtaCard({ title, description, primaryTo, primaryLabel, secondaryTo, secondaryLabel }: CtaCardProps) {
  return (
    <div className="rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div>
        <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>{title}</p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>{description}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Link to={primaryTo}
          className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
          {primaryLabel}
        </Link>
        {secondaryTo && secondaryLabel && (
          <Link to={secondaryTo}
            className="btn-ghost whitespace-nowrap inline-flex items-center font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer"
            style={{ color: 'var(--c-1)' }}>
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}

// ─── IPA-specific components ──────────────────────────────────────────

export function Sym({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono font-bold text-base px-1.5 py-0.5 rounded"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-accent-text)' }}>
      {children}
    </span>
  )
}

function IpaTag({ lang }: { lang: 'EN' | 'NL' }) {
  return (
    <span className="text-xs font-black px-1.5 py-0.5 rounded-full flex-shrink-0"
      style={{
        background: lang === 'EN' ? 'rgba(99,102,241,0.15)' : 'rgba(16,185,129,0.15)',
        color: lang === 'EN' ? '#a5b4fc' : '#6ee7b7',
      }}>
      {lang}
    </span>
  )
}

interface SymbolRowProps {
  symbol: string
  hangul: string
  en: string
  nl: string
}

export function SymbolRow({ symbol, hangul, en, nl }: SymbolRowProps) {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-2.5">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-mono font-black w-10 text-center flex-shrink-0"
          style={{ color: 'var(--c-accent-text)' }}>{symbol}</div>
        <span className="korean-text font-black text-lg" style={{ color: 'var(--c-1)' }}>{hangul}</span>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-start gap-2">
          <IpaTag lang="EN" />
          <span style={{ color: 'var(--c-2)' }}>{en}</span>
        </div>
        <div className="flex items-start gap-2">
          <IpaTag lang="NL" />
          <span style={{ color: 'var(--c-2)' }}>{nl}</span>
        </div>
      </div>
    </div>
  )
}

// ─── BatchimExample ───────────────────────────────────────────────────

interface BatchimExampleProps {
  korean: string
  romanized: string
  note: string
}

export function BatchimExample({ korean, romanized, note }: BatchimExampleProps) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-2">
      <div className="flex items-end gap-3">
        <span className="text-4xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{korean}</span>
        <span className="text-sm font-mono font-bold" style={{ color: 'var(--c-accent-text)' }}>{romanized}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>{note}</p>
    </div>
  )
}

// ─── LiaisonDemo ─────────────────────────────────────────────────────

interface LiaisonDemoProps {
  written: string
  writtenRoman: string
  spoken: string
  spokenRoman: string
  explanation?: string
}

export function LiaisonDemo({ written, writtenRoman, spoken, spokenRoman, explanation }: LiaisonDemoProps) {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4" style={{ borderLeft: '4px solid var(--c-accent)' }}>
      <p className="text-sm" style={{ color: 'var(--c-2)' }}>
        When a block has a <strong>final consonant</strong> and the next block starts with the hollow circle{' '}
        <strong>ㅇ</strong>, the consonant jumps up to fill that empty spot.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--c-3)' }}>Written</p>
          <div className="text-4xl font-black korean-serif" style={{ color: 'var(--c-1)' }}>{written}</div>
          <p className="text-sm mt-1 font-mono" style={{ color: 'var(--c-3)' }}>{writtenRoman}</p>
        </div>
        <div className="text-2xl" style={{ color: 'var(--c-accent)' }}>→</div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--c-3)' }}>Spoken</p>
          <div className="text-4xl font-black korean-serif" style={{ color: 'var(--c-accent-text)' }}>{spoken}</div>
          <p className="text-sm mt-1 font-mono" style={{ color: 'var(--c-accent-text)' }}>{spokenRoman}</p>
        </div>
      </div>
      {explanation && (
        <p className="text-xs leading-relaxed italic" style={{ color: 'var(--c-3)' }}>{explanation}</p>
      )}
    </div>
  )
}

// ─── Block components ─────────────────────────────────────────────────

const BLOCK_ROLE_STYLES = {
  initial: { bg: 'var(--c-accent-muted)',  border: 'var(--c-accent-border)',  text: 'var(--c-initial-text)', label: '초성' },
  vowel:   { bg: 'rgba(74,158,138,0.15)', border: 'rgba(74,158,138,0.35)', text: 'var(--c-vowel-text)',   label: '중성' },
  final:   { bg: 'rgba(196,154,60,0.15)', border: 'rgba(196,154,60,0.35)', text: 'var(--c-final-text)',   label: '종성' },
  empty:   { bg: 'var(--c-surface)',       border: 'var(--c-border)',         text: 'var(--c-3)',            label: '(없음)' },
}

type BlockRole = keyof typeof BLOCK_ROLE_STYLES

interface JamoProps {
  char: string
  role: BlockRole
  size?: 'sm' | 'md' | 'lg'
}

export function Jamo({ char, role, size = 'md' }: JamoProps) {
  const s = BLOCK_ROLE_STYLES[role]
  const dim = size === 'lg' ? 'w-16 h-16 text-3xl' : size === 'sm' ? 'w-9 h-9 text-lg' : 'w-12 h-12 text-2xl'
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${dim} rounded-xl flex items-center justify-center korean-serif font-black flex-shrink-0`}
        style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
      >
        {char}
      </div>
      <span className="text-xs font-bold korean-text" style={{ color: s.text }}>{s.label}</span>
    </div>
  )
}

interface BlockExampleProps {
  initial: string
  vowel: string
  final?: string
  combined: string
  note?: string
}

export function BlockExample({ initial, vowel, final: finalChar, combined, note }: BlockExampleProps) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-end gap-2 flex-wrap">
        <Jamo char={initial} role="initial" />
        <span className="text-2xl pb-3" style={{ color: 'var(--c-3)' }}>+</span>
        <Jamo char={vowel} role="vowel" />
        {finalChar && (
          <>
            <span className="text-2xl pb-3" style={{ color: 'var(--c-3)' }}>+</span>
            <Jamo char={finalChar} role="final" />
          </>
        )}
        <span className="text-2xl pb-3" style={{ color: 'var(--c-3)' }}>→</span>
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl korean-serif font-black"
            style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-border)', color: 'var(--c-1)' }}
          >
            {combined}
          </div>
          <SpeakButton text={combined} size="sm" />
        </div>
      </div>
      {note && <p className="text-xs" style={{ color: 'var(--c-3)' }}>{note}</p>}
    </div>
  )
}

interface ShapeDiagramProps {
  type: 'V' | 'H' | 'VF' | 'HF'
  char: string
  initial: string
  vowel: string
  final?: string
}

export function ShapeDiagram({ type, char, initial, vowel, final: finalChar }: ShapeDiagramProps) {
  const s = BLOCK_ROLE_STYLES
  const cell = (role: BlockRole, ch: string) => (
    <div
      className="flex items-center justify-center rounded-lg text-base korean-serif font-black"
      style={{ background: s[role].bg, border: `1px solid ${s[role].border}`, color: s[role].text }}
    >
      {ch}
    </div>
  )

  const grids: Record<string, React.ReactNode> = {
    V: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', width: 72, height: 36 }}>
        {cell('initial', initial)}
        {cell('vowel', vowel)}
      </div>
    ),
    H: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr 1fr', width: 36, height: 72 }}>
        {cell('initial', initial)}
        {cell('vowel', vowel)}
      </div>
    ),
    VF: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', width: 72, height: 72 }}>
        {cell('initial', initial)}
        {cell('vowel', vowel)}
        <div className="col-span-2">{cell('final', finalChar ?? '')}</div>
      </div>
    ),
    HF: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr 1fr 1fr', width: 36, height: 108 }}>
        {cell('initial', initial)}
        {cell('vowel', vowel)}
        {cell('final', finalChar ?? '')}
      </div>
    ),
  }

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-4">
      {grids[type]}
      <div className="text-center">
        <div className="text-3xl korean-serif font-black mb-1" style={{ color: 'var(--c-1)' }}>{char}</div>
        <div className="text-xs" style={{ color: 'var(--c-3)' }}>
          {initial} + {vowel}{finalChar ? ` + ${finalChar}` : ''}
        </div>
      </div>
    </div>
  )
}

interface PositionCardProps {
  role: 'initial' | 'vowel' | 'final'
  korean: string
  en: string
  detail: string
  example: string
}

export function PositionCard({ role, korean, en, detail, example }: PositionCardProps) {
  const s = BLOCK_ROLE_STYLES[role]
  return (
    <div className="rounded-2xl p-5 space-y-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <div className="flex items-center gap-2">
        <span className="text-2xl korean-serif font-black" style={{ color: s.text }}>{korean}</span>
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: s.text }}>{en}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--c-2)' }}>{detail}</p>
      <div className="text-sm korean-serif font-bold" style={{ color: s.text }}>{example}</div>
    </div>
  )
}

interface NavCardProps {
  to: string
  korean: string
  label: string
  description: string
}

export function NavCard({ to, korean, label, description }: NavCardProps) {
  return (
    <Link
      to={to}
      className="glass-card glass-card-hover rounded-2xl p-5 flex items-start gap-4 cursor-pointer"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)' }}
      >
        <span className="text-xl korean-serif font-black" style={{ color: 'var(--c-accent-text)' }}>{korean}</span>
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--c-3)' }}>{description}</p>
      </div>
    </Link>
  )
}

// ─── Character cards (consonants & vowels) ────────────────────────────
// CharacterCard is internal — ConsonantsCards and VowelsCards are the
// exported MDX components that encapsulate all interactive logic.

function CharacterCard({ char, ipaEnabled, type }: {
  char: HangulCharacter
  ipaEnabled: boolean
  type: 'consonant' | 'vowel'
}) {
  const [flipped, setFlipped] = useState(false)
  const { language } = useLanguage()
  const { track } = useAnalytics()
  const tapToFlip = language === 'nl' ? 'tik om te draaien' : 'tap to flip'
  const revealLabel = language === 'nl' ? 'tik om details te tonen' : 'click to reveal'

  const toggle = () => setFlipped((f) => {
    if (!f) track('card_flipped', { character: char.char, id: char.id, type })
    return !f
  })

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
  }

  const backBorder   = type === 'vowel' ? 'rgba(74,158,138,0.35)'  : 'var(--c-accent-border)'
  const romanColor   = type === 'vowel' ? 'var(--c-vowel-text)'    : 'var(--c-accent-text)'
  const frontHover   = type === 'vowel' ? 'var(--c-accent-border)' : 'var(--c-border-focus)'

  return (
    <div
      className="flip-card"
      style={{ height: '10rem' }}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${char.char}: ${revealLabel}`}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div
          className="flip-card-front flex flex-col items-center justify-center p-2 relative"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-card)', transition: 'border-color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = frontHover)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--c-border-card)')}
        >
          <div className="text-5xl font-black korean-serif leading-none" style={{ color: 'var(--c-1)' }}>
            {char.char}
          </div>
          <div className="text-xs mt-2" style={{ color: 'var(--c-4)' }}>{tapToFlip}</div>
          <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={char.char} />
          </div>
        </div>
        <div
          className="flip-card-back flex flex-col items-center justify-center gap-0.5 p-2 relative"
          style={{ background: 'var(--c-surface-2)', border: `1px solid ${backBorder}` }}
        >
          <div className="text-2xl font-black korean-serif" style={{ color: 'var(--c-1)' }}>{char.char}</div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm font-bold" style={{ color: romanColor }}>{char.romanization}</span>
            {ipaEnabled && (
              <span className="text-xs font-mono" style={{ color: 'var(--c-3)' }}>/{char.ipa}/</span>
            )}
          </div>
          <div className="text-xs text-zinc-400 text-center font-medium">{char.name}</div>
          <div className="text-xs text-zinc-400 text-center leading-snug mt-0.5 px-1 line-clamp-2">
            {char.descriptions[language]}
          </div>
          {char.examples[0] && (
            <div className="mt-0.5 text-xs text-center flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <span className="korean-text font-semibold text-zinc-200">{char.examples[0].korean}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-500">{char.examples[0].meaning}</span>
              <SpeakButton text={char.examples[0].korean} size="sm" className="text-zinc-500" />
            </div>
          )}
          <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={char.char} />
          </div>
        </div>
      </div>
    </div>
  )
}

const DIFFICULTY_STYLES = {
  beginner: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#6ee7b7', label: { en: 'Beginner', nl: 'Beginner' } },
  advanced: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fcd34d',  label: { en: 'Advanced', nl: 'Gevorderd' } },
}

function SectionLabel({ count, label, difficulty }: {
  count: number
  label: string
  difficulty?: keyof typeof DIFFICULTY_STYLES
}) {
  const d = difficulty ? DIFFICULTY_STYLES[difficulty] : null
  const { language } = useLanguage()
  return (
    <h2 className="text-sm font-bold mb-4 flex items-center gap-2.5" style={{ color: 'var(--c-2)' }}>
      <span className="px-2 py-0.5 rounded-full text-xs font-black tag-badge">{count}</span>
      {label}
      {d && (
        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: d.bg, border: `1px solid ${d.border}`, color: d.text }}>
          {d.label[language]}
        </span>
      )}
    </h2>
  )
}

function CulturalNote({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  return (
    <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-accent-text)' }}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <p className="text-xs font-bold mb-1" style={{ color: 'var(--c-2)' }}>{language === 'nl' ? 'Wist je dit?' : 'Did you know?'}</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>{children}</p>
      </div>
    </div>
  )
}

function CharRefTable({ chars, type }: { chars: HangulCharacter[]; type: 'consonant' | 'vowel' }) {
  const { language } = useLanguage()
  const ipaEnabled   = useBooleanFlagValue(FLAGS.IPA_DISPLAY, false)
  const romanColor   = type === 'vowel' ? 'var(--c-vowel-text)' : 'var(--c-accent-text)'
  const headers = language === 'nl'
    ? ['Teken', 'Roman.', 'Naam', 'Klank', 'Voorbeeld']
    : ['Char', 'Roman.', 'Name', 'Sound', 'Example']
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
              {headers.map((h, i) => (
                <th key={h} className={`text-left px-5 py-3 text-xs font-bold text-zinc-600 uppercase tracking-wide${i >= 2 ? ' hidden sm:table-cell' : ''}${i >= 3 ? ' hidden md:table-cell' : ''}${i >= 4 ? ' hidden lg:table-cell' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chars.map((char) => (
              <tr key={char.id} className="transition-colors" style={{ borderBottom: '1px solid var(--c-border-sub)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--c-row-hover)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '')}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl korean-text font-bold" style={{ color: 'var(--c-1)' }}>{char.char}</span>
                    <SpeakButton text={char.char} />
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="font-bold" style={{ color: romanColor }}>{char.romanization}</div>
                  {ipaEnabled && <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--c-3)' }}>/{char.ipa}/</div>}
                </td>
                <td className="px-5 py-3 text-zinc-400 hidden sm:table-cell">{char.name}</td>
                <td className="px-5 py-3 text-zinc-500 hidden md:table-cell max-w-xs">{char.descriptions[language]}</td>
                <td className="px-5 py-3 hidden lg:table-cell">
                  {char.examples[0] && (
                    <span className="flex items-center gap-1.5">
                      <span className="korean-text font-semibold text-zinc-200">{char.examples[0].korean}</span>
                      <span className="text-zinc-600">({char.examples[0].meaning})</span>
                      <SpeakButton text={char.examples[0].korean} className="text-zinc-600 hover:text-[var(--c-accent-text)]" />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ConsonantsCards() {
  const { language } = useLanguage()
  const ipaEnabled        = useBooleanFlagValue(FLAGS.IPA_DISPLAY, false)
  const culturalEnabled   = useBooleanFlagValue(FLAGS.CULTURAL_CONTEXT, false)
  const pronunciationModel = useBooleanFlagValue(FLAGS.PRONUNCIATION_MODEL, false)
  const basic = consonants.filter((c) => c.category === 'basic-consonant')
  const tense = consonants.filter((c) => c.category === 'tense-consonant')

  const copy = {
    en: {
      cultural: <>Each consonant shape was designed to mirror the position of the tongue and lips when producing the sound. ㅁ traces closed lips, ㄴ shows the tongue tip touching the palate, ㄱ depicts the back of the tongue raised toward the throat. King Sejong&apos;s 1443 commission made Hangul one of the most scientifically designed writing systems ever created.</>,
      basic: 'Basic Consonants',
      tense: 'Tense Consonants: 쌍자음',
      tenseIntro: 'Doubled consonants with a tense, unaspirated quality. Hold tension just before the sound.',
      reference: 'Full Reference',
    },
    nl: {
      cultural: <>Elke medeklinkervorm verwijst naar de stand van tong en lippen bij het maken van de klank. ㅁ tekent gesloten lippen, ㄴ toont de tongpunt tegen het gehemelte, ㄱ toont de achterkant van de tong richting keel. Koning Sejongs opdracht uit 1443 maakte Hangul tot een van de meest doordachte schriftsystemen.</>,
      basic: 'Basismedeklinkers',
      tense: 'Gespannen medeklinkers: 쌍자음',
      tenseIntro: 'Dubbele medeklinkers met een gespannen, ongeaspireerde klank. Zet spanning vast vlak voor de klank.',
      reference: 'Volledige referentie',
    },
  }[language]

  return (
    <div className="space-y-12">
      {culturalEnabled && (
        <CulturalNote>
          {copy.cultural}
        </CulturalNote>
      )}

      {pronunciationModel && <PronunciationModel compact />}

      <section>
        <SectionLabel count={14} label={copy.basic} difficulty="beginner" />
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2.5">
          {basic.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} type="consonant" />)}
        </div>
      </section>

      <section>
        <SectionLabel count={5} label={copy.tense} difficulty="advanced" />
        <p className="text-sm mb-4" style={{ color: 'var(--c-3)' }}>
          {copy.tenseIntro}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {tense.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} type="consonant" />)}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-2)' }}>{copy.reference}</h2>
        <CharRefTable chars={consonants} type="consonant" />
      </section>
    </div>
  )
}

export function VowelsCards() {
  const { language } = useLanguage()
  const ipaEnabled        = useBooleanFlagValue(FLAGS.IPA_DISPLAY, false)
  const culturalEnabled   = useBooleanFlagValue(FLAGS.CULTURAL_CONTEXT, false)
  const pronunciationModel = useBooleanFlagValue(FLAGS.PRONUNCIATION_MODEL, false)
  const basic   = vowels.filter((v) => v.category === 'basic-vowel')
  const compound = vowels.filter((v) => v.category === 'compound-vowel')

  const copy = {
    en: {
      cultural: <>The ten basic vowels are built from three philosophical symbols: ㆍ (sky/heaven), ㅡ (earth), and ㅣ (human standing between them). Their combinations reflect the Neo-Confucian cosmology of 15th-century Korea, where harmony between heaven, earth, and humanity was a guiding principle. You can see this logic in ㅏ (ㅣ + ㆍ to the right) and ㅓ (ㆍ to the left of ㅣ).</>,
      basic: 'Basic Vowels',
      compound: 'Compound Vowels: 이중모음',
      compoundIntro: 'Built by combining two basic vowels. The sound glides from one to the other.',
      reference: 'Full Reference',
    },
    nl: {
      cultural: <>De tien basisklinkers zijn opgebouwd uit drie filosofische symbolen: ㆍ (hemel), ㅡ (aarde) en ㅣ (de mens ertussen). Hun combinaties weerspiegelen de neoconfucianistische kosmologie van Korea in de 15e eeuw. Je ziet die logica in ㅏ (ㅣ + ㆍ rechts) en ㅓ (ㆍ links van ㅣ).</>,
      basic: 'Basisklinkers',
      compound: 'Samengestelde klinkers: 이중모음',
      compoundIntro: 'Gebouwd door twee basisklinkers te combineren. De klank glijdt van de ene naar de andere.',
      reference: 'Volledige referentie',
    },
  }[language]

  return (
    <div className="space-y-12">
      {culturalEnabled && (
        <CulturalNote>
          {copy.cultural}
        </CulturalNote>
      )}

      {pronunciationModel && <PronunciationModel compact />}

      <section>
        <SectionLabel count={10} label={copy.basic} difficulty="beginner" />
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {basic.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} type="vowel" />)}
        </div>
      </section>

      <section>
        <SectionLabel count={11} label={copy.compound} difficulty="advanced" />
        <p className="text-sm mb-4" style={{ color: 'var(--c-3)' }}>
          {copy.compoundIntro}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {compound.map((char) => <CharacterCard key={char.id} char={char} ipaEnabled={ipaEnabled} type="vowel" />)}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--c-2)' }}>{copy.reference}</h2>
        <CharRefTable chars={vowels} type="vowel" />
      </section>
    </div>
  )
}

// ─── MDX element overrides ────────────────────────────────────────────
// These style standard markdown elements so MDX content files stay clean.

function MdxH2({ children }: { children?: React.ReactNode }) {
  return <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>{children}</h2>
}

function MdxH3({ children }: { children?: React.ReactNode }) {
  return <h3 className="font-bold text-base" style={{ color: 'var(--c-1)' }}>{children}</h3>
}

function MdxP({ children }: { children?: React.ReactNode }) {
  return <p className="text-sm leading-relaxed" style={{ color: 'var(--c-2)' }}>{children}</p>
}

function MdxStrong({ children }: { children?: React.ReactNode }) {
  return <strong style={{ color: 'var(--c-1)' }}>{children}</strong>
}

function MdxUl({ children }: { children?: React.ReactNode }) {
  return <ul className="space-y-1.5 text-sm" style={{ color: 'var(--c-2)' }}>{children}</ul>
}

function MdxLi({ children }: { children?: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="flex-shrink-0" style={{ color: 'var(--c-3)' }}>•</span>
      <span>{children}</span>
    </li>
  )
}

// ─── Component map for MDX ────────────────────────────────────────────

export const MDX_COMPONENTS = {
  // Element overrides
  h2: MdxH2,
  h3: MdxH3,
  p: MdxP,
  strong: MdxStrong,
  ul: MdxUl,
  li: MdxLi,
  // Content components
  PageHeader,
  Callout,
  SectionCard,
  ExampleGrid,
  ComparisonTable,
  CtaCard,
  WordChip,
  CodeChip,
  Sym,
  SymbolRow,
  SpeakButton,
  FeatureFlag,
  Link,
  PronunciationModel,
  PageArtwork,
  BatchimExample,
  LiaisonDemo,
  Jamo,
  BlockExample,
  ShapeDiagram,
  PositionCard,
  NavCard,
  ConsonantsCards,
  VowelsCards,
} as const
