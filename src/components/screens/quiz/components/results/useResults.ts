import {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import * as Types from '@local-types';

import {ResultsStackProps as UseResultsProps} from '../../routes/route-params-types';

export const useResults = (props: UseResultsProps) => {
  const [results, setResults] = useState<Types.QuizResult[]>([]);

  const translations = useTranslations();

  const resultsMapping = useMemo(
    () =>
      props.route.params.questions.map((question, index) => ({
        isCorrect:
          question.correctAnswer?.toLowerCase() ===
          props.route.params.answers[index].toLowerCase(),
        userAnswer: props.route.params.answers[index],
        answer: question.correctAnswer,
        question: question.question,
      })),
    [props.route.params],
  );

  const setQuizResults = useCallback(() => {
    setResults(resultsMapping);
  }, [resultsMapping]);

  const score = useMemo(
    () =>
      results.reduce((total, current) => total + Number(current.isCorrect), 0),
    [results],
  );

  const texts = useMemo(
    () => ({
      modalTitle: translations.translate(Translations.Tags.QUIZ_PLAY_AGAIN),
      modalNegativeOption: translations.translate(Translations.Tags.QUIZ_NO),
      modalPositiveOption: translations.translate(Translations.Tags.QUIZ_YES),
      playAgain: translations.translate(Translations.Tags.QUIZ_PLAY_AGAIN),
      modalDescription: translations.translate(
        Translations.Tags.QUIZ_PLAY_AGAIN_DESCRIPTION,
      ),
      headerText: `${translations.translate(
        Translations.Tags.QUIZ_SCORES,
      )} ${score}/${results.length}!`,
    }),
    [translations.translate, results, score],
  );

  const navigateToFirstQuizScreen = useCallback(
    () => props.navigation.pop(3),
    [],
  );

  const navigateToSetupQuizScreen = useCallback(
    () => props.navigation.pop(2),
    [],
  );

  const handlePressPlayAgain = useCallback(() => {
    Alert.alert(
      texts.playAgain,
      texts.modalDescription,
      [
        {
          text: texts.modalNegativeOption,
          style: 'cancel',
          onPress: navigateToFirstQuizScreen,
        },
        {
          text: texts.modalPositiveOption,
          onPress: navigateToSetupQuizScreen,
        },
      ],
      {cancelable: false},
    );
  }, [props.navigation.pop, texts]);

  useEffect(() => {
    setQuizResults();
  }, []);

  return {
    onPressPlayAgain: handlePressPlayAgain,
    quizResults: results,
    texts,
  };
};
