import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import CONSTANTS from '@utils/constants';

type UseHeaderAnimatedOpacity = {
  shouldDisableActions: boolean;
};

const useHeaderAnimatedOpacity = (props: UseHeaderAnimatedOpacity) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animateHeaderOpacity = useCallback(() => {
    const currentOpacity = props.shouldDisableActions ? 0.5 : 1;

    Animated.timing(opacity, {
      duration: CONSTANTS.VALUES.DEFAULT_ANIMATION_DURATION,
      toValue: currentOpacity,
      useNativeDriver: true,
    }).start();
  }, [props.shouldDisableActions]);

  useEffect(() => {
    animateHeaderOpacity();
  }, [props.shouldDisableActions]);

  return {
    opacity,
  };
};

export default useHeaderAnimatedOpacity;
