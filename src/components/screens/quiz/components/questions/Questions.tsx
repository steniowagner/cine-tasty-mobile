/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import LoadingIndicator from '@components/common/loading-indicator/LoadingIndicator';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import Advise from '@components/common/advise/Advise';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import ListItemWrapper from './list-item-wrapper-question/ListItemWrapperQuestion';
import MultiChoiceQuestion from './multi-choice-question/MultiChoiceQuestion';
import { QuizStackParams } from '../../routes/route-params-types';
import BooleanQuestion from './boolean-question/BooleanQuestion';
import * as Styles from './Questions.styles';
import useQuestions from './useQuestions';

type QuestionsScreenNavigationProp = StackNavigationProp<QuizStackParams, 'QUESTIONS'>;

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

type QuestionsProps = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const Questions = ({ navigation, route }: QuestionsProps) => {
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
    return (
      <Styles.ErrorWrapper
        testID="network-error-wrapper"
      >
        <Advise
          description={t(TRANSLATIONS.ERRORS_NETWORK_ERROR_DESCRIPTION)}
          suggestion={t(TRANSLATIONS.ERRORS_NETWORK_ERROR_SUGGESTION)}
          title={t(TRANSLATIONS.ERRORS_NETWORK_ERROR_TITLE)}
          icon="server-network-off"
        />
      </Styles.ErrorWrapper>
    );
  }

  if (!loading && !hasError && !questions.length) {
    return (
      <Styles.ErrorWrapper
        testID="no-questions-error-wrapper"
      >
        <Advise
          description={t(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION)}
          suggestion={t(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION)}
          title={t(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_TITLE)}
          icon="playlist-remove"
        />
      </Styles.ErrorWrapper>
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
