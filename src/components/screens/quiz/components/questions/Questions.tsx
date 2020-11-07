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
import metrics from 'styles/metrics';

import ListItemWrapper from './list-item-wrapper-question/ListItemWrapperQuestion';
import MultiChoiceQuestion from './multi-choice-question/MultiChoiceQuestion';
import { QuizStackParams } from '../../routes/route-params-types';
import BooleanQuestion from './boolean-question/BooleanQuestion';
import useQuestions from './useQuestions';

export const NO_QUESTIONS_ERROR_DESCRIPTION_I18N_REF = 'translations:quiz:noQuestionsAdviseDescription';
export const NO_QUESTIONS_ERROR_SUGGESTION_I18N_REF = 'translations:quiz:noQuestionsAdviseSuggestion';
export const NO_QUESTIONS_ERROR_TITLE_I18N_REF = 'translations:quiz:noQuestionsAdviseTitle';

export const NO_CONNECTION_ERROR_DESCRIPTION_I18N_REF = 'translations:errors:network:description';
export const NO_CONNECTION_ERROR_SUGGGESTION_I18N_REF = 'translations:errors:network:suggestion';
export const NO_CONNECTION_ERROR_TITLE_I18N_REF = 'translations:errors:network:title';

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
    onRestartQuiz,
    onPressNext,
    questions,
    loading,
    hasError,
  } = useQuestions(route, navigation);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    const hasErrorOrIsLoading = loading || hasError;

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
        testID="retart-quiz-button"
      >
        <RestartQuizIcon />
      </RestartQuizButton>
      ),
    });
  }, [currentQuestionIndex, loading, hasError]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (hasError) {
    return (
      <ErrorWrapper
        testID="network-error-wrapper"
      >
        <Advise
          description={t(NO_CONNECTION_ERROR_DESCRIPTION_I18N_REF)}
          suggestion={t(NO_CONNECTION_ERROR_SUGGGESTION_I18N_REF)}
          title={t(NO_CONNECTION_ERROR_TITLE_I18N_REF)}
          icon="server-network-off"
        />
      </ErrorWrapper>
    );
  }

  if (!loading && !hasError && !questions.length) {
    return (
      <ErrorWrapper
        testID="no-questions-error-wrapper"
      >
        <Advise
          description={t(NO_QUESTIONS_ERROR_DESCRIPTION_I18N_REF)}
          suggestion={t(NO_QUESTIONS_ERROR_SUGGESTION_I18N_REF)}
          title={t(NO_QUESTIONS_ERROR_TITLE_I18N_REF)}
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
          currentQuestionIndex={index + 1}
        >
          <>
            {item.type.toLowerCase() === QuestionType.BOOLEAN.toLowerCase() && (
              <BooleanQuestion
                isFocused={currentQuestionIndex === index}
                onPressNext={onPressNext}
              />
            )}
            {item.type.toLowerCase() === QuestionType.MULTIPLE.toLowerCase() && (
              <MultiChoiceQuestion
                isFocused={currentQuestionIndex === index}
                onPressNext={onPressNext}
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
