/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import LoadingIndicator from 'components/common/LoadingIndicator';
import { QuestionType } from 'types/schema';
import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

import { QuizStackParams } from '../../routes/route-params-types';
import MultiChoice from './multi-choice/MultiChoice';
import BooleanQuestion from './BooleanQuestion';
import ListItemWrapper from './ListItemWrapper';
import useQuestions from './useQuestions';

const RestartQuizIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: theme.colors.text,
  name: 'rotate-left',
}))``;

const RestartQuizButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
`;

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'QUESTIONS'>;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const Questions = ({ navigation, route }: Props) => {
  const {
    currentQuestionIndex,
    questionsFlatListRef,
    onSelectAnswer,
    currentAnswer,
    onRestartQuiz,
    onPressNext,
    questions,
    loading,
    error,
  } = useQuestions(route, navigation);

  useLayoutEffect(() => {
    const hasErrorOrIsLoading = loading || error;

    if (hasErrorOrIsLoading && !!questions.length) {
      navigation.setOptions({
        title: '',
      });

      return;
    }

    let headerTitle = '';

    if (questions[currentQuestionIndex]) {
      headerTitle = questions[currentQuestionIndex].category.split(':')[1].trim();
    }

    navigation.setOptions({
      title: headerTitle,
      headerRight: () => currentQuestionIndex > 0 && (
      <RestartQuizButton
        onPress={onRestartQuiz}
      >
        <RestartQuizIcon />
      </RestartQuizButton>
      ),
    });
  }, [currentQuestionIndex, loading, error]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ListItemWrapper
          numberOfQuestions={route.params.numberOfQuestions}
          question={questions[index].question}
          hasSelectedAnswer={!!currentAnswer}
          currentQuestionIndex={index + 1}
          onPressNext={onPressNext}
        >
          <>
            {item.type.toLocaleLowerCase()
              === QuestionType.BOOLEAN.toLocaleLowerCase() && (
              <BooleanQuestion
                onSelectAnswer={onSelectAnswer}
                answerSelected={currentAnswer}
              />
            )}
            {item.type.toLocaleLowerCase()
              === QuestionType.MULTIPLE.toLocaleLowerCase() && (
              <MultiChoice
                answers={[...item.incorrect_answers, item.correct_answer]}
                onSelectAnswer={onSelectAnswer}
                answerSelected={currentAnswer}
              />
            )}
          </>
        </ListItemWrapper>
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.question}
      getItemLayout={(_data, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      ref={questionsFlatListRef}
      scrollEnabled={false}
      data={questions}
      pagingEnabled
      horizontal
    />
  );
};

export default Questions;
