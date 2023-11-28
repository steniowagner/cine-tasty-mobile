import { useCallback } from 'react';

import { ImageType } from '@/providers/tmdb-image-qualities/types';
import { useTMDBImageQualities } from '@providers';

export const BASE_URL = 'https://image.tmdb.org/t/p';
export const THUMBNAIL_URL = `${BASE_URL}/w154`;

type GetURIParams = {
  isThumbnail?: boolean;
  imageType: ImageType;
  image: string;
};

export const useTMDBImageURI = () => {
  const tmdbImagesQualities = useTMDBImageQualities();

  const uri = useCallback(
    (params: GetURIParams) => {
      if (params.isThumbnail) {
        return `${THUMBNAIL_URL}${params.image}`;
      }
      if (tmdbImagesQualities.mappingImageTypeToImageSize) {
        return `${BASE_URL}/${
          tmdbImagesQualities.mappingImageTypeToImageSize[params.imageType]
        }${params.image}`;
      }
    },
    [tmdbImagesQualities.mappingImageTypeToImageSize],
  );

  return { uri };
};
