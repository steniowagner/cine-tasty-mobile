import {useCallback, useMemo, useState} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import * as Styles from './ProgressiveImage.styles';

export const ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT = 500;
export const DEFAULT_TIMING = 250;

type UseProgressiveImageProps = {
  imageHeight?: number;
  imageBorderRadius?: number;
};

export const useProgressiveImage = (props: UseProgressiveImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const thumbnailOpacity = useSharedValue(0);
  const defaultImageOpacity = useSharedValue(0);

  const baseStyle = useMemo(
    () => ({
      width: Styles.sheet.container.width,
      height: props.imageHeight || Styles.sheet.container.height,
      borderRadius: Number(props.imageBorderRadius || 0),
    }),
    [props.imageBorderRadius, props.imageHeight],
  );

  const defaultImageBaseStyle = useMemo(
    () => ({
      ...baseStyle,
      ...Styles.sheet.imageOverlay,
    }),
    [baseStyle],
  );

  const onLoadThumbnail = useCallback(() => {
    thumbnailOpacity.value = withTiming(1, {
      duration: DEFAULT_TIMING,
    });
  }, []);

  const onLoadImage = useCallback(() => {
    setTimeout(() => {
      defaultImageOpacity.value = withTiming(
        1,
        {
          duration: DEFAULT_TIMING,
        },
        (isFinished: boolean) => {
          if (isFinished) {
            runOnJS(setIsImageLoaded)(true);
          }
        },
      );
    }, ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT);
  }, []);

  const thumbnailAnimatedStyle = useAnimatedStyle(
    () => ({opacity: thumbnailOpacity.value}),
    [thumbnailOpacity],
  );

  const defaultImageAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: defaultImageOpacity.value,
    }),
    [defaultImageOpacity],
  );

  return {
    thumbnailAnimatedStyle,
    onLoadThumbnail,
    baseStyle,
    isImageLoaded,
    defaultImageAnimatedStyle,
    defaultImageBaseStyle,
    onLoadImage,
  };
};
