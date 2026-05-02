import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { SpeakButton } from '../components/SpeakButton'

export const Route = createFileRoute('/blocks')({
  component: BlocksPage,
  head: () => ({
    meta: [{ title: 'Syllable Blocks — 한글 배우기' }],
  }),
})

// ─── Colour helpers ───────────────────────────────────────────────────

const ROLE_STYLES = {
  initial: { bg: 'var(--c-accent-muted)',       border: 'var(--c-accent-border)',       text: 'var(--c-initial-text)', label: '초성', labelEn: 'initial' },
  vowel:   { bg: 'rgba(74,158,138,0.15)',        border: 'rgba(74,158,138,0.35)',        text: 'var(--c-vowel-text)',   label: '중성', labelEn: 'vowel'   },
  final:   { bg: 'rgba(196,154,60,0.15)',        border: 'rgba(196,154,60,0.35)',        text: 'var(--c-final-text)',   label: '종성', labelEn: 'final'   },
  empty:   { bg: 'var(--c-surface)',             border: 'var(--c-border)',              text: 'var(--c-3)',            label: '(없음)', labelEn: 'none'  },
}

// ─── Jamo chip ────────────────────────────────────────────────────────

function Jamo({ char, role, size = 'md' }: { char: string; role: keyof typeof ROLE_STYLES; size?: 'sm' | 'md' | 'lg' }) {
  const s = ROLE_STYLES[role]
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

// ─── Block example ────────────────────────────────────────────────────

function BlockExample({
  initial, vowel, final, combined, note,
}: {
  initial: string; vowel: string; final?: string; combined: string; note?: string
}) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-end gap-2 flex-wrap">
        <Jamo char={initial} role="initial" />
        <span className="text-2xl pb-3" style={{ color: 'var(--c-3)' }}>+</span>
        <Jamo char={vowel} role="vowel" />
        {final && (
          <>
            <span className="text-2xl pb-3" style={{ color: 'var(--c-3)' }}>+</span>
            <Jamo char={final} role="final" />
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

// ─── Block shape diagram ──────────────────────────────────────────────

function ShapeDiagram({
  type, example,
}: {
  type: 'V' | 'H' | 'VF' | 'HF'
  example: { char: string; initial: string; vowel: string; final?: string }
}) {
  const s = ROLE_STYLES
  const cell = (role: keyof typeof ROLE_STYLES, char: string) => (
    <div
      className="flex items-center justify-center rounded-lg text-base korean-serif font-black"
      style={{ background: s[role].bg, border: `1px solid ${s[role].border}`, color: s[role].text }}
    >
      {char}
    </div>
  )

  const grids: Record<string, React.ReactNode> = {
    V: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', width: 72, height: 36 }}>
        {cell('initial', example.initial)}
        {cell('vowel', example.vowel)}
      </div>
    ),
    H: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr 1fr', width: 36, height: 72 }}>
        {cell('initial', example.initial)}
        {cell('vowel', example.vowel)}
      </div>
    ),
    VF: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', width: 72, height: 72 }}>
        {cell('initial', example.initial)}
        {cell('vowel', example.vowel)}
        <div className="col-span-2">{cell('final', example.final ?? '')}</div>
      </div>
    ),
    HF: (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr 1fr 1fr', width: 36, height: 108 }}>
        {cell('initial', example.initial)}
        {cell('vowel', example.vowel)}
        {cell('final', example.final ?? '')}
      </div>
    ),
  }

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-4">
      {grids[type]}
      <div className="text-center">
        <div className="text-3xl korean-serif font-black mb-1" style={{ color: 'var(--c-1)' }}>{example.char}</div>
        <div className="text-xs" style={{ color: 'var(--c-3)' }}>
          {example.initial} + {example.vowel}{example.final ? ` + ${example.final}` : ''}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

function BlocksPage() {
  const enabled = useBooleanFlagValue(FLAGS.SYLLABLE_BLOCKS, false)

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 max-w-3xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Syllable Blocks</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>음절 Eum-jeol — Every Korean character is a compact square block. Here's how they're built.</p>
      </div>

      {/* Intro */}
      <div className="glass-card rounded-2xl p-6 space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-2)' }}>
          Unlike English where letters are written in a line, Korean letters (<strong style={{ color: 'var(--c-1)' }}>자모 jamo</strong>) are
          stacked into square blocks. Each block represents exactly <strong style={{ color: 'var(--c-1)' }}>one syllable</strong>.
          The word <span className="korean-serif font-black text-base" style={{ color: 'var(--c-accent-text)' }}>한국어</span> has
          three blocks — <span className="korean-serif font-bold" style={{ color: 'var(--c-1)' }}>한</span>,{' '}
          <span className="korean-serif font-bold" style={{ color: 'var(--c-1)' }}>국</span>,{' '}
          <span className="korean-serif font-bold" style={{ color: 'var(--c-1)' }}>어</span> — and three syllables: han · guk · eo.
        </p>
      </div>

      {/* Three positions */}
      <section className="space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>The Three Positions</h2>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          Every syllable block has up to three layers — two required, one optional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([
            { role: 'initial' as const, korean: '초성', en: 'Initial consonant', detail: 'Always comes first. Every syllable starts with one. If there\'s no consonant sound, use ㅇ as a placeholder.', example: 'ㄱ ㄴ ㄷ ㄹ…' },
            { role: 'vowel'   as const, korean: '중성', en: 'Vowel', detail: 'Sits next to or below the initial consonant. Determines the block shape — vertical vowels sit to the right; horizontal vowels sit below.', example: 'ㅏ ㅓ ㅗ ㅜ…' },
            { role: 'final'   as const, korean: '종성', en: 'Final consonant', detail: 'Optional. Known as 받침 (batchim). Sits at the bottom of the block. About half of all Korean syllables have one.', example: 'ㄴ ㄹ ㅁ ㄱ…' },
          ]).map(({ role, korean, en, detail, example }) => {
            const s = ROLE_STYLES[role]
            return (
              <div key={role} className="rounded-2xl p-5 space-y-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl korean-serif font-black" style={{ color: s.text }}>{korean}</span>
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: s.text }}>{en}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--c-2)' }}>{detail}</p>
                <div className="text-sm korean-serif font-bold" style={{ color: s.text }}>{example}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Two block shapes */}
      <section className="space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Two Block Shapes</h2>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          The vowel's orientation determines how the block is arranged. The consonant grows to fill the space.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ShapeDiagram type="V"  example={{ char: '가', initial: 'ㄱ', vowel: 'ㅏ' }} />
          <ShapeDiagram type="H"  example={{ char: '고', initial: 'ㄱ', vowel: 'ㅗ' }} />
          <ShapeDiagram type="VF" example={{ char: '한', initial: 'ㅎ', vowel: 'ㅏ', final: 'ㄴ' }} />
          <ShapeDiagram type="HF" example={{ char: '국', initial: 'ㄱ', vowel: 'ㅜ', final: 'ㄱ' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs" style={{ color: 'var(--c-3)' }}>
          <div className="glass-card rounded-xl p-4">
            <p className="font-bold mb-1" style={{ color: 'var(--c-2)' }}>Vertical vowels → side by side</p>
            <p>ㅏ ㅑ ㅓ ㅕ ㅣ ㅐ ㅒ ㅔ ㅖ and their compounds — the consonant sits <em>left</em>, vowel <em>right</em></p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="font-bold mb-1" style={{ color: 'var(--c-2)' }}>Horizontal vowels → stacked</p>
            <p>ㅗ ㅛ ㅜ ㅠ ㅡ and their compounds — the consonant sits <em>above</em>, vowel <em>below</em></p>
          </div>
        </div>
      </section>

      {/* Worked examples */}
      <section className="space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Step-by-Step Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BlockExample initial="ㄴ" vowel="ㅏ" combined="나" note="나 (na) — I / me. Vertical vowel, no batchim." />
          <BlockExample initial="ㅇ" vowel="ㅗ" combined="오" note="오 (o) — five / come. Horizontal vowel. ㅇ is silent as an initial." />
          <BlockExample initial="ㅎ" vowel="ㅏ" final="ㄴ" combined="한" note="한 (han) — Korean. Vertical vowel + batchim ㄴ below." />
          <BlockExample initial="ㄱ" vowel="ㅜ" final="ㄱ" combined="국" note="국 (guk) — country / soup. Horizontal vowel + batchim ㄱ below." />
          <BlockExample initial="ㅅ" vowel="ㅏ" final="ㄹ" combined="살" note="살 (sal) — years old (age counter). Vertical vowel + batchim ㄹ." />
          <BlockExample initial="ㄱ" vowel="ㅡ" final="ㄹ" combined="글" note="글 (geul) — writing / text. Horizontal vowel + batchim ㄹ." />
        </div>
      </section>

      {/* CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {([
          { to: '/consonants', korean: '자음', label: 'Learn Consonants', desc: 'The building blocks of every syllable' },
          { to: '/vowels',     korean: '모음', label: 'Learn Vowels',     desc: 'Determines the block shape' },
          { to: '/builder',    korean: '조합', label: 'Build Syllables',  desc: 'Compose your own blocks live' },
        ]).map(({ to, korean, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="glass-card glass-card-hover rounded-2xl p-5 flex items-start gap-4 cursor-pointer group"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)' }}
            >
              <span className="text-xl korean-serif font-black" style={{ color: 'var(--c-accent-text)' }}>{korean}</span>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--c-3)' }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
