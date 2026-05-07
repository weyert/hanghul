import type { Locale } from '../contexts/LanguageContext'

type LocaleRecord<T = string> = Record<Locale, T>

export function tr<T>(record: Record<Locale, T>, locale: Locale): T {
  return record[locale]
}

export const translations = {
  nav: {
    consonants:    { en: 'Consonants',     nl: 'Medeklinkers'      } as LocaleRecord,
    vowels:        { en: 'Vowels',         nl: 'Klinkers'          } as LocaleRecord,
    quiz:          { en: 'Quiz',           nl: 'Quiz'              } as LocaleRecord,
    pronounce:     { en: 'Pronounce',      nl: 'Uitspreken'        } as LocaleRecord,
    builder:       { en: 'Builder',        nl: 'Bouwer'            } as LocaleRecord,
    more:          { en: 'More',           nl: 'Meer'              } as LocaleRecord,
  },
  footer: {
    about:         { en: 'About',          nl: 'Over'              } as LocaleRecord,
    privacy:       { en: 'Privacy',        nl: 'Privacy'           } as LocaleRecord,
    sitemap:       { en: 'Sitemap',        nl: 'Sitemap'           } as LocaleRecord,
  },
  notFound: {
    message:       { en: 'Page not found.', nl: 'Pagina niet gevonden.' } as LocaleRecord,
    goHome:        { en: 'Go home',         nl: 'Naar de startpagina'   } as LocaleRecord,
  },
  theme: {
    toLightMode:   { en: 'Switch to light mode', nl: 'Naar lichtmodus'  } as LocaleRecord,
    toDarkMode:    { en: 'Switch to dark mode',  nl: 'Naar donkermodus' } as LocaleRecord,
  },
  flaggedRoutes: {
    lessons:       { en: 'Lessons',         nl: 'Lessen'            } as LocaleRecord,
    syllableChart: { en: 'Syllable Chart',  nl: 'Lettergreeptabel'  } as LocaleRecord,
    vocabulary:    { en: 'Vocabulary',      nl: 'Woordenschat'      } as LocaleRecord,
    strokeOrder:   { en: 'Stroke Order',    nl: 'Schrijfvolgorde'   } as LocaleRecord,
    typing:        { en: 'Typing',          nl: 'Typen'             } as LocaleRecord,
    progress:      { en: 'Progress',        nl: 'Voortgang'         } as LocaleRecord,
    koreaFacts:    { en: 'Korea Facts',     nl: 'Korea Feiten'      } as LocaleRecord,
    contrastDrills:{ en: 'Contrast Drills', nl: 'Contrastoefeningen'} as LocaleRecord,
  },
  home: {
    badge:         { en: 'Korean Writing System · 한국어 학습', nl: 'Koreaans schriftsysteem · 한국어 학습' } as LocaleRecord,
    heroTitle:     { en: 'Learn the Korean Alphabet',  nl: 'Leer het Koreaanse alfabet'  } as LocaleRecord,
    heroSubtitle:  {
      en: 'Start with 24 letters: 14 consonants and 10 vowels. Combine them into syllable blocks and start reading Korean in days.',
      nl: 'Begin met 24 letters: 14 medeklinkers en 10 klinkers. Combineer ze tot lettergreepblokken en lees binnen een paar dagen je eerste Koreaans.',
    } as LocaleRecord,
    startLearning: { en: 'Start Learning',   nl: 'Begin met leren'   } as LocaleRecord,
    testYourself:  { en: 'Test Yourself',    nl: 'Test jezelf'        } as LocaleRecord,
    seoNote:       {
      en: 'Start with Hangul. It gives you reading, pronunciation, and early vocabulary in one script.',
      nl: 'Begin met Hangul. Je oefent lezen, uitspraak en vroege woordenschat in één schrift.',
    } as LocaleRecord,
    howHangulClicks:{ en: 'How Hangul Works', nl: 'Hoe Hangul werkt'  } as LocaleRecord,
    lettersToBlocks:{ en: 'Letters stack into blocks. Blocks form words.', nl: 'Letters worden blokken. Blokken worden woorden.' } as LocaleRecord,
    lettersDesc:   {
      en: 'Hangul uses a small set of shapes that stack into compact syllables. The lessons, builder, and drills keep the structure visible.',
      nl: 'Hangul gebruikt een kleine set vormen die stapelen tot compacte lettergrepen. De lessen, de bouwer en de oefeningen houden de structuur zichtbaar.',
    } as LocaleRecord,
    initial:       { en: 'Initial',       nl: 'Begin'         } as LocaleRecord,
    vowelLabel:    { en: 'Vowel',         nl: 'Klinker'       } as LocaleRecord,
    finalLabel:    { en: 'Final',         nl: 'Eind'          } as LocaleRecord,
    beginnerRoadmap:{ en: 'Beginner Roadmap', nl: 'Stappenplan voor beginners' } as LocaleRecord,
    roadmapSteps:  {
      en: [
        { title: 'Core letters',    time: '10-15 min', desc: 'Start with the plainest consonants and vowels first.' },
        { title: 'Simple blocks',   time: '10 min',    desc: 'Read CV blocks before worrying about every sound rule.' },
        { title: 'Batchim basics',  time: '10 min',    desc: 'Learn what changes when a consonant moves to the bottom.' },
        { title: 'Contrast practice', time: '5-10 min', desc: 'Train the pairs beginners confuse most often.' },
      ],
      nl: [
        { title: 'Basisletter',     time: '10-15 min', desc: 'Begin met de eenvoudigste medeklinkers en klinkers.' },
        { title: 'Eenvoudige blokken', time: '10 min', desc: 'Leer KV-blokken lezen voordat je elk klankregel kent.' },
        { title: 'Batchim basis',   time: '10 min',    desc: 'Leer wat er verandert als een medeklinker naar de onderkant gaat.' },
        { title: 'Contrastoefeningen', time: '5-10 min', desc: 'Train de paren die beginners het vaakst samenvoegen.' },
      ],
    } as LocaleRecord<Array<{ title: string; time: string; desc: string }>>,
    yourLearningPath: { en: 'Your Learning Path', nl: 'Jouw leerpad'      } as LocaleRecord,
    learnAlphabet:    { en: 'Learn the Alphabet', nl: 'Leer het alfabet'  } as LocaleRecord,
    pronunciationTools: { en: 'Pronunciation Tools', nl: 'Uitspraakmiddelen' } as LocaleRecord,
    whyHangul:       { en: 'Why Hangul Works', nl: 'Waarom Hangul werkt' } as LocaleRecord,
    study:           { en: 'Study',    nl: 'Studeren'   } as LocaleRecord,
    consonantsCard:  {
      label:    { en: 'Consonants',  nl: 'Medeklinkers'  } as LocaleRecord,
      subLabel: { en: '자음 Ja-eum', nl: '자음 Ja-eum'   } as LocaleRecord,
      desc:     {
        en: '14 basic consonants and 5 tense consonants. Flip each card for its name, romanization, and example word.',
        nl: '14 basismedeklinkers en 5 gespannen medeklinkers. Draai een kaart om voor naam, romanisering en voorbeeldwoord.',
      } as LocaleRecord,
    },
    vowelsCard: {
      label:    { en: 'Vowels',      nl: 'Klinkers'      } as LocaleRecord,
      subLabel: { en: '모음 Mo-eum', nl: '모음 Mo-eum'   } as LocaleRecord,
      desc:     {
        en: '10 basic vowels and 11 compound vowels. Each card gives the sound and an example word.',
        nl: '10 basisklinkers en 11 samengestelde klinkers. Elke kaart geeft de klank en een voorbeeldwoord.',
      } as LocaleRecord,
    },
    quizCard: {
      label:    { en: 'Quiz',          nl: 'Quiz'                  } as LocaleRecord,
      subLabel: { en: '연습 Yeon-seup', nl: '연습 Yeon-seup'       } as LocaleRecord,
      desc:     {
        en: 'Answer 10 questions. Missed characters come back more often.',
        nl: 'Beantwoord 10 vragen. Letters die je mist komen vaker terug.',
      } as LocaleRecord,
    },
    pronounceCard: {
      label:    { en: 'Pronunciation Breakdown',  nl: 'Uitspraakoverzicht'   } as LocaleRecord,
      subLabel: { en: '발음 Bal-eum',             nl: '발음 Bal-eum'         } as LocaleRecord,
      desc:     {
        en: 'Type a Korean word. Split each syllable into initial consonant, vowel, and final consonant.',
        nl: 'Typ een Koreaans woord. Splits elke lettergreep in beginmedeklinker, klinker en eindmedeklinker.',
      } as LocaleRecord,
    },
    grammarCard: {
      label:    { en: 'Grammar 101',   nl: 'Grammatica 101'  } as LocaleRecord,
      subLabel: { en: '문법 Mun-beop', nl: '문법 Mun-beop'   } as LocaleRecord,
      desc:     {
        en: 'Put the verb at the end. Mark nouns with Korean particles.',
        nl: 'Zet het werkwoord achteraan. Markeer zelfstandige naamwoorden met Koreaanse deeltjes.',
      } as LocaleRecord,
    },
    builderCard: {
      label:    { en: 'Syllable Builder',  nl: 'Lettergreepbouwer'  } as LocaleRecord,
      subLabel: { en: '조합 Jo-hap',       nl: '조합 Jo-hap'        } as LocaleRecord,
      desc:     {
        en: 'Pick an initial consonant, a vowel, and an optional final. Build the block, then hear it.',
        nl: 'Kies een beginmedeklinker, een klinker en een optionele eindletter. Bouw het blok en luister.',
      } as LocaleRecord,
    },
    contrastCard: {
      label:    { en: 'Contrast Drills',   nl: 'Contrastoefeningen' } as LocaleRecord,
      subLabel: { en: '변별 Byeon-byeol',  nl: '변별 Byeon-byeol'  } as LocaleRecord,
      desc:     {
        en: 'Train the Korean sound contrasts beginners confuse.',
        nl: 'Oefen de Koreaanse klankverschillen die beginners vaak verwarren.',
      } as LocaleRecord,
    },
    stat1: {
      year:  { en: '1443',                nl: '1443'                  } as LocaleRecord,
      title: { en: 'Created by King Sejong', nl: 'Gemaakt door Koning Sejong' } as LocaleRecord,
      desc:  {
        en: 'King Sejong created Hangul to spread literacy. Before Hangul, Koreans wrote with Chinese characters beyond most people’s reach.',
        nl: 'Koning Sejong liet Hangul maken om meer mensen te leren lezen. Vóór Hangul schreven Koreanen met Chinese karakters die voor de meeste mensen buiten bereik lagen.',
      } as LocaleRecord,
    },
    stat2: {
      title: { en: 'Syllable Blocks',   nl: 'Lettergreepblokken' } as LocaleRecord,
      desc:  {
        en: 'Each character is a square block combining an initial consonant, a vowel, and an optional final consonant.',
        nl: 'Elk karakter is een vierkant blok dat een beginmedeklinker, een klinker en een optionele eindmedeklinker combineert.',
      } as LocaleRecord,
    },
    stat3: {
      title: { en: 'Phonetically Designed', nl: 'Fonetisch ontworpen' } as LocaleRecord,
      desc:  {
        en: 'Many letter shapes point to the position of your mouth and tongue. Shape carries sound.',
        nl: 'Veel lettervormen wijzen naar de stand van je mond en tong. Vorm draagt klank.',
      } as LocaleRecord,
    },
    learningPathSteps: {
      en: [
        { label: 'Consonants',       sub: '자음', desc: '14 basic and 5 tense consonants' },
        { label: 'Vowels',           sub: '모음', desc: '10 basic and 11 compound vowels' },
        { label: 'How Blocks Work',  sub: '음절', desc: 'Stack letters into syllable blocks' },
      ],
      nl: [
        { label: 'Medeklinkers',     sub: '자음', desc: '14 basismedeklinkers en 5 gespannen medeklinkers' },
        { label: 'Klinkers',         sub: '모음', desc: '10 basisklinkers en 11 samengestelde klinkers' },
        { label: 'Hoe blokken werken', sub: '음절', desc: 'Stapel letters tot lettergreepblokken' },
      ],
    } as LocaleRecord<Array<{ label: string; sub: string; desc: string }>>,
    learningPath4thStep: {
      en: {
        grammar:  { label: 'Grammar 101',     sub: '문법', desc: 'Use SOV structure and particles' },
        batchim:  { label: 'Batchim Basics',  sub: '받침', desc: 'Learn final consonants before drills' },
        quiz:     { label: 'Quiz',            sub: '연습', desc: 'Test recognition and recall' },
      },
      nl: {
        grammar:  { label: 'Grammatica 101',  sub: '문법', desc: 'Gebruik woordvolgorde en Koreaanse deeltjes' },
        batchim:  { label: 'Batchim Basis',   sub: '받침', desc: 'Leer eindmedeklinkers voor de oefeningen' },
        quiz:     { label: 'Quiz',            sub: '연습', desc: 'Test herkenning en geheugen' },
      },
    } as LocaleRecord<{ grammar: { label: string; sub: string; desc: string }; batchim: { label: string; sub: string; desc: string }; quiz: { label: string; sub: string; desc: string } }>,
  },
} as const
