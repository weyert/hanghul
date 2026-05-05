import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'

export const Route = createFileRoute('/english-guide')({
  component: EnglishGuidePage,
  head: () => ({
    meta: [{ title: 'English Speaker\'s Guide — 한글 배우기' }],
  }),
})

// ─── Shared atoms ────────────────────────────────────────────────────

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
  return (
    <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>{children}</h2>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

function EnglishGuidePage() {
  const enabled = useBooleanFlagValue(FLAGS.ENGLISH_GUIDE, false)

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
          Learning Hangul as an English Speaker
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>
          영어 원어민을 위한 안내 — Which sounds transfer, which will trip you up, and why romanization isn't your friend
        </p>
      </div>

      {/* ── Good news ──────────────────────────────────────── */}
      <div className="rounded-2xl p-6 space-y-3"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
        <p className="font-bold" style={{ color: '#6ee7b7' }}>The good news</p>
        <ul className="text-sm space-y-2" style={{ color: 'var(--c-2)' }}>
          <li>• Hangul is perfectly phonemic — unlike English spelling, one character maps to one sound (or a small, predictable set based on position)</li>
          <li>• You can learn to <em>read</em> all syllables within a few days; fluency comes from practising sounds, not memorising spelling rules</li>
          <li>• Around half the consonants are direct matches to sounds you already make in English</li>
          <li>• Every syllable is a neat block: (consonant) + vowel + (optional final consonant) — no hidden complexity</li>
        </ul>
      </div>

      {/* ── Sounds that transfer ───────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Sounds that transfer directly</SectionHead>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {([
            { char: 'ㄴ', roman: 'n', hint: 'as in "no"',      example: '나비', meaning: 'butterfly' },
            { char: 'ㅁ', roman: 'm', hint: 'as in "me"',       example: '마음', meaning: 'heart'     },
            { char: 'ㅅ', roman: 's', hint: 'as in "so"',       example: '사랑', meaning: 'love'      },
            { char: 'ㅎ', roman: 'h', hint: 'as in "hot"',      example: '하늘', meaning: 'sky'       },
            { char: 'ㅏ', roman: 'a', hint: '"a" in "father"',  example: '아이', meaning: 'child'     },
            { char: 'ㅣ', roman: 'i', hint: '"ee" in "bee"',    example: '이름', meaning: 'name'      },
            { char: 'ㅜ', roman: 'u', hint: '"oo" in "moon"',   example: '우유', meaning: 'milk'      },
            { char: 'ㅗ', roman: 'o', hint: '"o" in "go"',      example: '오리', meaning: 'duck'      },
          ] as const).map(({ char, roman, hint, example, meaning }) => (
            <div key={char} className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-card)' }}>
              <span className="text-3xl font-black korean-serif flex-shrink-0 leading-none" style={{ color: 'var(--c-1)' }}>{char}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-bold text-sm" style={{ color: 'var(--c-accent-text)' }}>{roman}</span>
                  <span className="text-xs" style={{ color: 'var(--c-4)' }}>{hint}</span>
                </div>
                <div className="text-xs mt-0.5">
                  <span className="korean-text font-semibold" style={{ color: 'var(--c-2)' }}>{example}</span>
                  <span className="ml-1.5" style={{ color: 'var(--c-4)' }}>· {meaning}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Challenges ─────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Your 5 biggest challenges</SectionHead>
        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          English contrasts two consonant categories: voiced (b, d, g) and voiceless (p, t, k). Korean has{' '}
          <strong style={{ color: 'var(--c-2)' }}>three</strong> — and two of its vowels simply don't exist in English.
        </p>

        <div className="space-y-3">

          {/* 1. Three-way stops */}
          <div className="glass-card rounded-2xl p-5 space-y-4"
            style={{ borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>Hard</span>
                <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>The three-way stop distinction</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                English only contrasts voiced vs voiceless. Korean has three types for each stop position — lax, aspirated, and tense. Mixing them up changes the meaning of words entirely.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {([
                { char: 'ㅂ', label: 'Lax',       word: '불', meaning: 'fire',  desc: 'No air burst — between English b and p' },
                { char: 'ㅍ', label: 'Aspirated',  word: '풀', meaning: 'grass', desc: 'Strong air burst — like English p, but stronger' },
                { char: 'ㅃ', label: 'Tense',      word: '뿔', meaning: 'horn',  desc: 'Glottally held — no air escapes at all' },
              ] as const).map(({ char, label, word, meaning, desc }) => (
                <div key={char} className="rounded-xl p-3 space-y-1"
                  style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="text-2xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{char}</div>
                  <div className="text-xs font-bold" style={{ color: 'var(--c-accent-text)' }}>{label}</div>
                  <div className="korean-text font-semibold" style={{ color: 'var(--c-2)' }}>{word}</div>
                  <div className="text-xs" style={{ color: 'var(--c-4)' }}>{meaning}</div>
                  <div className="text-xs leading-tight" style={{ color: 'var(--c-3)' }}>{desc}</div>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'var(--c-4)' }}>
              The same three-way pattern applies to ㄱ / ㅋ / ㄲ, ㄷ / ㅌ / ㄸ, and ㅈ / ㅊ / ㅉ.
            </p>
          </div>

          {/* 2. ㄹ */}
          <div className="glass-card rounded-2xl p-5 space-y-3"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-accent-text)' }}>ㄹ</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>Medium</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㄹ — the Korean flap</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  At syllable <strong style={{ color: 'var(--c-2)' }}>start</strong>, ㄹ is neither "r" nor "l". It's an alveolar flap — the tongue tip taps the ridge behind your teeth once and bounces off immediately. In American English the "tt" in <em>"butter"</em> or <em>"water"</em> is flapped the same way (it ends up sounding like a quick "d", but the letter in those words is "t"). Don't roll it; don't drawl it.
                  At syllable <strong style={{ color: 'var(--c-2)' }}>end</strong>, it's a clear lateral "l" like "tall".
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="라디오" gloss="radio — ㄹ is a flap" />
                  <WordChip korean="달" gloss="moon — ㄹ is a clear l" />
                  <WordChip korean="별" gloss="star — ㄹ at end" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. ㅡ */}
          <div className="glass-card rounded-2xl p-5 space-y-3"
            style={{ borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-vowel-text)' }}>ㅡ</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>Hard</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅡ — no English equivalent</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  This unrounded central vowel doesn't exist in English. Try it: say "ee" (ㅣ), keep your lips in that spread-wide position, then relax your tongue to a flat, neutral position. Or say "hmm" with your lips spread slightly open rather than pursed. It sounds a bit like a grunt.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="크다" gloss="big" />
                  <WordChip korean="으음" gloss="the Korean 'hmm'" />
                  <WordChip korean="기름" gloss="oil" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. ㅓ vs ㅏ */}
          <div className="glass-card rounded-2xl p-5 space-y-3"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-4xl korean-serif font-black leading-none" style={{ color: 'var(--c-vowel-text)' }}>ㅓ</span>
                <span className="text-lg font-black" style={{ color: 'var(--c-4)' }}>vs</span>
                <span className="text-4xl korean-serif font-black leading-none" style={{ color: 'var(--c-vowel-text)' }}>ㅏ</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d' }}>Medium</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅓ vs ㅏ — two open vowels</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  ㅏ is the "a" in "father" — jaw drops, tongue flat and low. ㅓ is harder to place: the closest English approximation is the "u" in "cup" or "uh" in "but" — an open, unrounded vowel with the jaw dropping a touch lower than for those English words. It is <em>not</em> "eo" as in "leopard" — that romanization misleads.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl p-3 text-center"
                    style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <div className="text-2xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>아</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--c-3)' }}>Open, forward — "father"</div>
                    <div className="text-xs" style={{ color: 'var(--c-4)' }}>아이 · child</div>
                  </div>
                  <div className="rounded-xl p-3 text-center"
                    style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <div className="text-2xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>어</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--c-3)' }}>Open, unrounded — "u" in "cup"</div>
                    <div className="text-xs" style={{ color: 'var(--c-4)' }}>어머니 · mother</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ㅇ */}
          <div className="glass-card rounded-2xl p-5 space-y-3"
            style={{ borderLeft: '3px solid rgba(16,185,129,0.5)' }}>
            <div className="flex items-start gap-4">
              <span className="text-5xl korean-serif font-black flex-shrink-0 leading-none"
                style={{ color: 'var(--c-accent-text)' }}>ㅇ</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>Easy once you know the rule</span>
                  <h3 className="font-bold" style={{ color: 'var(--c-1)' }}>ㅇ — context-dependent</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                  At syllable <strong style={{ color: 'var(--c-2)' }}>start</strong>, ㅇ is completely silent — every syllable block must start with a consonant visually, so ㅇ is the placeholder when there's no actual initial consonant. At syllable <strong style={{ color: 'var(--c-2)' }}>end</strong>, it's "ng" as in "sing". Perfectly consistent once you know it.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <WordChip korean="아이" gloss="ai — ㅇ is silent at start" />
                  <WordChip korean="강" gloss="river — ㅇ = ng at end" />
                  <WordChip korean="영어" gloss="English language" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Reading strategy ───────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>Reading in blocks, not letters</SectionHead>
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <p className="text-sm" style={{ color: 'var(--c-2)' }}>
            Korean writes syllables as visual blocks, not a linear letter string. Train yourself to read each block as a single unit of sound. The word 한글 is two blocks: 한 (han) and 글 (geul).
          </p>
          <div className="flex justify-center gap-8 flex-wrap py-2">
            {([
              { block: '한', decomp: 'ㅎ + ㅏ + ㄴ', sound: '"han"' },
              { block: '글', decomp: 'ㄱ + ㅡ + ㄹ', sound: '"geul"' },
              { block: '어', decomp: 'ㅇ + ㅓ',      sound: '"eo"'   },
            ] as const).map(({ block, decomp, sound }) => (
              <div key={block} className="text-center">
                <div className="text-5xl korean-serif font-black" style={{ color: 'var(--c-1)' }}>{block}</div>
                <div className="text-xs mt-1.5 font-mono" style={{ color: 'var(--c-3)' }}>{decomp}</div>
                <div className="text-xs mt-0.5 font-semibold" style={{ color: 'var(--c-4)' }}>{sound}</div>
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--c-4)' }}>
            Vowels that hang to the right of the initial consonant are vertical (ㅏ ㅓ ㅣ…); vowels that sit below are horizontal (ㅗ ㅜ ㅡ…). The final consonant, when present, sits at the bottom of the block.
          </p>
        </div>
      </section>

      {/* ── Romanization warning ───────────────────────────── */}
      <section className="space-y-3">
        <SectionHead>Why romanization will slow you down</SectionHead>
        <div className="rounded-xl p-5 space-y-3"
          style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <p className="text-sm font-semibold" style={{ color: '#fcd34d' }}>
            ⚠ Romanization is a scaffold — remove it as soon as possible
          </p>
          <div className="space-y-2 text-sm" style={{ color: 'var(--c-2)' }}>
            <p>• <strong style={{ color: 'var(--c-1)' }}>"eu" for ㅡ</strong> doesn't sound like any English "eu". Your brain will hear the wrong sound.</p>
            <p>• <strong style={{ color: 'var(--c-1)' }}>"eo" for ㅓ</strong> is not the "eo" in "leopard" or "people".</p>
            <p>• <strong style={{ color: 'var(--c-1)' }}>ㄱ</strong> appears as "g", "k", or even "ng" depending on position — the romanization changes, the character doesn't.</p>
          </div>
          <p className="text-sm" style={{ color: 'var(--c-3)' }}>
            Use audio as your phonetic reference. Hangul was designed in 1443 to precisely represent sounds — trust the script itself.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Ready to practise?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            Start with the consonants and vowels, then drill with the quiz's Listen mode — it's the most effective way to train your ear without romanization.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/consonants"
            className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
            Consonants →
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
