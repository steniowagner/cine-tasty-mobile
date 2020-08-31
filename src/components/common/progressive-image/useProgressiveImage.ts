import { useCallback, useState, useRef } from 'react';
import { Animated } from 'react-native';

type State = {
  thumbnailOpacity: Animated.Value;
  imageOpacity: Animated.Value;
  onLoadThumbnail: () => void;
  onLoadImage: () => void;
  isImageLoaded: boolean;
};

const useProgressiveImage = (): State => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const thumbnailOpacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const onLoadThumbnail = useCallback(() => {
    Animated.timing(thumbnailOpacity, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, []);

  const onLoadImage = useCallback(() => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => setIsImageLoaded(true));
  }, []);

  return {
    thumbnailOpacity,
    onLoadThumbnail,
    isImageLoaded,
    imageOpacity,
    onLoadImage,
  };
};

export default useProgressiveImage;
