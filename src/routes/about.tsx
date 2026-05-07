import { createFileRoute, Link } from '@tanstack/react-router'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => createSeoHead({
    title: 'About Learn Hangul',
    description: 'About 한글 배우기, a free interactive resource for learning the Korean Hangul writing system.',
    path: '/about',
  }),
})

function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>About</p>
        <h1 className="text-4xl sm:text-5xl font-black font-display leading-tight" style={{ color: 'var(--c-1)' }}>
          한글 배우기 / Learn Hangul
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--c-3)' }}>
          A free interactive site for learning the Korean Hangul writing system from first principles.
        </p>
      </header>

      <section className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--c-2)' }}>
        <p>
          The site focuses on the parts of Hangul that beginners need most: consonants, vowels,
          syllable blocks, batchim, pronunciation contrasts, romanization, IPA, and short practice
          tools. The goal is to make the writing system visible and testable instead of hiding it
          behind long vocabulary lists.
        </p>
        <p>
          Content is written for English learners and Dutch learners, with extra attention to sound
          comparisons that are easy to miss when Korean is explained only through romanization.
        </p>
        <p>
          The lessons are free to use. If you notice a mistake or have a suggestion, use the project
          links or contact channel where this site is published.
        </p>
      </section>

      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-black font-display mb-3" style={{ color: 'var(--c-1)' }}>
          What to study first
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-3)' }}>
          Start with the consonants and vowels, then learn how letters stack into blocks. After that,
          batchim and pronunciation drills will make Korean text feel much less mysterious.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/en/consonants" className="btn-primary text-white font-bold px-5 py-2.5 rounded-xl text-sm">
            Learn consonants
          </Link>
          <Link to="/en/vowels" className="btn-ghost font-semibold px-5 py-2.5 rounded-xl text-sm" style={{ color: 'var(--c-1)' }}>
            Learn vowels
          </Link>
        </div>
      </div>
    </article>
  )
}
