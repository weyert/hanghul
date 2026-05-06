import { describe, expect, it } from 'vitest'
import { FLAG_DEFINITIONS } from '../flagDefinitions'
import type { FlagDefinition } from '../flagDefinitions'
import { FLAGS } from '../flags'

describe('feature flag registry', () => {
  it('defines every exported flag value', () => {
    const exportedFlags = Object.values(FLAGS)
    const definedFlags = Object.keys(FLAG_DEFINITIONS)

    expect(definedFlags).toEqual(expect.arrayContaining(exportedFlags))
  })

  it('exports every configured flag definition', () => {
    const exportedFlags = Object.values(FLAGS)
    const definedFlags = Object.keys(FLAG_DEFINITIONS)

    expect(exportedFlags).toEqual(expect.arrayContaining(definedFlags))
  })

  it('keeps all configured flags boolean-compatible', () => {
    for (const [flagKey, definition] of Object.entries(FLAG_DEFINITIONS) as [string, FlagDefinition][]) {
      expect(definition.variants).toEqual({ on: true, off: false })
      expect(['on', 'off']).toContain(definition.defaultVariant)
      expect(typeof definition.disabled).toBe('boolean')
      expect(Object.values(FLAGS)).toContain(flagKey)
    }
  })
})
