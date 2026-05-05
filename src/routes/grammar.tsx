import { createFileRoute, Link } from '@tanstack/react-router'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'

export const Route = createFileRoute('/grammar')({
  component: GrammarPage,
  head: () => ({
    meta: [{ title: 'Grammar 101 — 한글 배우기' }],
  }),
})

function GrammarPage() {
  const enabled = useBooleanFlagValue(FLAGS.GRAMMAR_GUIDE, false)

  if (!enabled) {
    return <div className="text-center py-24 text-zinc-600"><p className="text-base font-medium">This feature is not enabled.</p></div>
  }

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--c-1)' }}>Grammar 101</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--c-3)' }}>문법 Mun-beop — Understanding the structure and "glue" of the Korean language</p>
      </div>

      {/* SOV Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--c-1)' }}>1. Sentence Structure: SOV</h2>
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <p className="text-sm" style={{ color: 'var(--c-2)' }}>
            In English and Dutch, we usually say <strong>Subject - Verb - Object</strong> (e.g., "I drink water"). 
            In Korean, the verb <strong>always</strong> comes at the very end: <strong>Subject - Object - Verb</strong>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="rounded-xl p-4 bg-zinc-900/50 border border-zinc-800">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">English (SVO)</p>
              <p className="text-lg">I <span className="text-blue-400">drink</span> water.</p>
            </div>
            <div className="rounded-xl p-4 bg-zinc-900/50 border border-blue-500/30">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 text-blue-400">Korean (SOV)</p>
              <p className="text-lg">나 물 <span className="text-blue-400 font-bold">마셔요</span>.</p>
              <p className="text-xs text-zinc-500 mt-1">Na mul masyeoyo (I water drink)</p>
            </div>
          </div>
          <p className="text-xs italic" style={{ color: 'var(--c-3)' }}>
            Pro tip: Since the verb is at the end, you have to listen to the very last word to know if someone is asking a question, stating a fact, or giving a command!
          </p>
        </div>
      </section>

      {/* Particles Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--c-1)' }}>2. Particles: The Language Glue</h2>
        <p className="text-sm" style={{ color: 'var(--c-2)' }}>
          Because word order can sometimes be flexible in Korean, the language uses "particles" attached to nouns to signal their role in the sentence.
        </p>

        <div className="space-y-4">
          {/* 은/는 */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-indigo-500">
            <h3 className="font-bold text-indigo-400">은 / 는 (Topic Particles)</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--c-2)' }}>
              Used to introduce a topic or contrast something. 
              <br/>• Use <strong>은</strong> after a consonant (e.g., 학생은)
              <br/>• Use <strong>는</strong> after a vowel (e.g., 나는)
            </p>
          </div>

          {/* 이/가 */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-emerald-500">
            <h3 className="font-bold text-emerald-400">이 / 가 (Subject Particles)</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--c-2)' }}>
              Identifies the specific subject of the action. 
              <br/>• Use <strong>이</strong> after a consonant (e.g., 물이)
              <br/>• Use <strong>가</strong> after a vowel (e.g., 사과가)
            </p>
          </div>

          {/* 을/를 */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-amber-500">
            <h3 className="font-bold text-amber-400">을 / 를 (Object Particles)</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--c-2)' }}>
              Marks the "object" of the sentence (the thing being acted upon). 
              <br/>• Use <strong>을</strong> after a consonant (e.g., 물을)
              <br/>• Use <strong>를</strong> after a vowel (e.g., 차를)
            </p>
          </div>
        </div>
      </section>

      {/* Summary Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--c-1)' }}>Putting it together</h2>
        <div className="glass-card rounded-2xl p-6 text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700">
            <span className="text-2xl font-black korean-serif">제<span className="text-indigo-400">가</span> 차<span className="text-amber-400">를</span> 마셔요.</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--c-3)' }}>
            Je-ga (Subject) + Cha-reul (Object) + Masyeoyo (Verb)
            <br/><strong>"I drink tea."</strong>
          </p>
        </div>
      </section>

      <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold" style={{ color: 'var(--c-1)' }}>Ready to practice?</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--c-3)' }}>Try spotting these particles in the Vocabulary section or use the Builder to create your own sentences.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/vocabulary" className="btn-primary whitespace-nowrap inline-flex items-center text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer">Vocabulary →</Link>
          <Link to="/learn" className="btn-ghost whitespace-nowrap inline-flex items-center font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer" style={{ color: 'var(--c-1)' }}>Learn Path</Link>
        </div>
      </div>
    </div>
  )
}
