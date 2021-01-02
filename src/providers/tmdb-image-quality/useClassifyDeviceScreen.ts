import { useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';

import { DeviceScreenHeight } from 'types';

type State = {
  screenClassification: DeviceScreenHeight;
};

const { width, height } = Dimensions.get('window');

const useClassifyDeviceScreen = (): State => {
  const iOSScreenClassification = useMemo((): DeviceScreenHeight => {
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

  const androidScreenClassification = useMemo((): DeviceScreenHeight => {
    if (width >= 960 && height >= 720) {
      return 'xlarge';
    }

    if (width >= 640 && height >= 480) {
      return 'large';
    }

    if (width >= 470 && height >= 320) {
      return 'medium';
    }

    if (width >= 426 && height >= 320) {
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
