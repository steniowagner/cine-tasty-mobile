import React from 'react';
import {DefaultTheme, withTheme} from 'styled-components/native';
import Slider from '@react-native-community/slider';

import useNumberOfQuestions from './useNumberOfQuestions';
import * as Styles from './NumberOfQuestionts.styles';

export const MAX_VALUE = 50;
export const MIN_VALUE = 1;

type NumberOfQuestionsProps = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
  theme: DefaultTheme;
};

const NumberOfQuestions = (props: NumberOfQuestionsProps) => {
  const numberOfQuestions = useNumberOfQuestions({
    onSetNumberQuestions: props.onSetNumberQuestions,
    numberOfQuestions: props.numberOfQuestions,
  });
  return (
    <>
      <Styles.DefaultText testID="number-questions-text">
        {props.numberOfQuestions}
      </Styles.DefaultText>
      <Slider
        maximumTrackTintColor={props.theme.colors.contrast}
        minimumTrackTintColor={props.theme.colors.text}
        onValueChange={numberOfQuestions.onValueChange}
        thumbTintColor={props.theme.colors.text}
        onLayout={numberOfQuestions.onLayout}
        ref={numberOfQuestions.ref}
        maximumValue={MAX_VALUE}
        minimumValue={MIN_VALUE}
        testID="slider"
        step={1}
      />
      <Styles.NumberQuestionsWrapper>
        <Styles.DefaultText testID="min-value-text">
          {MIN_VALUE}
        </Styles.DefaultText>
        <Styles.DefaultText testID="max-value-text">
          {MAX_VALUE}
        </Styles.DefaultText>
      </Styles.NumberQuestionsWrapper>
    </>
  );
};

export default withTheme(NumberOfQuestions);
