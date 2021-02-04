import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import handleLanguageDetection from './handleLanguageDetection';
import CONSTANTS from '../utils/constants';

import ptBR from './locale/ptBR';
import ptPT from './locale/ptPT';
import es from './locale/es';
import en from './locale/en';
import sv from './locale/sv';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const language = await handleLanguageDetection();

    callback(language);
  },
  cacheUserLanguage: () => {},
  init: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: CONSTANTS.VALUES.FALLBACK_LANGUAGE,
    debug: true,
    resources: {
      en: {
        translations: en,
      },
      sv: {
        translations: sv,
      },
      es: {
        translations: es,
      },
      ptBR: {
        translations: ptBR,
      },
      ptPT: {
        translations: ptPT,
      },
    },
  });

export default i18next;
