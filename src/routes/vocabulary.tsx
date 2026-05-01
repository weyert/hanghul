import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useBooleanFlagValue } from '@openfeature/react-sdk'
import { FLAGS } from '../flags'
import { SpeakButton } from '../components/SpeakButton'

export const Route = createFileRoute('/vocabulary')({
  component: VocabularyPage,
  head: () => ({
    meta: [{ title: 'Vocabulary — 한글 배우기' }],
  }),
})

interface Phrase { korean: string; romanized: string; meaning: string }
interface Category { id: string; label: string; korean: string; accent: string; phrases: Phrase[] }

const CATEGORIES: Category[] = [
  {
    id: 'greetings', label: 'Greetings', korean: '인사', accent: 'violet',
    phrases: [
      { korean: '안녕하세요', romanized: 'an-nyeong-ha-se-yo', meaning: 'Hello (formal)' },
      { korean: '안녕', romanized: 'an-nyeong', meaning: 'Hi / Bye (informal)' },
      { korean: '안녕히 계세요', romanized: 'an-nyeong-hi gye-se-yo', meaning: 'Goodbye (you stay)' },
      { korean: '안녕히 가세요', romanized: 'an-nyeong-hi ga-se-yo', meaning: 'Goodbye (you go)' },
      { korean: '반갑습니다', romanized: 'ban-gap-seum-ni-da', meaning: 'Nice to meet you' },
      { korean: '잘 지냈어요?', romanized: 'jal ji-naess-eo-yo', meaning: 'How have you been?' },
    ],
  },
  {
    id: 'polite', label: 'Polite Phrases', korean: '예의 표현', accent: 'emerald',
    phrases: [
      { korean: '감사합니다', romanized: 'gam-sa-ham-ni-da', meaning: 'Thank you (formal)' },
      { korean: '고마워요', romanized: 'go-ma-wo-yo', meaning: 'Thank you (informal)' },
      { korean: '죄송합니다', romanized: 'joe-song-ham-ni-da', meaning: 'I am sorry (formal)' },
      { korean: '미안해요', romanized: 'mi-an-hae-yo', meaning: 'Sorry (informal)' },
      { korean: '괜찮아요', romanized: 'gwaen-cha-na-yo', meaning: "It's okay / Are you okay?" },
      { korean: '천만에요', romanized: 'cheon-man-e-yo', meaning: "You're welcome" },
    ],
  },
  {
    id: 'questions', label: 'Questions', korean: '질문', accent: 'amber',
    phrases: [
      { korean: '이게 뭐예요?', romanized: 'i-ge mwo-ye-yo', meaning: 'What is this?' },
      { korean: '얼마예요?', romanized: 'eol-ma-ye-yo', meaning: 'How much is it?' },
      { korean: '어디예요?', romanized: 'eo-di-ye-yo', meaning: 'Where is it?' },
      { korean: '화장실이 어디예요?', romanized: 'hwa-jang-si-ri eo-di-ye-yo', meaning: 'Where is the bathroom?' },
      { korean: '한국어 할 줄 알아요?', romanized: 'han-gu-geo hal jul a-ra-yo', meaning: 'Do you speak Korean?' },
      { korean: '천천히 말해 주세요', romanized: 'cheon-cheon-hi ma-lhae ju-se-yo', meaning: 'Please speak slowly' },
    ],
  },
  {
    id: 'numbers', label: 'Numbers', korean: '숫자', accent: 'rose',
    phrases: [
      { korean: '일', romanized: 'il', meaning: '1 (Sino-Korean)' },
      { korean: '이', romanized: 'i', meaning: '2' },
      { korean: '삼', romanized: 'sam', meaning: '3' },
      { korean: '사', romanized: 'sa', meaning: '4' },
      { korean: '오', romanized: 'o', meaning: '5' },
      { korean: '십', romanized: 'sip', meaning: '10' },
      { korean: '백', romanized: 'baek', meaning: '100' },
      { korean: '천', romanized: 'cheon', meaning: '1,000' },
    ],
  },
  {
    id: 'food', label: 'Food & Drink', korean: '음식', accent: 'orange',
    phrases: [
      { korean: '물', romanized: 'mul', meaning: 'Water' },
      { korean: '밥', romanized: 'bap', meaning: 'Rice / Meal' },
      { korean: '김치', romanized: 'gim-chi', meaning: 'Kimchi' },
      { korean: '불고기', romanized: 'bul-go-gi', meaning: 'Bulgogi (marinated beef)' },
      { korean: '맛있어요', romanized: 'ma-si-sseo-yo', meaning: 'It is delicious' },
      { korean: '메뉴 주세요', romanized: 'me-nyu ju-se-yo', meaning: 'Menu please' },
    ],
  },
  {
    id: 'places', label: 'Places', korean: '장소', accent: 'teal',
    phrases: [
      { korean: '서울', romanized: 'seo-ul', meaning: 'Seoul' },
      { korean: '학교', romanized: 'hak-gyo', meaning: 'School' },
      { korean: '병원', romanized: 'byeong-won', meaning: 'Hospital' },
      { korean: '은행', romanized: 'eun-haeng', meaning: 'Bank' },
      { korean: '편의점', romanized: 'pyeon-ui-jeom', meaning: 'Convenience store' },
      { korean: '지하철', romanized: 'ji-ha-cheol', meaning: 'Subway' },
    ],
  },
]

