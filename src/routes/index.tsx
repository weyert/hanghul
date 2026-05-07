import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { PronunciationModel } from '../components/PronunciationModel'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => createSeoHead({
    description: 'Learn Hangul from scratch with Korean alphabet cards, syllable block tools, pronunciation breakdowns, and quizzes.',
    path: '/',
  }),
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
  to, char, label, subLabel, desc,
}: {
  to: string; char: string; label: string; subLabel: string; desc: string
}) {
  return (
    <Link to={to} className="glass-card glass-card-hover rounded-2xl p-6 block cursor-pointer group">
      <div className="text-5xl korean-serif font-black leading-none tracking-widest mb-5" style={{ color: 'var(--c-hero-char)' }}>
        {char}
      </div>
      <h3 className="text-base font-bold mb-0.5 font-display" style={{ color: 'var(--c-1)' }}>{label}</h3>
      <p className="text-xs font-semibold mb-3" style={{ color: 'var(--c-accent-text)' }}>{subLabel}</p>
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-3)' }}>{desc}</p>
      <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: 'var(--c-accent-text)' }}>
        Study <ArrowRight />
      </div>
    </Link>
  )
}

function ToolCard({ to, korean, label, subLabel, desc }: {
  to: string; korean: string; label: string; subLabel: string; desc: string
}) {
  return (
    <Link to={to} className="glass-card glass-card-hover rounded-2xl p-6 flex gap-5 items-start cursor-pointer group">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)' }}
      >
        <span className="text-2xl korean-serif font-black" style={{ color: 'var(--c-accent-text)' }}>{korean}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-bold font-display" style={{ color: 'var(--c-1)' }}>{label}</h3>
          <span style={{ color: 'var(--c-3)' }} className="group-hover:text-[var(--c-accent-text)] transition-colors"><ArrowRight /></span>
        </div>
        <p className="text-xs font-semibold mt-0.5 mb-2" style={{ color: 'var(--c-accent-text)' }}>{subLabel}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>{desc}</p>
      </div>
    </Link>
  )
}

