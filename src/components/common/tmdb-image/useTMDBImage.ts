import {useMemo} from 'react';

import {useTMDBImageQualities} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import * as Types from '@local-types';
import {CONSTANTS} from '@utils';

const THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;

type UseTMDBImageProps = {
  imageType: Types.ImageType;
  isThumbnail?: boolean;
  image: string;
};

export const useTMDBImage = (props: UseTMDBImageProps) => {
  const tmdbImagesQualities = useTMDBImageQualities();

  const uri = useMemo(() => {
    if (!props.isThumbnail && tmdbImagesQualities.mappingImageTypeToImageSize) {
      return `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${
        tmdbImagesQualities.mappingImageTypeToImageSize[props.imageType]
      }${props.image}`;
    }
    return `${THUMBNAIL_URL}${props.image}`;
  }, [props.isThumbnail, props.imageType, props.image, tmdbImagesQualities]);

  return {
    uri,
  };
};
