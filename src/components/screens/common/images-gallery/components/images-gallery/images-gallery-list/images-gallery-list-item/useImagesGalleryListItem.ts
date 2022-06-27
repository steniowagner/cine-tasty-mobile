import {useState, useEffect, useCallback} from 'react';
import {Image} from 'react-native';

import {
  LANDSCAPE_HEIGHT,
  PORTRAIT_HEIGHT,
} from './ImagesGalleryListItem.styles';

type ImageStatus = 'LOADING' | 'ERROR' | 'LOADED';

type Dimensions = {
  height: number;
  width: number;
};

type UseImagesGalleryListItemProps = {
  imageURL: string;
};

const useImagesGalleryListItem = (props: UseImagesGalleryListItemProps) => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('LOADING');
  const [dimensions, setDimensions] = useState<Dimensions>(null);
  const [imageHeight, setImageHeight] = useState<number>(0);

  const getImageSize = useCallback(() => {
    Image.getSize(
      props.imageURL,
      (width, height) => {
        setDimensions({
          width,
          height,
        });
        setImageStatus('LOADED');
      },
      () => {
        setImageStatus('ERROR');
      },
    );
  }, [props.imageURL]);

  useEffect(() => {
    getImageSize();
  }, []);

  useEffect(() => {
    if (!dimensions) {
      return;
    }
    const isLandscape = dimensions.width > dimensions.height;
    const height = isLandscape ? LANDSCAPE_HEIGHT : PORTRAIT_HEIGHT;
    setImageHeight(height);
  }, [dimensions]);

  return {
    isLoading: imageStatus === 'LOADING',
    hasError: imageStatus === 'ERROR',
    imageHeight,
  };
};

export default useImagesGalleryListItem;
