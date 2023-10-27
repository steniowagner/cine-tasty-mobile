import { useState, useMemo, useCallback } from 'react';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

type UseBooleanQuestionProps = {
  onPressNext: (answerSelected: string) => void;
};

export const useBooleanQuestion = (props: UseBooleanQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>();

  const translation = useTranslation();

  const handlePressNext = useCallback(() => {
    props.onPressNext(String(selectedAnswer));
  }, [selectedAnswer, props.onPressNext]);

  const texts = useMemo(
    () => ({
      false: translation.translate(Translations.Quiz.QUIZ_FALSE),
      true: translation.translate(Translations.Quiz.QUIZ_TRUE),
      next: translation.translate(Translations.Quiz.QUIZ_NEXT),
    }),
    [translation.translate],
  );

  const handleSelectFalseOption = useCallback(() => {
    setSelectedAnswer(false);
  }, []);

  const handleSelectTrueOption = useCallback(() => {
    setSelectedAnswer(true);
  }, []);

  return {
    onPressFalseOption: handleSelectFalseOption,
    onPressTrueOption: handleSelectTrueOption,
    onPressNext: handlePressNext,
    selectedAnswer,
    texts,
  };
};
