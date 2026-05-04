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
} as const

// SSR / initial render: serve flags immediately from the shared definitions
// so the server-rendered HTML matches what the client will show.
OpenFeature.setProvider(new InMemoryProvider(FLAG_DEFINITIONS))

// Client: replace with the OFREP remote provider once the browser is ready.
// Dynamic import keeps the OFREP bundle out of the server build.
if (typeof window !== 'undefined') {
  import('@openfeature/ofrep-web-provider').then(({ OFREPWebProvider }) => {
    OpenFeature.setProvider(
      new OFREPWebProvider({
        baseUrl: '',       // hits /ofrep/v1/evaluate/flags on the same origin
        pollInterval: 30_000,
      }),
    )
  })
}
