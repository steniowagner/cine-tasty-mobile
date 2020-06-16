/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LoadingIndicator from 'components/common/LoadingIndicator';
import Advise from 'components/common/advise/Advise';
import { QuestionType } from 'types/schema';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

import ListItemWrapper from './list-item-wrapper-question/ListItemWrapperQuestion';
import MultiChoiceQuestion from './multi-choice-question/MultiChoiceQuestion';
import { QuizStackParams } from '../../routes/route-params-types';
import BooleanQuestion from './boolean-question/BooleanQuestion';
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

const ErrorWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
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

  const { t } = useTranslation();

  useLayoutEffect(() => {
    const hasErrorOrIsLoading = loading || error;

    if (hasErrorOrIsLoading && !!questions.length) {
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

  if (
    error
    && error.message.includes(CONSTANTS.ERROR_MESSAGES.NETWORK_FAILED_CONNECTION)
  ) {
    return (
      <ErrorWrapper
        testID="network-error-wrapper"
      >
        <Advise
          description={t('translations:errors:network:description')}
          suggestion={t('translations:errors:network:suggestion')}
          title={t('translations:errors:network:title')}
          icon="server-network-off"
        />
      </ErrorWrapper>
    );
  }

  if (!loading && !error && !questions.length) {
    return (
      <ErrorWrapper
        testID="no-questions-error-wrapper"
      >
        <Advise
          description={t('translations:quiz:noQuestionsAdviseDescription')}
          suggestion={t('translations:quiz:noQuestionsAdviseSuggestion')}
          title={t('translations:quiz:noQuestionsAdviseTitle')}
          icon="playlist-remove"
        />
      </ErrorWrapper>
    );
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
              <MultiChoiceQuestion
                onSelectAnswer={onSelectAnswer}
                answerSelected={currentAnswer}
                answers={item.options}
              />
            )}
          </>
        </ListItemWrapper>
      )}
      keyExtractor={(item, index) => `${item.question}${index}`}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_data, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      ref={questionsFlatListRef}
      testID="questions-list"
      scrollEnabled={false}
      data={questions}
      pagingEnabled
      horizontal
    />
  );
};

export default Questions;
