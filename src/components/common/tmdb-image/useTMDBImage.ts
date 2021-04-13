import { useMemo } from 'react';

import { useTMDBImageQuality } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

type Props = {
  imageType: Types.ImageType;
  isThumbnail: boolean;
  image: string;
};

type State = {
  uri: string;
};

const PROFILE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;

const useTMDBImage = ({ isThumbnail, imageType, image }: Props): State => {
  const imagesQualities = useTMDBImageQuality();

  const uri = useMemo(() => {
    if (isThumbnail) {
      return `${PROFILE_THUMBNAIL_URL}${image}`;
    }

    return `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${imagesQualities[imageType]}${image}`;
  }, [isThumbnail, imageType, image]);

  return {
    uri,
  };
};

export default useTMDBImage;
