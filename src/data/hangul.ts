import type { Language } from '../contexts/LanguageContext'

export type { Language }

export interface HangulCharacter {
  id: string
  char: string
  romanization: string
  ipa: string
  name: string
  descriptions: Record<Language, string>
  examples: Array<{ korean: string; romanized: string; meaning: string }>
  category: 'basic-consonant' | 'tense-consonant' | 'basic-vowel' | 'compound-vowel'
}

export const consonants: HangulCharacter[] = [
  {
    id: 'giyeok',
    char: 'ㄱ',
    romanization: 'g/k',
    ipa: 'ɡ',
    name: '기역 Giyeok',
    descriptions: {
      en: "Like 'g' in 'go' at start; 'k' at syllable end",
      nl: "Als de 'k' in 'ski' — ongeaspireerd; aan het eind als 'k' in 'tak'",
    },
    examples: [
      { korean: '가방', romanized: 'gabang', meaning: 'bag' },
      { korean: '국', romanized: 'guk', meaning: 'soup' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'nieun',
    char: 'ㄴ',
    romanization: 'n',
    ipa: 'n',
    name: '니은 Nieun',
    descriptions: {
      en: "Like 'n' in 'no'",
      nl: "Als de 'n' in 'nee'",
    },
    examples: [
      { korean: '나비', romanized: 'nabi', meaning: 'butterfly' },
      { korean: '눈', romanized: 'nun', meaning: 'eye / snow' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'digeut',
    char: 'ㄷ',
    romanization: 'd/t',
    ipa: 'd',
    name: '디귿 Digeut',
    descriptions: {
      en: "Like 'd' in 'do' at start; 't' at syllable end",
      nl: "Als de 't' in 'step' — ongeaspireerd; aan het eind als 't' in 'rat'",
    },
    examples: [
      { korean: '다리', romanized: 'dari', meaning: 'leg / bridge' },
      { korean: '달', romanized: 'dal', meaning: 'moon' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'rieul',
    char: 'ㄹ',
    romanization: 'r/l',
    ipa: 'ɾ',
    name: '리을 Rieul',
    descriptions: {
      en: "Flapped 'r' (like the 't' in butter) at start; 'l' at end",
      nl: "Tussen 'r' en 'l' — als een getapte 'r', niet gerold zoals in Noord-NL",
    },
    examples: [
      { korean: '라디오', romanized: 'radio', meaning: 'radio' },
      { korean: '별', romanized: 'byeol', meaning: 'star' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'mieum',
    char: 'ㅁ',
    romanization: 'm',
    ipa: 'm',
    name: '미음 Mieum',
    descriptions: {
      en: "Like 'm' in 'me'",
      nl: "Als de 'm' in 'mee'",
    },
    examples: [
      { korean: '마음', romanized: 'maeum', meaning: 'heart / mind' },
      { korean: '물', romanized: 'mul', meaning: 'water' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'bieup',
    char: 'ㅂ',
    romanization: 'b/p',
    ipa: 'b',
    name: '비읍 Bieup',
    descriptions: {
      en: "Like 'b' in 'be' at start; 'p' at syllable end",
      nl: "Als de 'p' in 'spot' — ongeaspireerd; aan het eind als 'p' in 'stap'",
    },
    examples: [
      { korean: '바다', romanized: 'bada', meaning: 'sea' },
      { korean: '밥', romanized: 'bap', meaning: 'rice / meal' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'siot',
    char: 'ㅅ',
    romanization: 's',
    ipa: 's',
    name: '시옷 Siot',
    descriptions: {
      en: "Like 's' in 'so'",
      nl: "Als de 's' in 'zon' of 'zee'",
    },
    examples: [
      { korean: '사랑', romanized: 'sarang', meaning: 'love' },
      { korean: '산', romanized: 'san', meaning: 'mountain' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'ieung',
    char: 'ㅇ',
    romanization: '— / ng',
    ipa: 'ŋ',
    name: '이응 Ieung',
    descriptions: {
      en: "Silent placeholder at syllable start; 'ng' at end",
      nl: "Stom aan het begin van een lettergreep; 'ng' als in 'lang' of 'ding' aan het eind",
    },
    examples: [
      { korean: '아이', romanized: 'ai', meaning: 'child' },
      { korean: '강', romanized: 'gang', meaning: 'river' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'jieut',
    char: 'ㅈ',
    romanization: 'j',
    ipa: 'dʑ',
    name: '지읒 Jieut',
    descriptions: {
      en: "Like 'j' in 'just'",
      nl: "Als de Engelse 'j' in 'jazz' — geen directe Nederlandse equivalent",
    },
    examples: [
      { korean: '자동차', romanized: 'jadongcha', meaning: 'car' },
      { korean: '집', romanized: 'jip', meaning: 'house' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'chieut',
    char: 'ㅊ',
    romanization: 'ch',
    ipa: 'tɕʰ',
    name: '치읓 Chieut',
    descriptions: {
      en: "Like 'ch' in 'chair', aspirated",
      nl: "Als 'tsj' of de Engelse 'ch' in 'cheese' — met luchtstoot",
    },
    examples: [
      { korean: '차', romanized: 'cha', meaning: 'car / tea' },
      { korean: '책', romanized: 'chaek', meaning: 'book' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'kieuk',
    char: 'ㅋ',
    romanization: 'k',
    ipa: 'kʰ',
    name: '키읔 Kieuk',
    descriptions: {
      en: "Like 'k' in 'key', strongly aspirated",
      nl: "Als de 'k' in 'kat' — sterk geaspireerd, voelbare luchtstoot",
    },
    examples: [
      { korean: '코', romanized: 'ko', meaning: 'nose' },
      { korean: '카페', romanized: 'kape', meaning: 'café' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'tieut',
    char: 'ㅌ',
    romanization: 't',
    ipa: 'tʰ',
    name: '티읕 Tieut',
    descriptions: {
      en: "Like 't' in 'top', strongly aspirated",
      nl: "Als de 't' in 'tafel' — sterk geaspireerd, voelbare luchtstoot",
    },
    examples: [
      { korean: '태양', romanized: 'taeyang', meaning: 'sun' },
      { korean: '토끼', romanized: 'tokki', meaning: 'rabbit' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'pieup-aspirated',
    char: 'ㅍ',
    romanization: 'p',
    ipa: 'pʰ',
    name: '피읖 Pieup',
    descriptions: {
      en: "Like 'p' in 'pen', strongly aspirated",
      nl: "Als de 'p' in 'pan' — sterk geaspireerd, voelbare luchtstoot",
    },
    examples: [
      { korean: '파', romanized: 'pa', meaning: 'green onion' },
      { korean: '편지', romanized: 'pyeonji', meaning: 'letter' },
    ],
    category: 'basic-consonant',
  },
  {
    id: 'hieut',
    char: 'ㅎ',
    romanization: 'h',
    ipa: 'h',
    name: '히읗 Hieut',
    descriptions: {
      en: "Like 'h' in 'hat'",
      nl: "Als de 'h' in 'huis'",
    },
    examples: [
      { korean: '하늘', romanized: 'haneul', meaning: 'sky' },
      { korean: '행복', romanized: 'haengbok', meaning: 'happiness' },
    ],
    category: 'basic-consonant',
  },
  // Tense consonants
  {
    id: 'ssanggiyeok',
    char: 'ㄲ',
    romanization: 'kk',
    ipa: 'k͈',
    name: '쌍기역 Ssanggiyeok',
    descriptions: {
      en: "Tense 'k' — like holding breath before 'k'",
      nl: "Gespannen 'k' — span keel en mond, dan 'k' zonder lucht",
    },
    examples: [
      { korean: '꿈', romanized: 'kkum', meaning: 'dream' },
      { korean: '꽃', romanized: 'kkot', meaning: 'flower' },
    ],
    category: 'tense-consonant',
  },
  {
    id: 'ssangdigeut',
    char: 'ㄸ',
    romanization: 'tt',
    ipa: 't͈',
    name: '쌍디귿 Ssangdigeut',
    descriptions: {
      en: "Tense 't' — unaspirated and tense",
      nl: "Gespannen 't' — ongeaspireerd en gespannen, geen luchtstoot",
    },
    examples: [
      { korean: '떡', romanized: 'tteok', meaning: 'rice cake' },
      { korean: '딸', romanized: 'ttal', meaning: 'daughter' },
    ],
    category: 'tense-consonant',
  },
  {
    id: 'ssangbieup',
    char: 'ㅃ',
    romanization: 'pp',
    ipa: 'p͈',
    name: '쌍비읍 Ssangbieup',
    descriptions: {
      en: "Tense 'p' — unaspirated and tense",
      nl: "Gespannen 'p' — ongeaspireerd en gespannen, geen luchtstoot",
    },
    examples: [
      { korean: '빵', romanized: 'ppang', meaning: 'bread' },
      { korean: '빨리', romanized: 'ppalli', meaning: 'quickly' },
    ],
    category: 'tense-consonant',
  },
  {
    id: 'ssangsiot',
    char: 'ㅆ',
    romanization: 'ss',
    ipa: 's͈',
    name: '쌍시옷 Ssangsiot',
    descriptions: {
      en: "Tense 's' — sharper than single ㅅ",
      nl: "Gespannen 's' — scherper dan enkele ㅅ, bijna als fluisteren",
    },
    examples: [
      { korean: '씨', romanized: 'ssi', meaning: 'seed / title (Mr./Ms.)' },
      { korean: '싸다', romanized: 'ssada', meaning: 'to be cheap' },
    ],
    category: 'tense-consonant',
  },
  {
    id: 'ssangjieut',
    char: 'ㅉ',
    romanization: 'jj',
    ipa: 't͈ɕ',
    name: '쌍지읒 Ssangjieut',
    descriptions: {
      en: "Tense 'j' — unaspirated and tense",
      nl: "Gespannen 'dzj' — ongeaspireerd en gespannen, geen luchtstoot",
    },
    examples: [
      { korean: '짜다', romanized: 'jjada', meaning: 'to be salty' },
      { korean: '찌개', romanized: 'jjigae', meaning: 'Korean stew' },
    ],
    category: 'tense-consonant',
  },
]

export const vowels: HangulCharacter[] = [
  // Basic vowels
  {
    id: 'a',
    char: 'ㅏ',
    romanization: 'a',
    ipa: 'a',
    name: '아 A',
    descriptions: {
      en: "Like 'a' in 'father'",
      nl: "Als de 'a' in 'bad' of 'vader'",
    },
    examples: [
      { korean: '아버지', romanized: 'abeoji', meaning: 'father' },
      { korean: '나', romanized: 'na', meaning: 'I / me' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'ya',
    char: 'ㅑ',
    romanization: 'ya',
    ipa: 'ja',
    name: '야 Ya',
    descriptions: {
      en: "Like 'ya' in 'yard'",
      nl: "Als 'ja' in 'ja hoor' — 'j' + 'a'",
    },
    examples: [
      { korean: '야구', romanized: 'yagu', meaning: 'baseball' },
      { korean: '야채', romanized: 'yachae', meaning: 'vegetable' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'eo',
    char: 'ㅓ',
    romanization: 'eo',
    ipa: 'ʌ',
    name: '어 Eo',
    descriptions: {
      en: "Like 'u' in 'cup' or 'uh' in 'but' — open and unrounded",
      nl: "Open en ongerond — de Engelse 'u' in 'cup' komt het dichtst; NIET als de 'o' in 'bos' (gerond) of de 'eu'",
    },
    examples: [
      { korean: '어머니', romanized: 'eomeoni', meaning: 'mother' },
      { korean: '서울', romanized: 'seoul', meaning: 'Seoul' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'yeo',
    char: 'ㅕ',
    romanization: 'yeo',
    ipa: 'jʌ',
    name: '여 Yeo',
    descriptions: {
      en: "Like 'yuh' — ㅑ but with eo sound",
      nl: "Als 'jo' in 'jongen' — 'j' + 'o' uit 'bos'",
    },
    examples: [
      { korean: '여기', romanized: 'yeogi', meaning: 'here' },
      { korean: '여름', romanized: 'yeoreum', meaning: 'summer' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'o',
    char: 'ㅗ',
    romanization: 'o',
    ipa: 'o',
    name: '오 O',
    descriptions: {
      en: "Like 'o' in 'oh' — round lips",
      nl: "Als de 'o' in 'zo' of 'boot' — gerond",
    },
    examples: [
      { korean: '오늘', romanized: 'oneul', meaning: 'today' },
      { korean: '오빠', romanized: 'oppa', meaning: 'older brother (female speaker)' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'yo',
    char: 'ㅛ',
    romanization: 'yo',
    ipa: 'jo',
    name: '요 Yo',
    descriptions: {
      en: "Like 'yo' in 'yoga'",
      nl: "Als 'jo' in 'jota' of 'joris'",
    },
    examples: [
      { korean: '요리', romanized: 'yori', meaning: 'cooking' },
      { korean: '요즘', romanized: 'yojeum', meaning: 'nowadays' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'u',
    char: 'ㅜ',
    romanization: 'u',
    ipa: 'u',
    name: '우 U',
    descriptions: {
      en: "Like 'oo' in 'moon'",
      nl: "Als de 'oe' in 'boek' of 'moe'",
    },
    examples: [
      { korean: '우리', romanized: 'uri', meaning: 'we / our' },
      { korean: '우유', romanized: 'uyu', meaning: 'milk' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'yu',
    char: 'ㅠ',
    romanization: 'yu',
    ipa: 'ju',
    name: '유 Yu',
    descriptions: {
      en: "Like 'you'",
      nl: "Als 'joe' — combineer 'j' met de 'oe' uit 'boek'",
    },
    examples: [
      { korean: '유리', romanized: 'yuri', meaning: 'glass' },
      { korean: '유명', romanized: 'yumyeong', meaning: 'famous' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'eu',
    char: 'ㅡ',
    romanization: 'eu',
    ipa: 'ɯ',
    name: '으 Eu',
    descriptions: {
      en: "No English equivalent — say 'oo' without rounding your lips, or 'ee' with the tongue pulled back",
      nl: "Geen equivalent; zeg 'ie' maar schuif je tong naar achter en houd lippen plat",
    },
    examples: [
      { korean: '음악', romanized: 'eumak', meaning: 'music' },
      { korean: '으스스', romanized: 'euseusesu', meaning: 'eerie / chilly' },
    ],
    category: 'basic-vowel',
  },
  {
    id: 'i',
    char: 'ㅣ',
    romanization: 'i',
    ipa: 'i',
    name: '이 I',
    descriptions: {
      en: "Like 'ee' in 'see'",
      nl: "Als de 'ie' in 'niet' of 'lied'",
    },
    examples: [
      { korean: '이름', romanized: 'ireum', meaning: 'name' },
      { korean: '이야기', romanized: 'iyagi', meaning: 'story' },
    ],
    category: 'basic-vowel',
  },
  // Compound vowels
  {
    id: 'ae',
    char: 'ㅐ',
    romanization: 'ae',
    ipa: 'ɛ',
    name: '애 Ae',
    descriptions: {
      en: "Like 'a' in 'cat'",
      nl: "Als de 'e' in 'bed' of 'met'",
    },
    examples: [
      { korean: '새', romanized: 'sae', meaning: 'bird' },
      { korean: '애인', romanized: 'aein', meaning: 'lover' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'yae',
    char: 'ㅒ',
    romanization: 'yae',
    ipa: 'jɛ',
    name: '얘 Yae',
    descriptions: {
      en: "Like 'yae' — ㅑ + ㅐ",
      nl: "Als 'je' in 'jetski' — 'j' + 'e' uit 'bed'",
    },
    examples: [
      { korean: '얘기', romanized: 'yaegi', meaning: 'story / talk (casual)' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'e',
    char: 'ㅔ',
    romanization: 'e',
    ipa: 'e',
    name: '에 E',
    descriptions: {
      en: "Like 'e' in 'bed'",
      nl: "Als de 'ee' in 'meer' maar korter, of de 'e' in 'bed'",
    },
    examples: [
      { korean: '에너지', romanized: 'eneoji', meaning: 'energy' },
      { korean: '세계', romanized: 'segye', meaning: 'world' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'ye',
    char: 'ㅖ',
    romanization: 'ye',
    ipa: 'je',
    name: '예 Ye',
    descriptions: {
      en: "Like 'ye' in 'yes'",
      nl: "Als 'je' in 'jezus' of 'ja, echt'",
    },
    examples: [
      { korean: '예쁘다', romanized: 'yeppeuda', meaning: 'to be pretty' },
      { korean: '예의', romanized: 'yeui', meaning: 'courtesy' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'wa',
    char: 'ㅘ',
    romanization: 'wa',
    ipa: 'wa',
    name: '와 Wa',
    descriptions: {
      en: "Like 'wa' in 'want'",
      nl: "Als 'wa' in 'water'",
    },
    examples: [
      { korean: '와인', romanized: 'wain', meaning: 'wine' },
      { korean: '과일', romanized: 'gwail', meaning: 'fruit' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'wae',
    char: 'ㅙ',
    romanization: 'wae',
    ipa: 'wɛ',
    name: '왜 Wae',
    descriptions: {
      en: "ㅗ + ㅐ — similar to 'wae'",
      nl: "Als 'we' in 'web' — 'w' + 'e' uit 'bed'",
    },
    examples: [
      { korean: '왜', romanized: 'wae', meaning: 'why' },
      { korean: '돼지', romanized: 'dwaeji', meaning: 'pig' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'oe',
    char: 'ㅚ',
    romanization: 'oe',
    ipa: 'ø',
    name: '외 Oe',
    descriptions: {
      en: "Historically distinct; now often sounds like ㅔ",
      nl: "Klinkt nu als ㅔ — als 'ee' in 'meer', NIET als de Nederlandse 'eu'",
    },
    examples: [
      { korean: '외국', romanized: 'oeguk', meaning: 'foreign country' },
      { korean: '최고', romanized: 'choego', meaning: 'the best' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'wo',
    char: 'ㅝ',
    romanization: 'wo',
    ipa: 'wʌ',
    name: '워 Wo',
    descriptions: {
      en: "ㅜ + ㅓ — like 'wo' in 'wonder'",
      nl: "Als 'wo' in 'wonder' — 'w' + 'o' uit 'bos'",
    },
    examples: [
      { korean: '뭐', romanized: 'mwo', meaning: 'what' },
      { korean: '워낙', romanized: 'wonak', meaning: 'originally' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'we',
    char: 'ㅞ',
    romanization: 'we',
    ipa: 'we',
    name: '웨 We',
    descriptions: {
      en: "ㅜ + ㅔ — like 'we'",
      nl: "Als 'we' in 'web' of 'wet'",
    },
    examples: [
      { korean: '웨이터', romanized: 'weiteo', meaning: 'waiter' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'wi',
    char: 'ㅟ',
    romanization: 'wi',
    ipa: 'wi',
    name: '위 Wi',
    descriptions: {
      en: "ㅜ + ㅣ — like 'wi' in 'week'",
      nl: "Als 'wie' in 'wieden' of 'wiedewiedewijd'",
    },
    examples: [
      { korean: '위험', romanized: 'wiheom', meaning: 'danger' },
      { korean: '위', romanized: 'wi', meaning: 'above' },
    ],
    category: 'compound-vowel',
  },
  {
    id: 'ui',
    char: 'ㅢ',
    romanization: 'ui',
    ipa: 'ɯi',
    name: '의 Ui',
    descriptions: {
      en: "ㅡ + ㅣ — starts with eu, slides into i",
      nl: "NIET als de Nederlandse 'ui' (huis)! Begin met vlakke ㅡ-klank, glijd naar 'ie'",
    },
    examples: [
      { korean: '의사', romanized: 'uisa', meaning: 'doctor' },
      { korean: '의자', romanized: 'uija', meaning: 'chair' },
    ],
    category: 'compound-vowel',
  },
]

export const allCharacters: HangulCharacter[] = [...consonants, ...vowels]
