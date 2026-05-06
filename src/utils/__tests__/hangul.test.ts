import { describe, expect, it } from 'vitest'
import {
  analyzeText,
  composeSyllable,
  decomposeSyllable,
  JONGSEONG_CLUSTER,
  SYLLABLE_END,
  SYLLABLE_START,
} from '../hangul'

describe('hangul utilities', () => {
  it('decomposes the first and last Unicode Hangul syllables', () => {
    expect(decomposeSyllable(String.fromCharCode(SYLLABLE_START))).toEqual({
      initialIdx: 0,
      vowelIdx: 0,
      finalIdx: 0,
    })

    expect(decomposeSyllable(String.fromCharCode(SYLLABLE_END))).toEqual({
      initialIdx: 18,
      vowelIdx: 20,
      finalIdx: 27,
    })
  })

  it('composes common syllables from jamo indices', () => {
    expect(composeSyllable(0, 0, 0)).toBe('가')
    expect(composeSyllable(0, 0, 1)).toBe('각')
    expect(composeSyllable(11, 20, 21)).toBe('잉')
    expect(composeSyllable(18, 20, 27)).toBe(String.fromCharCode(SYLLABLE_END))
  })

  it('round-trips every valid Hangul syllable through decomposition and composition', () => {
    for (let code = SYLLABLE_START; code <= SYLLABLE_END; code += 1) {
      const char = String.fromCharCode(code)
      const parts = decomposeSyllable(char)

      expect(parts).not.toBeNull()
      expect(composeSyllable(parts!.initialIdx, parts!.vowelIdx, parts!.finalIdx)).toBe(char)
    }
  })

  it('analyzes syllables and keeps non-Hangul characters intact', () => {
    expect(analyzeText('한글 A')[0]).toMatchObject({
      char: '한',
      type: 'syllable',
      initial: 'ㅎ',
      vowel: 'ㅏ',
      final: 'ㄴ',
      romanization: 'han',
      initialIpa: 'h',
      vowelIpa: 'a',
      finalIpa: 'n',
    })

    expect(analyzeText('한글 A').slice(2)).toEqual([
      { char: ' ', type: 'other', romanization: ' ' },
      { char: 'A', type: 'other', romanization: 'A' },
    ])
  })
})

describe('analyzeText — open syllables (no final consonant)', () => {
  it('produces empty final fields for a syllable with no batchim', () => {
    // 가 = ㄱ + ㅏ, finalIdx 0 means no final consonant
    const [result] = analyzeText('가')
    expect(result.type).toBe('syllable')
    if (result.type === 'syllable') {
      expect(result.finalIdx).toBe(0)
      expect(result.final).toBe('')
      expect(result.finalRoman).toBe('')
      expect(result.finalIpa).toBe('')
      expect(result.romanization).toBe('ga')
    }
  })

  it('correctly romanizes a multi-syllable open-syllable word', () => {
    // 나라 = 나 (na) + 라 (ra) — both open syllables
    const chars = analyzeText('나라')
    expect(chars).toHaveLength(2)
    for (const char of chars) {
      expect(char.type).toBe('syllable')
      if (char.type === 'syllable') {
        expect(char.finalIdx).toBe(0)
        expect(char.final).toBe('')
      }
    }
    expect(chars.map((c) => c.romanization).join('')).toBe('nara')
  })
})

describe('analyzeText — consonant-cluster batchim', () => {
  it('maps a cluster final (ㄺ) to its romanized and IPA forms', () => {
    // 읽 = ㅇ + ㅣ + ㄺ — JONGSEONG index 9, a cluster final
    const [result] = analyzeText('읽')
    expect(result.type).toBe('syllable')
    if (result.type === 'syllable') {
      expect(result.finalIdx).toBe(9)
      expect(result.final).toBe('ㄺ')
      expect(result.finalRoman).toBe('k')
      expect(result.finalIpa).toBe('k̚')
      expect(result.romanization).toBe('ik')
      expect(JONGSEONG_CLUSTER).toContain(result.finalIdx)
    }
  })
})
