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
          Hangul leren voor Nederlandstaligen
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>
          네덜란드어 원어민을 위한 안내 · Gids voor Native Dutch speakers — Je hebt meer voorsprong dan je denkt
        </p>
      </div>

      {/* ── Head-starts ────────────────────────────────────── */}
      <div className="rounded-2xl p-6 space-y-3"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
        <p className="font-bold" style={{ color: '#6ee7b7' }}>Jouw voordeel als Nederlander</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-2)' }}>
          De Nederlandse fonologie geeft je een paar unieke voordelen ten opzichte van Engelstaligen. Klanken zoals de 'oe' en de 'ng' zitten al in ons systeem. Toch heeft het Koreaans zijn eigen nuances: zie het Nederlands als een startpunt, niet als een exacte kopie.
        </p>
      </div>

      {/* ── Advantages ─────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Klanken die je al kent</SectionHead>

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
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>Grootste voordeel</span>
                </div>
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅡ starts from de 'eu' (deur, neus)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  De klank ㅡ /ɯ/ bestaat niet direct in het Nederlands, maar onze 'eu' (zoals in <em>deur</em> of <em>neus</em>) komt heel dichtbij. De truc: begin bij de 'eu', maar trek je lippen helemaal plat en breed (niet gerond). Dit is veel makkelijker voor ons dan voor Engelstaligen!
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="크다" gloss="kr ≈ 'kreu' (zonder r)" />
                  <WordChip korean="기름" gloss="olie" />
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
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅜ = Onze 'oe' (boek, moe)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  Dit is een perfecte match. Waar Engelsen vaak moeite hebben met 'oo' vs 'u', kunnen wij gewoon onze 'oe' uit <em>boek</em> gebruiken.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="우유" gloss="melk — 'oe-joe'" />
                  <WordChip korean="구두" gloss="schoenen" />
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
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅔ ≈ De 'ee' (been, steen)</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  De lange Nederlandse 'ee' in <em>been</em> of <em>steen</em> is bijna identiek aan de Koreaanse ㅔ. In het moderne Koreaans klinkt dit hetzelfde als ㅐ.
                </p>
              </div>
            </div>
          </div>

          {/* Final consonant devoicing */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.4)' }}>
            <div className="space-y-1.5">
              <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>Eindmedeklinkers: 'Hond' vs 'Honden'</h3>
              <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                Wij zijn al gewend dat letters aan het einde van een woord anders klinken. Denk aan <em>hond</em> (je zegt een 't'). Koreaans doet precies dit: aan het einde van een lettergreep worden veel medeklinkers 'stille stops'.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Challenges ─────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>De Valkuilen</SectionHead>

        <div className="space-y-3">

          {/* ㄹ */}
          <div className="glass-card rounded-2xl p-5 space-y-2"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-accent-text)' }}>ㄹ</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>Let op</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㄹ — Gebruik NIET je Nederlandse 'r'</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  De Nederlandse huig-r of rollende r (zoals in <em>rood</em> of <em>groot</em>) bestaat niet in het Koreaans. De ㄹ aan het begin van een woord is een 'flap': je tikt heel kort met je tongpunt tegen het gehemelte (net achter je tanden). Het lijkt meer op een hele zachte 'd' of de Spaanse 'r' in <em>pero</em>.
                </p>
              </div>
            </div>
          </div>

          {/* ㅓ vs ㅗ */}
          <div className="glass-card rounded-2xl p-5 space-y-2"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-start gap-4">
              <div className="flex gap-2 flex-shrink-0">
                <span className="text-4xl korean-serif font-black leading-none" style={{ color: 'var(--c-vowel-text)' }}>ㅓ</span>
                <span className="text-4xl korean-serif font-black leading-none" style={{ color: 'var(--c-vowel-text)' }}>ㅗ</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>De 'o' verwarring</h3>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  In het Nederlands hebben we de 'o' van <em>bos</em> en de 'o' van <em>zo</em>. 
                  <br/>• ㅗ is als onze 'o' in <strong>zo</strong> of <strong>boot</strong> (lippen tuiten!).
                  <br/>• ㅓ is meer open en ongerond, vergelijkbaar met de 'u' in het Engelse <strong>cup</strong>. Luister goed naar het verschil!
                </p>
              </div>
            </div>
          </div>

          {/* ㅢ */}
          <div className="glass-card rounded-2xl p-5 space-y-2"
            style={{ borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-vowel-text)' }}>ㅢ</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>Gevaarlijk</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅢ is NIET de Nederlandse 'ui'</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  Hoewel het er hetzelfde uitziet (ui), klinkt het heel anders. De Koreaanse ㅢ begint bij de vlakke ㅡ-klank en glijdt dan naar een 'ie'. De Nederlandse 'ui' in <em>huis</em> is veel ronder en komt uit de keel. Vermijd deze reflex!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Tips ───────────────────────────────────────────── */}
      <section className="space-y-3">
        <SectionHead>Praktische Tips</SectionHead>
        <div className="glass-card rounded-2xl p-5 space-y-3 text-sm" style={{ color: 'var(--c-2)' }}>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Blaas harder</strong> — Koreaanse medeklinkers met een streepje extra (ㅋ, ㅌ, ㅍ, ㅊ) hebben een veel sterkere luchtstoot nodig dan onze k, t, en p. Blaas een papiertje weg!</p>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Vertrouw op IPA</strong> — Als Nederlander ben je vaak bekender met klanktekens. De IPA-symbolen op de kaarten vertellen je precies waar je tong moet staan.</p>
          <p>• <strong style={{ color: 'var(--c-1)' }}>Spanning in de keel</strong> — De dubbele medeklinkers (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ) vragen om een gespannen keel. Het klinkt bijna alsof je de klank 'afknijpt'.</p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Klaar om te oefenen?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            Begin met de klinkers — Dutch gives you a strong head start on ㅜ and a practical starting point for ㅡ.
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
