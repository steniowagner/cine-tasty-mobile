import { useCallback, useMemo } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTMDBImageURI } from '@hooks';

import * as Styles from './BackgroundImage.styles';

const ANIMATION_DURATION_MS = 500;

type UseBackgroundImageParams = {
  image: string;
};

export const useBackgroundImage = (params: UseBackgroundImageParams) => {
  const tmdbImage = useTMDBImageURI();

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
      duration: ANIMATION_DURATION_MS,
    });
  }, []);

  const uri = useMemo(
    () =>
      tmdbImage.uri({
        isThumbnail: true,
        imageType: 'backdrop',
        image: params.image,
      }),
    [params.image],
  );

  return {
    onLoad: handleLoadImage,
    uri,
    style,
  };
};
