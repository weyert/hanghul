import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export type Language = 'en' | 'nl'

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  nl: 'Nederlands',
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
})

const STORAGE_KEY = 'hangul-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'nl') {
      setLanguageState(saved)
    }
  }, [])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
