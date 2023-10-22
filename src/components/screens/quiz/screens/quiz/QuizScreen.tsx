import React from 'react';

import { RoundedButton } from '@common-components';

import { QuizScreenProps } from '../../routes/route-params-types';
import * as Styles from './QuizScreen.styles';
import { useQuizScreen } from './use-quiz-screen';

export const QuizScreen = (props: QuizScreenProps) => {
  const quiz = useQuizScreen({ navigation: props.navigation });

  return (
    <Styles.Wrapper>
      <Styles.LargeText testID="quiz-welcome-text">
        {quiz.texts.welcome}
      </Styles.LargeText>
      <Styles.SubText testID="quiz-description-text">
        {quiz.texts.description}
      </Styles.SubText>
      <Styles.LargeText testID="quiz-challenge-text">
        {quiz.texts.challenge}
      </Styles.LargeText>
      <RoundedButton
        onPress={quiz.onPressChooseQuestions}
        text={quiz.texts.chooseQuestions}
      />
    </Styles.Wrapper>
  );
};
