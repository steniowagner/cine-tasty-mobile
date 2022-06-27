import {useCallback, useRef} from 'react';

type UseNumberOfQuestionsProps = {
  onSetNumberQuestions: (value: number) => void;
  numberOfQuestions: number;
};

const useNumberOfQuestions = (props: UseNumberOfQuestionsProps) => {
  const numberQuestionsSliderRef = useRef(null);

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
  };
};

export default useNumberOfQuestions;
