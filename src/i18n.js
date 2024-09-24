import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './i18nextLanguages/en/en.json'
import es from './i18nextLanguages/es/es.json' 
import ca from './i18nextLanguages/ca/ca.json' 

i18next.use(LanguageDetector).use(initReactI18next).init({
  lng: "ca", // Idioma predeterminado
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'es',
  resources: {
    es: {
      translation: es,
    },
    en: {
      translation: en,
    },
    ca: {
      translation: ca,
    }
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
})

export default i18next
