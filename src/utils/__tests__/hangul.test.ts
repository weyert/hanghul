import { describe, expect, it } from 'vitest'
import {
  analyzeText,
  composeSyllable,
  decomposeSyllable,
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
