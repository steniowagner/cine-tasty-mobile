import {useCallback, useState, useMemo} from 'react';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

type UseMultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
};

const useMultiChoiceQuestion = (props: UseMultiChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const translations = useTranslations();

  const handleSelectOption = useCallback((option: string) => {
    setSelectedOption(option);
  }, []);

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
    onSelectOption: handleSelectOption,
    onPressNext: handlePressNext,
    selectedOption,
    texts,
  };
};

export default useMultiChoiceQuestion;
