export interface SentencePattern {
  id: string
  pattern: string
  romanized: string
  meaning: string
  example: string
  exampleRomanized: string
  exampleMeaning: string
}

export interface ContrastPair {
  id: string
  title: string
  whyItMatters: string
  listenFor: string
  items: Array<{
    korean: string
    romanized: string
    meaning: string
    focus: string
  }>
}

export const SENTENCE_PATTERNS: SentencePattern[] = [
  {
    id: 'this-is',
    pattern: '이거예요',
    romanized: 'i-geo-ye-yo',
    meaning: 'This is it / This one',
    example: '이거예요?',
    exampleRomanized: 'i-geo-ye-yo?',
    exampleMeaning: 'Is this the one?',
  },
  {
    id: 'please-give',
    pattern: '... 주세요',
    romanized: '... ju-se-yo',
    meaning: 'Please give me ... / ... please',
    example: '물 주세요',
    exampleRomanized: 'mul ju-se-yo',
    exampleMeaning: 'Water, please',
  },
  {
    id: 'where-is',
    pattern: '... 어디예요?',
    romanized: '... eo-di-ye-yo?',
    meaning: 'Where is ... ?',
    example: '화장실 어디예요?',
    exampleRomanized: 'hwa-jang-sil eo-di-ye-yo?',
    exampleMeaning: 'Where is the bathroom?',
  },
  {
    id: 'exists',
    pattern: '... 있어요 / 없어요',
    romanized: '... i-sseo-yo / eop-seo-yo',
    meaning: 'There is ... / There is no ...',
    example: '와이파이 있어요?',
    exampleRomanized: 'wa-i-pa-i i-sseo-yo?',
    exampleMeaning: 'Is there Wi-Fi?',
  },
]

export const CONTRAST_DRILLS: ContrastPair[] = [
  {
    id: 'g-k-kk',
    title: 'ㄱ / ㅋ / ㄲ',
    whyItMatters: 'Beginners often hear these as just one “k” sound, but Korean distinguishes plain, aspirated, and tense stops.',
    listenFor: 'Airflow first: ㅋ has the strongest burst, ㄲ has the tightest sound, ㄱ is the plain middle value.',
    items: [
      { korean: '불고기', romanized: 'bul-go-gi', meaning: 'bulgogi', focus: 'ㄱ plain' },
      { korean: '코', romanized: 'ko', meaning: 'nose', focus: 'ㅋ aspirated' },
      { korean: '꽃', romanized: 'kkot', meaning: 'flower', focus: 'ㄲ tense' },
    ],
  },
  {
    id: 'b-p-pp',
    title: 'ㅂ / ㅍ / ㅃ',
    whyItMatters: 'This contrast changes word identity fast and is hard if you rely on English-style “b” and “p”.',
    listenFor: 'ㅍ pushes air out; ㅃ is tight and clipped; ㅂ is the plain series with little aspiration.',
    items: [
      { korean: '불', romanized: 'bul', meaning: 'fire', focus: 'ㅂ plain' },
      { korean: '풀', romanized: 'pul', meaning: 'grass', focus: 'ㅍ aspirated' },
      { korean: '뿔', romanized: 'ppul', meaning: 'horn', focus: 'ㅃ tense' },
    ],
  },
  {
    id: 'eo-a',
    title: 'ㅓ / ㅏ',
    whyItMatters: 'These two open vowels are one of the most common beginner confusions.',
    listenFor: 'ㅏ is brighter and more forward; ㅓ is more central and unrounded.',
    items: [
      { korean: '어머니', romanized: 'eo-meo-ni', meaning: 'mother', focus: 'ㅓ open central' },
      { korean: '아이', romanized: 'a-i', meaning: 'child', focus: 'ㅏ open front' },
    ],
  },
  {
    id: 'o-u',
    title: 'ㅗ / ㅜ',
    whyItMatters: 'Both are rounded, but one is higher and backer while the other sits slightly higher in the mouth.',
    listenFor: 'ㅗ is tighter and higher in the mouth; ㅜ is deeper and more “oo”-like.',
    items: [
      { korean: '오이', romanized: 'o-i', meaning: 'cucumber', focus: 'ㅗ' },
      { korean: '우유', romanized: 'u-yu', meaning: 'milk', focus: 'ㅜ' },
    ],
  },
]

export function getWrongAnswerHint(characterId: string): string | null {
  const hints: Record<string, string> = {
    giyeok: 'Think “plain Korean k”: lighter than ㅋ, less tight than ㄲ.',
    digeut: 'Aim for a plain unaspirated stop, not a heavy English-style d.',
    bieup: 'Keep it light and unaspirated; do not lean all the way to English b or p.',
    kieuk: 'Use more air than ㄱ. Hold a hand in front of your mouth and feel the burst.',
    tieut: 'This needs a stronger puff of air than plain ㄷ.',
    'pieup-aspirated': 'This is the airy p-sound, not the plain ㅂ or tense ㅃ.',
    ssanggiyeok: 'Make it tight and clipped. No big puff of air.',
    ssangdigeut: 'Think tense and held, not aspirated.',
    ssangbieup: 'Keep the lips tense; no big burst of air.',
    rieul: 'At the start of a syllable, tap once with the tongue tip. Avoid an English or Dutch r.',
    eo: 'Keep the lips unrounded and the vowel open. It is not “eo” as two sounds.',
    eu: 'Start from “oo” or Dutch “eu”, then flatten the lips completely.',
    o: 'Round the lips and keep the sound higher than ㅜ.',
    u: 'Use a deeper “oo” feeling than ㅗ.',
    ae: 'Modern Korean often keeps this very close to ㅔ, so rely on exposure more than spelling.',
    e: 'Modern Korean often keeps this very close to ㅐ, so treat them as near-merger vowels for now.',
  }

  return hints[characterId] ?? null
}
