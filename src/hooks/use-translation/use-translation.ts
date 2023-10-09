import { useCallback, useMemo } from 'react';
import { useTranslation as i18nUseTranslation } from 'react-i18next';

import { supportedLanguages } from '@i18n/supported-languages';
import { Translations } from '@i18n/tags';

type Options = {
  value: number;
};

export const useTranslation = () => {
  const i18next = i18nUseTranslation();

  const translate = useCallback(
    (key: Translations.Tags, options?: Options) => i18next.t(key, options),
    [i18next.t],
  );

  const currentLanguage = useMemo(() => {
    switch (i18next.i18n.language) {
      case supportedLanguages[0]:
        return supportedLanguages[0];
      case supportedLanguages[1]:
        return supportedLanguages[1];
      case supportedLanguages[2]:
        return supportedLanguages[2];
      default:
        return supportedLanguages[0];
    }
  }, [i18next.i18n.language]);

  return {
    supportedLanguages,
    currentLanguage,
    translate,
  };
};
