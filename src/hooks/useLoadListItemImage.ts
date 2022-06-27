import {useState, useEffect, useRef, useCallback} from 'react';
import {Animated} from 'react-native';

export const ANIMATION_DURATION = 400;

type UseLoadListItemImageProps = {
  image: string;
};

export const useLoadListItemImage = (props: UseLoadListItemImageProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState(true);
  const [hasError, setImageHasError] = useState(false);
  const [isLoaded, setIsImageLoaded] = useState(false);

  const fallbackImageWrapperOpacity = useRef(new Animated.Value(1)).current;

  const handleOnError = useCallback(() => {
    setImageHasError(true);
  }, []);

  const handleOnLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

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
    opacity: fallbackImageWrapperOpacity,
    onError: handleOnError,
    isFallbackImageVisible,
    onLoad: handleOnLoad,
    hasError,
  };
};
