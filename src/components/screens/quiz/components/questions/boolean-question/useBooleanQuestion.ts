import {useState, useMemo, useCallback} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseBooleanQuestionProps = {
  onPressNext: (answerSelected: string) => void;
};

const useBooleanQuestion = (props: UseBooleanQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>();

  const translations = useTranslations();

  const handlePressTrueOption = useCallback(() => {
    setSelectedAnswer(true);
  }, []);

  const handlePressFalseOption = useCallback(() => {
    setSelectedAnswer(false);
  }, []);

  const handlePressNext = useCallback(() => {
    props.onPressNext(String(selectedAnswer));
  }, [selectedAnswer, props.onPressNext]);

  const texts = useMemo(
    () => ({
      falseOption: translations.translate(Translations.Tags.QUIZ_FALSE),
      trueOption: translations.translate(Translations.Tags.QUIZ_TRUE),
      nextOption: translations.translate(Translations.Tags.QUIZ_NEXT),
    }),
    [translations.translate],
  );

  return {
    onPressFalseOption: handlePressFalseOption,
    onPressTrueOption: handlePressTrueOption,
    onPressNext: handlePressNext,
    selectedAnswer,
    texts,
  };
};

export default useBooleanQuestion;