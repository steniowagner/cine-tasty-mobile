import { useCallback, useEffect } from 'react';
import {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useSharedValue,
} from 'react-native-reanimated';

type UseLoadingPlaceholderProps = {
  indexToDelayAnimation: number;
};

export const ANIMATION_DURATION = 800;
const EXTRA_ANIMATION_DURATION = 50;

export const useLoadingPlaceholder = (props: UseLoadingPlaceholderProps) => {
  const animatedOpacity = useSharedValue(1);

  const style = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  const animateOpacity = useCallback(() => {
    animatedOpacity.value = withRepeat(
      withTiming(0.1, {
        duration:
          ANIMATION_DURATION +
          props.indexToDelayAnimation * EXTRA_ANIMATION_DURATION,
      }),
      -1,
      true,
    );
  }, [props.indexToDelayAnimation]);

  useEffect(() => {
    animateOpacity();
  }, []);

  return {
    style,
  };
};
