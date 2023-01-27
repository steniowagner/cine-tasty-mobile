import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

import {useMakeSelectableOptionsDatasets} from './make-selectable-options-datasets/useMakeSelectableOptionsDatasets';
import {useOptionsSelected} from '../provider/OptionsSelectedProvider';

export const useGetSelectableOptionsModalData = () => {
  const selectableOptionsDatasets = useMakeSelectableOptionsDatasets();

  const translations = useTranslations();

  const optionsSelected = useOptionsSelected();

  const title = useMemo(() => {
    switch (optionsSelected.activeOption?.option) {
      case 'difficulty':
        return translations.translate(Translations.Tags.QUIZ_SET_DIFFICULTY);
      case 'category':
        return translations.translate(Translations.Tags.QUIZ_SET_CATEGORY);
      case 'type':
        return translations.translate(Translations.Tags.QUIZ_SET_TYPE);
      default:
        return '';
    }
  }, [optionsSelected, translations.translate]);

  const options = useMemo(() => {
    switch (optionsSelected.activeOption?.option) {
      case 'difficulty':
        return selectableOptionsDatasets.difficulties;
      case 'category':
        return selectableOptionsDatasets.categories;
      case 'type':
        return selectableOptionsDatasets.types;
      default:
        return [];
    }
  }, [optionsSelected, selectableOptionsDatasets]);

  const texts = useMemo(
    () => ({
      modalCtaTitle: translations.translate(Translations.Tags.SELECT),
      modalTitle: title,
    }),
    [translations.translate, title],
  );

  return {
    texts,
    options,
  };
};
