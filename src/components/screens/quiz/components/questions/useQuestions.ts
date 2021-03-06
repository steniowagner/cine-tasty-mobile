import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  GetQuizQuestions_quiz as Questions,
  GetQuizQuestionsVariables,
  GetQuizQuestions,
} from 'types/schema';

import { QuizStackParams } from '../../routes/route-params-types';

export const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions($input: QuizInput!) {
    quiz(input: $input) {
      correctAnswer
      category
      question
      options
      type
    }
  }
`;

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'QUESTIONS'>;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

type State = {
  onPressNext: (currentAnswer: string) => void;
  currentQuestionIndex: number;
  onRestartQuiz: () => void;
  questionsFlatListRef: any;
  questions: Questions[];
  hasError: boolean;
  answers: string[];
  loading: boolean;
};

const useQuestions = (
  { params }: QuestionsScreenRouteProp,
  navigation: QuestionsScreenNavigationProp,
): State => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questionsFlatListRef = useRef(null);

  const { data, error, loading } = useQuery<GetQuizQuestions, GetQuizQuestionsVariables>(
    GET_QUIZ_QUESTIONS,
    {
      variables: {
        input: {
          numberOfQuestions: params.numberOfQuestions,
          difficulty: params.difficulty,
          category: params.category,
          type: params.type,
        },
      },
      fetchPolicy: 'no-cache',
    },
  );

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
      navigation.navigate('RESULTS', {
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
