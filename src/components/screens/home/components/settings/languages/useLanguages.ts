import {useCallback, useMemo} from 'react';
import RNRestart from 'react-native-restart';

import {CONSTANTS, storage} from '@utils';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const useLanguages = () => {
  const translations = useTranslations();

  const handlePressLanguage = useCallback(async (language: string) => {
    await storage.set(CONSTANTS.KEYS.LANGUAGE, language);
    RNRestart.Restart();
  }, []);

  const languages = useMemo(
    () =>
      translations.languages.map(language => ({
        title: translations.translate(
          `${Translations.Tags.SETTINGS_LANGUAGES}:${language}` as Translations.Tags,
        ),
        onPress: () => handlePressLanguage(language),
        id: language,
      })),
    [translations.languages],
  );

  return {
    selectedLanguage: translations.language,
    languages,
  };
};