function HomePage() {
  const beginnerRoadmap = useBooleanFlagValue(FLAGS.BEGINNER_ROADMAP, false)
  const pronunciationModel = useBooleanFlagValue(FLAGS.PRONUNCIATION_MODEL, false)
  const batchimLesson = useBooleanFlagValue(FLAGS.BATCHIM_LESSON, false)
  const grammarGuide = useBooleanFlagValue(FLAGS.GRAMMAR_GUIDE, false)
  const contrastDrills = useBooleanFlagValue(FLAGS.CONTRAST_DRILLS, false)

  return (
    <div className="space-y-16">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative text-center py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'var(--c-hero-bg)' }}
        />
        {/* Ambient decorative chars */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="absolute top-4 left-2 sm:left-8 text-[6rem] sm:text-[9rem] korean-serif font-black float-a" style={{ color: 'var(--c-ambient)' }}>가</span>
          <span className="absolute top-8 right-2 sm:right-12 text-[5rem] sm:text-[8rem] korean-serif font-black float-b" style={{ color: 'var(--c-ambient)' }}>나</span>
          <span className="absolute bottom-4 left-1/4 text-[4rem] sm:text-[6rem] korean-serif font-black float-c" style={{ color: 'var(--c-ambient)' }}>다</span>
          <span className="absolute bottom-8 right-1/4 text-[3.5rem] sm:text-[5rem] korean-serif font-black float-a" style={{ color: 'var(--c-ambient)' }}>라</span>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase tag-badge">
            Korean Writing System · 한국어 학습
          </div>

          <h1
            className="korean-serif font-black leading-none mb-6 glow-text"
            style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', color: 'var(--c-hero-char)', textShadow: 'var(--c-hero-text-glow)' }}
          >
            한글
          </h1>

          <p className="text-lg sm:text-2xl font-bold mb-3 font-display" style={{ color: 'var(--c-1)' }}>
            Learn the Korean Alphabet
          </p>
          <p className="max-w-md mx-auto leading-relaxed mb-10 text-sm sm:text-base" style={{ color: 'var(--c-3)' }}>
            Just 24 letters — 14 consonants and 10 vowels — that combine into elegant
            syllable blocks. Start from scratch and read Korean in days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/en/consonants"
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

      {/* ── Artwork feature ─────────────────────────────── */}
      <section className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] gap-6 items-center">
        <div className="overflow-hidden rounded-2xl glass-card">
          <picture>
            <source srcSet="/social/hangul-og-syllables.avif" type="image/avif" />
            <source srcSet="/social/hangul-og-syllables.webp" type="image/webp" />
            <img
              src="/social/hangul-og-syllables.png"
              alt="Hangul consonant, vowel, and final consonant pieces combining into a Korean syllable block."
              className="block w-full aspect-[1200/630] object-cover"
              loading="eager"
              fetchPriority="high"
              width="1200"
              height="630"
            />
          </picture>
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-3)' }}>How Hangul Clicks</p>
            <h2 className="text-2xl sm:text-3xl font-black font-display leading-tight" style={{ color: 'var(--c-1)' }}>
              Letters become blocks. Blocks become words.
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Hangul is built from a small set of shapes that stack into compact syllables. The lessons, builder, and drills keep that structure visible while you practice.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Initial', char: 'ㄱ', color: 'var(--c-initial-text)', bg: 'rgba(200,67,43,0.10)' },
              { label: 'Vowel', char: 'ㅏ', color: 'var(--c-vowel-text)', bg: 'rgba(74,158,138,0.13)' },
              { label: 'Final', char: 'ㅇ', color: 'var(--c-final-text)', bg: 'rgba(196,154,60,0.13)' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: item.bg, border: '1px solid var(--c-border-card)' }}>
                <p className="text-3xl korean-serif font-black leading-none" style={{ color: item.color }}>{item.char}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {beginnerRoadmap && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Beginner Roadmap</p>
            <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { step: '1', title: 'Core letters', time: '10-15 min', desc: 'Start with the plainest consonants and vowels first.' },
              { step: '2', title: 'Simple blocks', time: '10 min', desc: 'Read CV blocks before worrying about every sound rule.' },
              { step: '3', title: 'Batchim basics', time: '10 min', desc: 'Learn what changes when a consonant moves to the bottom.' },
              { step: '4', title: 'Contrast practice', time: '5-10 min', desc: 'Train the pairs beginners confuse most often.' },
            ].map((item) => (
              <div key={item.step} className="glass-card rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black" style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent-text)' }}>{item.step}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--c-4)' }}>{item.time}</span>
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {pronunciationModel && <PronunciationModel compact />}

      {/* ── Learning Path ────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Your Learning Path</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {([
            { step: 1, label: 'Consonants', sub: '자음', to: '/en/consonants', desc: '14 basic + 5 tense consonants' },
            { step: 2, label: 'Vowels',     sub: '모음', to: '/en/vowels',     desc: '10 basic + 11 compound vowels' },
            { step: 3, label: 'How Blocks Work', sub: '음절', to: '/en/blocks', desc: 'Understand how letters stack into syllable blocks' },
            { step: 4, label: grammarGuide ? 'Grammar 101' : (batchimLesson ? 'Batchim Basics' : 'Quiz'), sub: grammarGuide ? '문법' : (batchimLesson ? '받침' : '연습'), to: grammarGuide ? '/en/grammar' : (batchimLesson ? '/en/batchim' : '/quiz'), desc: grammarGuide ? 'Learn SOV structure and particles' : (batchimLesson ? 'Learn final consonants before broader drills' : 'Test recognition and recall') },
          ] as const).map(({ step, label, sub, to, desc }) => (
            <Link
              key={step}
              to={to}
              className="glass-card glass-card-hover rounded-xl p-4 flex gap-3 items-start group cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5"
                style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent-text)' }}
              >
                {step}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{label}</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--c-accent-text)' }}>{sub}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--c-3)' }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Core cards ───────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Learn the Alphabet</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            to="/en/consonants"
            char="ㄱ ㄴ ㄷ"
            label="Consonants"
            subLabel="자음 Ja-eum"
            desc="14 basic + 5 tense consonants. Interactive flip cards reveal name, romanization, and example words."
          />
          <FeatureCard
            to="/en/vowels"
            char="ㅏ ㅓ ㅗ"
            label="Vowels"
            subLabel="모음 Mo-eum"
            desc="10 basic vowels and 11 compound vowels. Each with pronunciation guide and example words."
          />
          <FeatureCard
            to="/quiz"
            char="연습"
            label="Quiz"
            subLabel="연습 Yeon-seup"
            desc="10-question multiple-choice quiz with spaced repetition — harder characters appear more often."
          />
        </div>
      </div>

      {/* ── Tools ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Pronunciation Tools</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className={`grid grid-cols-1 gap-4 ${contrastDrills ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <ToolCard
            to="/pronounce"
            korean="발"
            label="Pronunciation Breakdown"
            subLabel="발음 Bal-eum"
            desc="Type any Korean word and see each syllable decomposed into initial consonant, vowel, and final components with romanization."
          />
          {grammarGuide && (
            <ToolCard
              to="/en/grammar"
              korean="문"
              label="Grammar 101"
              subLabel="문법 Mun-beop"
              desc="Understand Subject-Object-Verb order and how particles glue sentences together."
            />
          )}
          <ToolCard
            to="/builder"
            korean="조"
            label="Syllable Builder"
            subLabel="조합 Jo-hap"
            desc="Pick an initial consonant, vowel, and optional final — watch the syllable block compose in real time and hear it spoken."
          />
          {contrastDrills && (
            <ToolCard
              to="/contrast-drills"
              korean="변"
              label="Contrast Drills"
              subLabel="변별 Byeon-byeol"
              desc="Train the Korean sound contrasts beginners usually collapse into one category."
            />
          )}
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Why Hangul is Remarkable</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-black mb-3 korean-serif gradient-text-kr-red">1443</div>
            <h3 className="font-bold mb-2 font-display" style={{ color: 'var(--c-1)' }}>Created by King Sejong</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Designed to increase literacy. Before Hangul, Koreans wrote with complex Chinese characters accessible only to scholars.
            </p>
          </div>
          <div>
            <div className="text-4xl font-black mb-3 korean-serif gradient-text-kr-teal">한 = ㅎ+ㅏ+ㄴ</div>
            <h3 className="font-bold mb-2 font-display" style={{ color: 'var(--c-1)' }}>Syllable Blocks</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Each character is a square block combining an initial consonant, a vowel, and an optional final consonant.
            </p>
          </div>
          <div>
            <div className="text-4xl font-black mb-3 font-display gradient-text-kr-gold">24 letters</div>
            <h3 className="font-bold mb-2 font-display" style={{ color: 'var(--c-1)' }}>Phonetically Designed</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              Letter shapes reflect the physical position of your mouth and tongue — making Hangul one of the most scientifically designed writing systems ever created.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
