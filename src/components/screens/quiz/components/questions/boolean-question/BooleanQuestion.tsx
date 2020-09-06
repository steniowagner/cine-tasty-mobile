import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

interface OptionSelectedStyleProps {
  readonly isSelected: boolean;
}

const Wrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const OptionButton = styled(TouchableOpacity)<OptionSelectedStyleProps>`
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : '#BBBBBB')};
`;

const OptionText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: white;
`;

type Props = {
  onSelectAnswer: (answer: string) => void;
  answerSelected: string;
};

const BooleanQuestion = ({ onSelectAnswer, answerSelected }: Props) => (
  <Wrapper
    testID="boolean-question"
  >
    <OptionButton
      onPress={() => onSelectAnswer(String(true))}
      isSelected={answerSelected === String(true)}
      testID={
        answerSelected === String(true)
          ? 'true-option-button-selected'
          : 'true-option-button'
      }
    >
      <OptionText>True</OptionText>
    </OptionButton>
    <OptionButton
      onPress={() => onSelectAnswer(String(false))}
      isSelected={answerSelected === String(false)}
      testID={
        answerSelected === String(false)
          ? 'false-option-button-selected'
          : 'false-option-button'
      }
    >
      <OptionText>False</OptionText>
    </OptionButton>
  </Wrapper>
);

export default BooleanQuestion;
