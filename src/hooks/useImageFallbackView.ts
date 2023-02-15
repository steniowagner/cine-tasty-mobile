import {useState, useEffect, useCallback} from 'react';
import {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

export const ANIMATION_DURATION = 400;

type UseImageFallbackViewProps = {
  image: string;
};

export const useImageFallbackView = (props: UseImageFallbackViewProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState(true);
  const [hasError, setImageHasError] = useState(false);
  const [isLoaded, setIsImageLoaded] = useState(false);

  const fallbackImageOpacity = useSharedValue(1);

  const handleAnimateFallbackImageOpacity = useCallback(() => {
    fallbackImageOpacity.value = withTiming(
      0,
      {duration: ANIMATION_DURATION},
      (isFinished: boolean) => {
        if (isFinished) {
          runOnJS(setIsFallbackImageVisible)(false);
        }
      },
    );
  }, []);

  const imageFallbackViewStyle = useAnimatedStyle(
    () => ({
      opacity: fallbackImageOpacity.value,
    }),
    [],
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
    isFallbackImageVisible,
    onLoad: () => setIsImageLoaded(true),
    hasError,
  };
};
