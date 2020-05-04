import { RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GetQuizQuestionsVariables, GetQuizQuestions } from 'types/schema';

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

const useQuestions = ({ params }: QuestionsScreenRouteProp) => {
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

  console.log(data, error, loading);
};

export default useQuestions;
