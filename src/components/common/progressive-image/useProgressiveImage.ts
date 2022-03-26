import {useCallback, useState, useRef} from 'react';
import {Animated} from 'react-native';

export const useProgressiveImage = () => {
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
    setTimeout(() => {
      Animated.timing(imageOpacity, {
        useNativeDriver: true,
        toValue: 1,
      }).start(() => setIsImageLoaded(true));
    }, 500);
  }, []);

  return {
    thumbnailOpacity,
    onLoadThumbnail,
    isImageLoaded,
    imageOpacity,
    onLoadImage,
  };
};
