import {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {useQuery} from '@apollo/client';
import {FlatList} from 'react-native';

import {GET_QUIZ_QUESTIONS} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

import {QuestionsStackProps} from '../../routes/route-params-types';

const useQuestions = (props: QuestionsStackProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questionsListRef = useRef<FlatList>(null);

  const {data, error, loading} = useQuery<
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
      questions: data?.quiz,
      answers,
    });
  }, [props.navigation, answers, data]);

  const setListIndex = useCallback((): void => {
    if (!data?.quiz.length) {
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    const isLastQuestion = nextIndex === data.quiz.length;
    if (isLastQuestion) {
      return navigateToResultsScreen();
    }
    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, navigateToResultsScreen, data]);

  const changeListPosition = useCallback(() => {
    if (!questionsListRef || !questionsListRef.current) {
      return;
    }
    questionsListRef.current.scrollToIndex({
      index: currentQuestionIndex === -1 ? 0 : currentQuestionIndex,
      animated: true,
    });
  }, []);

  const handlePressNext = useCallback(
    (currentAnswer: string) =>
      setAnswers(prevAnswers => [...prevAnswers, currentAnswer]),
    [],
  );

  const shouldHideRestarButton = useMemo(
    () =>
      ((loading || !!error) && !!data?.quiz.length) ||
      currentQuestionIndex === 0,
    [currentQuestionIndex, loading, data, error],
  );

  const noQuestions = useMemo(
    () => !loading && !error && !data?.quiz.length,
    [data, loading, error],
  );

  const headerTitle = useMemo(() => {
    if (!data || !data.quiz[currentQuestionIndex]) {
      return '';
    }
    return data.quiz[currentQuestionIndex].category.split(':')[1].trim();
  }, [currentQuestionIndex, data]);

  useEffect(() => {
    changeListPosition();
  }, [currentQuestionIndex]);

  useEffect(() => {
    setListIndex();
  }, [answers]);

  return {
    questions: data ? data.quiz : [],
    onPressNext: handlePressNext,
    shouldHideRestarButton,
    currentQuestionIndex,
    hasError: !!error,
    questionsListRef,
    headerTitle,
    noQuestions,
    restart,
    loading,
    answers,
  };
};

export default useQuestions;
