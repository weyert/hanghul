import { createFileRoute, Link } from '@tanstack/react-router'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => createSeoHead({
    title: 'Privacy Policy',
    description: 'Privacy policy for 한글 배우기 / Learn Hangul.',
    path: '/privacy',
  }),
})

function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>Privacy</p>
        <h1 className="text-4xl sm:text-5xl font-black font-display leading-tight" style={{ color: 'var(--c-1)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>Last updated: May 7, 2026</p>
      </header>

      <section className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--c-2)' }}>
        <p>
          한글 배우기 / Learn Hangul collects limited analytics events to understand whether the
          learning tools work well and which parts of the site people use.
        </p>
        <p>
          The site may send events such as page views, quiz starts and completions, quiz answers,
          lesson completions, pronunciation plays, card flips, theme changes, language changes,
          typing practice results, and selected practice characters. These events may include the
          page path, event timestamp, selected mode, score, character id, or similar learning-state
          properties.
        </p>
        <p>
          The site also stores a small amount of information in your browser, such as theme,
          language preference, and practice progress. This local data stays in your browser unless
          your browser or device syncs it separately.
        </p>
        <p>
          The analytics endpoint is used for aggregate product improvement, not for selling personal
          data. Do not enter private personal information into practice fields.
        </p>
      </section>

      <section className="glass-card rounded-2xl p-6 space-y-3">
        <h2 className="text-xl font-black font-display" style={{ color: 'var(--c-1)' }}>Your choices</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
          You can clear local site data from your browser settings. You can also use browser privacy
          controls or content blockers to restrict analytics requests.
        </p>
        <Link to="/" className="inline-flex btn-ghost font-semibold px-5 py-2.5 rounded-xl text-sm" style={{ color: 'var(--c-1)' }}>
          Back to the site
        </Link>
      </section>
    </article>
  )
}
