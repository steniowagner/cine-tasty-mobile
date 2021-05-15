import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type UseLoadListItemImageProps = {
  image: string;
};

export const ANIMATION_DURATION = 400;

export const useLoadListItemImage = (props: UseLoadListItemImageProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState<boolean>(true);
  const [hasError, setImageHasError] = useState<boolean>(false);
  const [isLoaded, setIsImageLoaded] = useState<boolean>(false);

  const fallbackImageWrapperOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoaded && !hasError) {
      Animated.timing(fallbackImageWrapperOpacity, {
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        toValue: 0,
      }).start(() => setIsFallbackImageVisible(false));
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!props.image) {
      setImageHasError(true);
    }
  }, []);

  return {
    onError: () => setImageHasError(true),
    opacity: fallbackImageWrapperOpacity,
    onLoad: () => setIsImageLoaded(true),
    isFallbackImageVisible,
    hasError,
  };
};
