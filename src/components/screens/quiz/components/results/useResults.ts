import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import { ResultsStackProps as UseResultsProps } from '../../routes/route-params-types';

const useResults = (props: UseResultsProps) => {
  const [results, setResults] = useState<Types.QuizResult[]>([]);

  const { t } = useTranslation();

  const getResults = useCallback(
    ({ questions, answers }: typeof props.route.params) => questions.map((dataItem, index) => ({
      isCorrect: dataItem.correctAnswer?.toLowerCase() === answers[index].toLowerCase(),
      answer: dataItem.correctAnswer,
      userAnswer: answers[index],
      question: dataItem.question,
    })),
    [],
  );

  useEffect(() => {
    const result = getResults(props.route.params);

    setResults(result);
  }, []);

  const onPressPlayAgain = useCallback((): void => {
    Alert.alert(
      t(TRANSLATIONS.QUIZ_PLAY_AGAIN),
      t(TRANSLATIONS.QUIZ_PLAY_AGAIN_DESCRIPTION),
      [
        {
          text: t(TRANSLATIONS.QUIZ_NO),
          style: 'cancel',
          onPress: () => props.navigation.pop(3),
        },
        { text: t(TRANSLATIONS.QUIZ_YES), onPress: () => props.navigation.pop(2) },
      ],
      { cancelable: false },
    );
  }, []);

  return {
    onPressPlayAgain,
    results,
    t,
  };
};

export default useResults;
