import { useCallback, useRef } from 'react';
import Slider from '@react-native-community/slider';

export const SLIDER_MAX_VALUE = 50;
export const SLIDER_MIN_VALUE = 1;

type UseNumberOfQuestionsProps = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
};

export const useNumberOfQuestions = (props: UseNumberOfQuestionsProps) => {
  const sliderRef = useRef<Slider | null>(null);

  const handleChangeValue = useCallback(
    (distance: number) => {
      props.onSetNumberQuestions(distance);
    },
    [props.onSetNumberQuestions],
  );

  const handleOnLayout = useCallback(() => {
    sliderRef.current?.setNativeProps({
      value: props.numberOfQuestions,
    });
  }, [props.numberOfQuestions]);

  return {
    onValueChange: handleChangeValue,
    onLayout: handleOnLayout,
    sliderMaxValue: SLIDER_MAX_VALUE,
    sliderMinValue: SLIDER_MIN_VALUE,
    sliderRef,
  };
};
