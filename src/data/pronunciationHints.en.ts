import type { PronunciationHints } from './pronunciationHints'

export const pronunciationHintsEn = {
  vowelLabels: [
    'a','eh','ya','yeh','uh','e','yuh','ye','o','wa',
    'weh','weh','yo','oo','wuh','weh','wi','yoo','eu','ui','ee',
  ],
  vowelTips: [
    'a as in father',
    'eh as in bed',
    'ya as in yard',
    'yeh as in yes',
    'uh as in sun',
    'e as in get',
    'yuh, like young without ng',
    'ye as in yes',
    'o as in go',
    'wa as in water',
    'weh as in wet',
    'weh as in wet',
    'yo as in yo-yo',
    'oo as in moon',
    'wuh as in won',
    'weh as in wet',
    'wi as in we',
    'yoo as in you',
    'eu, lips unrounded',
    'ui, often said like ee',
    'ee as in see',
  ],
  builderExamples: 'Examples: 조 jo · 주 joo · 수 soo',
} satisfies PronunciationHints
