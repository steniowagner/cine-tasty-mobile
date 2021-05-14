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

const MultiChoiceListItem = (props: MultiChoiceListItemProps) => (
  <Styles.ListItemWrapper
    onPress={() => props.onSelectAnswer(props.answer)}
    testID="multi-choice-answer"
    isSelected={props.isSelected}
    key={props.answer}
  >
    {props.isSelected ? <CloseIcon /> : <EmptyCheckbox />}
    <Styles.AnswerTextWrapper>
      <Styles.QuestionsIndicatorText
        isSelected={props.isSelected}
      >
        {props.answer}
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
