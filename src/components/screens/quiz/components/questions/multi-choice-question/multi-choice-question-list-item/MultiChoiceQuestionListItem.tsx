import React, {memo} from 'react';

import {renderSVGIconConditionally} from '@components';
import metrics from '@styles/metrics';

import * as Styles from './MultiChoiceQuestionListItem.styles';

type MultiChoiceListItemProps = {
  onSelectAnswer: () => void;
  isSelected: boolean;
  answer: string;
};

const MultiChoiceQuestionListItem = (props: MultiChoiceListItemProps) => (
  <Styles.ListItemWrapper
    testID="multi-choice-option-button"
    onPress={props.onSelectAnswer}
    isSelected={props.isSelected}
    key={props.answer}>
    {renderSVGIconConditionally({
      condition: props.isSelected,
      ifTrue: {
        size: metrics.getWidthFromDP('8%'),
        colorThemeRef: 'buttonText',
        id: 'checkbox-circle',
      },
      ifFalse: {
        size: metrics.getWidthFromDP('8%'),
        colorThemeRef: 'buttonText',
        id: 'checkbox-blank-circle-outline',
      },
    })}
    <Styles.AnswerTextWrapper>
      <Styles.QuestionsIndicatorText
        testID="multi-choice-option-text"
        isSelected={props.isSelected}>
        {props.answer}
      </Styles.QuestionsIndicatorText>
    </Styles.AnswerTextWrapper>
  </Styles.ListItemWrapper>
);

const shouldComponentUpdate = (
  previousState: MultiChoiceListItemProps,
  nextState: MultiChoiceListItemProps,
): boolean =>
  (previousState.isSelected || !nextState.isSelected) &&
  (!previousState.isSelected || nextState.isSelected);

export default memo(MultiChoiceQuestionListItem, shouldComponentUpdate);
