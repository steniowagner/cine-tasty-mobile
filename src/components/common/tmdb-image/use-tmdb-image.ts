import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ImageStyle } from 'react-native-fast-image';

import { ImageType } from '@/providers/tmdb-image-qualities/types';
import { useTMDBImageQualities } from '@providers';

import { getImageURI } from './get-image-uri';
import * as Styles from './TMDBImage.styles';

export const ANIMATION_DURATION = 400;

type UseTMDBImageProps = {
  isThumbnail?: boolean;
  imageType: ImageType;
  style: ImageStyle;
  image: string;
};

export const useTMDBImage = (props: UseTMDBImageProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setImageHasError] = useState(false);
  const [isLoaded, setIsImageLoaded] = useState(false);

  const tmdbImagesQualities = useTMDBImageQualities();
  const opacity = useSharedValue(1);
  const theme = useTheme();

  const uri = useMemo(
    () =>
      getImageURI({
        mappingImageTypeToImageSize:
          tmdbImagesQualities.mappingImageTypeToImageSize,
        isThumbnail: !!props.isThumbnail,
        image: props.image,
        imageType: props.imageType,
      }),
    [
      tmdbImagesQualities.mappingImageTypeToImageSize,
      props.isThumbnail,
      props.imageType,
      props.image,
    ],
  );

  const imageFallbackStyle = useAnimatedStyle(
    () => ({
      width: props.style.width,
      height: props.style.height,
      justifyContent: Styles.sheet.fallbackImage.justifyContent,
      alignItems: Styles.sheet.fallbackImage.alignItems,
      position: Styles.sheet.fallbackImage.position,
      opacity: opacity.value,
      borderRadius: props.style.borderRadius,
      backgroundColor: theme.colors.fallbackImageBackground,
    }),
    [props.style, theme],
  );

  const handleError = useCallback(() => {
    setImageHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const animateFallbackImageOpacity = useCallback(() => {
    opacity.value = withTiming(
      0,
      { duration: ANIMATION_DURATION },
      (isFinished?: boolean) => {
        if (isFinished) {
          runOnJS(setIsVisible)(false);
        }
      },
    );
  }, []);

  useEffect(() => {
    if (isLoaded && !hasError) {
      animateFallbackImageOpacity();
    }
  }, [isLoaded]);

  return {
    imageFallbackStyle,
    onError: handleError,
    onLoad: handleLoad,
    isVisible,
    hasError,
    uri,
  };
};
