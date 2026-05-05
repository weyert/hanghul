import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'

export const Route = createFileRoute('/romanization-guide')({
  component: RomanizationGuidePage,
  head: () => ({
    meta: [{ title: 'Romanization Guide — 한글 배우기' }],
  }),
})

// ─── Atoms ────────────────────────────────────────────────────────────

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold" style={{ color: 'var(--c-1)' }}>{children}</h2>
  )
}

function CodeChip({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded px-1.5 py-0.5 text-sm font-mono"
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-2)' }}>
      {children}
    </code>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

function RomanizationGuidePage() {
  const enabled = useBooleanFlagValue(FLAGS.ROMANIZATION_GUIDE, false)

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
          Romanization: What It Is and Why to Move Past It
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>
          로마자 표기법 안내 — A tool for the first week, not a crutch for life
        </p>
      </div>

      {/* ── What is romanization ───────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>What is romanization?</SectionHead>
        <div className="text-sm space-y-3" style={{ color: 'var(--c-2)' }}>
          <p>
            Romanization is the practice of writing Korean sounds using the Latin alphabet — the same letters used in English,
            Dutch, French, and most Western languages. Because Korean has its own script (Hangul), romanization was developed
            to help non-Korean speakers approximate the sounds without first learning to read 한글.
          </p>
          <p>
            You will encounter romanization on street signs in Seoul, in passports, in tourist materials, and in most beginner
            textbooks aimed at English-speaking learners. It is everywhere — and it is a trap.
          </p>
        </div>
      </section>

      {/* ── Systems ────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>The three main systems</SectionHead>
        <div className="space-y-3">

          {/* RR */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(99,102,241,0.6)' }}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>Revised Romanization of Korean (RR)</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>Official since 2000</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--c-2)' }}>
                The South Korean government standard. Used on all road signs, official publications, and passports.
                If you see "Seoul" (서울), "Busan" (부산), or "Hangang" (한강), you're reading RR.
              </p>
              <p className="text-sm" style={{ color: 'var(--c-3)' }}>
                Designed to be <em>typable</em> without special characters — which means it makes phonetic compromises.
                The letter "g" can represent a soft sound closer to English "k" at the start of words.
              </p>
            </div>
          </div>

          {/* MR */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>McCune–Reischauer (MR)</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(245,158,11,0.12)', color: '#fcd34d' }}>Academic / older texts</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--c-2)' }}>
                Developed in 1937, used in North Korea and much older scholarship. Uses diacritics (ŏ, ŭ) to
                represent sounds that don't exist in English. More phonetically precise than RR, but requires
                special characters that most keyboards can't type.
              </p>
            </div>
          </div>

          {/* Yale */}
          <div className="glass-card rounded-2xl p-5"
            style={{ borderLeft: '3px solid rgba(156,163,175,0.5)' }}>
            <div className="space-y-2">
              <span className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>Yale Romanization</span>
              <p className="text-sm" style={{ color: 'var(--c-2)' }}>
                A linguist's tool, not a learner's tool. Maps Korean morphophonology systematically but looks
                nothing like how the words sound. You will only encounter it in academic Korean linguistics papers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── One character, many Roman spellings ───────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>One character, many spellings — why romanization breaks down</SectionHead>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          Korean consonants change sound depending on their position in a syllable and what surrounds them.
          Romanization attempts to capture this by changing the spelling — which means the same character
          gets written differently every time. Take ㄱ:
        </p>

        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--c-border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--c-3)' }}>Context</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--c-3)' }}>Example</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--c-3)' }}>RR spelling</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--c-3)' }}>Actual sound</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ctx: 'Word-initial', ex: '가다', rr: 'gada',  sound: 'k (unaspirated, lax)' },
                { ctx: 'After a vowel', ex: '아기', rr: 'agi',   sound: 'g (voiced)' },
                { ctx: 'Word-final', ex: '책', rr: 'chaek', sound: 'k (unreleased)' },
                { ctx: 'Doubled (tense)', ex: '까다', rr: 'kkada', sound: 'kk (tense, no air)' },
                { ctx: 'Before ㅎ', ex: '각하', rr: 'gakha', sound: 'kh (aspirated)' },
              ].map(({ ctx, ex, rr, sound }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--c-border)' }}>
                  <td className="px-4 py-3" style={{ color: 'var(--c-3)' }}>{ctx}</td>
                  <td className="px-4 py-3 korean-text font-bold" style={{ color: 'var(--c-1)' }}>{ex}</td>
                  <td className="px-4 py-3"><CodeChip>{rr}</CodeChip></td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--c-2)' }}>{sound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm" style={{ color: 'var(--c-3)' }}>
          If you're reading romanization, you now need to memorise <em>when</em> "g" means "k" and when
          it means "g" — which is exactly the phonological rule you'd have to learn anyway. You haven't
          saved any work; you've just added an extra layer.
        </p>
      </section>

      {/* ── Why it misleads English and Dutch speakers ─────────────── */}
      <section className="space-y-4">
        <SectionHead>Why romanization misleads your ears</SectionHead>

        <div className="space-y-3">
          {[
            {
              title: '"g" is not g',
              detail: 'ㄱ at the start of a word is romanized as "g" in RR, but it\'s unaspirated and unvoiced — closer to English "k" in "skill". Reading "gada" (가다) with a full voiced English "g" sounds wrong to Korean ears: initial ㄱ is voiceless, not voiced, so the voiced English "g" blurs the distinction with intervocalic ㄱ.',
            },
            {
              title: '"eo" is not "eo"',
              detail: 'ㅓ is romanized as "eo" but sounds like the vowel in British English "her" or "word". Most English speakers mispronounce it as "ee-oh" or "eo" (two syllables). This is one of the most common beginner mistakes.',
            },
            {
              title: '"eu" is not "oo" or "ew"',
              detail: 'ㅡ is romanized as "eu" which English speakers read as "oo" or "yoo". It\'s actually an unrounded central vowel with no English equivalent — pronounced with lips flat and spread, not rounded.',
            },
            {
              title: 'Aspirated vs. tense: the p/pp distinction disappears',
              detail: 'RR uses "b" for ㅂ, "bb" for ㅃ, and "p" for ㅍ, but an English speaker reading "b" will voice it — and initial ㅂ is unvoiced. English "b" is also unaspirated, but so is ㅂ; the mismatch is voicing. The result is a sound that doesn\'t clearly match ㅂ, ㅃ, or ㅍ.',
            },
          ].map(({ title, detail }, i) => (
            <div key={i} className="glass-card rounded-2xl p-5"
              style={{ borderLeft: '3px solid rgba(239,68,68,0.4)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--c-1)' }}>{title}</p>
              <p className="text-sm" style={{ color: 'var(--c-2)' }}>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Hangul-first case ─────────────────────────────────── */}
      <div className="rounded-2xl p-6 space-y-3"
        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)' }}>
        <p className="font-bold" style={{ color: '#a5b4fc' }}>The case for learning Hangul first</p>
        <ul className="text-sm space-y-2" style={{ color: 'var(--c-2)' }}>
          <li>• Hangul is one of the most systematic writing systems ever designed — you can learn all the letters in a few hours</li>
          <li>• Each character represents a consistent sound (with predictable rules for positional changes) — far more reliable than romanization approximations</li>
          <li>• Korean children learn to read before romanization was even standardised — it's a learner tool, not a native tool</li>
          <li>• Once you can read Hangul, every dictionary, app, and native material is open to you without a translation layer</li>
          <li>• Your pronunciation will be better from day one because you're listening to the actual sounds, not filtering them through a Latin-alphabet lens</li>
        </ul>
      </div>

      {/* ── When romanization IS useful ───────────────────────────── */}
      <section className="space-y-4">
        <SectionHead>When romanization is actually useful</SectionHead>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          Romanization isn't worthless — it serves specific, narrow purposes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'First 48 hours', detail: 'A temporary scaffold while you haven\'t yet memorised the alphabet. Use it, then put it away.' },
            { title: 'Typing your name', detail: 'Passports, hotel reservations, and airline tickets use romanization. You need to know how your name is spelled in RR.' },
            { title: 'Place names in English text', detail: 'Seoul, Busan, Jeju — you\'ll encounter Korean place names in English contexts and need to recognise them.' },
            { title: 'Teaching pronunciation to others', detail: 'Describing a Korean sound to someone who doesn\'t know Hangul. But IPA is more accurate for this purpose.' },
          ].map(({ title, detail }, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 space-y-1">
              <p className="font-semibold text-sm" style={{ color: 'var(--c-1)' }}>{title}</p>
              <p className="text-sm" style={{ color: 'var(--c-3)' }}>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── A note on this site ───────────────────────────────────── */}
      <section className="space-y-3">
        <SectionHead>How this site handles romanization</SectionHead>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          By default, this site shows romanization alongside Hangul as a reading aid. Cards show both the Korean
          character and its romanized form so you can build an initial connection. But the goal is always to
          wean yourself off it.
        </p>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          In quiz mode, you can switch to <strong style={{ color: 'var(--c-1)' }}>Hangul-first</strong> practice — where
          prompts and answer choices are shown in Korean only. This is how native Korean children learn, and it
          forces your brain to build a direct sound-to-character connection rather than routing through romanization.
        </p>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div>
          <p className="font-bold text-sm" style={{ color: 'var(--c-1)' }}>Ready to read Hangul directly?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>
            Start with the consonants — there are only 14 basic shapes, and several will already feel familiar.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/consonants"
            className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
            Learn consonants →
          </Link>
          <Link to="/quiz"
            className="btn-ghost whitespace-nowrap inline-flex items-center font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer"
            style={{ color: 'var(--c-1)' }}>
            Try a quiz
          </Link>
        </div>
      </div>

    </div>
  )
}
