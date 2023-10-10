import { Platform, NativeModules } from 'react-native';

const detectDeviceLanguage = () =>
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

export const languageDetection = (
  fallbackLanguage: string,
  supportedLanguages: string[],
) => {
  const deviceLanguage = detectDeviceLanguage() as string;
  const language = deviceLanguage.slice(0, 2);
  const isSupportedLanguage = supportedLanguages.indexOf(language) >= 0;
  return isSupportedLanguage ? language : fallbackLanguage;
};
