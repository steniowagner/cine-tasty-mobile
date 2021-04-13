import { Platform, NativeModules } from 'react-native';

import {
  getItemFromStorage,
  persistItemInStorage,
} from '@utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from '@utils/constants';

// Android format: x_Y
// iOS format: x-Y
const defaultLanguagesMapping = {
  // Portuguese (Brazil)
  'pt-BR': 'ptBR',
  pt_BR: 'ptBR',

  // Portuguese (Portugal)
  'pt-PT': 'ptPT',
  pt_PT: 'ptPT',

  // English (USA)
  'en-US': 'en',
  en_US: 'en',

  // Spanish (Spain)
  'es-US': 'es',
  es_ES: 'es',

  // Swedish (Sweden)
  'sv-US': 'sv',
  sv_SE: 'sv',
};

const fallbackLanguagesMapping = {
  // Portuguese
  pt: 'ptBR',

  // English
  en: 'en',

  // Spanish
  es: 'es',

  // Swedish
  sv: 'sv',
};

const handleGetLanguageFallbackMapping = (language: string): string => {
  const [languageSuffix] = language.split('_');

  return fallbackLanguagesMapping[languageSuffix] || CONSTANTS.VALUES.FALLBACK_LANGUAGE;
};

const detectDeviceLanguage = (): string => {
  const deviceLanguage = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
        || NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

  return deviceLanguage;
};

const handleLanguageDetection = async (): Promise<string> => {
  const languagePreviouslySet = await getItemFromStorage<string, string>(
    CONSTANTS.KEYS.LANGUAGE,
    '',
  );

  if (languagePreviouslySet) {
    return languagePreviouslySet;
  }

  const deviceLanguage = detectDeviceLanguage();

  const languageToUse = defaultLanguagesMapping[deviceLanguage]
    || handleGetLanguageFallbackMapping(deviceLanguage);

  await persistItemInStorage(CONSTANTS.KEYS.LANGUAGE, languageToUse);

  return languageToUse;
};

export default handleLanguageDetection;
