import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import CONSTANTS from '@utils/constants';

type UseHeaderAnimatedOpacity = {
  shouldDisableActions: boolean;
};

const useHeaderAnimatedOpacity = ({ shouldDisableActions }: UseHeaderAnimatedOpacity) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animateHeaderOpacity = useCallback(() => {
    const currentOpacity = shouldDisableActions ? 0.5 : 1;

    Animated.timing(opacity, {
      duration: CONSTANTS.VALUES.DEFAULT_ANIMATION_DURATION,
      toValue: currentOpacity,
      useNativeDriver: true,
    }).start();
  }, [shouldDisableActions]);

  useEffect(() => {
    animateHeaderOpacity();
  }, [shouldDisableActions]);

  return {
    opacity,
  };
};

export default useHeaderAnimatedOpacity;
