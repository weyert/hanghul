// Server-side source of truth for feature flags.
// This module is imported by both the OFREP endpoint (server) and the
// InMemoryProvider fallback used during SSR.

// Minimal shape compatible with @openfeature/web-sdk InMemoryFlagConfiguration.
// Defined locally to avoid adding web-sdk as an explicit dependency.
type InMemoryFlagConfiguration = Record<
  string,
  { disabled?: boolean; variants: Record<string, boolean>; defaultVariant: string }
>

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
  'pronunciation-model': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'batchim-lesson': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'grammar-guide': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'audio-contrast-quiz': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'verb-conjugation': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'contrast-drills': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'sentence-patterns': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'beginner-roadmap': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
  'quiz-wrong-hints': {
    disabled: false,
    variants: { on: true, off: false },
    defaultVariant: 'on',
  },
} as const satisfies InMemoryFlagConfiguration

export type FlagDefinition = (typeof FLAG_DEFINITIONS)[keyof typeof FLAG_DEFINITIONS]
