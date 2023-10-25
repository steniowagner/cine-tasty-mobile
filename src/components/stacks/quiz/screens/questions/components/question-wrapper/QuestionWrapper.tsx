import React, { ReactNode } from 'react';

import GLOBAL_STYLES from '@styles/constants';

import * as Styles from './QuestionWrapper.styles';

type ListItemWrapperProps = {
  currentQuestionIndex: number;
  numberOfQuestions: number;
  children: ReactNode;
  question: string;
};

export const QuestionWrapper = (props: ListItemWrapperProps) => (
  <Styles.Wrapper testID="question-wrapper">
    <Styles.CardWrapper style={GLOBAL_STYLES.defaultShadow}>
      <Styles.TextWrapper>
        <Styles.QuestionsIndicatorText testID="question-indicator-text">
          {`${props.currentQuestionIndex}/${props.numberOfQuestions}`}
        </Styles.QuestionsIndicatorText>
        <Styles.QuestionText testID="question-text">
          {props.question}
        </Styles.QuestionText>
      </Styles.TextWrapper>
      {props.children}
    </Styles.CardWrapper>
  </Styles.Wrapper>
);
