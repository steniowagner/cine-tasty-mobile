import React, { memo } from 'react';

import { ModalSelectButton } from '@common-components';

import { DEFAULT_BORDER_RADIUS } from '../question-wrapper/QuestionWrapper.styles';
import { useBooleanQuestion } from './use-boolean-question';
import * as Styles from './BooleanQuestion.styles';

type BooleanQuestionProps = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
};

const BooleanQuestion = (props: BooleanQuestionProps) => {
  const booleanQuestion = useBooleanQuestion({
    onPressNext: props.onPressNext,
  });

  return (
    <>
      <Styles.Wrapper>
        <Styles.OptionButton
          isSelected={booleanQuestion.selectedAnswer === true}
          onPress={booleanQuestion.onPressTrueOption}
          testID="true-option-button">
          <Styles.OptionText testID="true-option-text">
            {booleanQuestion.texts.true}
          </Styles.OptionText>
        </Styles.OptionButton>
        <Styles.OptionButton
          isSelected={booleanQuestion.selectedAnswer === false}
          onPress={booleanQuestion.onPressFalseOption}
          testID="false-option-button">
          <Styles.OptionText testID="false-option-text">
            {booleanQuestion.texts.false}
          </Styles.OptionText>
        </Styles.OptionButton>
      </Styles.Wrapper>
      <ModalSelectButton
        isDisabled={booleanQuestion.selectedAnswer === undefined}
        borderBottomRightRadius={DEFAULT_BORDER_RADIUS}
        borderBottomLeftRadius={DEFAULT_BORDER_RADIUS}
        title={booleanQuestion.texts.next}
        onPress={booleanQuestion.onPressNext}
      />
    </>
  );
};

const shouldComponentUpdate = (
  previousState: BooleanQuestionProps,
  nextState: BooleanQuestionProps,
): boolean =>
  (previousState.isFocused || !nextState.isFocused) &&
  (!previousState.isFocused || nextState.isFocused);

export default memo(BooleanQuestion, shouldComponentUpdate);
