import { OpenFeature, InMemoryProvider } from '@openfeature/react-sdk'
import { FLAG_DEFINITIONS } from './flagDefinitions'

export const FLAGS = {
  SYLLABLE_CHART: 'syllable-chart',
  VOCABULARY: 'vocabulary',
  SPACED_REPETITION: 'spaced-repetition',
  LISTEN_QUIZ: 'listen-quiz',
  WORD_QUIZ: 'word-quiz',
  TYPING_PRACTICE: 'typing-practice',
  PROGRESS_DASHBOARD: 'progress-dashboard',
  STROKE_ORDER: 'stroke-order',
  IPA_DISPLAY: 'ipa-display',
  CULTURAL_CONTEXT: 'cultural-context',
  MIXED_QUIZ: 'mixed-quiz',
  STROKE_PRACTICE: 'stroke-practice',
  SYLLABLE_BLOCKS: 'syllable-blocks',
  GUIDED_LEARN: 'guided-learn',
  QUIZ_RETRY_WRONG: 'quiz-retry-wrong',
  QUIZ_AUTO_AUDIO: 'quiz-auto-audio',
  QUIZ_CORRECT_TIP: 'quiz-correct-tip',
  TYPING_BEGINNER: 'typing-beginner',
  KOREA_FACTS: 'korea-facts',
  HANGUL_FIRST: 'hangul-first',
  ENGLISH_GUIDE: 'english-guide',
  DUTCH_GUIDE: 'dutch-guide',
  ROMANIZATION_GUIDE: 'romanization-guide',
  IPA_GUIDE: 'ipa-guide',
  PRONUNCIATION_MODEL: 'pronunciation-model',
  BATCHIM_LESSON: 'batchim-lesson',
  GRAMMAR_GUIDE: 'grammar-guide',
  AUDIO_CONTRAST_QUIZ: 'audio-contrast-quiz',
  VERB_CONJUGATION: 'verb-conjugation',
  CONTRAST_DRILLS: 'contrast-drills',
  SENTENCE_PATTERNS: 'sentence-patterns',
  BEGINNER_ROADMAP: 'beginner-roadmap',
  QUIZ_WRONG_HINTS: 'quiz-wrong-hints',
} as const

export type FlagKey = (typeof FLAGS)[keyof typeof FLAGS]

// SSR / initial render: serve flags immediately from the shared definitions
// so the server-rendered HTML matches what the client will show.
OpenFeature.setProvider(new InMemoryProvider(FLAG_DEFINITIONS))

// Client: keep the static provider by default so SSR and hydration render the
// same flag values. Opt into remote OFREP polling when explicitly configured.
if (typeof window !== 'undefined' && import.meta.env.VITE_OFREP_FLAGS === 'true') {
  import('@openfeature/ofrep-web-provider').then(({ OFREPWebProvider }) => {
    OpenFeature.setProvider(
      new OFREPWebProvider({
        baseUrl: '',       // hits /ofrep/v1/evaluate/flags on the same origin
        pollInterval: 30_000,
      }),
    )
  })
}
