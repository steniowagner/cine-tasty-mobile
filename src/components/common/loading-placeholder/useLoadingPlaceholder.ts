import {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { Animated } from 'react-native';

type Props = {
  indexToDelayAnimation?: number;
};

type State = {
  opacity: Animated.AnimatedInterpolation;
};

const ANIMATION_DURATION = 500;

const useLoadingPlaceholder = ({ indexToDelayAnimation }: Props): State => {
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  const animationDuration = useMemo(
    () => ANIMATION_DURATION + indexToDelayAnimation * 150,
    [indexToDelayAnimation],
  );

  const animateOpacity = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          duration: animationDuration,
          useNativeDriver: true,
          toValue: 0,
        }),
        Animated.timing(animatedOpacity, {
          duration: animationDuration,
          useNativeDriver: true,
          toValue: 1,
        }),
      ]),
    ).start();
  }, []);

  const interpolatedOpacity = useMemo(
    () => animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 1],
    }),
    [],
  );

  useEffect(() => {
    animateOpacity();
  }, []);

  return {
    opacity: interpolatedOpacity,
  };
};

export default useLoadingPlaceholder;
