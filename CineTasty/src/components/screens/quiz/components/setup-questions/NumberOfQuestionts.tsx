import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';
import Slider from '@react-native-community/slider';

const MAX_VALUE = 50;
const MIN_VALUE = 1;

const DefaultText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
`;

const NumberQuestionsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
  theme: DefaultTheme;
};

const NumberOfQuestions = ({ onSetNumberQuestions, numberOfQuestions, theme }: Props) => {
  const numberQuestionsSliderRef = useRef(null);

  return (
    <>
      <DefaultText
        style={{
          textAlign: 'center',
        }}
        testID="default-text"
      >
        {numberOfQuestions}
      </DefaultText>
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
      <NumberQuestionsWrapper>
        <DefaultText>{MIN_VALUE}</DefaultText>
        <DefaultText>{MAX_VALUE}</DefaultText>
      </NumberQuestionsWrapper>
    </>
  );
};

export default withTheme(NumberOfQuestions);
