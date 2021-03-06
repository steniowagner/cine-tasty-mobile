import { useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';

import { DeviceScreenClassification } from 'types';

type State = {
  screenClassification: DeviceScreenClassification;
};

const { width, height } = Dimensions.get('window');

const useClassifyDeviceScreen = (): State => {
  const iOSScreenClassification = useMemo((): DeviceScreenClassification => {
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

  const androidScreenClassification = useMemo((): DeviceScreenClassification => {
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
