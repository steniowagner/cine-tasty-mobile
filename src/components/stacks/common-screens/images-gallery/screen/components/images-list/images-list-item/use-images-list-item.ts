import { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, Image } from 'react-native';

import { LANDSCAPE_HEIGHT, PORTRAIT_HEIGHT } from './ImagesListItem.styles';

type Dimensions = {
  height: number;
  width: number;
};

type UseImagesListItemParams = {
  image: string;
};

export const useImagesListItem = (params: UseImagesListItemParams) => {
  const [dimensions, setDimensions] = useState<Dimensions | undefined>();
  const [imageHeight, setImageHeight] = useState(0);

  const sheet = useMemo(
    () =>
      StyleSheet.create({
        image: {
          height: imageHeight,
          width: '100%',
        },
      }),
    [imageHeight],
  );

  const getImageSize = useCallback(() => {
    Image.getSize(params.image, (width, height) => {
      setDimensions({
        width,
        height,
      });
    });
  }, [params.image]);

  const calculateImageHeight = useCallback(() => {
    if (!dimensions) {
      return;
    }
    const isLandscape = dimensions.width > dimensions.height;
    const height = isLandscape ? LANDSCAPE_HEIGHT : PORTRAIT_HEIGHT;
    setImageHeight(height);
  }, [dimensions]);

  useEffect(() => {
    calculateImageHeight();
  }, [dimensions]);

  useEffect(() => {
    getImageSize();
  }, []);

  return {
    sheet,
  };
};
