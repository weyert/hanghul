# RFC: Pedagogical Improvements for Korean Language Learning

## Status
- **Status**: Proposed
- **Author**: Gemini CLI (Expert Korean Teacher Mode)
- **Date**: 2026-05-05

## 1. Executive Summary
Following a comprehensive review of the current Korean language curriculum on the site, this RFC proposes a series of updates to align the technical data and instructional content with standard Korean pedagogical norms. Key focus areas include correcting stroke order data, introducing critical pronunciation rules (Liaison/Batchim), and establishing a foundation for grammar instruction.

## 2. Problem Statement
While the current application provides an excellent introduction to Hangul phonetics and vocabulary, certain technical and instructional gaps may hinder a learner's transition from "recognition" to "production":
1. **Inaccurate Stroke Order**: Current data in `strokeOrder.ts` often treats continuous calligraphic strokes as multiple separate actions, which misleads students learning to write.
2. **Missing Phonological Rules**: The concept of "Liaison" (Yeon-eum) and the simplification of final consonants (the "7 Final Sounds" rule) are missing. These are essential for moving beyond reading individual blocks.
3. **Lack of Sentence Architecture**: Learners are introduced to phrases but not the underlying Subject-Object-Verb (SOV) structure or the role of particles.

## 3. Proposed Changes

### 3.1 Correcting Stroke Order Data (`src/data/strokeOrder.ts`)
Update the `STROKE_ORDER` object to reflect the standard Korean Ministry of Education guidelines. 
- **Example Correction (ㄱ)**: Change from 2 strokes (Horizontal + Vertical) to 1 single fluid stroke.
- **Example Correction (ㅁ)**: Change from 4 strokes to the standard 3-stroke sequence (Vertical left → Top-Right angle → Bottom horizontal).

### 3.2 Expanding Batchim Instruction (`src/routes/batchim.tsx`)
Introduce two high-priority sections to the Batchim page:
1. **The 7 Final Sounds Table**: Explicitly teach that although there are many consonants, there are only 7 distinct sounds at the end of a syllable (`ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ`).
   - Grouping: `ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ, ㄷ` → all sound like `ㄷ` [t].
2. **Liaison (Yeon-eum / 연음)**: Explain the "hollow circle" rule. When a block with a final consonant is followed by a block starting with `ㅇ`, the consonant "jumps" into the `ㅇ` position.
   - Example: `밥이` (bap-i) is pronounced as `바비` (ba-bi).

### 3.3 Grammar 101: Particles & SOV (`src/routes/grammar.tsx`)
Create a new route to introduce the "Big Picture" of Korean grammar:
- **SOV Order**: Contrast with English/Dutch SVO order.
- **The "Glue" of Korean (Particles)**:
  - Subject particles (`이/가`)
  - Topic particles (`은/는`)
  - Object particles (`을/를`)
- **Verb Conjugation Intro**: The concept of "stems" and basic polite endings (`-아요/어요`).

### 3.4 Vocabulary Refinement (`src/data/vocabulary.ts`)
- **Politeness Labeling**: Add a `politeness` field to `VocabEntry` to distinguish between `Formal/Polite` (Jondaemal) and `Casual` (Banmal) more systematically.
- **Category Expansion**: Add a "Verbs/Adjectives" category to support the new grammar lessons.

## 4. Technical Impact
- **Data Schemas**: Minor updates to `VocabEntry` and `StrokeData` interfaces.
- **Routing**: Addition of `/grammar` route and corresponding links in the navigation menu.
- **UI Components**: The `PronunciationModel` may need updates to visualize liaison rules in the future.

## 5. Implementation Roadmap
1. **Phase 1**: Correct Stroke Order and Batchim rules (Immediate technical fixes).
2. **Phase 2**: Implement the `/grammar` guide and update the navigation structure.
3. **Phase 3**: Refactor Vocabulary data to include politeness levels and verb categories.

## 6. Alternatives Considered
- **Strict IPA Focus**: Dismissed in favor of practical pedagogical descriptions, as IPA can be intimidating for absolute beginners.
- **Deep Grammar (Grammar-Translation Method)**: Dismissed in favor of a "Function-First" approach (teaching particles only as they relate to basic sentence building).
