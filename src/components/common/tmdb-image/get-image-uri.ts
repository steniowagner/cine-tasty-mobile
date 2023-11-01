import {
  ImageType,
  MappingImageTypeToImageSize,
} from '@/providers/tmdb-image-qualities/types';

export const BASE_URL = 'https://image.tmdb.org/t/p';
export const THUMBNAIL_URL = `${BASE_URL}/w45`;

type ThumbnailImageParams = {
  isThumbnail: true;
  image: string;
};

type NonThumbnailImageParams = {
  mappingImageTypeToImageSize?: MappingImageTypeToImageSize;
  isThumbnail?: false;
  imageType: ImageType;
  image: string;
};

type GetImageURIParams = ThumbnailImageParams | NonThumbnailImageParams;

export const getImageURI = (params: GetImageURIParams) => {
  if (params.isThumbnail) {
    return `${THUMBNAIL_URL}${params.image}`;
  }
  if (params.mappingImageTypeToImageSize) {
    return `${BASE_URL}/${
      params.mappingImageTypeToImageSize[params.imageType]
    }${params.image}`;
  }
};
