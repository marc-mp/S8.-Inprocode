import { useTranslation } from 'react-i18next'
import banderaEs from '../assets/banderaEs.jpg'
import banderaEn from '../assets/banderaEn.jpg'
import banderaCa from '../assets/banderaCa.jpg'

const LanguageSelector= () => {

  const { i18n } = useTranslation()

  const Flags = {
    en: banderaEn,  
    es: banderaEs,
    ca: banderaCa, 
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
    localStorage.setItem('i18nextLng', language)
  }

  return (
    <div className="flex justify-end w-1/2 mt-10 mx-72 p-5">
      {Object.keys(Flags).map((lang) => (
        <img
          key={lang}
          src={Flags[lang]}
          alt={lang}
          className={`w-14 h-14 rounded-full mx-2 cursor-pointer ${i18n.language === lang ? 'border border-black border-opacity-50' : ''}`}
          onClick={() => handleLanguageChange(lang)}
        />
      ))}
    </div>
  )
}

export default LanguageSelector

