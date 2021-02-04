import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: white;
`;

const TextWrapper = styled(View)`
  align-items: center;
  padding: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const QuestionsIndicatorText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: rgba(0, 0, 0, 0.8);
`;

const QuestionText = styled(Text).attrs({
  numberOfLines: 4,
})`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

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
  <Wrapper>
    <CardWrapper
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
      <TextWrapper>
        <QuestionsIndicatorText
          testID="question-indicator-text"
        >
          {currentQuestionIndex}
          /
          {numberOfQuestions}
        </QuestionsIndicatorText>
        <QuestionText
          testID="question-text"
        >
          {question}
        </QuestionText>
      </TextWrapper>
      {children}
    </CardWrapper>
  </Wrapper>
);

export default ListItemWrapper;
