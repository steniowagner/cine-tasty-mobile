import { useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';

import * as Types from '@local-types';

type State = {
  screenClassification: Types.DeviceScreenClassification;
};

const { width, height } = Dimensions.get('window');

const useClassifyDeviceScreen = (): State => {
  const iOSScreenClassification = useMemo((): Types.DeviceScreenClassification => {
    if (width <= 320 && height <= 480) {
      return 'xsmall';
    }

    if (width <= 320 && height <= 568) {
      return 'small';
    }

    if (width <= 375 && height <= 667) {
      return 'medium';
    }

    if (width <= 414 && height <= 736) {
      return 'large';
    }

    return 'xlarge';
  }, []);

  const androidScreenClassification = useMemo((): Types.DeviceScreenClassification => {
    if (height >= 960 && width >= 720) {
      return 'xlarge';
    }

    if (height >= 640 && width >= 480) {
      return 'large';
    }

    if (height >= 470 && width >= 320) {
      return 'medium';
    }

    if (height >= 426 && width >= 320) {
      return 'small';
    }

    return 'xsmall';
  }, []);

  return {
    screenClassification: Platform.select({
      android: androidScreenClassification,
      ios: iOSScreenClassification,
    }),
  };
};

export default useClassifyDeviceScreen;
