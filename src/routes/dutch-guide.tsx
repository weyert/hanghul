import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'

export const Route = createFileRoute('/dutch-guide')({
  component: DutchGuidePage,
  head: () => ({
    meta: [{ title: 'Dutch Speaker\'s Guide — 한글 배우기' }],
  }),
})

// ─── Atoms ────────────────────────────────────────────────────────────

function WordChip({ korean, gloss }: { korean: string; gloss: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <span className="korean-text font-bold" style={{ color: 'var(--c-1)' }}>{korean}</span>
      <span style={{ color: 'var(--c-4)' }}>·</span>
      <span style={{ color: 'var(--c-3)' }}>{gloss}</span>
    </div>
  )
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>{children}</h2>
}

// ─── Page ─────────────────────────────────────────────────────────────

function DutchGuidePage() {
  const enabled = useBooleanFlagValue(FLAGS.DUTCH_GUIDE, false)

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-3xl mx-auto">

      {/* ── Header ─────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>
          Hangul leren als Nederlandstalige
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>
          네덜란드어 원어민을 위한 안내 · Guide for Dutch speakers — you have more head-starts than you think
        </p>
      </div>

      {/* ── Head-starts ────────────────────────────────────── */}
      <div className="rounded-2xl p-6 space-y-3"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
        <p className="font-bold" style={{ color: '#6ee7b7' }}>Jouw voorsprong op Engelstaligen</p>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          Dutch phonology gives you several sounds that English speakers have to build from scratch. The hardest vowel for English speakers — ㅡ — is something you already produce every day.
        </p>
      </div>

      {/* ── Advantages ─────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Klanken die goed aansluiten — Sounds that map across</SectionHead>

        <div className="space-y-3">

          {/* ㅡ */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.6)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-vowel-text)' }}>ㅡ</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>Your biggest advantage</span>
                </div>
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅡ ≈ Dutch "eu" (deur, neus, deuk)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  The unrounded central vowel that English speakers struggle most with is already in your mouth. The Dutch vowel in <em>deur</em>, <em>neus</em>, or <em>leuk</em> is very close — ㅡ sits slightly higher and more central, but you're already 90% of the way there. English speakers have to build this sound from nothing.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="크다" gloss="크 ≈ 'kr' like kreu" />
                  <WordChip korean="기름" gloss="oil" />
                  <WordChip korean="으음" gloss="hmm" />
                </div>
              </div>
            </div>
          </div>

          {/* ㅜ */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.6)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-vowel-text)' }}>ㅜ</span>
              <div className="space-y-1.5">
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅜ = Dutch "oe" (boek, moe, rood)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  An exact match. Dutch "oe" and Korean ㅜ are the same rounded back vowel. The "oe" in <em>boek</em> or <em>moe</em> is precisely ㅜ.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="우유" gloss="milk — 우 = oe" />
                  <WordChip korean="구두" gloss="shoes" />
                </div>
              </div>
            </div>
          </div>

          {/* ㅔ */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.6)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-vowel-text)' }}>ㅔ</span>
              <div className="space-y-1.5">
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅔ ≈ Dutch "ee" (been, steen)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  The Dutch long "ee" in <em>been</em> or <em>steen</em> is very close to Korean ㅔ. Slightly more open in Korean, but you'll be understood immediately.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="에너지" gloss="energy — 에 ≈ ee" />
                  <WordChip korean="세상" gloss="world" />
                </div>
              </div>
            </div>
          </div>

          {/* Lenis stops */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.5)' }}>
            <div className="flex items-start gap-4">
              <div className="flex gap-1.5 flex-shrink-0">
                {['ㅂ','ㄷ','ㄱ'].map(c => (
                  <span key={c} className="text-3xl korean-serif font-black leading-none"
                    style={{ color: 'var(--c-accent-text)' }}>{c}</span>
                ))}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>Lax stops ≈ Dutch initial b, d (bal, dag)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  Korean lax consonants ㅂ, ㄷ, ㄱ are unaspirated — no burst of air. Dutch initial "b" (bal) and "d" (dag) are similarly lenis and unaspirated, making these feel familiar. English speakers, by contrast, have to actively suppress the puff of air they produce for "b" and "d".
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="바다" gloss="ㅂ ≈ Dutch b in 'bal'" />
                  <WordChip korean="다리" gloss="ㄷ ≈ Dutch d in 'dag'" />
                </div>
              </div>
            </div>
          </div>

          {/* Final consonant devoicing */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.4)' }}>
            <div className="space-y-1.5">
              <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>Final position — familiar concept</h3>
              <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                Dutch devoices final consonants: <em>hond</em> is pronounced /hɔnt/, <em>bed</em> is /bɛt/. Korean has a related phenomenon — at syllable end, ㄱ, ㅋ, and ㄲ all neutralise to the same unreleased velar stop, and similarly for the other stop positions. The concept of consonants behaving differently at syllable boundaries is already intuitive to you.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Challenges ─────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Jouw uitdagingen — Your challenges</SectionHead>

        <div className="space-y-3">

          {/* Tense consonants */}
          <div className="glass-card rounded-2xl p-5 space-y-3"
            style={{ borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>Hard</span>
              <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>Tense consonants — ㄲ ㄸ ㅃ ㅆ ㅉ</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--c-3)' }}>
              These don't exist in Dutch (or English). Tense consonants are produced with a glottal constriction — you tighten your throat just before the sound, and absolutely no air escapes. They sound almost like a suppressed, held version of the corresponding lax stop. Minimal pairs:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              {([
                { lax: 'ㅂ 불', asp: 'ㅍ 풀', ten: 'ㅃ 뿔', laxm: 'fire', aspm: 'grass', tenm: 'horn' },
              ] as const).map((row, i) => (
                <div key={i} className="contents">
                  <div className="rounded-xl p-2" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <div className="korean-text font-bold">{row.lax}</div>
                    <div className="text-xs" style={{ color: 'var(--c-4)' }}>Lax · {row.laxm}</div>
                  </div>
                  <div className="rounded-xl p-2" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <div className="korean-text font-bold">{row.asp}</div>
                    <div className="text-xs" style={{ color: 'var(--c-4)' }}>Aspirated · {row.aspm}</div>
                  </div>
                  <div className="rounded-xl p-2" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <div className="korean-text font-bold">{row.ten}</div>
                    <div className="text-xs" style={{ color: 'var(--c-4)' }}>Tense · {row.tenm}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aspirated stronger */}
          <div className="glass-card rounded-2xl p-5 space-y-2"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>Medium</span>
              <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>Aspirated consonants — ㅋ ㅌ ㅍ ㅊ are stronger than Dutch k, t, p</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--c-3)' }}>
              Dutch "k" (kat), "t" (tak), "p" (pot) are aspirated — but Korean ㅋ, ㅌ, ㅍ, ㅊ push much more air. Hold a piece of paper in front of your mouth: Dutch "k" makes it flutter slightly; Korean ㅋ should make it blow. Practise exaggerating the air burst.
            </p>
          </div>

          {/* ㄹ */}
          <div className="glass-card rounded-2xl p-5 space-y-2"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-accent-text)' }}>ㄹ</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>Medium</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㄹ — not the Dutch "r"</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  At syllable start, ㄹ is an alveolar flap — the tongue tip taps the ridge behind the teeth once and bounces off. The "tt" in American English <em>butter</em> or <em>water</em> is flapped the same way (it sounds like a quick "d" even though the letter is "t"), as is the single "r" in Spanish <em>pero</em>. It is <em>not</em> the Dutch uvular or velar "r" (as in <em>rood</em>, <em>groot</em>). At syllable end it settles into a clear "l" like <em>bal</em>.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="라디오" gloss="radio — flap at start" />
                  <WordChip korean="달" gloss="moon — l at end" />
                </div>
              </div>
            </div>
          </div>

          {/* ㅓ */}
          <div className="glass-card rounded-2xl p-5 space-y-2"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-vowel-text)' }}>ㅓ</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>Medium</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅓ — between Dutch "eu" and "a"</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  ㅡ is close to Dutch "eu" (deur). ㅓ is different — it's more open, with the jaw dropping lower than for "eu". Unlike "eu", the lips are <strong style={{ color: 'var(--c-2)' }}>not rounded</strong>; keep them neutral and flat. Think of the tongue dropping from the "eu" position toward "a" (bad) while your lips stay spread — closer to the "u" in English "cup" than to any Dutch vowel.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="어머니" gloss="mother" />
                  <WordChip korean="버스" gloss="bus" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Dutch–Korean sound table ────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Snelle vergelijking — Quick comparison</SectionHead>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
                  {['Dutch sound', 'Example word', 'Korean', 'Notes'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide"
                      style={{ color: 'var(--c-3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  { dutch: 'eu', example: 'deur, neus',  korean: 'ㅡ', note: 'Very close — slightly higher in Korean' },
                  { dutch: 'oe', example: 'boek, moe',   korean: 'ㅜ', note: 'Essentially identical' },
                  { dutch: 'ee', example: 'been, steen',  korean: 'ㅔ', note: 'Close — ㅔ is slightly more open' },
                  { dutch: 'aa', example: 'bad, laat',    korean: 'ㅏ', note: 'Similar; Dutch aa is a touch more back' },
                  { dutch: 'b (bal)', example: 'bal, boek', korean: 'ㅂ', note: 'Both lenis, unaspirated' },
                  { dutch: 'd (dag)', example: 'dag, dus', korean: 'ㄷ', note: 'Both lenis, unaspirated' },
                  { dutch: 'ng (lang)', example: 'lang, ring', korean: 'ㅇ (end)', note: 'Identical — ŋ' },
                ] as const).map(({ dutch, example, korean, note }) => (
                  <tr key={dutch} style={{ borderBottom: '1px solid var(--c-border-sub)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-row-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    <td className="px-4 py-3 font-bold font-mono" style={{ color: 'var(--c-accent-text)' }}>{dutch}</td>
                    <td className="px-4 py-3 italic" style={{ color: 'var(--c-3)' }}>{example}</td>
                    <td className="px-4 py-3 korean-text text-xl font-black" style={{ color: 'var(--c-1)' }}>{korean}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--c-3)' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Tips ───────────────────────────────────────────── */}
      <section className="space-y-3">
        <SectionHead>Praktische tips</SectionHead>
        <div className="glass-card rounded-2xl p-5 space-y-3 text-sm" style={{ color: 'var(--c-2)' }}>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Use IPA as a reference</strong> — Dutch speakers are generally comfortable with phonetic notation. When in doubt about a Korean sound, check the IPA symbol. It's more precise than romanization.</p>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Don't bring your Dutch "r" to ㄹ</strong> — the uvular Dutch "r" (back of the throat) is very different from the Korean alveolar flap. Actively suppress your "r" reflex and tap the tongue tip instead.</p>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Exaggerate aspiration</strong> — Your Dutch aspirated stops (k, t, p) are good but Korean aspirated consonants (ㅋ ㅌ ㅍ) go further. Over-aspirate while learning.</p>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Avoid romanization</strong> — "eu" in Korean romanization doesn't sound like Dutch "eu". Trust your ears and the audio, not the Latin spelling.</p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Klaar om te oefenen?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            Begin met de klinkers — your Dutch phonology means you'll find ㅡ and ㅜ almost immediately familiar.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/vowels"
            className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
            Vowels →
          </Link>
          <Link to="/quiz"
            className="btn-ghost whitespace-nowrap inline-flex items-center font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer"
            style={{ color: 'var(--c-1)' }}>
            Quiz
          </Link>
        </div>
      </div>

    </div>
  )
}
