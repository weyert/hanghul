import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { PronunciationModel } from '../components/PronunciationModel'

export const Route = createFileRoute('/batchim')({
  component: BatchimPage,
  head: () => ({
    meta: [{ title: 'Batchim Basics — 한글 배우기' }],
  }),
})

const EXAMPLES = [
  { korean: '국', romanized: 'guk', note: 'ㄱ at the bottom is a final stop: short and unreleased.' },
  { korean: '밥', romanized: 'bap', note: 'ㅂ at the bottom sounds like a final p-stop, not an English b.' },
  { korean: '달', romanized: 'dal', note: 'ㄹ at the bottom sounds like an l.' },
  { korean: '강', romanized: 'gang', note: 'ㅇ at the bottom is ng.' },
]

function BatchimPage() {
  const enabled = useBooleanFlagValue(FLAGS.BATCHIM_LESSON, false)
  const pronunciationModel = useBooleanFlagValue(FLAGS.PRONUNCIATION_MODEL, false)

  if (!enabled) {
    return <div className="text-center py-24 text-zinc-600"><p className="text-base font-medium">This feature is not enabled.</p></div>
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Batchim Basics</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>받침 Batchim — Final consonants are where Korean starts to sound less like romanization and more like Korean.</p>
      </div>

      {pronunciationModel && <PronunciationModel compact />}

      <div className="glass-card rounded-2xl p-6 space-y-3">
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          <strong style={{ color: 'var(--c-1)' }}>Batchim</strong> means the consonant at the bottom of a syllable block. Beginners usually meet the letter first in initial position, then get confused when it sounds different at the end. That is normal.
        </p>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          The Korean word is <strong style={{ color: 'var(--c-2)' }}>받침</strong>, usually romanized here as <strong style={{ color: 'var(--c-2)' }}>batchim</strong> and pronounced roughly like <em>bat-chim</em>. It literally means a <em>support</em> or <em>prop</em>, because this consonant sits underneath the rest of the syllable block and “supports” it from below.
        </p>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          Tiny pronunciation note: in real Korean speech, the final consonant in <strong style={{ color: 'var(--c-2)' }}>받</strong> does not sound like a strong English <em>d</em>. It ends as a short final stop, so learners often hear the whole word more like <em>bat-chim</em> than <em>bad-chim</em>.
        </p>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          Start with three rules: final stops are short, final ㅇ is <em>ng</em>, and final ㄹ sounds like <em>l</em>. You do not need every sound-change rule on day one.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>Beginner way to think about it</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: 'Top vs bottom',
              body: 'The same consonant can behave one way at the start of a block and another way at the bottom. Batchim just means “bottom position”.',
            },
            {
              title: 'Short ending sound',
              body: 'Many batchim sounds end quickly. Do not force a big extra vowel after them.',
            },
            {
              title: 'Learn a few patterns first',
              body: 'You do not need every exception immediately. Start with final ng, final l, and short stop endings.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{item.title}</p>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--c-3)' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>First rules to remember</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'Stop finals', body: 'ㄱ ㄷ ㅂ-family finals end short and unreleased. Do not add a big vowel after them.' },
            { title: 'ㅇ final', body: 'At the bottom of a block, ㅇ is always ng.' },
            { title: 'ㄹ final', body: 'At the bottom of a block, ㄹ is an l-sound.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{item.title}</p>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--c-3)' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New: 7 Final Sounds Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>The "7 Final Sounds" Rule</h2>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          Even though many different consonants can sit at the bottom, they all simplify into just <strong>7 basic sounds</strong> when they are at the very end of a word.
        </p>
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }}>
                <th className="text-left px-4 py-3 font-bold" style={{ color: 'var(--c-3)' }}>Ending Letter</th>
                <th className="text-left px-4 py-3 font-bold" style={{ color: 'var(--c-3)' }}>Actual Sound</th>
                <th className="text-left px-4 py-3 font-bold" style={{ color: 'var(--c-3)' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                { letters: 'ㄱ, ㅋ, ㄲ', sound: 'k (stop)', ex: '책 (Book)' },
                { letters: 'ㄴ', sound: 'n', ex: '눈 (Eye)' },
                { letters: 'ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ', sound: 't (stop)', ex: '옷 (Clothes)' },
                { letters: 'ㄹ', sound: 'l', ex: '달 (Moon)' },
                { letters: 'ㅁ', sound: 'm', ex: '몸 (Body)' },
                { letters: 'ㅂ, ㅍ', sound: 'p (stop)', ex: '입 (Mouth)' },
                { letters: 'ㅇ', sound: 'ng', ex: '강 (River)' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
                  <td className="px-4 py-3 font-black korean-text text-base" style={{ color: 'var(--c-1)' }}>{row.letters}</td>
                  <td className="px-4 py-3 font-mono font-bold" style={{ color: 'var(--c-accent-text)' }}>[{row.sound}]</td>
                  <td className="px-4 py-3" style={{ color: 'var(--c-2)' }}>{row.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* New: Liaison (Yeon-eum) Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>Liaison: The Jumping Sound (연음)</h2>
        <div className="glass-card rounded-2xl p-6 space-y-4" style={{ borderLeft: '4px solid var(--c-accent)' }}>
          <p className="text-sm" style={{ color: 'var(--c-2)' }}>
            This is the most important rule for speaking fluid Korean. When a block has a <strong>final consonant</strong> and the <em>next</em> block starts with the "hollow circle" <strong>ㅇ</strong>, the consonant jumps up to fill that empty spot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--c-3)' }}>Written</p>
              <div className="text-4xl font-black korean-serif" style={{ color: 'var(--c-1)' }}>밥이</div>
              <p className="text-sm mt-1 font-mono" style={{ color: 'var(--c-3)' }}>bap-i</p>
            </div>
            <div className="text-2xl" style={{ color: 'var(--c-accent)' }}>→</div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--c-3)' }}>Spoken</p>
              <div className="text-4xl font-black korean-serif" style={{ color: 'var(--c-accent-text)' }}>바비</div>
              <p className="text-sm mt-1 font-mono" style={{ color: 'var(--c-accent-text)' }}>ba-bi</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed italic" style={{ color: 'var(--c-3)' }}>
            Why? Because ㅇ is a silent placeholder. Korean prefers the sound to flow smoothly into the next vowel rather than stopping and starting again.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>Worked examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAMPLES.map((example) => (
            <div key={example.korean} className="glass-card rounded-2xl p-5 space-y-2">
              <div className="flex items-end gap-3">
                <span className="text-4xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{example.korean}</span>
                <span className="text-sm font-mono font-bold" style={{ color: 'var(--c-accent-text)' }}>{example.romanized}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--c-3)' }}>{example.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Next step</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>Use the builder and pronunciation tool together: build a block, then check how the final consonant behaves.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/builder" className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">Builder →</Link>
          <Link to="/pronounce" className="btn-ghost whitespace-nowrap inline-flex items-center font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ color: 'var(--c-1)' }}>Pronounce</Link>
        </div>
      </div>
    </div>
  )
}
