import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { gql } from '@apollo/client';

import { useImperativeQuery, useTranslation } from '@hooks';
import { Routes } from '@navigation';
import { Translations } from '@/i18n/tags';
import {
  QueryQuestionsVariables,
  QueryQuestions,
  QueryQuestions_quiz,
} from '@schema-types';

import { QuestionsProps } from '../../routes/route-params-types';

export const GET_QUESTIONS = gql`
  query QueryQuestions($input: QuizInput!) {
    quiz(input: $input) {
      correctAnswer
      category
      question
      options
      type
    }
  }
`;

export const useQuestions = (params: QuestionsProps) => {
  const [questions, setQuestions] = useState<QueryQuestions_quiz[]>([]);
  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<string[]>([]);

  const questionsListRef = useRef<FlatList | null>(null);

  const translation = useTranslation();

  const query = useImperativeQuery<QueryQuestions, QueryQuestionsVariables>({
    onCompleted: results => setQuestions(results.quiz),
    query: GET_QUESTIONS,
    fetchPolicy: 'no-cache',
  });

  const texts = useMemo(
    () => ({
      error: {
        description: translation.translate(
          Translations.Error.ERROR_ADVICE_DESCRIPTION,
        ),
        suggestion: translation.translate(
          Translations.Error.ERROR_ADVICE_SUGGESTION,
        ),
        title: translation.translate(Translations.Error.ERROR_ADVICE_TITLE),
      },
      noQuestions: {
        description: translation.translate(
          Translations.Quiz.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION,
        ),
        suggestion: translation.translate(
          Translations.Quiz.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION,
        ),
        title: translation.translate(
          Translations.Quiz.QUIZ_NO_QUESTIONS_ADVISE_TITLE,
        ),
      },
    }),
    [translation.translate],
  );

  const handleAnswerQuestion = useCallback((answer: string) => {
    setAnswers(previousAnswers => [...previousAnswers, answer]);
    setFocusedQuestionIndex(
      peviousFocusedQuestionIndex => peviousFocusedQuestionIndex + 1,
    );
  }, []);

  const navigateToResultsScreen = useCallback(() => {
    params.navigation.navigate(Routes.Quiz.RESULTS, {
      questions,
      answers,
    });
  }, [params.navigation, answers, questions]);

  const moveList = useCallback(
    (positionIndex: number) => {
      if (!questionsListRef || !questionsListRef.current || !questions.length) {
        return;
      }
      questionsListRef.current.scrollToIndex({
        index: positionIndex === -1 ? 0 : positionIndex,
        animated: true,
      });
    },
    [questions],
  );

  const handleRestart = useCallback(() => {
    setFocusedQuestionIndex(-1);
  }, [moveList]);

  const updateFocusedListItemIndex = useCallback(() => {
    if (!questions.length) {
      return;
    }
    const nextIndex = focusedQuestionIndex + 1;
    const isLastQuestion = nextIndex === questions.length;
    if (isLastQuestion) {
      return navigateToResultsScreen();
    }
    moveList(nextIndex);
  }, [focusedQuestionIndex, questions]);

  const handleQueryQuestions = useCallback(() => {
    const variables = {
      input: {
        difficulty: params.route.params.difficulty,
        type: params.route.params.type,
        category: params.route.params.category,
        numberOfQuestions: params.route.params.numberOfQuestions,
      },
    };
    query.exec(variables);
  }, [params.route.params, query.exec]);

  useEffect(() => {
    handleQueryQuestions();
  }, []);

  useEffect(() => {
    updateFocusedListItemIndex();
  }, [focusedQuestionIndex]);

  return {
    headerTitle:
      questions[focusedQuestionIndex + 1]?.category.split(':')[1].trim() ?? '',
    noQuestions: !query.hasError && !query.isLoading && !questions.length,
    shouldHideRestarButton:
      query.isLoading ||
      query.hasError ||
      (!!questions.length && focusedQuestionIndex < 0),
    onPressNext: handleAnswerQuestion,
    onPressRestart: handleRestart,
    isLoading: query.isLoading,
    hasError: query.hasError,
    focusedQuestionIndex,
    questionsListRef,
    questions,
    texts,
  };
};
