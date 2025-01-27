import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: {
          'language.select': 'Language',
          'language.en': 'English',
          'language.pl': 'Polski'
        }
      },
      pl: {
        common: {
          'language.select': 'Język',
          'language.en': 'Angielski',
          'language.pl': 'Polski'
        }
      }
    }
  });

export default i18n; 