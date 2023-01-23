import {useTranslations} from '@hooks';
import {useMemo} from 'react';

import {Translations} from '@i18n/tags';

import * as options from './options';
import {parseOptions} from './parseOptions';

export const useMakeSelectableOptionsDatasets = () => {
  const translations = useTranslations();

  const datasets = useMemo(
    () => ({
      difficulties: parseOptions({
        baseDataset: options.difficulties,
        i18nLabelTranslation: Translations.Tags.QUIZ_DIFFICULTY,
        translate: translations.translate,
      }),
      categories: parseOptions({
        baseDataset: options.categories,
        i18nLabelTranslation: Translations.Tags.QUIZ_CATEGORY,
        translate: translations.translate,
      }),
      types: parseOptions({
        baseDataset: options.types,
        i18nLabelTranslation: Translations.Tags.QUIZ_TYPE,
        translate: translations.translate,
      }),
    }),
    [translations.translate],
  );

  return datasets;
};
