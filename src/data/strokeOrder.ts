export interface StrokeData {
  char: string
  strokes: number
  steps: string[]
}

export const STROKE_ORDER: Record<string, StrokeData> = {
  // ── Basic Consonants ──────────────────────────────────────────────
  'ㄱ': { char: 'ㄱ', strokes: 2, steps: [
    'Horizontal → (left to right, top)',
    'Vertical ↓ (top to bottom, right side)',
  ]},
  'ㄴ': { char: 'ㄴ', strokes: 2, steps: [
    'Vertical ↓ (top to bottom, left side)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㄷ': { char: 'ㄷ', strokes: 3, steps: [
    'Horizontal → (left to right, top)',
    'Vertical ↓ (top to bottom, left side)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㄹ': { char: 'ㄹ', strokes: 5, steps: [
    'Horizontal → (left to right, top)',
    'Short vertical ↓ (left-middle)',
    'Horizontal → (left to right, middle)',
    'Short vertical ↓ (right-middle, curving left)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㅁ': { char: 'ㅁ', strokes: 4, steps: [
    'Horizontal → (left to right, top)',
    'Vertical ↓ (top to bottom, left side)',
    'Vertical ↓ (top to bottom, right side)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㅂ': { char: 'ㅂ', strokes: 4, steps: [
    'Vertical ↓ (top to bottom, left)',
    'Vertical ↓ (top to bottom, right)',
    'Short horizontal → (left to right, upper middle)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㅅ': { char: 'ㅅ', strokes: 2, steps: [
    'Diagonal ↙ (top-center to bottom-left)',
    'Diagonal ↘ (top-center to bottom-right)',
  ]},
  'ㅇ': { char: 'ㅇ', strokes: 1, steps: [
    'Circle ↺ (counterclockwise, starting from the top)',
  ]},
  'ㅈ': { char: 'ㅈ', strokes: 3, steps: [
    'Horizontal → (left to right, top)',
    'Diagonal ↙ (center to bottom-left)',
    'Diagonal ↘ (center to bottom-right)',
  ]},
  'ㅊ': { char: 'ㅊ', strokes: 4, steps: [
    'Short tick → (very top, a short horizontal)',
    'Horizontal → (left to right, main bar)',
    'Diagonal ↙ (center to bottom-left)',
    'Diagonal ↘ (center to bottom-right)',
  ]},
  'ㅋ': { char: 'ㅋ', strokes: 3, steps: [
    'Horizontal → (left to right, top)',
    'Short horizontal → (left to right, middle — the extra bar)',
    'Vertical ↓ (top to bottom, right side)',
  ]},
  'ㅌ': { char: 'ㅌ', strokes: 4, steps: [
    'Horizontal → (left to right, top)',
    'Vertical ↓ (top to bottom, left side)',
    'Horizontal → (left to right, middle)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㅍ': { char: 'ㅍ', strokes: 4, steps: [
    'Horizontal → (left to right, top)',
    'Vertical ↓ (top to bottom, left)',
    'Vertical ↓ (top to bottom, right)',
    'Horizontal → (left to right, bottom)',
  ]},
  'ㅎ': { char: 'ㅎ', strokes: 3, steps: [
    'Short horizontal → (the top "hat")',
    'Short vertical ↓ (center stem below hat)',
    'Circle ↺ (counterclockwise, the round body)',
  ]},

  // ── Tense Consonants ─────────────────────────────────────────────
  'ㄲ': { char: 'ㄲ', strokes: 4, steps: [
    'Left ㄱ — Horizontal →',
    'Left ㄱ — Vertical ↓',
    'Right ㄱ — Horizontal →',
    'Right ㄱ — Vertical ↓',
  ]},
  'ㄸ': { char: 'ㄸ', strokes: 6, steps: [
    'Left ㄷ — Horizontal top →',
    'Left ㄷ — Vertical ↓',
    'Left ㄷ — Horizontal bottom →',
    'Right ㄷ — Horizontal top →',
    'Right ㄷ — Vertical ↓',
    'Right ㄷ — Horizontal bottom →',
  ]},
  'ㅃ': { char: 'ㅃ', strokes: 8, steps: [
    'Left ㅂ — Vertical left ↓',
    'Left ㅂ — Vertical right ↓',
    'Left ㅂ — Horizontal middle →',
    'Left ㅂ — Horizontal bottom →',
    'Right ㅂ — Vertical left ↓',
    'Right ㅂ — Vertical right ↓',
    'Right ㅂ — Horizontal middle →',
    'Right ㅂ — Horizontal bottom →',
  ]},
  'ㅆ': { char: 'ㅆ', strokes: 4, steps: [
    'Left ㅅ — Diagonal ↙',
    'Left ㅅ — Diagonal ↘',
    'Right ㅅ — Diagonal ↙',
    'Right ㅅ — Diagonal ↘',
  ]},
  'ㅉ': { char: 'ㅉ', strokes: 6, steps: [
    'Left ㅈ — Horizontal →',
    'Left ㅈ — Diagonal ↙',
    'Left ㅈ — Diagonal ↘',
    'Right ㅈ — Horizontal →',
    'Right ㅈ — Diagonal ↙',
    'Right ㅈ — Diagonal ↘',
  ]},

  // ── Basic Vowels ──────────────────────────────────────────────────
  'ㅏ': { char: 'ㅏ', strokes: 2, steps: [
    'Vertical ↓ (top to bottom)',
    'Short horizontal → (pointing right from center)',
  ]},
  'ㅐ': { char: 'ㅐ', strokes: 3, steps: [
    'Vertical ↓ (left bar)',
    'Short horizontal → (pointing right from left bar)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅑ': { char: 'ㅑ', strokes: 3, steps: [
    'Vertical ↓ (main bar)',
    'Short horizontal → (upper, pointing right)',
    'Short horizontal → (lower, pointing right)',
  ]},
  'ㅒ': { char: 'ㅒ', strokes: 4, steps: [
    'Vertical ↓ (left bar)',
    'Short horizontal upper → (pointing right)',
    'Short horizontal lower → (pointing right)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅓ': { char: 'ㅓ', strokes: 2, steps: [
    'Short horizontal ← (pointing left from center)',
    'Vertical ↓ (top to bottom)',
  ]},
  'ㅔ': { char: 'ㅔ', strokes: 3, steps: [
    'Vertical ↓ (left bar)',
    'Short horizontal → (pointing right from left bar)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅕ': { char: 'ㅕ', strokes: 3, steps: [
    'Short horizontal ← (upper, pointing left)',
    'Short horizontal ← (lower, pointing left)',
    'Vertical ↓ (main bar)',
  ]},
  'ㅖ': { char: 'ㅖ', strokes: 4, steps: [
    'Vertical ↓ (left bar)',
    'Short horizontal upper ← (pointing left)',
    'Short horizontal lower ← (pointing left)',
    'Vertical ↓ (right bar)',
  ]},
  'ㅗ': { char: 'ㅗ', strokes: 2, steps: [
    'Horizontal → (left to right)',
    'Short vertical ↓ (downward from center)',
  ]},
  'ㅛ': { char: 'ㅛ', strokes: 3, steps: [
    'Horizontal → (left to right)',
    'Short vertical ↓ (left of center)',
    'Short vertical ↓ (right of center)',
  ]},
  'ㅜ': { char: 'ㅜ', strokes: 2, steps: [
    'Horizontal → (left to right)',
    'Vertical ↓ (downward from center)',
  ]},
  'ㅠ': { char: 'ㅠ', strokes: 3, steps: [
    'Horizontal → (left to right)',
    'Vertical ↓ (left of center)',
    'Vertical ↓ (right of center)',
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
