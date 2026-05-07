import { createFileRoute, Link } from '@tanstack/react-router'
import { useLanguage } from '../contexts/LanguageContext'
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
  const { language } = useLanguage()
  const copy = language === 'nl'
    ? {
        eyebrow: 'Privacy',
        title: 'Privacybeleid',
        updated: 'Laatst bijgewerkt: 7 mei 2026',
        body: [
          '한글 배우기 / Learn Hangul verzamelt beperkte analyse-events om te begrijpen of de leertools goed werken en welke delen van de site mensen gebruiken.',
          'De site kan events versturen zoals paginaweergaven, quizstarts en afrondingen, quizantwoorden, afgeronde lessen, afgespeelde uitspraak, omgedraaide kaarten, themawijzigingen, taalwijzigingen, type-oefenresultaten en gekozen oefentekens. Deze events kunnen het paginapad, tijdstip, gekozen modus, score, teken-id of vergelijkbare leerstatus bevatten.',
          'De site bewaart ook een kleine hoeveelheid informatie in je browser, zoals thema, taalvoorkeur en oefenvoortgang. Deze lokale gegevens blijven in je browser, tenzij je browser of apparaat ze apart synchroniseert.',
          'Het analyse-eindpunt wordt gebruikt voor geaggregeerde productverbetering, niet voor de verkoop van persoonsgegevens. Vul geen gevoelige persoonlijke informatie in oefenvelden in.',
        ],
        choices: 'Je keuzes',
        choicesBody: 'Je kunt lokale sitegegevens wissen via je browserinstellingen. Je kunt ook browserprivacy-instellingen of contentblockers gebruiken om analyseverzoeken te beperken.',
        back: 'Terug naar de site',
      }
    : {
        eyebrow: 'Privacy',
        title: 'Privacy Policy',
        updated: 'Last updated: May 7, 2026',
        body: [
          '한글 배우기 / Learn Hangul collects limited analytics events to understand whether the learning tools work well and which parts of the site people use.',
          'The site may send events such as page views, quiz starts and completions, quiz answers, lesson completions, pronunciation plays, card flips, theme changes, language changes, typing practice results, and selected practice characters. These events may include the page path, event timestamp, selected mode, score, character id, or similar learning-state properties.',
          'The site also stores a small amount of information in your browser, such as theme, language preference, and practice progress. This local data stays in your browser unless your browser or device syncs it separately.',
          'The analytics endpoint is used for aggregate product improvement, not for selling personal data. Do not enter private personal information into practice fields.',
        ],
        choices: 'Your choices',
        choicesBody: 'You can clear local site data from your browser settings. You can also use browser privacy controls or content blockers to restrict analytics requests.',
        back: 'Back to the site',
      }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-3)' }}>{copy.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-black font-display leading-tight" style={{ color: 'var(--c-1)' }}>
          {copy.title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>{copy.updated}</p>
      </header>

      <section className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--c-2)' }}>
        {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section className="glass-card rounded-2xl p-6 space-y-3">
        <h2 className="text-xl font-black font-display" style={{ color: 'var(--c-1)' }}>{copy.choices}</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-3)' }}>
          {copy.choicesBody}
        </p>
        <Link to="/" className="inline-flex btn-ghost font-semibold px-5 py-2.5 rounded-xl text-sm" style={{ color: 'var(--c-1)' }}>
          {copy.back}
        </Link>
      </section>
    </article>
  )
}
