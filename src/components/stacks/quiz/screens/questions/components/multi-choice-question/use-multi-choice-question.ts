import { useCallback, useState, useMemo } from 'react';

import { useTranslation } from '@hooks';
import { Translations } from '@i18n/tags';

type UseMultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
};

export const useMultiChoiceQuestion = (props: UseMultiChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const translations = useTranslation();

  const handlePressNext = useCallback(() => {
    props.onPressNext(selectedOption);
  }, [props.onPressNext, selectedOption]);

  const handleSelectOption = useCallback((option: string) => {
    setSelectedOption(option);
  }, []);

  const texts = useMemo(
    () => ({
      next: translations.translate(Translations.Quiz.QUIZ_NEXT),
    }),
    [translations.translate],
  );

  return {
    isNextButtonDisabled: !selectedOption,
    onSelectOption: handleSelectOption,
    onPressNext: handlePressNext,
    selectedOption,
    texts,
  };
};
