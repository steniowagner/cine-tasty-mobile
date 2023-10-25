import React, { memo } from 'react';

import { Typography } from '@common-components';
import { dark } from '@/styles/themes';
import metrics from '@styles/metrics';

import { renderSVGIconConditionally } from '../../../../../../../../utils/render-svg-icon-conditionally/render-svg-icon-conditionally';
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
        size: metrics.getWidthFromDP('8'),
        color: 'buttonText',
        id: 'checkbox-circle',
      },
      ifFalse: {
        size: metrics.getWidthFromDP('8'),
        color: 'buttonText',
        id: 'checkbox-blank-circle-outline',
      },
    })}
    <Styles.AnswerTextWrapper>
      <Typography.ExtraSmallText
        testID="multi-choice-option-text"
        color={dark.colors.buttonText}
        alignment="center"
        numberOfLines={3}
        bold>
        {props.answer}
      </Typography.ExtraSmallText>
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
