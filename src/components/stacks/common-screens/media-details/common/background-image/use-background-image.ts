import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as Styles from './BackgroundImage.styles';

export const useBackgroundImage = () => {
  const backgroundImageOpacity = useSharedValue(0);

  const style = useAnimatedStyle(
    () => ({
      opacity: backgroundImageOpacity.value,
      width: Styles.DEFAULT_WIDTH,
      height: Styles.DEFAULT_HEIGHT,
      position: 'absolute',
    }),
    [backgroundImageOpacity],
  );

  const handleLoadImage = useCallback(() => {
    backgroundImageOpacity.value = withTiming(1, {
      duration: 500,
    });
  }, []);

  return {
    onLoad: handleLoadImage,
    style,
  };
};
