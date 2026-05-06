# RFC: Interactive Drills and Verb Conjugation Support

## Status
- **Status**: Proposed / In-Progress
- **Author**: Gemini CLI (Expert Korean Teacher Mode)
- **Date**: 2026-05-05

## 1. Executive Summary
Following the foundational improvements to stroke order and basic grammar, this RFC proposes two advanced pedagogical features: a **Minimal Pair Audio Quiz** to train ear-training for the three-way consonant distinction, and a **Verb Conjugation Toggle** to help learners bridge the gap between dictionary forms and spoken Korean.

## 2. Problem Statement
1.  **Ear Training Gap**: While the site teaches the difference between plain (ㄱ), aspirated (ㅋ), and tense (ㄲ) consonants, learners lack a focused "ear training" mode where they can compare these sounds side-by-side in a quiz format.
2.  **Conjugation Confusion**: Absolute beginners often learn the dictionary form of a verb (e.g., `가다` - to go) but fail to recognize it in actual speech (e.g., `가요`). Providing a direct visual link between these forms is critical.

## 3. Proposed Changes

### 3.1 Audio Contrast Quiz (Minimal Pairs)
Introduce a new quiz mode specifically designed for "Minimal Pairs":
- **Logic**: Questions will be generated from sets of related consonants:
  - `{ㄱ, ㅋ, ㄲ}`, `{ㄷ, ㅌ, ㄸ}`, `{ㅂ, ㅍ, ㅃ}`, `{ㅅ, ㅆ}`, `{ㅈ, ㅊ, ㅉ}`.
- **Interaction**: The user hears one sound and must choose the correct character from the 2-3 similar options.
- **Goal**: Force the brain to distinguish the subtle differences in aspiration and tension.

### 3.2 Verb Conjugation Toggle in Vocabulary
Update the "Verbs & Adjectives" category in `src/routes/vocabulary.tsx`:
- **Data Update**: Add `politeForm` and `stem` fields to `VocabEntry` (or handle algorithmically for simple -아요/어요).
- **UI Toggle**: Add a "Show Conjugated" toggle in the vocabulary list.
- **Visuals**: When enabled, entries like `먹다` (to eat) will transform into `먹어요` (eat - polite), helping learners internalize the `-아요/어요` pattern.

## 4. Technical Impact
- **Data Schema**: Update `VocabEntry` in `src/data/vocabulary.ts` to include conjugation data.
- **Quiz Logic**: Expand `QuizMode` and question generator in `src/routes/quiz.tsx`.
- **Feature Flags**: Register `audio-contrast-quiz` and `verb-conjugation-toggle`.

## 5. Implementation Roadmap
1.  **Phase 4**: Implement Audio Contrast Quiz (Logic + UI).
2.  **Phase 5**: Update Vocabulary data with polite forms and implement the UI toggle.
3.  **Verification**: Conduct ear-training tests and verify conjugation accuracy.
