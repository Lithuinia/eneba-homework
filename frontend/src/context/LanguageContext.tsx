import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { formatPrice, translate } from '../i18n'
import type { Language } from '../types'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (key: string, vars?: Record<string, string | number>) => string
  price: (value: number) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function initialLanguage(): Language {
  const stored = localStorage.getItem('intus_language')
  if (stored === 'en' || stored === 'lt') {
    return stored
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    localStorage.setItem('intus_language', language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<LanguageContextValue>(() => {
    const setLanguage = (next: Language) => setLanguageState(next)
    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguageState((current) => (current === 'en' ? 'lt' : 'en')),
      t: (key, vars) => translate(language, key, vars),
      price: (amount) => formatPrice(amount, language),
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
