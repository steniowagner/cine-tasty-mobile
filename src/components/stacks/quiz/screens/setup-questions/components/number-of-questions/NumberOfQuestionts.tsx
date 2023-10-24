import React from 'react';

import { useNumberOfQuestions } from './use-number-of-questions';
import * as Styles from './NumberOfQuestionts.styles';
import { Typography } from '@/components/common';

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
      <Typography.SmallText testID="number-questions-text" alignment="center">
        {props.numberOfQuestions}
      </Typography.SmallText>
      <Styles.SliderStyled
        onValueChange={numberOfQuestions.onValueChange}
        onLayout={numberOfQuestions.onLayout}
        // @ts-ignore
        ref={numberOfQuestions.sliderRef}
        maximumValue={numberOfQuestions.sliderMaxValue}
        minimumValue={numberOfQuestions.sliderMinValue}
        testID="slider"
        step={1}
      />
      <Styles.NumberQuestionsWrapper>
        <Typography.SmallText testID="min-value-text">
          {numberOfQuestions.sliderMinValue}
        </Typography.SmallText>
        <Typography.SmallText testID="max-value-text">
          {numberOfQuestions.sliderMaxValue}
        </Typography.SmallText>
      </Styles.NumberQuestionsWrapper>
    </>
  );
};
