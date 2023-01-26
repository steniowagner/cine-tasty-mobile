import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {LoadingIndicator} from '@components';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import MultiChoiceQuestion from './multi-choice-question/MultiChoiceQuestion';
import {NoQuestionsError} from './no-questions-error/NoQuestionsError';
import {QuestionsStackProps} from '../../routes/route-params-types';
import {QuestionWrapper} from './question-wrapper/QuestionWrapper';
import BooleanQuestion from './boolean-question/BooleanQuestion';
import {QuestionsError} from './questions-error/QuestionsError';
import * as Styles from './Questions.styles';
import {useQuestions} from './useQuestions';

export const Questions = (props: QuestionsStackProps) => {
  const questions = useQuestions({
    navigation: props.navigation,
    route: props.route,
  });

  useEffect(() => {
    props.navigation.setOptions({
      title: questions.headerTitle,
      headerRight: () =>
        !questions.shouldHideRestarButton && (
          <Styles.RestartQuizButton
            onPress={questions.restart}
            testID="restart-quiz-button">
            <Styles.RestartIcon id="restart" />
          </Styles.RestartQuizButton>
        ),
    });
  }, [questions.shouldHideRestarButton, questions.headerTitle]);

  if (questions.loading) {
    return <LoadingIndicator />;
  }

  if (questions.hasError) {
    return <QuestionsError />;
  }

  if (questions.noQuestions) {
    return <NoQuestionsError />;
  }

  return (
    <FlatList
      renderItem={({item, index}) => (
        <QuestionWrapper
          numberOfQuestions={props.route.params.numberOfQuestions}
          currentQuestionIndex={index + 1}
          question={item.question}>
          <>
            {item.type.toLowerCase() ===
              SchemaTypes.QuestionType.BOOLEAN.toLowerCase() && (
              <BooleanQuestion
                isFocused={questions.currentQuestionIndex === index}
                onPressNext={questions.onPressNext}
              />
            )}
            {item.type.toLowerCase() ===
              SchemaTypes.QuestionType.MULTIPLE.toLowerCase() && (
              <MultiChoiceQuestion
                isFocused={questions.currentQuestionIndex === index}
                onPressNext={questions.onPressNext}
                answers={item.options}
              />
            )}
          </>
        </QuestionWrapper>
      )}
      keyExtractor={(item, index) => `${item.question}${index}`}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_data, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      ref={questions.questionsListRef}
      data={questions.questions}
      testID="questions-list"
      scrollEnabled={false}
      pagingEnabled
      horizontal
    />
  );
};
