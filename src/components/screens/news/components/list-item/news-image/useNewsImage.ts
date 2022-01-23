import {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const ANIMATION_DURATION = 400;

type NewsListItemImageProps = {
  image: string;
};

const useNewsImage = ({image}: NewsListItemImageProps) => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState(true);
  const [isImageWithError, setIsImageWithError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fallbackImageWrapperOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isImageLoaded && !isImageWithError) {
      Animated.timing(fallbackImageWrapperOpacity, {
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        toValue: 0,
      }).start(() => setIsFallbackImageVisible(false));
    }
  }, [fallbackImageWrapperOpacity, isImageLoaded, isImageWithError]);

  useEffect(() => {
    if (!image) {
      setIsImageWithError(true);
    }
  }, [image]);

  return {
    onError: () => setIsImageWithError(true),
    onLoad: () => setIsImageLoaded(true),
    fallbackImageWrapperOpacity,
    isFallbackImageVisible,
    isImageWithError,
  };
};

export default useNewsImage;
