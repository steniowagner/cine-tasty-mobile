import { useCallback, useMemo } from 'react';

import { useTranslation } from '@hooks';
import { Translations } from '@i18n/tags';

import { languages, Language } from './languages';

type TranslatedLanguage = Omit<Language, 'name'> & { name: string };

export const useNewsFilterLanguages = () => {
  const translation = useTranslation();

  const sortLanguages = useCallback(
    (translatedLanguages: TranslatedLanguage[]) =>
      translatedLanguages.sort((x, y) =>
        Intl.Collator().compare(x.name, y.name),
      ),
    [],
  );

  const translateLanguages = useCallback(
    () =>
      languages.map(language => ({
        ...language,
        name: translation.translate(
          `${Translations.News.LANGUAGES}:${language.name}` as Translations.Tags,
        ),
      })),
    [translation.translate],
  );

  const filterLanguages = useMemo(
    () => sortLanguages(translateLanguages()),
    [sortLanguages, translateLanguages],
  );

  return filterLanguages;
};
