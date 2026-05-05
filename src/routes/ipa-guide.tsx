import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'

export const Route = createFileRoute('/ipa-guide')({
  component: IpaGuidePage,
  head: () => ({
    meta: [{ title: 'IPA Guide — 한글 배우기' }],
  }),
})

// ─── Atoms ────────────────────────────────────────────────────────────

function SectionHead({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>{children}</h2>
}

function Sym({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono font-bold text-base px-1.5 py-0.5 rounded"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-accent-text)' }}>
      {children}
    </span>
  )
}

function Tag({ lang }: { lang: 'EN' | 'NL' }) {
  return (
    <span className="text-xs font-black px-1.5 py-0.5 rounded-full flex-shrink-0"
      style={{
        background: lang === 'EN' ? 'rgba(99,102,241,0.15)' : 'rgba(16,185,129,0.15)',
        color: lang === 'EN' ? '#a5b4fc' : '#6ee7b7',
      }}>
      {lang}
    </span>
  )
}

function HangulTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="korean-text font-black text-lg" style={{ color: 'var(--c-1)' }}>{children}</span>
  )
}

interface SymbolRowProps {
  symbol: React.ReactNode
  hangul: string
  en: string
  nl: string
}

function SymbolRow({ symbol, hangul, en, nl }: SymbolRowProps) {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-2.5">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-mono font-black w-10 text-center flex-shrink-0"
          style={{ color: 'var(--c-accent-text)' }}>{symbol}</div>
        <HangulTag>{hangul}</HangulTag>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-start gap-2">
          <Tag lang="EN" />
          <span style={{ color: 'var(--c-2)' }}>{en}</span>
        </div>
        <div className="flex items-start gap-2">
          <Tag lang="NL" />
          <span style={{ color: 'var(--c-2)' }}>{nl}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

function IpaGuidePage() {
  const enabled = useBooleanFlagValue(FLAGS.IPA_GUIDE, false)

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
          IPA Reference for Korean
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>
          국제 음성 기호 — Decode the phonetic symbols shown on character cards and in the Pronounce tool
        </p>
      </div>

      {/* ── What is IPA ────────────────────────────────────── */}
      <div className="rounded-2xl p-5 space-y-2"
        style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>What is IPA?</p>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          The International Phonetic Alphabet assigns one unique symbol to each distinct human speech sound.
          Unlike spelling or romanization, IPA never changes meaning: <Sym>ʌ</Sym> always refers to the same
          vowel quality, regardless of which language you're describing. When you see <Sym>/ɾ/</Sym> on a character card,
          it tells you exactly where to put your tongue — no guessing from an inconsistent spelling.
        </p>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          This page covers only the symbols that appear in the Korean data on this site.
          Symbols in <strong style={{ color: 'var(--c-2)' }}>slash brackets</strong> /like this/ are phonemic
          (underlying sound); actual pronunciation may vary slightly by position.
        </p>
      </div>

      {/* ── Diacritics first ───────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Modifiers — the small marks that change everything</SectionHead>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          These aren't separate symbols — they attach to a base letter to signal how the sound is produced.
          Understanding them unlocks the entire three-way Korean stop distinction.
        </p>

        <div className="space-y-3">

          {/* ʰ aspirated */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(99,102,241,0.6)' }}>
            <div className="flex items-start gap-4">
              <div className="text-4xl font-mono font-black flex-shrink-0 w-12 text-center leading-none pt-1"
                style={{ color: 'var(--c-accent-text)' }}>ʰ</div>
              <div className="space-y-2 flex-1">
                <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>
                  Superscript ʰ = <em>aspirated</em> — a strong burst of air
                </p>
                <p className="text-sm" style={{ color: 'var(--c-2)' }}>
                  Hold your palm an inch from your mouth and say the sound — you should feel a clear puff of air.
                  Korean aspirated consonants go further than English ones.
                </p>
                <div className="flex items-start gap-2 text-sm">
                  <Tag lang="EN" />
                  <span style={{ color: 'var(--c-2)' }}>
                    The "p" in "pot" is aspirated (you feel air); the "p" in "spot" is not. Korean <Sym>pʰ</Sym> is like "pot" but even stronger.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Tag lang="NL" />
                  <span style={{ color: 'var(--c-2)' }}>
                    De "k" in "kat" is geaspireerd, maar Koreaans <Sym>kʰ</Sym> gaat verder — blaas een papier weg met je adem.
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 text-sm">
                  {[['kʰ','ㅋ'],['tʰ','ㅌ'],['pʰ','ㅍ'],['tɕʰ','ㅊ']].map(([ipa, h]) => (
                    <span key={ipa} className="rounded-lg px-2.5 py-1 font-mono font-bold"
                      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-accent-text)' }}>
                      {ipa} <span className="korean-text font-black text-base" style={{ color: 'var(--c-1)' }}>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ͈ tense */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
            <div className="flex items-start gap-4">
              <div className="text-4xl font-mono font-black flex-shrink-0 w-12 text-center leading-none pt-1"
                style={{ color: '#fca5a5' }}>͈</div>
              <div className="space-y-2 flex-1">
                <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>
                  Combining diacritic ͈ = <em>tense</em> — glottal constriction, no air
                </p>
                <p className="text-sm" style={{ color: 'var(--c-2)' }}>
                  Just before the sound, you tighten your throat (the glottis). No air escapes at all.
                  The result sounds sharp and clipped — almost like a suppressed version of the base consonant.
                  Neither English nor Dutch has this category.
                </p>
                <div className="flex items-start gap-2 text-sm">
                  <Tag lang="EN" />
                  <span style={{ color: 'var(--c-2)' }}>
                    Try saying "uh-oh" — the catch in your throat between the two syllables is the glottal constriction. Apply that just before the consonant.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Tag lang="NL" />
                  <span style={{ color: 'var(--c-2)' }}>
                    Vergelijkbaar met het keelgeluid vóór een klinker in "aan-eten" — knijp je keel dicht, dan de medeklinker zonder lucht.
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 text-sm">
                  {[['k͈','ㄲ'],['t͈','ㄸ'],['p͈','ㅃ'],['s͈','ㅆ'],['t͈ɕ','ㅉ']].map(([ipa, h]) => (
                    <span key={ipa} className="rounded-lg px-2.5 py-1 font-mono font-bold"
                      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: '#fca5a5' }}>
                      {ipa} <span className="korean-text font-black text-base" style={{ color: 'var(--c-1)' }}>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Vowel symbols ──────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Vowel symbols</SectionHead>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          Most vowel symbols look and sound as you'd expect. These are the ones that don't.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <SymbolRow
            symbol="ʌ"
            hangul="ㅓ"
            en='"u" in "cup" or "uh" in "but" — open and unrounded. Not "eo" as two letters.'
            nl='Open en ongerond — de Engelse "u" in "cup" komt het dichtst. NIET de "o" in "bos" (die is gerond).'
          />

          <SymbolRow
            symbol="ɯ"
            hangul="ㅡ"
            en='No English equivalent. Say "oo" without rounding your lips — or "ee" with the tongue pulled back and relaxed.'
            nl='Geen equivalent. Start vanuit de "eu"-positie (deur), maar houd je lippen plat en ongerond. Het lippenronden is precies wat je NIET doet.'
          />

          <SymbolRow
            symbol="ɛ"
            hangul="ㅐ"
            en='"a" in "cat" — open front vowel. (In modern Korean ㅐ and ㅔ have largely merged.)'
            nl='"e" in "bed" of "het" — open voor, ongerond.'
          />

          <SymbolRow
            symbol="ø"
            hangul="ㅚ"
            en='No English equivalent — this is the historical value of ㅚ. In modern spoken Korean it has merged with ㅔ /e/.'
            nl='"eu" in "deur" of "neus" — dit is de historische waarde; modern Koreaans spreekt ㅚ als ㅔ uit.'
          />

          <SymbolRow
            symbol="e"
            hangul="ㅔ"
            en='Close to "e" in "bed" but slightly higher — between "bed" and "bay".'
            nl='Dichtbij de "ee" in "meer" maar wat opener. Klinkt vertrouwd.'
          />

          <SymbolRow
            symbol="j / w"
            hangul="ㅑ ㅛ ㅠ ㅕ / ㅘ ㅝ ㅞ ㅙ ㅟ"
            en='"j" is the "y" in "yes". "w" is the "w" in "we". They glide into the vowel that follows: ja = "ya", wʌ = "wuh".'
            nl='"j" is de "j" in "ja". "w" is de "w" in "web". Ze glijden naar de volgende klinker: ja = "ja", wʌ = "wa".'
          />

          <SymbolRow
            symbol="ɯi"
            hangul="ㅢ"
            en='Starts at ɯ (see above), then glides to i ("ee"). Two distinct movements in one syllable.'
            nl='Begin bij de vlakke ɯ-klank, glijd naar "ie". NIET als de Nederlandse "ui" in "huis" — dat is een heel andere combinatie.'
          />

        </div>

        <p className="text-xs" style={{ color: 'var(--c-4)' }}>
          Symbols <Sym>a</Sym> <Sym>i</Sym> <Sym>u</Sym> <Sym>o</Sym> sound broadly as expected in both languages and need no special note.
        </p>
      </section>

      {/* ── Consonant symbols ──────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Consonant symbols</SectionHead>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <SymbolRow
            symbol="ɾ"
            hangul="ㄹ (start)"
            en='Alveolar flap — tongue tip taps the ridge once and bounces off. Same sound as the flapped "tt" in American "butter" or "water" (which sounds like a quick "d" even though the letter is "t").'
            nl='Alveolair tik — tongpunt tikt éénmaal tegen het tandvlees. NIET de Nederlandse huig-r of velaire r. Vergelijkbaar met de Spaanse "r" in "pero".'
          />

          <SymbolRow
            symbol="ŋ"
            hangul="ㅇ (end)"
            en='"ng" in "sing" or "king" — the back of the tongue lifts to the soft palate. The same sound that ends "sing".'
            nl='"ng" in "lang" of "ring" — precies dezelfde klank. Dit is een vertrouwd geluid voor Nederlandstaligen.'
          />

          <SymbolRow
            symbol="dʑ"
            hangul="ㅈ"
            en='Like "j" in "jazz" but with the tongue slightly further forward and raised — a palatalized affricate. The ʑ symbol signals a palatal quality, like saying "j" with a "zh" colour.'
            nl='Vergelijkbaar met de Engelse "j" in "jazz" — geen direct Nederlands equivalent. De tong ligt iets verder naar voren dan bij een gewone "j".'
          />

          <SymbolRow
            symbol="tɕʰ"
            hangul="ㅊ"
            en='Aspirated palatalized "ch" — like "ch" in "cheese" with a strong puff of air. The tɕ part is the affricate; ʰ adds the burst.'
            nl='Geaspireerde palatale affricaat — dichtbij "tsj" uitgesproken met een duidelijke luchtstoot. Soms beschreven als "ch" in het Engelse "cheese".'
          />

          <SymbolRow
            symbol="ɡ / b / d"
            hangul="ㄱ ㅂ ㄷ (lax)"
            en='IPA uses voiced symbols for the underlying phoneme, but initial ㄱ ㅂ ㄷ are actually unvoiced in Korean. They become voiced between vowels (e.g. 아기 agi). The IPA represents the phoneme; position determines the actual voicing.'
            nl='IPA gebruikt stemhebbende symbolen voor het foneem, maar begin-ㄱ ㅂ ㄷ zijn in werkelijkheid stemloos. Tussen klinkers worden ze stemhebbend. De realisatie hangt af van de positie.'
          />

          <SymbolRow
            symbol="n / m / h / s"
            hangul="ㄴ ㅁ ㅎ ㅅ"
            en='These match their English values directly. No surprises.'
            nl='Deze kloppen direct met de Nederlandse waarden. Geen verrassingen.'
          />

        </div>
      </section>

      {/* ── Quick reference table ──────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Quick reference — all symbols on this site</SectionHead>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
                  {['IPA', 'Korean', 'Closest English', 'Closest Dutch'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide"
                      style={{ color: 'var(--c-3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  { ipa: 'ʌ',   k: 'ㅓ',          en: 'u in "cup"',              nl: 'geen — open, ongerond'         },
                  { ipa: 'ɯ',   k: 'ㅡ',          en: '"oo" unrounded',           nl: 'eu (deur) maar ongerond'       },
                  { ipa: 'ɛ',   k: 'ㅐ',          en: 'a in "cat"',              nl: 'e in "bed"'                    },
                  { ipa: 'ø',   k: 'ㅚ (hist.)',  en: 'geen equivalent',          nl: 'eu in "deur" (hist. waarde)'  },
                  { ipa: 'ɾ',   k: 'ㄹ (begin)',  en: 'flapped t in "butter"',   nl: 'niet jouw r — tongpunttik'    },
                  { ipa: 'ŋ',   k: 'ㅇ (einde)',  en: 'ng in "sing"',            nl: 'ng in "lang"'                  },
                  { ipa: 'dʑ',  k: 'ㅈ',          en: 'j in "jazz" (palataal)',  nl: 'Engelse j in "jazz"'           },
                  { ipa: 'tɕʰ', k: 'ㅊ',          en: 'ch in "cheese" + air',    nl: 'tsj + luchtstoot'              },
                  { ipa: 'kʰ',  k: 'ㅋ',          en: 'k in "key" + strong air', nl: 'k in "kat" maar sterker'       },
                  { ipa: 'tʰ',  k: 'ㅌ',          en: 't in "top" + strong air', nl: 't in "tafel" maar sterker'     },
                  { ipa: 'pʰ',  k: 'ㅍ',          en: 'p in "pen" + strong air', nl: 'p in "pan" maar sterker'       },
                  { ipa: 'k͈',  k: 'ㄲ',          en: 'tense k — no air',        nl: 'gespannen k — geen lucht'      },
                  { ipa: 't͈',  k: 'ㄸ',          en: 'tense t — no air',        nl: 'gespannen t — geen lucht'      },
                  { ipa: 'p͈',  k: 'ㅃ',          en: 'tense p — no air',        nl: 'gespannen p — geen lucht'      },
                  { ipa: 's͈',  k: 'ㅆ',          en: 'tense s — sharper',       nl: 'gespannen s — scherper'        },
                  { ipa: 't͈ɕ', k: 'ㅉ',          en: 'tense j — no air',        nl: 'gespannen dzj — geen lucht'    },
                ] as const).map(({ ipa, k, en, nl }) => (
                  <tr key={ipa} style={{ borderBottom: '1px solid var(--c-border-sub)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-row-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    <td className="px-4 py-2.5 font-mono font-bold" style={{ color: 'var(--c-accent-text)' }}>{ipa}</td>
                    <td className="px-4 py-2.5 korean-text font-black text-lg" style={{ color: 'var(--c-1)' }}>{k}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--c-2)' }}>{en}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--c-2)' }}>{nl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Worked example ─────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Worked example — 한글 /han.ɡɯl/</SectionHead>
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex justify-center gap-10 flex-wrap py-2">
            {([
              { block: '한', ipa: '/han/', parts: 'h + a + n', note: 'All familiar symbols' },
              { block: '글', ipa: '/ɡɯl/', parts: 'ɡ + ɯ + l', note: 'ɡ is lax (unvoiced initial); ɯ is the unrounded back vowel' },
            ] as const).map(({ block, ipa, parts, note }) => (
              <div key={block} className="text-center space-y-1.5">
                <div className="text-5xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{block}</div>
                <div className="font-mono font-bold text-sm" style={{ color: 'var(--c-accent-text)' }}>{ipa}</div>
                <div className="text-xs font-mono" style={{ color: 'var(--c-3)' }}>{parts}</div>
                <div className="text-xs max-w-36" style={{ color: 'var(--c-4)' }}>{note}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center" style={{ color: 'var(--c-4)' }}>
            You can see the full IPA breakdown of any Korean text in the{' '}
            <Link to="/pronounce" className="underline underline-offset-2" style={{ color: 'var(--c-accent-text)' }}>
              Pronounce tool
            </Link>{' '}
            — enable IPA display in settings first.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div>
          <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>See IPA on character cards</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            IPA display can be toggled — once enabled, every card and the Pronounce tool show the phonemic transcription.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/consonants"
            className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
            Consonants →
          </Link>
          <Link to="/pronounce"
            className="btn-ghost whitespace-nowrap inline-flex items-center font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer"
            style={{ color: 'var(--c-1)' }}>
            Pronounce tool
          </Link>
        </div>
      </div>

    </div>
  )
}
