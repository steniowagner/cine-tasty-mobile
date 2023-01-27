import {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native';

import {GET_QUIZ_QUESTIONS} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

import {QuestionsStackProps} from '../../routes/route-params-types';

export const useQuestions = (props: QuestionsStackProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questionsListRef = useRef<FlatList>(null);

  const query = useQuery<
    SchemaTypes.GetQuizQuestions,
    SchemaTypes.GetQuizQuestionsVariables
  >(GET_QUIZ_QUESTIONS, {
    variables: {
      input: {
        numberOfQuestions: props.route.params.numberOfQuestions,
        difficulty: props.route.params.difficulty,
        category: props.route.params.category,
        type: props.route.params.type,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const restart = useCallback(() => {
    setCurrentQuestionIndex(-1);
    setAnswers([]);
  }, []);

  const navigateToResultsScreen = useCallback(() => {
    props.navigation.navigate(Routes.Quiz.RESULTS, {
      questions: query.data?.quiz,
      answers,
    });
  }, [props.navigation, answers, query.data]);

  const setListIndex = useCallback((): void => {
    if (!query.data?.quiz.length) {
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    const isLastQuestion = nextIndex === query.data.quiz.length;
    if (isLastQuestion) {
      return navigateToResultsScreen();
    }
    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, navigateToResultsScreen, query.data]);

  const changeListPosition = useCallback(() => {
    if (!questionsListRef || !questionsListRef.current) {
      return;
    }
    questionsListRef.current.scrollToIndex({
      index: currentQuestionIndex === -1 ? 0 : currentQuestionIndex,
      animated: true,
    });
  }, [currentQuestionIndex]);

  const shouldHideRestarButton = useMemo(
    () =>
      ((query.loading || query.error) && query.data?.quiz.length) ||
      currentQuestionIndex === 0,
    [currentQuestionIndex, query.loading, query.data, query.error],
  );

  const noQuestions = useMemo(
    () => !query.loading && !query.error && !query.data?.quiz.length,
    [query.data, query.loading, query.error],
  );

  const headerTitle = useMemo(() => {
    if (!query.data || !query.data.quiz[currentQuestionIndex]) {
      return '';
    }
    return query.data.quiz[currentQuestionIndex].category.split(':')[1].trim();
  }, [currentQuestionIndex, query.data]);

  useEffect(() => {
    changeListPosition();
  }, [currentQuestionIndex]);

  useEffect(() => {
    setListIndex();
  }, [answers]);

  return {
    questions: query.data ? query.data.quiz : [],
    onPressNext: (answer: string) =>
      setAnswers(prevAnswers => [...prevAnswers, answer]),
    shouldHideRestarButton,
    currentQuestionIndex,
    hasError: !!query.error,
    questionsListRef,
    headerTitle,
    noQuestions,
    restart,
    loading: query.loading,
    answers,
  };
};
