import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {Translations} from '@i18n/tags';

export const useTranslations = () => {
  const {t} = useTranslation();

  const translate = useCallback((key: Translations.Tags) => t(key), [t]);

  return {
    translate,
  };
};
