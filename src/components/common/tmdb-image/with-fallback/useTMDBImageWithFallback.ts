import {useState, useEffect, useCallback} from 'react';
import {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';

import * as Styles from './TMDBImageWithFallback.styles';

export const ANIMATION_DURATION = 400;

export type Style = {
  width: number;
  height: number;
  borderRadius: number;
};

type UseTMDBImageWithFallbackProps = {
  style: Style;
  image: string;
};

export const useTMDBImageWithFallback = (
  props: UseTMDBImageWithFallbackProps,
) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setImageHasError] = useState(false);
  const [isLoaded, setIsImageLoaded] = useState(false);

  const fallbackImageOpacity = useSharedValue(1);
  const theme = useTheme();

  const handleAnimateFallbackImageOpacity = useCallback(() => {
    fallbackImageOpacity.value = withTiming(
      0,
      {duration: ANIMATION_DURATION},
      (isFinished: boolean) => {
        if (isFinished) {
          runOnJS(setIsVisible)(false);
        }
      },
    );
  }, []);

  const imageFallbackViewStyle = useAnimatedStyle(
    () => ({
      width: props.style.width,
      height: props.style.height,
      justifyContent: Styles.sheet.fallbackImage.justifyContent,
      alignItems: Styles.sheet.fallbackImage.alignItems,
      position: Styles.sheet.fallbackImage.position,
      opacity: fallbackImageOpacity.value,
      borderRadius: props.style.borderRadius,
      backgroundColor: theme.colors.fallbackImageBackground,
    }),
    [props.style, theme],
  );

  useEffect(() => {
    if (isLoaded && !hasError) {
      handleAnimateFallbackImageOpacity();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!props.image) {
      setImageHasError(true);
    }
  }, []);

  return {
    imageFallbackViewStyle,
    onError: () => setImageHasError(true),
    isVisible,
    onLoad: () => setIsImageLoaded(true),
    hasError,
  };
};
