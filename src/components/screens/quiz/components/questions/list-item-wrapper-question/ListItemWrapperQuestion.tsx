import React from 'react';

import * as Styles from './ListItemWrapperQuestion.styles';

type Props = {
  currentQuestionIndex: number;
  numberOfQuestions: number;
  children: JSX.Element;
  question: string;
};

const ListItemWrapper = ({
  currentQuestionIndex,
  numberOfQuestions,
  children,
  question,
}: Props) => (
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
          {currentQuestionIndex}
          /
          {numberOfQuestions}
        </Styles.QuestionsIndicatorText>
        <Styles.QuestionText
          testID="question-text"
        >
          {question}
        </Styles.QuestionText>
      </Styles.TextWrapper>
      {children}
    </Styles.CardWrapper>
  </Styles.Wrapper>
);

export default ListItemWrapper;
