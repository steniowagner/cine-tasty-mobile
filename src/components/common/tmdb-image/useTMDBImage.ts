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

const useTMDBImage = (props: UseTMDBImageProps) => {
  const imagesQualities = useTMDBImageQuality();

  const uri = useMemo(() => {
    if (props.isThumbnail) {
      return `${THUMBNAIL_URL}${props.image}`;
    }

    return `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${imagesQualities[props.imageType]}${
      props.image
    }`;
  }, [props]);

  return {
    uri,
  };
};

export default useTMDBImage;
