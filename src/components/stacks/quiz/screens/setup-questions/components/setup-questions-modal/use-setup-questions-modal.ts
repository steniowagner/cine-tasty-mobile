import { useCallback, useEffect, useMemo, useState } from 'react';

import { Translations } from '@/i18n/tags';
import { useTranslation } from '@/hooks';

import {
  SetupQuestionOption,
  OptionValue,
} from '../../use-setup-questions/types';

type UseSetupQuestionsModalParams = {
  options: SetupQuestionOption[];
  optionSelected?: OptionValue;
  onCloseModal: () => void;
  isModalOpen: boolean;
  onConfirmSelectedOption: (value: OptionValue) => void;
};

export const useSetupQuestionsModal = (
  params: UseSetupQuestionsModalParams,
) => {
  const [optionSelected, setOptionSelected] = useState<
    OptionValue | undefined
  >();
  const translation = useTranslation();

  const handleConfirmOptionSelection = useCallback(() => {
    if (!optionSelected) {
      return;
    }
    setOptionSelected(undefined);
    params.onConfirmSelectedOption(optionSelected);
  }, [params.onConfirmSelectedOption, optionSelected]);

  const options = useMemo(
    () =>
      params.options.map(option => ({
        title: translation.translate(option.translationTag),
        value: option.value,
      })),
    [params.options],
  );

  const texts = useMemo(
    () => ({
      modalCTATitle: translation.translate(
        Translations.Quiz.QUIZ_MODAL_SELECT_TEXT,
      ),
    }),
    [translation.translate],
  );

  useEffect(() => {
    setOptionSelected(params.optionSelected);
  }, [params.optionSelected]);

  return {
    handleSelectOption: setOptionSelected,
    onPressOption: setOptionSelected,
    onPressCTA: handleConfirmOptionSelection,
    options,
    optionSelected,
    texts,
  };
};
