import React from 'react';

import useNumberOfQuestions from './useNumberOfQuestions';
import * as Styles from './NumberOfQuestionts.styles';

type NumberOfQuestionsProps = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
};

export const NumberOfQuestions = (props: NumberOfQuestionsProps) => {
  const numberOfQuestions = useNumberOfQuestions({
    onSetNumberQuestions: props.onSetNumberQuestions,
    numberOfQuestions: props.numberOfQuestions,
  });

  return (
    <>
      <Styles.DefaultText testID="number-questions-text">
        {props.numberOfQuestions}
      </Styles.DefaultText>
      <Styles.SliderStyled
        onValueChange={numberOfQuestions.onValueChange}
        onLayout={numberOfQuestions.onLayout}
        ref={numberOfQuestions.ref}
        maximumValue={numberOfQuestions.sliderMaxValue}
        minimumValue={numberOfQuestions.sliderMinValue}
        testID="slider"
        step={1}
      />
      <Styles.NumberQuestionsWrapper>
        <Styles.DefaultText testID="min-value-text">
          {numberOfQuestions.sliderMinValue}
        </Styles.DefaultText>
        <Styles.DefaultText testID="max-value-text">
          {numberOfQuestions.sliderMaxValue}
        </Styles.DefaultText>
      </Styles.NumberQuestionsWrapper>
    </>
  );
};
