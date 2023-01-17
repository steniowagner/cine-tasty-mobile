import {useCallback} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

import {languages, Language} from './languages';

export const useLanguages = () => {
  const translations = useTranslations();

  const sortLanguages = useCallback(
    (translatedLanguages: Language[]) =>
      translatedLanguages.sort((x, y) =>
        Intl.Collator().compare(x.name, y.name),
      ),
    [],
  );

  const translateLanguages = useCallback(
    () =>
      languages.map(language => ({
        ...language,
        name: translations.translate(
          `${Translations.Tags.NEWS_LANGUAGES}:${language.name}` as Translations.Tags,
        ),
      })),
    [translations.translate],
  );

  return sortLanguages(translateLanguages());
};
