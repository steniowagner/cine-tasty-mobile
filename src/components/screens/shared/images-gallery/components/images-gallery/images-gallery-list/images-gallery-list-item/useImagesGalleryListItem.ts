import { useState, useEffect, useCallback } from 'react';
import { Image } from 'react-native';

type ImageMode = 'NONE' | 'PORTRAIT' | 'LANDSCAPE';

type ImageStatus = 'LOADING' | 'ERROR' | 'LOADED';

type Dimensions = {
  height: number;
  width: number;
};

type State = {
  isLandscape: boolean;
  isPortrait: boolean;
  isLoading: boolean;
  hasError: boolean;
};

type Props = {
  imageURL: string;
};

const useImagesGalleryListItem = ({ imageURL }: Props): State => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('LOADING');
  const [dimensions, setDimensions] = useState<Dimensions>(null);
  const [imageMode, setImageMode] = useState<ImageMode>('NONE');

  const getImageSize = useCallback(() => {
    Image.getSize(
      imageURL,
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
  }, [imageURL]);

  useEffect(() => {
    getImageSize();
  }, []);

  useEffect(() => {
    if (!dimensions) {
      return;
    }

    const isLandscape = dimensions.width > dimensions.height;

    if (isLandscape) {
      setImageMode('LANDSCAPE');
    } else {
      setImageMode('PORTRAIT');
    }
  }, [dimensions]);

  return {
    isLandscape: imageMode === 'LANDSCAPE',
    isPortrait: imageMode === 'PORTRAIT',
    isLoading: imageStatus === 'LOADING',
    hasError: imageStatus === 'ERROR',
  };
};

export default useImagesGalleryListItem;
