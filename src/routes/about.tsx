import { createFileRoute, Link } from '@tanstack/react-router'
import { useLanguage } from '../contexts/LanguageContext'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => createSeoHead({
    title: 'About Learn Hangul',
    description: 'About 한글 배우기, a free interactive resource for learning Hangul.',
    path: '/about',
  }),
})

function AboutPage() {
  const { language } = useLanguage()
  const copy = language === 'nl'
    ? {
        eyebrow: 'Over',
        intro: 'Een gratis interactieve site om Hangul vanaf de basis te leren.',
        body: [
          'De site richt zich op wat beginners het hardst nodig hebben: medeklinkers, klinkers, lettergreepblokken, batchim, uitspraakcontrasten, romanisering, IPA en korte oefentools. Het schrift wordt zichtbaar en toetsbaar, in plaats van verstopt achter lange woordenlijsten.',
          'De lessen zijn geschreven voor Engelstalige en Nederlandstalige leerlingen, met extra aandacht voor klankverschillen die je mist wanneer Koreaans alleen via romanisering wordt uitgelegd.',
          'De lessen zijn gratis te gebruiken. Zie je een fout of heb je een suggestie, gebruik dan de projectlinks of het contactkanaal waar deze site is gepubliceerd.',
        ],
        cardTitle: 'Wat je eerst leert',
        cardBody: 'Begin met de medeklinkers en klinkers. Leer daarna hoe letters stapelen tot blokken. Daarna maken batchim en uitspraakdrills Koreaanse tekst makkelijker te horen en te lezen.',
        consonants: 'Leer medeklinkers',
        vowels: 'Leer klinkers',
        consonantsTo: '/nl/consonants',
        vowelsTo: '/nl/vowels',
      }
    : {
        eyebrow: 'About',
        intro: 'A free interactive site for learning Hangul from first principles.',
        body: [
          'The site focuses on the parts of Hangul that beginners need most: consonants, vowels, syllable blocks, batchim, pronunciation contrasts, romanization, IPA, and short practice tools. The site makes the writing system visible and testable instead of hiding it behind long vocabulary lists.',
          'Content is written for English learners and Dutch learners, with extra attention to sound comparisons learners miss when Korean is explained through romanization alone.',
          'The lessons are free to use. If you notice a mistake or have a suggestion, use the project links or contact channel where this site is published.',
        ],
        cardTitle: 'What to study first',
        cardBody: 'Start with the consonants and vowels, then learn how letters stack into blocks. After that, batchim and pronunciation drills make Korean text easier to hear and read.',
        consonants: 'Learn consonants',
        vowels: 'Learn vowels',
        consonantsTo: '/en/consonants',
        vowelsTo: '/en/vowels',
      }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{copy.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-black font-display leading-tight" style={{ color: 'var(--c-1)' }}>
          한글 배우기 / Learn Hangul
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--c-3)' }}>
          {copy.intro}
        </p>
      </header>

      <section className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--c-2)' }}>
        {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-black font-display mb-3" style={{ color: 'var(--c-1)' }}>
          {copy.cardTitle}
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-3)' }}>
          {copy.cardBody}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to={copy.consonantsTo} className="btn-primary text-white font-bold px-5 py-2.5 rounded-xl text-sm">
            {copy.consonants}
          </Link>
          <Link to={copy.vowelsTo} className="btn-ghost font-semibold px-5 py-2.5 rounded-xl text-sm" style={{ color: 'var(--c-1)' }}>
            {copy.vowels}
          </Link>
        </div>
      </div>
    </article>
  )
}
