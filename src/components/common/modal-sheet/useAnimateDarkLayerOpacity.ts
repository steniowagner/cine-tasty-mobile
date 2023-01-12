import {useCallback, useEffect} from 'react';

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type UseAnimateDarkLayerOpacityProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const useAnimateDarkLayerOpacity = (
  props: UseAnimateDarkLayerOpacityProps,
) => {
  const darkLayerOpacity = useSharedValue(0);

  const darkLayerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: darkLayerOpacity.value,
  }));

  const handlePressBackgroundLayer = useCallback(() => {
    props.onClose();
  }, [props.onClose]);

  const handleAnimateDarkLayerOpacity = useCallback(() => {
    const nextDarkLayerOpacity = props.isOpen ? 1 : 0;
    darkLayerOpacity.value = withTiming(nextDarkLayerOpacity, {duration: 700});
  }, [props.isOpen]);

  useEffect(() => {
    handleAnimateDarkLayerOpacity();
  }, [props.isOpen]);

  return {
    onPressBackgroundLayer: handlePressBackgroundLayer,
    darkLayerAnimatedStyle,
  };
};
