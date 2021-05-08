import { useMemo } from 'react';

import { useTMDBImageQuality } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

type UseTMDBImageProps = {
  imageType: Types.ImageType;
  isThumbnail: boolean;
  image: string;
};

const THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;

const useTMDBImage = ({ isThumbnail, imageType, image }: UseTMDBImageProps) => {
  const imagesQualities = useTMDBImageQuality();

  const uri = useMemo(() => {
    if (isThumbnail) {
      return `${THUMBNAIL_URL}${image}`;
    }

    return `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${imagesQualities[imageType]}${image}`;
  }, [isThumbnail, imageType, image]);

  return {
    uri,
  };
};

export default useTMDBImage;
