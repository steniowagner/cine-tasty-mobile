import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

import * as storage from '@utils/storage';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

const useLanguages = () => {
  const {i18n, t} = useTranslation();

  const languages = useMemo(() => {
    if (!i18n) {
      return [];
    }

    const languageKeys = Object.keys(
      i18n.services.resourceStore.data,
    ) as Types.Languages[];

    return languageKeys.map(languageKey => ({
      onPress: async () => {
        await storage.set(CONSTANTS.KEYS.LANGUAGE, languageKey);

        RNRestart.Restart();
      },
      title: t(`${TRANSLATIONS.LANGUAGES}:${languageKey}`),
      id: languageKey,
    }));
  }, [i18n]);

  return {
    selectedLanguage: i18n.language,
    languages,
  };
};

export default useLanguages;
