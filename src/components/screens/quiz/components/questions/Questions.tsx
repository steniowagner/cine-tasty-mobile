/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';

import LoadingIndicator from '@components/common/loading-indicator/LoadingIndicator';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import ListItemWrapper from './list-item-wrapper-question/ListItemWrapperQuestion';
import MultiChoiceQuestion from './multi-choice-question/MultiChoiceQuestion';
import { QuestionsStackProps } from '../../routes/route-params-types';
import BooleanQuestion from './boolean-question/BooleanQuestion';
import NoQuestionsError from './NoQuestionsError';
import * as Styles from './Questions.styles';
import QuestionError from './QuestionError';
import useQuestions from './useQuestions';

const Questions = ({ navigation, route }: QuestionsStackProps) => {
  const {
    currentQuestionIndex,
    questionsFlatListRef,
    onRestartQuiz,
    onPressNext,
    questions,
    loading,
    hasError,
  } = useQuestions({ navigation, route });

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
      <Styles.RestartQuizButton
        onPress={onRestartQuiz}
        testID="retart-quiz-button"
      >
        <SVGIcon
          size={metrics.getWidthFromDP('8%')}
          id="restart"
        />
      </Styles.RestartQuizButton>
      ),
    });
  }, [currentQuestionIndex, loading, hasError]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (hasError) {
    return <QuestionError />;
  }

  if (!loading && !hasError && !questions.length) {
    return <NoQuestionsError />;
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
            {item.type.toLowerCase()
              === SchemaTypes.QuestionType.BOOLEAN.toLowerCase() && (
              <BooleanQuestion
                isFocused={currentQuestionIndex === index}
                onPressNext={onPressNext}
              />
            )}
            {item.type.toLowerCase()
              === SchemaTypes.QuestionType.MULTIPLE.toLowerCase() && (
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
