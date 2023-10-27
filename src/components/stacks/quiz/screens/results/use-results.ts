import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

import { ResultsProps } from '../../routes/route-params-types';

export type QuizResult = {
  userAnswer: string;
  isCorrect: boolean;
  question: string;
  answer: string;
};

export const useResults = (params: ResultsProps) => {
  const [results, setResults] = useState<QuizResult[]>([]);

  const translations = useTranslation();

  const score = useMemo(
    () =>
      results.reduce((total, current) => total + Number(current.isCorrect), 0),
    [results],
  );

  const texts = useMemo(
    () => ({
      alertTitle: translations.translate(Translations.Quiz.QUIZ_PLAY_AGAIN),
      alertNegativeOption: translations.translate(Translations.Quiz.QUIZ_NO),
      alertPositiveOption: translations.translate(Translations.Quiz.QUIZ_YES),
      playAgain: translations.translate(Translations.Quiz.QUIZ_PLAY_AGAIN),
      alertDescription: translations.translate(
        Translations.Quiz.QUIZ_PLAY_AGAIN_DESCRIPTION,
      ),
      headerText: `${translations.translate(
        Translations.Quiz.QUIZ_SCORES,
      )} ${score}/${results.length}!`,
    }),
    [translations.translate, results, score],
  );

  const navigateToFirstQuizScreen = useCallback(
    () => params.navigation.pop(3),
    [],
  );

  const navigateToSetupQuizScreen = useCallback(
    () => params.navigation.pop(2),
    [],
  );

  const handlePlayAgain = useCallback(() => {
    Alert.alert(
      texts.playAgain,
      texts.alertDescription,
      [
        {
          text: texts.alertNegativeOption,
          style: 'cancel',
          onPress: navigateToFirstQuizScreen,
        },
        {
          text: texts.alertPositiveOption,
          onPress: navigateToSetupQuizScreen,
        },
      ],
      { cancelable: false },
    );
  }, [params.navigation.pop, texts]);

  const setQuizResults = useCallback(() => {
    const resultsMapping = params.route.params.questions.map(
      (question, index) => ({
        isCorrect:
          question.correctAnswer.toLowerCase() ===
          params.route.params.answers[index].toLowerCase(),
        userAnswer: params.route.params.answers[index],
        answer: question.correctAnswer,
        question: question.question,
      }),
    );
    setResults(resultsMapping);
  }, [params.route.params]);

  useEffect(() => {
    setQuizResults();
  }, []);

  return {
    onPressPlayAgain: handlePlayAgain,
    quizResults: results,
    texts,
  };
};
