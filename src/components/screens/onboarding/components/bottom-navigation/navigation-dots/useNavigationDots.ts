import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import metrics from '@styles/metrics';

const MAX_DOT_WIDTH = metrics.getWidthFromDP('7%');
const MIN_DOT_WIDTH = metrics.smallSize;
const ANIMATION_DURATION = 200;

type UseNavigationDotsProps = {
  indexSelected: number;
};

const useNavigationDots = ({ indexSelected }: UseNavigationDotsProps) => {
  const firstDotWidth = useRef(new Animated.Value(MIN_DOT_WIDTH)).current;
  const secondDotWidth = useRef(new Animated.Value(MIN_DOT_WIDTH)).current;
  const thirdDotWidth = useRef(new Animated.Value(MIN_DOT_WIDTH)).current;
  const fourthDotWidth = useRef(new Animated.Value(MIN_DOT_WIDTH)).current;

  const handleAnimateDot = useCallback(
    (dot: Animated.Value, dotIndex: number) => {
      const toValue = dotIndex === indexSelected ? MAX_DOT_WIDTH : MIN_DOT_WIDTH;

      Animated.timing(dot, {
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
        toValue,
      }).start();
    },
    [indexSelected],
  );

  useEffect(() => {
    handleAnimateDot(firstDotWidth, 0);

    handleAnimateDot(secondDotWidth, 1);

    handleAnimateDot(thirdDotWidth, 2);

    handleAnimateDot(fourthDotWidth, 3);
  }, [indexSelected]);

  return {
    firstDotWidth,
    secondDotWidth,
    thirdDotWidth,
    fourthDotWidth,
  };
};

export default useNavigationDots;
