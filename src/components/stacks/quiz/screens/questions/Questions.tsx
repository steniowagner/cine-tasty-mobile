/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { HeaderIconButton, Advice } from '@common-components';
import { QuizQuestionType } from '@schema-types';
import metrics from '@/styles/metrics';
import { HeaderTitle } from '@navigation';

import MultiChoiceQuestion from './components/multi-choice-question/MultiChoiceQuestion';
import { QuestionsProps } from '../../routes/route-params-types';
import BooleanQuestion from './components/boolean-question/BooleanQuestion';
import { QuestionWrapper } from './components/question-wrapper/QuestionWrapper';
import { useQuestions } from './use-questions';
import * as Styles from './Questionts.styles';

export const Questions = (props: QuestionsProps) => {
  const questions = useQuestions(props);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => <HeaderTitle text={questions.headerTitle} />,
      headerRight: () =>
        !questions.shouldHideRestarButton && (
          <HeaderIconButton
            onPress={questions.onPressRestart}
            withMarginRight
            iconName="restart"
            color="text"
          />
        ),
    });
  }, [
    questions.shouldHideRestarButton,
    questions.headerTitle,
    questions.onPressRestart,
  ]);

  if (questions.isLoading) {
    return (
      <Styles.Wrapper testID="loading">
        <Styles.LoadingWrapper>
          <Styles.VeryShortLineLoading indexToDelayAnimation={0} />
          <Styles.LongLineLoading indexToDelayAnimation={2} />
          <Styles.ShortLineLoading indexToDelayAnimation={4} />
          <Styles.LongLineLoading indexToDelayAnimation={6} />
          <Styles.ShortLineLoading indexToDelayAnimation={8} />
          <Styles.CTALoading indexToDelayAnimation={10} />
        </Styles.LoadingWrapper>
      </Styles.Wrapper>
    );
  }

  if (questions.hasError) {
    return (
      <Styles.ErrorWrapper testID="error-advice-wrapper">
        <Advice
          icon="alert-box"
          description={questions.texts.error.description}
          suggestion={questions.texts.error.suggestion}
          title={questions.texts.error.title}
        />
      </Styles.ErrorWrapper>
    );
  }

  if (questions.noQuestions) {
    return (
      <Styles.ErrorWrapper testID="no-questions-advice-wrapper">
        <Advice
          icon="playlist-remove"
          description={questions.texts.noQuestions.description}
          suggestion={questions.texts.noQuestions.suggestion}
          title={questions.texts.noQuestions.title}
        />
      </Styles.ErrorWrapper>
    );
  }

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <QuestionWrapper
          numberOfQuestions={props.route.params.numberOfQuestions}
          currentQuestionIndex={index + 1}
          question={item.question}>
          {item.type.toLowerCase() ===
            QuizQuestionType.BOOLEAN.toLowerCase() && (
            <BooleanQuestion
              isFocused={questions.focusedQuestionIndex === index}
              onPressNext={questions.onPressNext}
            />
          )}
          {item.type.toLowerCase() ===
            QuizQuestionType.MULTIPLE.toLowerCase() && (
            <MultiChoiceQuestion
              isFocused={questions.focusedQuestionIndex === index}
              onPressNext={questions.onPressNext}
              options={item.options}
            />
          )}
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
