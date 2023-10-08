import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { languageDetection } from './language-detection';
import { pt } from './locale/pt';
import { es } from './locale/es';
import { en } from './locale/en';

const FALLBACK_LANGUAGE = 'en';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async () => languageDetection(FALLBACK_LANGUAGE),
  cacheUserLanguage: () => {},
  init: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: FALLBACK_LANGUAGE,
    debug: __DEV__,
    resources: {
      en: {
        translations: en,
      },
      pt: {
        translations: pt,
      },
      es: {
        translations: es,
      },
    },
  });
