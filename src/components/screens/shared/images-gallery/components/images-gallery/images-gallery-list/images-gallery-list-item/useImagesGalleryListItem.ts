import { useState, useEffect, useCallback } from 'react';
import { Image } from 'react-native';

type ImageMode = 'NONE' | 'PORTRAIT' | 'LANDSCAPE';

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
  const [imageMode, setImageMode] = useState<ImageMode>('NONE');

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

    const mode = isLandscape ? 'LANDSCAPE' : 'PORTRAIT';

    setImageMode(mode);
  }, [dimensions]);

  return {
    isLandscape: imageMode === 'LANDSCAPE',
    isPortrait: imageMode === 'PORTRAIT',
    isLoading: imageStatus === 'LOADING',
    hasError: imageStatus === 'ERROR',
  };
};

export default useImagesGalleryListItem;
