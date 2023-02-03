import {useMemo} from 'react';

import {useTMDBImageQuality} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import * as Types from '@local-types';
import {CONSTANTS} from '@utils';

const THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;

type UseTMDBImageProps = {
  imageType: Types.ImageType;
  isThumbnail?: boolean;
  image: string;
};

export const useTMDBImage = (props: UseTMDBImageProps) => {
  const imagesQualities = useTMDBImageQuality();

  const uri = useMemo(() => {
    if (!props.isThumbnail) {
      return `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${
        imagesQualities[props.imageType]
      }${props.image}`;
    }
    return `${THUMBNAIL_URL}${props.image}`;
  }, [props.isThumbnail, props.imageType, props.image]);

  return {
    uri,
  };
};
