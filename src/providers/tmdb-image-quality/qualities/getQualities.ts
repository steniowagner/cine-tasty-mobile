import { getItemFromStorage } from 'utils/async-storage-adapter/AsyncStorageAdapter';
import { DeviceScreenClassification, ImageQualities, ImagesTypes } from 'types';
import CONSTANTS from 'utils/constants';

import xsmall from './xsmall';
import small from './small';
import medium from './medium';
import large from './large';
import xlarge from './xlarge';

const getQualitiesBasedScreenClassification = (
  screenClassification: DeviceScreenClassification,
) => {
  const classifications = {
    xsmall,
    small,
    medium,
    large,
    xlarge,
  };

  return classifications[screenClassification];
};

const getImageQualityFromStore = async (): Promise<ImageQualities> => {
  const imageQualityFromStore = await getItemFromStorage<ImageQualities, ImageQualities>(
    CONSTANTS.KEYS.IMAGES_QUALITY,
    'medium',
  );

  return imageQualityFromStore;
};

const getQualities = async (
  screenClassification: DeviceScreenClassification,
): Promise<Record<ImagesTypes, string>> => {
  const qualitiesBasedScreenClassification = getQualitiesBasedScreenClassification(
    screenClassification,
  );

  const imageQualityFromStore = await getImageQualityFromStore();

  return qualitiesBasedScreenClassification[imageQualityFromStore];
};

export default getQualities;
