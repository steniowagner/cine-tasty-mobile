import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import { RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';

import {
  GetQuizQuestions_quiz as Questions,
  GetQuizQuestionsVariables,
  GetQuizQuestions,
} from 'types/schema';

import { QuizStackParams } from '../../routes/route-params-types';

const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions($input: QuizInput!) {
    quiz(input: $input) {
      incorrect_answers
      category
      type
      difficulty
      question
      correct_answer
    }
  }
`;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

type State = {
  onSelectAnswer: (answer: string) => void;
  currentQuestionIndex: number;
  onRestartQuiz: () => void;
  onPressNext: () => void;
  questionsFlatListRef: any;
  questions: Questions[];
  currentAnswer: string;
  error: ApolloError;
  answers: string[];
  loading: boolean;
};

const useQuestions = ({ params }: QuestionsScreenRouteProp): State => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const questionsFlatListRef = useRef(null);

  const { data, error, loading } = useQuery<GetQuizQuestions, GetQuizQuestionsVariables>(
    GET_QUIZ_QUESTIONS,
    {
      variables: {
        input: {
          number_questions: params.numberOfQuestions,
          difficulty: params.difficulty,
          category: params.category,
          type: params.type,
        },
      },
      fetchPolicy: 'no-cache',
    },
  );

  useEffect(() => {
    if (currentAnswer) {
      setCurrentAnswer('');
    }

    if (questionsFlatListRef && questionsFlatListRef.current) {
      questionsFlatListRef.current.scrollToIndex({
        index: currentQuestionIndex,
        animated: true,
      });
    }
  }, [currentQuestionIndex]);

  const handleQuestionsListIndexPosition = (): void => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < data.quiz.length) {
      setCurrentQuestionIndex(nextIndex);

      return;
    }

    console.warn('RETURN');
  };

  const onPressNext = (): void => {
    setAnswers((prevAnswers) => [...prevAnswers, currentAnswer]);

    handleQuestionsListIndexPosition();
  };

  const onRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  return {
    questions: data ? data.quiz : [],
    onSelectAnswer: setCurrentAnswer,
    currentQuestionIndex,
    questionsFlatListRef,
    onRestartQuiz,
    currentAnswer,
    onPressNext,
    loading,
    answers,
    error,
  };
};

export default useQuestions;
