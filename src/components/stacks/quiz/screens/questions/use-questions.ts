import { useCallback, useEffect, useRef, useState } from 'react';
import { gql } from '@apollo/client';

import { useImperativeQuery } from '@hooks';
import {
  QueryQuestionsVariables,
  QueryQuestions,
  QueryQuestions_quiz,
} from '@schema-types';

import { QuestionsProps } from '../../routes/route-params-types';
import { FlatList } from 'react-native';

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

  const questionsListRef = useRef<FlatList | null>(null);

  const query = useImperativeQuery<QueryQuestions, QueryQuestionsVariables>({
    onCompleted: results => setQuestions(results.quiz),
    query: GET_QUESTIONS,
  });

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

  return {
    onPressNext: () => {},
    currentQuestionIndex: 0,
    isLoading: query.isLoading,
    hasError: query.isLoading,
    questionsListRef,
    questions,
  };
};
