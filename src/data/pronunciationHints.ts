import type { Locale } from '../contexts/LanguageContext'
import { pronunciationHintsEn } from './pronunciationHints.en'
import { pronunciationHintsNl } from './pronunciationHints.nl'

export interface PronunciationHints {
  vowelLabels: readonly string[]
  vowelTips: readonly string[]
  builderExamples: string
}

export const pronunciationHints = {
  en: pronunciationHintsEn,
  nl: pronunciationHintsNl,
} satisfies Record<Locale, PronunciationHints>

export function getPronunciationHints(locale: Locale): PronunciationHints {
  return pronunciationHints[locale]
}
