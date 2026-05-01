// Server-side source of truth for feature flags.
// This module is imported by both the OFREP endpoint (server) and the
// InMemoryProvider fallback used during SSR.

export interface FlagDefinition {
  disabled: boolean
  variants: Record<string, unknown>
  defaultVariant: string
}

export const FLAG_DEFINITIONS: Record<string, FlagDefinition> = {
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
}
