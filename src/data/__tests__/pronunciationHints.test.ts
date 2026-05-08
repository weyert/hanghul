import { describe, expect, it } from 'vitest'
import { JUNGSEONG, JUNGSEONG_ROMAN } from '../../utils/hangul'
import { pronunciationHints } from '../pronunciationHints'

const byVowel = Object.fromEntries(JUNGSEONG.map((vowel, index) => [vowel, index]))

describe('pronunciation hints', () => {
  it('keeps official romanization universal while localizing helper labels', () => {
    expect(JUNGSEONG_ROMAN[byVowel['ㅜ']]).toBe('u')
    expect(JUNGSEONG_ROMAN[byVowel['ㅣ']]).toBe('i')
    expect(JUNGSEONG_ROMAN[byVowel['ㅓ']]).toBe('eo')
    expect(JUNGSEONG_ROMAN[byVowel['ㅗ']]).toBe('o')

    expect(pronunciationHints.en.vowelLabels[byVowel['ㅜ']]).toBe('oo')
    expect(pronunciationHints.en.vowelLabels[byVowel['ㅣ']]).toBe('ee')
    expect(pronunciationHints.en.vowelLabels[byVowel['ㅓ']]).toBe('uh')
    expect(pronunciationHints.en.vowelLabels[byVowel['ㅗ']]).toBe('o')

    expect(pronunciationHints.nl.vowelLabels[byVowel['ㅜ']]).toBe('oe')
    expect(pronunciationHints.nl.vowelLabels[byVowel['ㅣ']]).toBe('ie')
    expect(pronunciationHints.nl.vowelLabels[byVowel['ㅓ']]).toBe('uh/eu')
    expect(pronunciationHints.nl.vowelLabels[byVowel['ㅗ']]).toBe('oo')
  })

  it('localizes builder example readings', () => {
    expect(pronunciationHints.en.builderExamples).toContain('주 joo')
    expect(pronunciationHints.en.builderExamples).toContain('수 soo')

    expect(pronunciationHints.nl.builderExamples).toContain('주 djoe')
    expect(pronunciationHints.nl.builderExamples).toContain('수 soe')
  })
})
