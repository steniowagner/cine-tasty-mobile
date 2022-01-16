import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import { ResultsStackProps as UseResultsProps } from '../../routes/route-params-types';

const useResults = ({ navigation, route }: UseResultsProps) => {
  const [results, setResults] = useState<Types.QuizResult[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const { questions, answers } = route.params;

    const result = questions.map((dataItem, index) => ({
      isCorrect: dataItem.correctAnswer?.toLowerCase() === answers[index].toLowerCase(),
      answer: dataItem.correctAnswer,
      userAnswer: answers[index],
      question: dataItem.question,
    }));

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
          onPress: () => navigation.pop(3),
        },
        { text: t(TRANSLATIONS.QUIZ_YES), onPress: () => navigation.pop(2) },
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
