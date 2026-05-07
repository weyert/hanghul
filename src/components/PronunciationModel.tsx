import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export function PronunciationModel({ compact = false }: { compact?: boolean }) {
  const [technical, setTechnical] = useState(false)
  const { language } = useLanguage()

  const copy = {
    en: {
      title: 'Core pronunciation model',
      view: technical ? 'Technical view' : 'Beginner view',
      hint: 'switch depending on how much detail you want.',
      tabs: { beginner: 'Beginner', technical: 'Technical' },
      technical: [
        { title: 'Plain / lax stops', text: 'ㄱ ㄷ ㅂ ㅈ are the plain series. Word-initially they are usually voiceless or weakly voiced, with little aspiration.' },
        { title: 'Aspirated stops', text: 'ㅋ ㅌ ㅍ ㅊ add a stronger burst of air. Airflow is the easiest contrast to train first.' },
        { title: 'Tense stops', text: 'ㄲ ㄸ ㅃ ㅆ ㅉ are tight, clipped, and non-aspirated. Think tension, not loudness.' },
        { title: 'Syllable blocks', text: 'Read blocks as units: initial + vowel + optional batchim. Sound changes often happen across block boundaries.' },
      ],
      beginner: [
        { title: 'Three consonant families', text: 'Korean stop sounds come in plain, airy, and tight versions. Do not collapse them into one English sound.' },
        { title: 'Read by blocks', text: 'Treat each square Hangul block as one beat of sound, not as separate letters in a row.' },
        { title: 'Batchim changes sound', text: 'A final consonant often sounds different from the same letter at the start of a syllable.' },
        { title: 'Use audio over spelling', text: 'Romanization helps at first, but your ears should become the final authority.' },
      ],
    },
    nl: {
      title: 'Kernmodel voor uitspraak',
      view: technical ? 'Technische weergave' : 'Beginnersweergave',
      hint: 'Schakel om als je meer of minder detail wilt.',
      tabs: { beginner: 'Beginner', technical: 'Technisch' },
      technical: [
        { title: 'Gewone stops', text: 'ㄱ ㄷ ㅂ ㅈ vormen de gewone reeks. Aan het begin van een woord zijn ze meestal stemloos of zwak stemhebbend, met weinig aspiratie.' },
        { title: 'Geaspireerde stops', text: 'ㅋ ㅌ ㅍ ㅊ voegen een duidelijke luchtstoot toe. Train eerst de luchtstroom.' },
        { title: 'Gespannen stops', text: 'ㄲ ㄸ ㅃ ㅆ ㅉ zijn strak, kort en ongeaspireerd. Denk aan spanning, niet aan volume.' },
        { title: 'Lettergreepblokken', text: 'Lees blokken als eenheden: beginmedeklinker + klinker + optionele batchim. Klankveranderingen gebeuren vaak over blokgrenzen heen.' },
      ],
      beginner: [
        { title: 'Drie medeklinkerfamilies', text: 'Koreaanse stops komen in gewone, luchtige en gespannen versies. Maak er niet één Nederlandse klank van.' },
        { title: 'Lees per blok', text: 'Behandel elk vierkant Hangul-blok als één klankslag, niet als losse letters op een rij.' },
        { title: 'Batchim verandert klank', text: 'Een eindmedeklinker klinkt vaak anders dan dezelfde letter aan het begin van een lettergreep.' },
        { title: 'Gebruik audio boven spelling', text: 'Romanisering helpt kort, maar je oren moeten de doorslag geven.' },
      ],
    },
  }[language]

  const rows = technical
    ? copy.technical
    : copy.beginner

  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{copy.title}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--c-3)' }}>
            {copy.view}. {copy.hint}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg p-0.5" style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-border)' }}>
          {[
            { key: 'beginner', label: copy.tabs.beginner, active: !technical },
            { key: 'technical', label: copy.tabs.technical, active: technical },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setTechnical(option.key === 'technical')}
              className="px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer"
              style={option.active
                ? { background: 'var(--c-accent-muted)', color: 'var(--c-accent-text)' }
                : { color: 'var(--c-3)' }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`grid gap-3 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {rows.map((row) => (
          <div key={row.title} className="rounded-xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--c-1)' }}>{row.title}</p>
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--c-3)' }}>{row.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