const ACCENT_COLORS: Record<string, { text: string; border: string; bg: string; badge: string }> = {
  violet: { text: '#c4b5fd', border: 'rgba(139,92,246,0.3)',  bg: 'rgba(109,40,217,0.12)',  badge: 'rgba(109,40,217,0.2)' },
  emerald: { text: '#6ee7b7', border: 'rgba(16,185,129,0.3)', bg: 'rgba(5,150,105,0.12)',   badge: 'rgba(5,150,105,0.2)' },
  amber:   { text: '#fcd34d', border: 'rgba(245,158,11,0.3)', bg: 'rgba(180,83,9,0.12)',    badge: 'rgba(180,83,9,0.2)' },
  rose:    { text: '#fda4af', border: 'rgba(244,63,94,0.3)',  bg: 'rgba(190,18,60,0.12)',   badge: 'rgba(190,18,60,0.2)' },
  orange:  { text: '#fdba74', border: 'rgba(249,115,22,0.3)', bg: 'rgba(194,65,12,0.12)',   badge: 'rgba(194,65,12,0.2)' },
  teal:    { text: '#5eead4', border: 'rgba(20,184,166,0.3)', bg: 'rgba(15,118,110,0.12)',  badge: 'rgba(15,118,110,0.2)' },
}

function PhraseRow({ phrase, accent }: { phrase: Phrase; accent: string }) {
  const c = ACCENT_COLORS[accent]
  return (
    <tr
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '')}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl korean-text font-bold text-white">{phrase.korean}</span>
          <SpeakButton text={phrase.korean} size="sm" />
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-semibold" style={{ color: c.text }}>{phrase.romanized}</td>
      <td className="px-4 py-3 text-sm text-zinc-400">{phrase.meaning}</td>
    </tr>
  )
}

function VocabularyPage() {
  const enabled = useBooleanFlagValue(FLAGS.VOCABULARY, false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  if (!enabled) {
    return (
      <div className="text-center py-24 text-zinc-600">
        <p className="text-base font-medium">This feature is not enabled.</p>
      </div>
    )
  }

  const visible = activeCategory ? CATEGORIES.filter((c) => c.id === activeCategory) : CATEGORIES

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Vocabulary</h1>
        <p className="text-zinc-500 mt-1.5 text-sm">어휘 Eo-hwi — Common words and phrases with audio pronunciation</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
          style={activeCategory === null
            ? { background: '#7c3aed', color: '#fff' }
            : { background: 'rgba(255,255,255,0.06)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }
          }
        >
          All
        </button>
        {CATEGORIES.map((cat) => {
          const c = ACCENT_COLORS[cat.accent]
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
              style={isActive
                ? { background: c.badge, color: c.text, border: `1px solid ${c.border}` }
                : { background: 'rgba(255,255,255,0.06)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }
              }
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#e4e4e7' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#a1a1aa' }}
            >
              {cat.label}
              <span className="ml-1.5 korean-text text-xs opacity-70">{cat.korean}</span>
            </button>
          )
        })}
      </div>

      {/* Tables */}
      <div className="space-y-8">
        {visible.map((cat) => {
          const c = ACCENT_COLORS[cat.accent]
          return (
            <section key={cat.id}>
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span className="px-2 py-0.5 rounded-full text-xs font-black" style={{ background: c.badge, color: c.text, border: `1px solid ${c.border}` }}>
                  {cat.phrases.length}
                </span>
                {cat.label}
                <span className="korean-text opacity-50 font-normal">{cat.korean}</span>
              </h2>
              <div className="glass-card rounded-2xl overflow-hidden" style={{ borderColor: c.border }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-zinc-600 uppercase tracking-wide">Korean</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-zinc-600 uppercase tracking-wide">Romanization</th>
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-zinc-600 uppercase tracking-wide hidden sm:table-cell">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.phrases.map((p) => <PhraseRow key={p.korean} phrase={p} accent={cat.accent} />)}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
