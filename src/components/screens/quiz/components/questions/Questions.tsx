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

const Questions = (props: QuestionsStackProps) => {
  const questions = useQuestions({ navigation: props.navigation, route: props.route });

  useLayoutEffect(() => {
    const hasErrorOrIsLoading = questions.isLoading || questions.hasError;

    if (hasErrorOrIsLoading && !!questions.questions.length) {
      return;
    }

    let headerTitle = '';

    if (questions[questions.currentQuestionIndex]) {
      headerTitle = questions[questions.currentQuestionIndex].category
        .split(':')[1]
        .trim();
    }

    props.navigation.setOptions({
      title: headerTitle,
      headerRight: () => questions.currentQuestionIndex > 0 && (
      <Styles.RestartQuizButton
        onPress={questions.onRestartQuiz}
        testID="retart-quiz-button"
      >
        <SVGIcon
          size={metrics.getWidthFromDP('8%')}
          id="restart"
        />
      </Styles.RestartQuizButton>
      ),
    });
  }, [questions.currentQuestionIndex, questions.isLoading, questions.hasError]);

  if (questions.isLoading) {
    return <LoadingIndicator />;
  }

  if (questions.hasError) {
    return <QuestionError />;
  }

  if (!questions.isLoading && !questions.hasError && !questions.questions.length) {
    return <NoQuestionsError />;
  }

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ListItemWrapper
          numberOfQuestions={props.route.params.numberOfQuestions}
          question={questions.questions[index].question}
          currentQuestionIndex={index + 1}
        >
          <>
            {item.type.toLowerCase()
              === SchemaTypes.QuestionType.BOOLEAN.toLowerCase() && (
              <BooleanQuestion
                isFocused={questions.currentQuestionIndex === index}
                onPressNext={questions.onPressNext}
              />
            )}
            {item.type.toLowerCase()
              === SchemaTypes.QuestionType.MULTIPLE.toLowerCase() && (
              <MultiChoiceQuestion
                isFocused={questions.currentQuestionIndex === index}
                onPressNext={questions.onPressNext}
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
      ref={questions.questionsFlatListRef}
      data={questions.questions}
      testID="questions-list"
      scrollEnabled={false}
      pagingEnabled
      horizontal
    />
  );
};

export default Questions;
