import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
  image: string;
};

type State = {
  isFallbackImageVisible: boolean;
  opacity: Animated.Value;
  onError: () => void;
  onLoad: () => void;
  hasError: boolean;
};

export const useLoadListItemImage = ({ image }: Props): State => {
  const [isFallbackImageVisible, setIsFallbackImageVisible] = useState<boolean>(true);
  const [hasError, setImageHasError] = useState<boolean>(false);
  const [isLoaded, setIsImageLoaded] = useState<boolean>(false);

  const fallbackImageWrapperOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoaded && !hasError) {
      Animated.timing(fallbackImageWrapperOpacity, {
        useNativeDriver: true,
        duration: 400,
        toValue: 0,
      }).start(() => setIsFallbackImageVisible(false));
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!image) {
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
