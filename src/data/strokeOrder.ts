export interface StrokeData {
  char: string
  strokes: number
  steps: string[]
}

export const STROKE_ORDER: Record<string, StrokeData> = {
  // ── Basic Consonants ──────────────────────────────────────────────
  'ㄱ': { char: 'ㄱ', strokes: 1, steps: [
    'Horizontal → then vertical ↓ in one fluid movement',
  ]},
  'ㄴ': { char: 'ㄴ', strokes: 1, steps: [
    'Vertical ↓ then horizontal → in one fluid movement',
  ]},
  'ㄷ': { char: 'ㄷ', strokes: 2, steps: [
    'Horizontal → (top bar)',
    'Vertical ↓ then horizontal → (bottom hook) in one movement',
  ]},
  'ㄹ': { char: 'ㄹ', strokes: 3, steps: [
    'Horizontal → then vertical ↓ (top part)',
    'Horizontal → (middle bar)',
    'Vertical ↓ then horizontal → (bottom part)',
  ]},
  'ㅁ': { char: 'ㅁ', strokes: 3, steps: [
    'Vertical ↓ (left side)',
    'Horizontal → then vertical ↓ (top and right)',
    'Horizontal → (bottom closing bar)',
  ]},
  'ㅂ': { char: 'ㅂ', strokes: 4, steps: [
    'Vertical ↓ (left side)',
    'Vertical ↓ (right side)',
    'Horizontal → (middle bar)',
    'Horizontal → (bottom closing bar)',
  ]},
  'ㅅ': { char: 'ㅅ', strokes: 2, steps: [
    'Diagonal ↙ (left leg)',
    'Diagonal ↘ (right leg)',
  ]},
  'ㅇ': { char: 'ㅇ', strokes: 1, steps: [
    'Circle ↺ (starting from top, counterclockwise)',
  ]},
  'ㅈ': { char: 'ㅈ', strokes: 2, steps: [
    'Horizontal → then diagonal ↙ in one movement',
    'Diagonal ↘ (right leg)',
  ]},
  'ㅊ': { char: 'ㅊ', strokes: 3, steps: [
    'Short horizontal tick → (top)',
    'Horizontal → then diagonal ↙ in one movement',
    'Diagonal ↘ (right leg)',
  ]},
  'ㅋ': { char: 'ㅋ', strokes: 2, steps: [
    'Horizontal → then vertical ↓ in one movement (like ㄱ)',
    'Short horizontal bar → (middle)',
  ]},
  'ㅌ': { char: 'ㅌ', strokes: 3, steps: [
    'Horizontal → (top bar)',
    'Horizontal → (middle bar)',
    'Vertical ↓ then horizontal → (bottom part, like ㄴ)',
  ]},
  'ㅍ': { char: 'ㅍ', strokes: 4, steps: [
    'Horizontal → (top bar)',
    'Vertical ↓ (left pillar)',
    'Vertical ↓ (right pillar)',
    'Horizontal → (bottom bar)',
  ]},
  'ㅎ': { char: 'ㅎ', strokes: 3, steps: [
    'Short horizontal tick → (top)',
    'Horizontal → (main bar)',
    'Circle ↺ (body)',
  ]},

  // ── Tense Consonants ─────────────────────────────────────────────
  'ㄲ': { char: 'ㄲ', strokes: 2, steps: [
    'Left ㄱ — One fluid movement',
    'Right ㄱ — One fluid movement',
  ]},
  'ㄸ': { char: 'ㄸ', strokes: 4, steps: [
    'Left ㄷ — Top bar then bottom hook',
    'Right ㄷ — Top bar then bottom hook',
  ]},
  'ㅃ': { char: 'ㅃ', strokes: 8, steps: [
    'Left ㅂ — Left, right, middle, bottom',
    'Right ㅂ — Left, right, middle, bottom',
  ]},
  'ㅆ': { char: 'ㅆ', strokes: 4, steps: [
    'Left ㅅ — Left leg then right leg',
    'Right ㅅ — Left leg then right leg',
  ]},
  'ㅉ': { char: 'ㅉ', strokes: 4, steps: [
    'Left ㅈ — Top-left part then right leg',
    'Right ㅈ — Top-left part then right leg',
  ]},

  // ── Basic Vowels ──────────────────────────────────────────────────
  'ㅏ': { char: 'ㅏ', strokes: 2, steps: [
    'Vertical ↓ (top to bottom)',
    'Short horizontal → (center to right)',
  ]},
  'ㅐ': { char: 'ㅐ', strokes: 3, steps: [
    'Vertical ↓ (left bar)',
    'Short horizontal → (middle)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅑ': { char: 'ㅑ', strokes: 3, steps: [
    'Vertical ↓ (main bar)',
    'Short horizontal → (upper)',
    'Short horizontal → (lower)',
  ]},
  'ㅒ': { char: 'ㅒ', strokes: 4, steps: [
    'Vertical ↓ (left bar)',
    'Short horizontal → (upper)',
    'Short horizontal → (lower)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅓ': { char: 'ㅓ', strokes: 2, steps: [
    'Short horizontal → (pointing into the bar)',
    'Vertical ↓ (main bar)',
  ]},
  'ㅔ': { char: 'ㅔ', strokes: 3, steps: [
    'Short horizontal → (pointing out from center)',
    'Vertical ↓ (left bar)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅕ': { char: 'ㅕ', strokes: 3, steps: [
    'Short horizontal → (upper)',
    'Short horizontal → (lower)',
    'Vertical ↓ (main bar)',
  ]},
  'ㅖ': { char: 'ㅖ', strokes: 4, steps: [
    'Short horizontal → (upper)',
    'Short horizontal → (lower)',
    'Vertical ↓ (left bar)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅗ': { char: 'ㅗ', strokes: 2, steps: [
    'Short vertical ↓ (top to center)',
    'Horizontal → (left to right)',
  ]},
  'ㅛ': { char: 'ㅛ', strokes: 3, steps: [
    'Short vertical ↓ (left)',
    'Short vertical ↓ (right)',
    'Horizontal → (bottom bar)',
  ]},
  'ㅜ': { char: 'ㅜ', strokes: 2, steps: [
    'Horizontal → (left to right)',
    'Vertical ↓ (center downwards)',
  ]},
  'ㅠ': { char: 'ㅠ', strokes: 3, steps: [
    'Horizontal → (top bar)',
    'Vertical ↓ (left)',
    'Vertical ↓ (right)',
  ]},
  'ㅡ': { char: 'ㅡ', strokes: 1, steps: [
    'Horizontal → (left to right)',
  ]},
  'ㅣ': { char: 'ㅣ', strokes: 1, steps: [
    'Vertical ↓ (top to bottom)',
  ]},

  // ── Compound Vowels ───────────────────────────────────────────────
  'ㅘ': { char: 'ㅘ', strokes: 4, steps: [
    'ㅗ part — Horizontal →',
    'ㅗ part — Short vertical ↓',
    'ㅏ part — Vertical ↓',
    'ㅏ part — Short horizontal →',
  ]},
  'ㅙ': { char: 'ㅙ', strokes: 5, steps: [
    'ㅗ part — Horizontal →',
    'ㅗ part — Short vertical ↓',
    'ㅐ part — Vertical left ↓',
    'ㅐ part — Short horizontal →',
    'ㅐ part — Vertical right ↓',
  ]},
  'ㅚ': { char: 'ㅚ', strokes: 3, steps: [
    'ㅗ part — Horizontal →',
    'ㅗ part — Short vertical ↓',
    'ㅣ part — Vertical ↓',
  ]},
  'ㅝ': { char: 'ㅝ', strokes: 4, steps: [
    'ㅜ part — Horizontal →',
    'ㅜ part — Vertical ↓',
    'ㅓ part — Short horizontal ←',
    'ㅓ part — Vertical ↓',
  ]},
  'ㅞ': { char: 'ㅞ', strokes: 5, steps: [
    'ㅜ part — Horizontal →',
    'ㅜ part — Vertical ↓',
    'ㅔ part — Vertical left ↓',
    'ㅔ part — Short horizontal →',
    'ㅔ part — Vertical right ↓',
  ]},
  'ㅟ': { char: 'ㅟ', strokes: 3, steps: [
    'ㅜ part — Horizontal →',
    'ㅜ part — Vertical ↓',
    'ㅣ part — Vertical ↓',
  ]},
  'ㅢ': { char: 'ㅢ', strokes: 2, steps: [
    'ㅡ part — Horizontal →',
    'ㅣ part — Vertical ↓',
  ]},
}
