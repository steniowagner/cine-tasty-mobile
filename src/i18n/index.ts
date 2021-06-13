import i18next, { Module } from 'i18next';
import { initReactI18next } from 'react-i18next';

import handleLanguageDetection from './handleLanguageDetection';
import CONSTANTS from '../utils/constants';

import ptBR from './locale/ptBR';
import es from './locale/es';
import en from './locale/en';

const languageDetectorType: Module = {
  type: 'languageDetector',
};

const languageDetector = {
  type: languageDetectorType.type,
  async: true,
  detect: async (callback) => {
    const language = await handleLanguageDetection();
    console.log('>>> language: ', language);
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
      ptBR: {
        translations: ptBR,
      },
      es: {
        translations: es,
      },
    },
  });

export default i18next;
