import React from 'react';

import * as Styles from './ListItemWrapperQuestion.styles';

type ListItemWrapperProps = {
  currentQuestionIndex: number;
  numberOfQuestions: number;
  children: JSX.Element;
  question: string;
};

const ListItemWrapper = (props: ListItemWrapperProps) => (
  <Styles.Wrapper>
    <Styles.CardWrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      testID="card-wrapper"
    >
      <Styles.TextWrapper>
        <Styles.QuestionsIndicatorText
          testID="question-indicator-text"
        >
          {props.currentQuestionIndex}
          /
          {props.numberOfQuestions}
        </Styles.QuestionsIndicatorText>
        <Styles.QuestionText
          testID="question-text"
        >
          {props.question}
        </Styles.QuestionText>
      </Styles.TextWrapper>
      {props.children}
    </Styles.CardWrapper>
  </Styles.Wrapper>
);

export default ListItemWrapper;
