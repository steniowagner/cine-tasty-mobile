export type ImageQualities = 'low' | 'medium' | 'high' | 'veryHigh';

export type DeviceScreenClassification =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

export type ImageType = 'backdrop' | 'poster' | 'still' | 'profile';

export type MappingImageTypeToImageSize = {
  poster: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'orginal';
  backdrop: 'w300' | 'w780' | 'w1280' | 'original';
  still: 'w92' | 'w185' | 'w300' | 'original';
  profile: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
};
