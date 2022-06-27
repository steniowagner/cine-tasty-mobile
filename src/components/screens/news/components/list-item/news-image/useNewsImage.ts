import {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const ANIMATION_DURATION = 400;

type NewsListItemImageProps = {
  image: string;
};

const useNewsImage = (props: NewsListItemImageProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fallbackImageWrapperOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isImageLoaded && !hasError) {
      Animated.timing(fallbackImageWrapperOpacity, {
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        toValue: 0,
      }).start(() => setIsFallbackImageVisible(false));
    }
  }, [fallbackImageWrapperOpacity, isImageLoaded, hasError]);

  useEffect(() => {
    if (!props.image) {
      setHasError(true);
    }
  }, [props.image]);

  return {
    onError: () => setHasError(true),
    onLoad: () => setIsImageLoaded(true),
    fallbackImageWrapperOpacity,
    isFallbackImageVisible,
    hasError,
  };
};

export default useNewsImage;
