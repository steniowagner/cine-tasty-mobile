import {Platform} from 'react-native';

import * as Types from '@local-types';
import metrics from '@styles/metrics';

import xsmall from './qualities/xsmall';
import small from './qualities/small';
import medium from './qualities/medium';
import large from './qualities/large';
import xlarge from './qualities/xlarge';

const makeIOSScreenSizeClassification =
  (): Types.DeviceScreenClassification => {
    if (metrics.width <= 320 && metrics.height <= 480) {
      return 'xsmall';
    }
    if (metrics.width <= 320 && metrics.height <= 568) {
      return 'small';
    }
    if (metrics.width <= 375 && metrics.height <= 667) {
      return 'medium';
    }
    if (metrics.width <= 414 && metrics.height <= 736) {
      return 'large';
    }
    return 'xlarge';
  };

const makeAndroidScreenSizeClassification =
  (): Types.DeviceScreenClassification => {
    if (metrics.height >= 960 && metrics.width >= 720) {
      return 'xlarge';
    }
    if (metrics.height >= 640 && metrics.width >= 480) {
      return 'large';
    }
    if (metrics.height >= 470 && metrics.width >= 320) {
      return 'medium';
    }
    if (metrics.height >= 426 && metrics.width >= 320) {
      return 'small';
    }
    return 'xsmall';
  };

export const classifyScreenSize = () => {
  const screenClassification = Platform.select({
    android: makeAndroidScreenSizeClassification(),
    ios: makeIOSScreenSizeClassification(),
  });
  const classifications = {
    xsmall,
    small,
    medium,
    large,
    xlarge,
  };
  return classifications[screenClassification];
};
