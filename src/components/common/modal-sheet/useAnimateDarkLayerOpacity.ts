import {useCallback, useEffect} from 'react';

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type UseAnimateDarkLayerOpacityProps = {
  isOpen: boolean;
};

const ANIMATION_DURATION = 700;

export const useAnimateDarkLayerOpacity = (
  props: UseAnimateDarkLayerOpacityProps,
) => {
  const darkLayerOpacity = useSharedValue(0);

  const darkLayerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: darkLayerOpacity.value,
  }));

  const handleAnimateDarkLayerOpacity = useCallback(() => {
    const nextDarkLayerOpacity = props.isOpen ? 1 : 0;
    darkLayerOpacity.value = withTiming(nextDarkLayerOpacity, {
      duration: ANIMATION_DURATION,
    });
  }, [props.isOpen]);

  useEffect(() => {
    handleAnimateDarkLayerOpacity();
  }, [props.isOpen]);

  return {
    animatedStyle: darkLayerAnimatedStyle,
  };
};
