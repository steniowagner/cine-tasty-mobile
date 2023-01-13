import {useCallback, useEffect} from 'react';
import {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useSharedValue,
} from 'react-native-reanimated';

export type Style = {
  borderRadius?: number;
  width?: string | number;
  height?: string | number;
  marginBottom?: number;
};

type UseLoadingPlaceholderProps = {
  indexToDelayAnimation?: number;
  style: Style;
};

const BASE_ANIMATION_DURATION = 800;
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
          BASE_ANIMATION_DURATION +
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
