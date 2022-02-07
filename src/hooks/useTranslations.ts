import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {Translations} from '@i18n/tags';

type Options = {
  value: number;
};

export const useTranslations = () => {
  const {t} = useTranslation();

  const translate = useCallback(
    (key: Translations.Tags, options?: Options) => t(key, options),
    [t],
  );

  return {
    translate,
  };
};
