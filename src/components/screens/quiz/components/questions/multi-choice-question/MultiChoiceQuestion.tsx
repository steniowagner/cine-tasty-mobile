import React, {memo} from 'react';
import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';

import MultiChoiceQuestionListItem from './multi-choice-question-list-item/MultiChoiceQuestionListItem';
import {DEFAULT_BORDER_RADIUS} from '../question-wrapper/QuestionWrapper.styles';

import useMultiChoiceQuestion from './useMultiChoiceQuestion';

type MultiChoiceQuestionProps = {
  onPressNext: (answerSelected: string) => void;
  isFocused: boolean;
  answers: string[];
};

const MultiChoiceQuestion = (props: MultiChoiceQuestionProps) => {
  const multiChoiceQuestion = useMultiChoiceQuestion({
    onPressNext: props.onPressNext,
  });
  return (
    <>
      {props.answers.map(answer => (
        <MultiChoiceQuestionListItem
          onSelectAnswer={() => multiChoiceQuestion.onSelectOption(answer)}
          isSelected={multiChoiceQuestion.selectedOption === answer}
          answer={answer}
          key={answer}
        />
      ))}
      <ModalSelectButton
        isDisabled={multiChoiceQuestion.isNextButtonDisabled}
        borderBottomRightRadius={DEFAULT_BORDER_RADIUS}
        borderBottomLeftRadius={DEFAULT_BORDER_RADIUS}
        title={multiChoiceQuestion.texts.nextButton}
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
