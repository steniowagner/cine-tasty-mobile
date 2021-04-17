import React, { useRef } from 'react';
import { DefaultTheme, withTheme } from 'styled-components';
import Slider from '@react-native-community/slider';

import * as Styles from './NumberOfQuestionts.styles';

const MAX_VALUE = 50;
const MIN_VALUE = 1;

type Props = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
  theme: DefaultTheme;
};

const NumberOfQuestions = ({ onSetNumberQuestions, numberOfQuestions, theme }: Props) => {
  const numberQuestionsSliderRef = useRef(null);

  return (
    <>
      <Styles.DefaultText
        style={{
          textAlign: 'center',
        }}
        testID="default-text"
      >
        {numberOfQuestions}
      </Styles.DefaultText>
      <Slider
        onLayout={() => numberQuestionsSliderRef.current.setNativeProps({
          value: numberOfQuestions,
        })}
        onValueChange={(distance) => onSetNumberQuestions(distance)}
        maximumTrackTintColor={theme.colors.contrast}
        minimumTrackTintColor={theme.colors.text}
        thumbTintColor={theme.colors.text}
        ref={numberQuestionsSliderRef}
        maximumValue={MAX_VALUE}
        minimumValue={MIN_VALUE}
        testID="slider"
        step={1}
      />
      <Styles.NumberQuestionsWrapper>
        <Styles.DefaultText>{MIN_VALUE}</Styles.DefaultText>
        <Styles.DefaultText>{MAX_VALUE}</Styles.DefaultText>
      </Styles.NumberQuestionsWrapper>
    </>
  );
};

export default withTheme(NumberOfQuestions);
