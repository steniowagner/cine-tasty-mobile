import { Platform, NativeModules } from 'react-native';

const supportedLanguages = {
  pt: 'pt',
  en: 'en',
  es: 'es',
};

const detectDeviceLanguage = () =>
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

export const languageDetection = (fallbackLanguage: string) => {
  const deviceLanguage = detectDeviceLanguage() as string;
  const language = deviceLanguage.slice(
    0,
    2,
  ) as keyof typeof supportedLanguages;
  return supportedLanguages[language] ?? fallbackLanguage;
};
