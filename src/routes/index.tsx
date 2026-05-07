import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { PronunciationModel } from '../components/PronunciationModel'
import { createSeoHead } from '../seo'
import { useLanguage } from '../contexts/LanguageContext'
import { translations, tr } from '../i18n/translations'
import { localePath } from '../utils/localizedRoutes'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => createSeoHead({
    description: 'Learn Korean online from scratch with Hangul cards, syllable block tools, pronunciation breakdowns, and quizzes.',
    path: '/',
    keywords: [
      'learn Korean',
      'how to learn Korean',
      'Korean language learning',
      'learn Korean online',
      'learning Korean',
      'how to learn Korean language',
    ],
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
  to, char, label, subLabel, desc, studyLabel,
}: {
  to: string; char: string; label: string; subLabel: string; desc: string; studyLabel: string
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
        {studyLabel} <ArrowRight />
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
  const { language } = useLanguage()
  const beginnerRoadmap = useBooleanFlagValue(FLAGS.BEGINNER_ROADMAP, false)
  const pronunciationModel = useBooleanFlagValue(FLAGS.PRONUNCIATION_MODEL, false)
  const batchimLesson = useBooleanFlagValue(FLAGS.BATCHIM_LESSON, false)
  const grammarGuide = useBooleanFlagValue(FLAGS.GRAMMAR_GUIDE, false)
  const contrastDrills = useBooleanFlagValue(FLAGS.CONTRAST_DRILLS, false)

  const t = translations.home

  // Resolve the 4th learning path step based on enabled flags
  const step4 = grammarGuide
    ? tr(t.learningPath4thStep, language).grammar
    : batchimLesson
      ? tr(t.learningPath4thStep, language).batchim
      : tr(t.learningPath4thStep, language).quiz

  const step4To = grammarGuide
    ? `/${language}/grammar`
    : batchimLesson
      ? `/${language}/batchim`
      : localePath(language, '/quiz')

  const pathSteps = tr(t.learningPathSteps, language)

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
            {tr(t.badge, language)}
          </div>

          <h1
            className="korean-serif font-black leading-none mb-6 glow-text"
            style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', color: 'var(--c-hero-char)', textShadow: 'var(--c-hero-text-glow)' }}
          >
            한글
          </h1>

          <p className="text-lg sm:text-2xl font-bold mb-3 font-display" style={{ color: 'var(--c-1)' }}>
            {tr(t.heroTitle, language)}
          </p>
          <p className="max-w-md mx-auto leading-relaxed mb-10 text-sm sm:text-base" style={{ color: 'var(--c-3)' }}>
            {tr(t.heroSubtitle, language)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/${language}/consonants`}
              className="btn-primary inline-flex items-center gap-2 text-white font-bold px-7 py-3 rounded-xl cursor-pointer text-sm"
            >
              {tr(t.startLearning, language)} <ArrowRight size={15} />
            </Link>
            <Link
              to={localePath(language, '/quiz')}
              className="btn-ghost inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-xl cursor-pointer text-sm"
              style={{ color: 'var(--c-1)' }}
            >
              {tr(t.testYourself, language)}
            </Link>
          </div>
          <p className="mt-4 text-xs sm:text-sm max-w-lg mx-auto" style={{ color: 'var(--c-4)' }}>
            {tr(t.seoNote, language)}
          </p>
        </div>
      </div>

      {/* ── Artwork feature ─────────────────────────────── */}
      <section className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] gap-6 items-center">
        <div className="overflow-hidden rounded-2xl glass-card">
          <picture>
            <source
              srcSet="/social/hangul-og-syllables-720.avif 720w, /social/hangul-og-syllables.avif 1200w"
              sizes="(min-width: 1024px) 55vw, 100vw"
              type="image/avif"
            />
            <source
              srcSet="/social/hangul-og-syllables-720.webp 720w, /social/hangul-og-syllables.webp 1200w"
              sizes="(min-width: 1024px) 55vw, 100vw"
              type="image/webp"
            />
            <img
              src="/social/hangul-og-syllables.png"
              alt="Hangul consonant, vowel, and final consonant pieces combining into a Korean syllable block."
              className="block w-full aspect-[1200/630] object-cover"
              loading="lazy"
              fetchPriority="auto"
              width="1200"
              height="630"
            />
          </picture>
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-3)' }}>{tr(t.howHangulClicks, language)}</p>
            <h2 className="text-2xl sm:text-3xl font-black font-display leading-tight" style={{ color: 'var(--c-1)' }}>
              {tr(t.lettersToBlocks, language)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              {tr(t.lettersDesc, language)}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { labelKey: 'initial' as const, char: 'ㄱ', color: 'var(--c-initial-text)', bg: 'rgba(200,67,43,0.10)' },
              { labelKey: 'vowelLabel' as const, char: 'ㅏ', color: 'var(--c-vowel-text)', bg: 'rgba(74,158,138,0.13)' },
              { labelKey: 'finalLabel' as const, char: 'ㅇ', color: 'var(--c-final-text)', bg: 'rgba(196,154,60,0.13)' },
            ].map((item) => (
              <div key={item.labelKey} className="rounded-xl p-4 text-center" style={{ background: item.bg, border: '1px solid var(--c-border-card)' }}>
                <p className="text-3xl korean-serif font-black leading-none" style={{ color: item.color }}>{item.char}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{tr(t[item.labelKey], language)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {beginnerRoadmap && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{tr(t.beginnerRoadmap, language)}</p>
            <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tr(t.roadmapSteps, language).map((item, idx) => (
              <div key={idx} className="glass-card rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black" style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-accent-border)', color: 'var(--c-accent-text)' }}>{idx + 1}</span>
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
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{tr(t.yourLearningPath, language)}</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { step: 1, ...pathSteps[0], to: `/${language}/consonants` },
            { step: 2, ...pathSteps[1], to: `/${language}/vowels` },
            { step: 3, ...pathSteps[2], to: `/${language}/blocks` },
            { step: 4, label: step4.label, sub: step4.sub, desc: step4.desc, to: step4To },
          ].map(({ step, label, sub, to, desc }) => (
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
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{tr(t.learnAlphabet, language)}</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            to={`/${language}/consonants`}
            char="ㄱ ㄴ ㄷ"
            label={tr(t.consonantsCard.label, language)}
            subLabel={tr(t.consonantsCard.subLabel, language)}
            desc={tr(t.consonantsCard.desc, language)}
            studyLabel={tr(t.study, language)}
          />
          <FeatureCard
            to={`/${language}/vowels`}
            char="ㅏ ㅓ ㅗ"
            label={tr(t.vowelsCard.label, language)}
            subLabel={tr(t.vowelsCard.subLabel, language)}
            desc={tr(t.vowelsCard.desc, language)}
            studyLabel={tr(t.study, language)}
          />
          <FeatureCard
            to={localePath(language, '/quiz')}
            char="연습"
            label={tr(t.quizCard.label, language)}
            subLabel={tr(t.quizCard.subLabel, language)}
            desc={tr(t.quizCard.desc, language)}
            studyLabel={tr(t.study, language)}
          />
        </div>
      </div>

      {/* ── Tools ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{tr(t.pronunciationTools, language)}</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className={`grid grid-cols-1 gap-4 ${contrastDrills ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <ToolCard
            to={localePath(language, '/pronounce')}
            korean="발"
            label={tr(t.pronounceCard.label, language)}
            subLabel={tr(t.pronounceCard.subLabel, language)}
            desc={tr(t.pronounceCard.desc, language)}
          />
          {grammarGuide && (
            <ToolCard
              to={`/${language}/grammar`}
              korean="문"
              label={tr(t.grammarCard.label, language)}
              subLabel={tr(t.grammarCard.subLabel, language)}
              desc={tr(t.grammarCard.desc, language)}
            />
          )}
          <ToolCard
            to={localePath(language, '/builder')}
            korean="조"
            label={tr(t.builderCard.label, language)}
            subLabel={tr(t.builderCard.subLabel, language)}
            desc={tr(t.builderCard.desc, language)}
          />
          {contrastDrills && (
            <ToolCard
              to={localePath(language, '/contrast-drills')}
              korean="변"
              label={tr(t.contrastCard.label, language)}
              subLabel={tr(t.contrastCard.subLabel, language)}
              desc={tr(t.contrastCard.desc, language)}
            />
          )}
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{tr(t.whyHangul, language)}</p>
          <div className="flex-1 h-px" style={{ background: 'var(--c-divider)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-black mb-3 korean-serif gradient-text-kr-red">{tr(t.stat1.year, language)}</div>
            <h3 className="font-bold mb-2 font-display" style={{ color: 'var(--c-1)' }}>{tr(t.stat1.title, language)}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              {tr(t.stat1.desc, language)}
            </p>
          </div>
          <div>
            <div className="text-4xl font-black mb-3 korean-serif gradient-text-kr-teal">한 = ㅎ+ㅏ+ㄴ</div>
            <h3 className="font-bold mb-2 font-display" style={{ color: 'var(--c-1)' }}>{tr(t.stat2.title, language)}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              {tr(t.stat2.desc, language)}
            </p>
          </div>
          <div>
            <div className="text-4xl font-black mb-3 font-display gradient-text-kr-gold">24 letters</div>
            <h3 className="font-bold mb-2 font-display" style={{ color: 'var(--c-1)' }}>{tr(t.stat3.title, language)}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
              {tr(t.stat3.desc, language)}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
