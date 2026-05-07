export interface SentencePattern {
  id: string
  pattern: string
  romanized: string
  meaning: string
  meaningNl?: string
  example: string
  exampleRomanized: string
  exampleMeaning: string
  exampleMeaningNl?: string
}

export interface ContrastPair {
  id: string
  title: string
  whyItMatters: string
  whyItMattersNl?: string
  listenFor: string
  listenForNl?: string
  items: Array<{
    korean: string
    romanized: string
    meaning: string
    meaningNl?: string
    focus: string
    focusNl?: string
  }>
}

export const SENTENCE_PATTERNS: SentencePattern[] = [
  {
    id: 'this-is',
    pattern: '이거예요',
    romanized: 'i-geo-ye-yo',
    meaning: 'This is it / This one',
    meaningNl: 'Dit is het / deze',
    example: '이거예요?',
    exampleRomanized: 'i-geo-ye-yo?',
    exampleMeaning: 'Is this the one?',
    exampleMeaningNl: 'Is dit de juiste?',
  },
  {
    id: 'please-give',
    pattern: '... 주세요',
    romanized: '... ju-se-yo',
    meaning: 'Please give me ... / ... please',
    meaningNl: 'Geef me alstublieft ... / ... graag',
    example: '물 주세요',
    exampleRomanized: 'mul ju-se-yo',
    exampleMeaning: 'Water, please',
    exampleMeaningNl: 'Water graag',
  },
  {
    id: 'where-is',
    pattern: '... 어디예요?',
    romanized: '... eo-di-ye-yo?',
    meaning: 'Where is ... ?',
    meaningNl: 'Waar is ...?',
    example: '화장실 어디예요?',
    exampleRomanized: 'hwa-jang-sil eo-di-ye-yo?',
    exampleMeaning: 'Where is the bathroom?',
    exampleMeaningNl: 'Waar is het toilet?',
  },
  {
    id: 'exists',
    pattern: '... 있어요 / 없어요',
    romanized: '... i-sseo-yo / eop-seo-yo',
    meaning: 'There is ... / There is no ...',
    meaningNl: 'Er is ... / er is geen ...',
    example: '와이파이 있어요?',
    exampleRomanized: 'wa-i-pa-i i-sseo-yo?',
    exampleMeaning: 'Is there Wi-Fi?',
    exampleMeaningNl: 'Is er wifi?',
  },
]

export const CONTRAST_DRILLS: ContrastPair[] = [
  {
    id: 'g-k-kk',
    title: 'ㄱ / ㅋ / ㄲ',
    whyItMatters: 'Beginners often hear these as just one “k” sound, but Korean distinguishes plain, aspirated, and tense stops.',
    whyItMattersNl: 'Beginners horen deze vaak als een enkele k-klank, maar Koreaans maakt onderscheid tussen gewone, geaspireerde en gespannen plofklanken.',
    listenFor: 'Airflow first: ㅋ has the strongest burst, ㄲ has the tightest sound, ㄱ is the plain middle value.',
    listenForNl: 'Luister eerst naar lucht: ㅋ heeft de sterkste luchtstoot, ㄲ klinkt het strakst, ㄱ zit als gewone klank in het midden.',
    items: [
      { korean: '불고기', romanized: 'bul-go-gi', meaning: 'bulgogi', meaningNl: 'bulgogi', focus: 'ㄱ plain', focusNl: 'ㄱ gewoon' },
      { korean: '코', romanized: 'ko', meaning: 'nose', meaningNl: 'neus', focus: 'ㅋ aspirated', focusNl: 'ㅋ geaspireerd' },
      { korean: '꽃', romanized: 'kkot', meaning: 'flower', meaningNl: 'bloem', focus: 'ㄲ tense', focusNl: 'ㄲ gespannen' },
    ],
  },
  {
    id: 'b-p-pp',
    title: 'ㅂ / ㅍ / ㅃ',
    whyItMatters: 'This contrast changes word identity fast and is hard if you rely on English-style “b” and “p”.',
    whyItMattersNl: 'Dit contrast verandert snel de betekenis van een woord en is lastig als je vertrouwt op Nederlandse b en p.',
    listenFor: 'ㅍ pushes air out; ㅃ is tight and clipped; ㅂ is the plain series with little aspiration.',
    listenForNl: 'ㅍ duwt lucht naar buiten; ㅃ is strak en kort; ㅂ is de gewone reeks met weinig aspiratie.',
    items: [
      { korean: '불', romanized: 'bul', meaning: 'fire', meaningNl: 'vuur', focus: 'ㅂ plain', focusNl: 'ㅂ gewoon' },
      { korean: '풀', romanized: 'pul', meaning: 'grass', meaningNl: 'gras', focus: 'ㅍ aspirated', focusNl: 'ㅍ geaspireerd' },
      { korean: '뿔', romanized: 'ppul', meaning: 'horn', meaningNl: 'hoorn', focus: 'ㅃ tense', focusNl: 'ㅃ gespannen' },
    ],
  },
  {
    id: 'eo-a',
    title: 'ㅓ / ㅏ',
    whyItMatters: 'These two open vowels are one of the most common beginner confusions.',
    whyItMattersNl: 'Deze twee open klinkers zijn een van de meest voorkomende beginnersverwarringen.',
    listenFor: 'ㅏ is brighter and more forward; ㅓ is more central and unrounded.',
    listenForNl: 'ㅏ klinkt helderder en meer naar voren; ㅓ is centraler en ongerond.',
    items: [
      { korean: '어머니', romanized: 'eo-meo-ni', meaning: 'mother', meaningNl: 'moeder', focus: 'ㅓ open central', focusNl: 'ㅓ open centraal' },
      { korean: '아이', romanized: 'a-i', meaning: 'child', meaningNl: 'kind', focus: 'ㅏ open front', focusNl: 'ㅏ open vooraan' },
    ],
  },
  {
    id: 'o-u',
    title: 'ㅗ / ㅜ',
    whyItMatters: 'Both are rounded, but one is higher and backer while the other sits slightly higher in the mouth.',
    whyItMattersNl: 'Beide zijn gerond, maar ze liggen niet op dezelfde plek in de mond.',
    listenFor: 'ㅗ is tighter and higher in the mouth; ㅜ is deeper and more “oo”-like.',
    listenForNl: 'ㅗ klinkt strakker en hoger in de mond; ㅜ klinkt dieper en meer als oe.',
    items: [
      { korean: '오이', romanized: 'o-i', meaning: 'cucumber', meaningNl: 'komkommer', focus: 'ㅗ', focusNl: 'ㅗ' },
      { korean: '우유', romanized: 'u-yu', meaning: 'milk', meaningNl: 'melk', focus: 'ㅜ', focusNl: 'ㅜ' },
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
