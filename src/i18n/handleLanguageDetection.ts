import {Platform, NativeModules} from 'react-native';

import {CONSTANTS, storage} from '@utils';

// Android format: x_Y
// iOS format: x-Y
const defaultLanguagesMapping = {
  // Portuguese (Brazil)
  'pt-BR': 'ptBR',
  pt_BR: 'ptBR',

  // Portuguese (Portugal)
  'pt-PT': 'ptBR',
  pt_PT: 'ptBR',

  // English (USA)
  'en-US': 'en',
  en_US: 'en',

  // Spanish (Spain)
  'es-US': 'es',
  es_ES: 'es',
};

const fallbackLanguagesMapping = {
  // Portuguese
  pt: 'ptBR',

  // English
  en: 'en',

  // Spanish
  es: 'es',
};

const handleGetLanguageFallbackMapping = (language: string): string => {
  const [languageSuffix] = language.split('_');

  return (
    fallbackLanguagesMapping[languageSuffix] ||
    CONSTANTS.VALUES.FALLBACK_LANGUAGE
  );
};

const detectDeviceLanguage = (): string => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return deviceLanguage;
};

const handleLanguageDetection = async (): Promise<string> => {
  const languagePreviouslySet = await storage.get<string, string>(
    CONSTANTS.KEYS.LANGUAGE,
    '',
  );

  if (languagePreviouslySet) {
    return languagePreviouslySet;
  }

  const deviceLanguage = detectDeviceLanguage();

  const languageToUse =
    defaultLanguagesMapping[deviceLanguage] ||
    handleGetLanguageFallbackMapping(deviceLanguage);

  await storage.set(CONSTANTS.KEYS.LANGUAGE, languageToUse);

  return languageToUse;
};

export default handleLanguageDetection;
