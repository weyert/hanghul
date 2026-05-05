// Server-side source of truth for feature flags.
// This module is imported by both the OFREP endpoint (server) and the
// InMemoryProvider fallback used during SSR.

import type { InMemoryFlagConfiguration } from '@openfeature/web-sdk'

export const FLAG_DEFINITIONS = {
  'syllable-chart': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'vocabulary': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'spaced-repetition': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'listen-quiz': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'word-quiz': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'typing-practice': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'progress-dashboard': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'stroke-order': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'ipa-display': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'cultural-context': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'mixed-quiz': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'stroke-practice': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'syllable-blocks': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'guided-learn': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'quiz-retry-wrong': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'quiz-auto-audio': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'quiz-correct-tip': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'typing-beginner': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'korea-facts': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'hangul-first': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'off',
  },
  'english-guide': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'dutch-guide': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'romanization-guide': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'ipa-guide': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
} as const satisfies InMemoryFlagConfiguration

export type FlagDefinition = (typeof FLAG_DEFINITIONS)[keyof typeof FLAG_DEFINITIONS]
