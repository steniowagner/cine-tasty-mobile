import {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { Animated } from 'react-native';

type Props = {
  indexToDelayAnimation?: number;
  colors: string[];
};

type State = {
  color: Animated.AnimatedInterpolation;
};

const ANIMATION_DURATION = 500;

const useLoadingPlaceholder = ({ indexToDelayAnimation, colors }: Props): State => {
  const animatedColor = useRef(new Animated.Value(0)).current;

  const animationDuration = useMemo(
    () => ANIMATION_DURATION + indexToDelayAnimation * 150,
    [indexToDelayAnimation],
  );

  const animateColor = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedColor, {
          duration: animationDuration,
          toValue: 1,
        }),
        Animated.timing(animatedColor, {
          duration: animationDuration,
          toValue: 0,
        }),
      ]),
    ).start();
  }, []);

  const interpolatedColor = useMemo(
    () => animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: colors,
    }),
    [colors],
  );

  useEffect(() => {
    animateColor();
  }, []);

  return {
    color: interpolatedColor,
  };
};

export default useLoadingPlaceholder;
