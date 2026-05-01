// Hangul syllable block decomposition / composition utilities.
//
// Unicode Hangul syllables: U+AC00–U+D7A3
// Formula: code = 0xAC00 + (initial × 21 + vowel) × 28 + final

export const SYLLABLE_START = 0xac00
export const SYLLABLE_END = 0xd7a3

const JUNGSEONG_COUNT = 21
const JONGSEONG_COUNT = 28

// ─── Initial consonants (초성) — 19 ────────────────────────────────────────
export const CHOSEONG = [
  'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ',
  'ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ',
] as const

export const CHOSEONG_ROMAN = [
  'g','kk','n','d','tt','r','m','b','pp','s',
  'ss','','j','jj','ch','k','t','p','h',
] as const

export const CHOSEONG_IPA = [
  'ɡ','k͈','n','d','t͈','ɾ','m','b','p͈','s',
  's͈','','dʑ','t͈ɕ','tɕʰ','kʰ','tʰ','pʰ','h',
] as const

// ─── Vowels (중성) — 21 ────────────────────────────────────────────────────
export const JUNGSEONG = [
  'ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ',
  'ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ',
] as const

export const JUNGSEONG_ROMAN = [
  'a','ae','ya','yae','eo','e','yeo','ye','o','wa',
  'wae','oe','yo','u','wo','we','wi','yu','eu','ui','i',
] as const

export const JUNGSEONG_IPA = [
  'a','ɛ','ja','jɛ','ʌ','e','jʌ','je','o','wa',
  'wɛ','ø','jo','u','wʌ','we','wi','ju','ɯ','ɯi','i',
] as const

// ─── Final consonants (종성 / 받침) — 28, index 0 = none ──────────────────
export const JONGSEONG = [
  '','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ',
  'ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ',
  'ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ',
] as const

export const JONGSEONG_ROMAN = [
  '','k','k','k','n','n','n','t','l','k',
  'm','p','l','l','p','l','m','p','p','t',
  't','ng','t','t','k','t','p','t',
] as const

export const JONGSEONG_IPA = [
  '','k̚','k̚','k̚','n','n','n','t̚','l','k̚',
  'm','p̚','l','l','p̚','l','m','p̚','p̚','t̚',
  't̚','ŋ','t̚','t̚','k̚','t̚','p̚','t̚',
] as const

// Indices of single-consonant finals (for the builder UI)
export const JONGSEONG_SIMPLE = [1,2,4,7,8,16,17,19,20,21,22,23,24,25,26,27]
// Indices of consonant-cluster finals
export const JONGSEONG_CLUSTER = [3,5,6,9,10,11,12,13,14,15,18]

// ─── Core functions ────────────────────────────────────────────────────────

export interface SyllableAnalysis {
  char: string
  type: 'syllable'
  initialIdx: number
  vowelIdx: number
  finalIdx: number
  initial: string
  vowel: string
  final: string
  initialRoman: string
  vowelRoman: string
  finalRoman: string
  romanization: string
  initialIpa: string
  vowelIpa: string
  finalIpa: string
}

export interface OtherChar {
  char: string
  type: 'other'
  romanization: string
}

export type AnalyzedChar = SyllableAnalysis | OtherChar

export function decomposeSyllable(
  char: string,
): { initialIdx: number; vowelIdx: number; finalIdx: number } | null {
  const code = char.charCodeAt(0)
  if (code < SYLLABLE_START || code > SYLLABLE_END) return null
  const offset = code - SYLLABLE_START
  return {
    finalIdx: offset % JONGSEONG_COUNT,
    vowelIdx: Math.floor(offset / JONGSEONG_COUNT) % JUNGSEONG_COUNT,
    initialIdx: Math.floor(offset / (JONGSEONG_COUNT * JUNGSEONG_COUNT)),
  }
}

export function composeSyllable(
  initialIdx: number,
  vowelIdx: number,
  finalIdx: number,
): string {
  return String.fromCharCode(
    SYLLABLE_START + (initialIdx * JUNGSEONG_COUNT + vowelIdx) * JONGSEONG_COUNT + finalIdx,
  )
}

export function analyzeText(text: string): AnalyzedChar[] {
  return [...text].map((char) => {
    const d = decomposeSyllable(char)
    if (!d) return { char, type: 'other', romanization: char === ' ' ? ' ' : char }
    return {
      char,
      type: 'syllable',
      ...d,
      initial: CHOSEONG[d.initialIdx],
      vowel: JUNGSEONG[d.vowelIdx],
      final: JONGSEONG[d.finalIdx],
      initialRoman: CHOSEONG_ROMAN[d.initialIdx],
      vowelRoman: JUNGSEONG_ROMAN[d.vowelIdx],
      finalRoman: JONGSEONG_ROMAN[d.finalIdx],
      romanization:
        CHOSEONG_ROMAN[d.initialIdx] +
        JUNGSEONG_ROMAN[d.vowelIdx] +
        JONGSEONG_ROMAN[d.finalIdx],
      initialIpa: CHOSEONG_IPA[d.initialIdx],
      vowelIpa: JUNGSEONG_IPA[d.vowelIdx],
      finalIpa: JONGSEONG_IPA[d.finalIdx],
    }
  })
}
