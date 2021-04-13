import React, { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

type SelectionStyleProps = {
  isSelected: boolean;
};

const ListItemWrapper = styled(TouchableOpacity)<SelectionStyleProps>`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'white')};
  border-width: 1px;
  border-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.buttonText)};
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
  color: ${({ theme }) => theme.colors.buttonText};
  text-align: center;
`;

const CloseIcon = () => (
  <SVGIcon
    size={metrics.getWidthFromDP('8%')}
    id="checkbox-circle"
    colorThemeRef="buttonText"
  />
);

const EmptyCheckbox = () => (
  <SVGIcon
    size={metrics.getWidthFromDP('8%')}
    id="checkbox-blank-circle-outline"
    colorThemeRef="buttonText"
  />
);

type Props = {
  onSelectAnswer: (answer: string) => void;
  isSelected: boolean;
  answer: string;
};

const MultiChoiceListItem = ({ onSelectAnswer, isSelected, answer }: Props) => (
  <ListItemWrapper
    onPress={() => onSelectAnswer(answer)}
    testID="multi-choice-answer"
    isSelected={isSelected}
    key={answer}
  >
    {isSelected ? <CloseIcon /> : <EmptyCheckbox />}
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

export default memo(MultiChoiceListItem, shouldComponentUpdate);
