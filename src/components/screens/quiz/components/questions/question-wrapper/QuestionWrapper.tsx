import React, {ReactNode} from 'react';

import * as Styles from './QuestionWrapper.styles';

type ListItemWrapperProps = {
  currentQuestionIndex: number;
  numberOfQuestions: number;
  children: ReactNode;
  question: string;
};

export const QuestionWrapper = (props: ListItemWrapperProps) => (
  <Styles.Wrapper>
    <Styles.CardWrapper
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      testID="card-wrapper">
      <Styles.TextWrapper>
        <Styles.QuestionsIndicatorText testID="question-indicator-text">
          {props.currentQuestionIndex}/{props.numberOfQuestions}
        </Styles.QuestionsIndicatorText>
        <Styles.QuestionText testID="question-text">
          {props.question}
        </Styles.QuestionText>
      </Styles.TextWrapper>
      {props.children}
    </Styles.CardWrapper>
  </Styles.Wrapper>
);
