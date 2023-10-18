import { useState, useEffect, useCallback } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ANIMATION_DURATION = 500;

type NewsListItemImageProps = {
  image?: string;
};

export const useNewsImage = (props: NewsListItemImageProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fallbackImageWrapperOpacity = useSharedValue(1);

  const animateFallbackImageOpacity = () => {
    fallbackImageWrapperOpacity.value = withTiming(
      0,
      {
        duration: ANIMATION_DURATION,
      },
      (isFinished?: boolean) => {
        if (isFinished) {
          runOnJS(setIsFallbackImageVisible)(false);
        }
      },
    );
  };

  const fallbackImageOpacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fallbackImageWrapperOpacity.value,
  }));

  useEffect(() => {
    if (isImageLoaded && !hasError) {
      animateFallbackImageOpacity();
    }
  }, [isImageLoaded, hasError]);

  useEffect(() => {
    if (!props.image) {
      setHasError(true);
    }
  }, [props.image]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  return {
    onError: handleError,
    onLoad: handleLoad,
    fallbackImageOpacityAnimatedStyle,
    isFallbackImageVisible,
    hasError,
  };
};
