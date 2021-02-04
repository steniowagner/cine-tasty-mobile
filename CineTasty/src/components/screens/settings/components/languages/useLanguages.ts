import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import { persistItemInStorage } from 'utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from 'utils/constants';
import { Languages } from 'types';

export const LANGUAGES_I18N_REF = 'translations:languages';

type LanguageItem = {
  onPress: () => void;
  title: string;
  id: Languages;
};

type State = {
  languages: LanguageItem[];
  selectedLanguage: string;
};

const useLanguages = (): State => {
  const { i18n, t } = useTranslation();

  const languages = useMemo(() => {
    if (!i18n) {
      return [];
    }

    const languageKeys = Object.keys(i18n.services.resourceStore.data) as Languages[];

    return languageKeys.map((languageKey) => ({
      onPress: async () => {
        await persistItemInStorage(CONSTANTS.KEYS.LANGUAGE, languageKey);

        RNRestart.Restart();
      },
      title: t(`${LANGUAGES_I18N_REF}:${languageKey}`),
      id: languageKey,
    }));
  }, [i18n]);

  return {
    selectedLanguage: i18n.language,
    languages,
  };
};

export default useLanguages;
