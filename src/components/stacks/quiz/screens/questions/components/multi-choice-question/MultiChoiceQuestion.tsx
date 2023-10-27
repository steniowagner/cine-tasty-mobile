import React, { memo } from 'react';

import { ModalSelectButton } from '@common-components';

import MultiChoiceQuestionListItem from './multi-choice-question-list-item/MultiChoiceQuestionListItem';
import { DEFAULT_BORDER_RADIUS } from '../question-wrapper/QuestionWrapper.styles';
import { useMultiChoiceQuestion } from './use-multi-choice-question';

type MultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
  options: string[];
};

const MultiChoiceQuestion = (props: MultiChoiceQuestionProps) => {
  const multiChoiceQuestion = useMultiChoiceQuestion({
    onPressNext: props.onPressNext,
  });

  return (
    <>
      {props.options.map(option => (
        <MultiChoiceQuestionListItem
          onSelectAnswer={() => multiChoiceQuestion.onSelectOption(option)}
          isSelected={multiChoiceQuestion.selectedOption === option}
          answer={option}
          key={option}
        />
      ))}
      <ModalSelectButton
        isDisabled={multiChoiceQuestion.isNextButtonDisabled}
        borderBottomRightRadius={DEFAULT_BORDER_RADIUS}
        borderBottomLeftRadius={DEFAULT_BORDER_RADIUS}
        title={multiChoiceQuestion.texts.next}
        onPress={multiChoiceQuestion.onPressNext}
      />
    </>
  );
};

const shouldComponentUpdate = (
  previousState: MultiChoiceQuestionProps,
  nextState: MultiChoiceQuestionProps,
): boolean =>
  (previousState.isFocused || !nextState.isFocused) &&
  (!previousState.isFocused || nextState.isFocused);

export default memo(MultiChoiceQuestion, shouldComponentUpdate);
