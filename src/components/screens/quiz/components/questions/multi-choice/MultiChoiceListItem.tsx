import React, { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'components/common/Icon';
import styled from 'styled-components';

import metrics from 'styles/metrics';

interface SelectionStyleProps {
  readonly isSelected: boolean;
}

const ListItemWrapper = styled(TouchableOpacity)<SelectionStyleProps>`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'white')};
  border-width: 1px;
  border-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'rgba(0, 0, 0, 0.8)')};
  border-radius: ${({ theme }) => theme.metrics.width}px;
`;

const AnswerTextWrapper = styled(View)`
  width: 80%;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  align-self: center;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const QuestionsIndicatorText = styled(Text)<SelectionStyleProps>`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: rgba(0, 0, 0, 0.8);
  color: ${({ isSelected }) => (isSelected ? 'white' : 'rgba(0, 0, 0, 0.8)')};
  text-align: center;
`;

type Props = {
  onSelectAnswer: (answer: string) => void;
  isSelected: boolean;
  answer: string;
};

const MultiChoiceAnswer = ({ onSelectAnswer, isSelected, answer }: Props) => (
  <ListItemWrapper
    onPress={() => onSelectAnswer(answer)}
    testID="multi-choice-answer"
    isSelected={isSelected}
    key={answer}
  >
    <Icon
      name={isSelected ? 'check-circle' : 'checkbox-blank-circle-outline'}
      color={isSelected ? 'white' : 'rgba(0, 0, 0, 0.8)'}
      size={metrics.getWidthFromDP('8%')}
    />
    <AnswerTextWrapper>
      <QuestionsIndicatorText
        isSelected={isSelected}
      >
        {answer}
      </QuestionsIndicatorText>
    </AnswerTextWrapper>
  </ListItemWrapper>
);

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(MultiChoiceAnswer, shouldComponentUpdate);
