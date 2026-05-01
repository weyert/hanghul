import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="7" x2="12" y2="7" />
      <polyline points="8,3 12,7 8,11" />
    </svg>
  )
}

function FeatureCard({
  to, char, label, subLabel, desc, color,
}: {
  to: string; char: string; label: string; subLabel: string; desc: string
  color: 'violet' | 'emerald' | 'amber'
}) {
  const accent = {
    violet: { text: 'text-violet-400', sub: '#a78bfa', glow: 'rgba(139,92,246,0.2)', border: 'rgba(139,92,246,0.25)' },
    emerald: { text: 'text-emerald-400', sub: '#6ee7b7', glow: 'rgba(16,185,129,0.18)', border: 'rgba(16,185,129,0.25)' },
    amber:   { text: 'text-amber-400',   sub: '#fcd34d', glow: 'rgba(245,158,11,0.18)', border: 'rgba(245,158,11,0.25)' },
  }[color]

  return (
    <Link to={to} className="glass-card glass-card-hover rounded-2xl p-6 block cursor-pointer group" style={{ borderColor: 'var(--c-border-card)' }}>
      <div className="text-5xl korean-text font-black leading-none tracking-widest mb-5" style={{ color: 'var(--c-hero-char)', textShadow: `0 0 30px ${accent.glow}` }}>
        {char}
      </div>
      <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--c-1)' }}>{label}</h3>
      <p className="text-xs font-semibold mb-3" style={{ color: accent.sub }}>{subLabel}</p>
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-3)' }}>{desc}</p>
      <div className={`flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all ${accent.text}`}>
        Study <ArrowRight />
      </div>
    </Link>
  )
}

function ToolCard({ to, korean, label, subLabel, desc, gradient }: {
  to: string; korean: string; label: string; subLabel: string; desc: string; gradient: string
}) {
  return (
    <Link to={to} className="glass-card glass-card-hover rounded-2xl p-6 flex gap-5 items-start cursor-pointer group">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: gradient }}>
        <span className="text-2xl korean-text font-black text-white">{korean}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>{label}</h3>
          <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors"><ArrowRight /></span>
        </div>
        <p className="text-xs font-semibold text-violet-400 mt-0.5 mb-2">{subLabel}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>{desc}</p>
      </div>
    </Link>
  )
}

function HomePage() {
  return (
    <div className="space-y-16">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative text-center py-16 sm:py-24 overflow-hidden">
        {/* Radial glow behind main character */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'var(--c-hero-bg)' }}
        />
        {/* Ambient decorative chars */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="absolute top-4 left-2 sm:left-8 text-[6rem] sm:text-[9rem] korean-text font-black float-a" style={{ color: 'var(--c-ambient)' }}>가</span>
          <span className="absolute top-8 right-2 sm:right-12 text-[5rem] sm:text-[8rem] korean-text font-black float-b" style={{ color: 'var(--c-ambient)' }}>나</span>
          <span className="absolute bottom-4 left-1/4 text-[4rem] sm:text-[6rem] korean-text font-black float-c" style={{ color: 'var(--c-ambient)' }}>다</span>
          <span className="absolute bottom-8 right-1/4 text-[3.5rem] sm:text-[5rem] korean-text font-black float-a" style={{ color: 'var(--c-ambient)' }}>라</span>
        </div>

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase tag-badge">
            Korean Writing System · 한국어 학습
          </div>

          {/* Main character */}
          <h1
            className="korean-text font-black leading-none mb-6 glow-text"
            style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', color: 'var(--c-hero-char)', textShadow: 'var(--c-hero-text-glow)' }}
          >
            한글
          </h1>

          <p className="text-lg sm:text-2xl font-bold mb-3" style={{ color: 'var(--c-1)' }}>
            Learn the Korean Alphabet
          </p>
          <p className="max-w-md mx-auto leading-relaxed mb-10 text-sm sm:text-base" style={{ color: 'var(--c-3)' }}>
            Just 24 letters — 14 consonants and 10 vowels — that combine into elegant
            syllable blocks. Start from scratch and read Korean in days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/consonants"
              className="btn-primary inline-flex items-center gap-2 text-white font-bold px-7 py-3 rounded-xl cursor-pointer text-sm"
            >
              Start Learning <ArrowRight size={15} />
            </Link>
            <Link
              to="/quiz"
              className="btn-ghost inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-xl cursor-pointer text-sm"
              style={{ color: 'var(--c-1)' }}
            >
              Test Yourself
            </Link>
          </div>
        </div>
      </div>

      {/* ── Core cards ───────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Learn the Alphabet</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            to="/consonants"
            char="ㄱ ㄴ ㄷ"
            label="Consonants"
            subLabel="자음 Ja-eum"
            desc="14 basic + 5 tense consonants. Interactive flip cards reveal name, romanization, and example words."
            color="violet"
          />
          <FeatureCard
            to="/vowels"
            char="ㅏ ㅓ ㅗ"
            label="Vowels"
            subLabel="모음 Mo-eum"
            desc="10 basic vowels and 11 compound vowels. Each with pronunciation guide and example words."
            color="emerald"
          />
          <FeatureCard
            to="/quiz"
            char="연습"
            label="Quiz"
            subLabel="연습 Yeon-seup"
            desc="10-question multiple-choice quiz with spaced repetition — harder characters appear more often."
            color="amber"
          />
        </div>
      </div>

      {/* ── Tools ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Pronunciation Tools</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToolCard
            to="/pronounce"
            korean="발"
            label="Pronunciation Breakdown"
            subLabel="발음 Bal-eum"
            desc="Type any Korean word and see each syllable decomposed into initial consonant, vowel, and final components with romanization."
            gradient="linear-gradient(135deg, #6d28d9, #4f46e5)"
          />
          <ToolCard
            to="/builder"
            korean="조"
            label="Syllable Builder"
            subLabel="조합 Jo-hap"
            desc="Pick an initial consonant, vowel, and optional final — watch the syllable block compose in real time and hear it spoken."
            gradient="linear-gradient(135deg, #0e7490, #065f46)"
          />
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-8">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Why Hangul is Remarkable</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-black gradient-text-violet mb-3 korean-text">1443</div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--c-1)' }}>Created by King Sejong</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Designed to increase literacy. Before Hangul, Koreans wrote with complex Chinese characters accessible only to scholars.
            </p>
          </div>
          <div>
            <div className="text-4xl font-black gradient-text-emerald mb-3 korean-text">한 = ㅎ+ㅏ+ㄴ</div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--c-1)' }}>Syllable Blocks</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Each character is a square block combining an initial consonant, a vowel, and an optional final consonant.
            </p>
          </div>
          <div>
            <div className="text-4xl font-black gradient-text-amber mb-3">24 letters</div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--c-1)' }}>Phonetically Designed</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Letter shapes reflect the physical position of your mouth and tongue — making Hangul one of the most scientifically designed writing systems ever created.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
