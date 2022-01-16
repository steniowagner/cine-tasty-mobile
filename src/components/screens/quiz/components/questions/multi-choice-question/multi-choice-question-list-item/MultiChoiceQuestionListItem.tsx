import React, { memo } from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './MultiChoiceQuestionListItem.styles';

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

type MultiChoiceListItemProps = {
  onSelectAnswer: (answer: string) => void;
  isSelected: boolean;
  answer: string;
};

const MultiChoiceListItem = ({
  onSelectAnswer,
  isSelected,
  answer,
}: MultiChoiceListItemProps) => (
  <Styles.ListItemWrapper
    onPress={() => onSelectAnswer(answer)}
    testID="multi-choice-answer"
    isSelected={isSelected}
    key={answer}
  >
    {isSelected ? <CloseIcon /> : <EmptyCheckbox />}
    <Styles.AnswerTextWrapper>
      <Styles.QuestionsIndicatorText
        isSelected={isSelected}
      >
        {answer}
      </Styles.QuestionsIndicatorText>
    </Styles.AnswerTextWrapper>
  </Styles.ListItemWrapper>
);

const shouldComponentUpdate = (
  previousState: MultiChoiceListItemProps,
  nextState: MultiChoiceListItemProps,
): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(MultiChoiceListItem, shouldComponentUpdate);
