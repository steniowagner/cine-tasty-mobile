import {useCallback, useMemo} from 'react';

import * as Types from '@local-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

import {useOptionsSelected} from '../../provider/OptionsSelectedProvider';

type UseChooseOptionSectionProps = {
  onOpenSetupQuestionsModal: () => void;
  section: Types.QuizOption;
};

export const useChooseOptionSection = (props: UseChooseOptionSectionProps) => {
  const optionsSelected = useOptionsSelected();

  const translations = useTranslations();

  const handlPressOption = useCallback(() => {
    optionsSelected.onPressOptionSection(props.section);
    props.onOpenSetupQuestionsModal();
  }, [
    optionsSelected.onPressOptionSection,
    props.onOpenSetupQuestionsModal,
    props.section,
  ]);

  const selectedOption = useMemo(() => {
    switch (props.section) {
      case 'difficulty':
        return optionsSelected.selectedOptions.difficulty.label;
      case 'category':
        return optionsSelected.selectedOptions.category.label;
      case 'type':
        return optionsSelected.selectedOptions.type.label;
      default:
        return '';
    }
  }, [optionsSelected.selectedOptions, props.section]);

  const texts = useMemo(() => {
    switch (props.section) {
      case 'difficulty':
        return translations.translate(Translations.Tags.QUIZ_DIFFICULTY);
      case 'category':
        return translations.translate(Translations.Tags.QUIZ_CATEGORY);
      case 'type':
        return translations.translate(Translations.Tags.QUIZ_TYPE);
      default:
        return '';
    }
  }, [translations.translate, props.section]);

  return {
    texts: {sectionTitle: texts},
    onPressOption: handlPressOption,
    selectedOption,
  };
};
