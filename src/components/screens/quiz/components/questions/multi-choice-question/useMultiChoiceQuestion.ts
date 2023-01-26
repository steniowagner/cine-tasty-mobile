import {useCallback, useState, useMemo} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

type UseMultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
};

export const useMultiChoiceQuestion = (props: UseMultiChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const translations = useTranslations();

  const handlePressNext = useCallback(() => {
    props.onPressNext(selectedOption);
  }, [props.onPressNext, selectedOption]);

  const texts = useMemo(
    () => ({
      nextButton: translations.translate(Translations.Tags.QUIZ_NEXT),
    }),
    [translations.translate],
  );

  return {
    isNextButtonDisabled: !selectedOption,
    onSelectOption: (option: string) => setSelectedOption(option),
    onPressNext: handlePressNext,
    selectedOption,
    texts,
  };
};
