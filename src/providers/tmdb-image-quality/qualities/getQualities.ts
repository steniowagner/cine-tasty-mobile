import { getItemFromStorage } from '@utils/async-storage-adapter/AsyncStorageAdapter';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

import xsmall from './xsmall';
import small from './small';
import medium from './medium';
import large from './large';
import xlarge from './xlarge';

const classifications = {
  xsmall,
  small,
  medium,
  large,
  xlarge,
};

const getQualitiesBasedScreenClassification = (
  screenClassification: Types.DeviceScreenClassification,
) => classifications[screenClassification];

const getImageQualityFromStore = async (): Promise<Types.ImageQualities> => {
  const imageQualityFromStore = await getItemFromStorage<
    Types.ImageQualities,
    Types.ImageQualities
  >(CONSTANTS.KEYS.IMAGES_QUALITY, 'medium');

  return imageQualityFromStore;
};

const getQualities = async (screenClassification: Types.DeviceScreenClassification) => {
  const qualitiesBasedScreenClassification = getQualitiesBasedScreenClassification(
    screenClassification,
  );

  const imageQualityFromStore = await getImageQualityFromStore();

  return qualitiesBasedScreenClassification[imageQualityFromStore];
};

export default getQualities;
