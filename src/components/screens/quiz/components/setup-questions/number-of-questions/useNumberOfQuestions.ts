import {useCallback, useRef} from 'react';
import Slider from '@react-native-community/slider';

export const SLIDER_MAX_VALUE = 50;
export const SLIDER_MIN_VALUE = 1;

type UseNumberOfQuestionsProps = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
};

const useNumberOfQuestions = (props: UseNumberOfQuestionsProps) => {
  const numberQuestionsSliderRef = useRef<Slider>(null);

  const handleOnValueChange = useCallback(
    (distance: number) => {
      props.onSetNumberQuestions(distance);
    },
    [props.onSetNumberQuestions],
  );

  const handleOnLayout = useCallback(() => {
    numberQuestionsSliderRef.current.setNativeProps({
      value: props.numberOfQuestions,
    });
  }, [props.numberOfQuestions]);

  return {
    onValueChange: handleOnValueChange,
    ref: numberQuestionsSliderRef,
    onLayout: handleOnLayout,
    sliderMaxValue: SLIDER_MAX_VALUE,
    sliderMinValue: SLIDER_MIN_VALUE,
  };
};

export default useNumberOfQuestions;
