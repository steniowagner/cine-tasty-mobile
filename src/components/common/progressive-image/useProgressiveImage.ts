import {useCallback, useState, useRef} from 'react';
import {Animated} from 'react-native';

export const LOAD_PROGRESSIVE_IMAGE_TIMEOUT = 500;

export const useProgressiveImage = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const thumbnailOpacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const onLoadThumbnail = useCallback(() => {
    Animated.timing(thumbnailOpacity, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, []);

  const onLoadImage = useCallback(() => {
    setTimeout(() => {
      Animated.timing(imageOpacity, {
        useNativeDriver: true,
        toValue: 1,
      }).start(() => setIsImageLoaded(true));
    }, LOAD_PROGRESSIVE_IMAGE_TIMEOUT);
  }, []);

  return {
    thumbnailOpacity,
    onLoadThumbnail,
    isImageLoaded,
    imageOpacity,
    onLoadImage,
  };
};
