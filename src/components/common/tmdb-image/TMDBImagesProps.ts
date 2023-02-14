import * as Types from '@local-types';

export type TMDBAImageProps = {
  imageType: Types.ImageType;
  isThumbnail?: boolean;
  onError?: () => void;
  onLoad?: () => void;
  testID?: string;
  image: string;
};
