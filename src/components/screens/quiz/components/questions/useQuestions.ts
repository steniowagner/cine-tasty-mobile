/* eslint-disable camelcase */
import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_QUIZ_QUESTIONS } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

import { QuestionsStackProps } from '../../routes/route-params-types';

const useQuestions = ({ navigation, route }: QuestionsStackProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questionsFlatListRef = useRef(null);

  const { data, error, loading } = useQuery<
    SchemaTypes.GetQuizQuestions,
    SchemaTypes.GetQuizQuestionsVariables
  >(GET_QUIZ_QUESTIONS, {
    variables: {
      input: {
        numberOfQuestions: route.params.numberOfQuestions,
        difficulty: route.params.difficulty,
        category: route.params.category,
        type: route.params.type,
      },
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (questionsFlatListRef && questionsFlatListRef.current) {
      questionsFlatListRef.current.scrollToIndex({
        index: currentQuestionIndex === -1 ? 0 : currentQuestionIndex,
        animated: true,
      });
    }
  }, [currentQuestionIndex]);

  const handleQuestionsFlatListIndexPosition = useCallback((): void => {
    if (!data?.quiz.length) {
      return;
    }

    const nextIndex = currentQuestionIndex + 1;
    const isLastQuestion = nextIndex === data.quiz.length;

    if (isLastQuestion) {
      navigation.navigate(Routes.Quiz.RESULTS, {
        questions: data?.quiz,
        answers,
      });

      return;
    }

    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, data, answers]);

  useEffect(() => {
    handleQuestionsFlatListIndexPosition();
  }, [answers]);

  const onRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(-1);
    setAnswers([]);
  }, []);

  return {
    onPressNext: (currentAnswer: string) => setAnswers((prevAnswers) => [...prevAnswers, currentAnswer]),
    questions: data ? data.quiz : [],
    currentQuestionIndex,
    questionsFlatListRef,
    hasError: !!error,
    onRestartQuiz,
    loading,
    answers,
  };
};

export default useQuestions;
