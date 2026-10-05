import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { STRINGS, Strings } from './strings'

export type Lang = 'en' | 'id'

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia' }
]

const STORAGE_KEY = 'quran-checksum:lang'

// English is the default; the reader's choice is remembered in this browser only
function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'id' ? 'id' : 'en'
  } catch {
    return 'en'
  }
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage may be unavailable (private mode); the choice then lasts for this visit only
    }
  }

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

// The interface text in the current language
export const useT = (): Strings => STRINGS[useLanguage().lang]
