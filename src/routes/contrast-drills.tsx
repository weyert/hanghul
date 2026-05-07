import { createFileRoute } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { CONTRAST_DRILLS } from '../data/beginnerContent'
import { SpeakButton } from '../components/SpeakButton'
import { PronunciationModel } from '../components/PronunciationModel'
import { PageArtwork } from '../components/PageArtwork'
import { createSeoHead } from '../seo'

export const Route = createFileRoute('/contrast-drills')({
  component: ContrastDrillsPage,
  head: () => createSeoHead({
    title: 'Korean Sound Contrast Drills',
    description: 'Practice Korean pronunciation contrasts that beginners often confuse, including tense and aspirated consonants.',
    path: '/contrast-drills',
  }),
})

function ContrastDrillsPage() {
  const enabled = useBooleanFlagValue(FLAGS.CONTRAST_DRILLS, false)
  const pronunciationModel = useBooleanFlagValue(FLAGS.PRONUNCIATION_MODEL, false)

  if (!enabled) {
    return <div className="text-center py-24 text-zinc-600"><p className="text-base font-medium">This feature is not enabled.</p></div>
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Contrast Drills</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>변별 연습 — Train the sounds beginners confuse most often.</p>
      </div>
      <PageArtwork
        src="/artwork/contrast-drills.jpg"
        alt="Paired Hangul letter tiles set side by side for pronunciation contrast practice."
      />

      {pronunciationModel && <PronunciationModel compact />}

      {CONTRAST_DRILLS.map((drill) => (
        <section key={drill.id} className="glass-card rounded-2xl p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>{drill.title}</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--c-2)' }}>{drill.whyItMatters}</p>
            <p className="text-xs mt-2" style={{ color: 'var(--c-3)' }}><strong style={{ color: 'var(--c-2)' }}>Listen for:</strong> {drill.listenFor}</p>
          </div>
          <div className={`grid gap-3 ${drill.items.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {drill.items.map((item) => (
              <div key={item.korean} className="rounded-xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-3xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{item.korean}</span>
                  <SpeakButton text={item.korean} size="sm" />
                </div>
                <p className="text-sm font-mono font-bold mt-2" style={{ color: 'var(--c-accent-text)' }}>{item.romanized}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--c-2)' }}>{item.meaning}</p>
                <p className="text-xs mt-2" style={{ color: 'var(--c-3)' }}>{item.focus}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
