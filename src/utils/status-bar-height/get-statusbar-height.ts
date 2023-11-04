import { Platform, StatusBar } from 'react-native';

import { isEqualsOrLargerThanIphoneX } from '../is-equals-or-larger-than-iphonex/is-equals-or-larger-than-iphonex';

export const IOS_IPHONE_X_AND_ABOVE = 44;
export const IOS_BELOW_IPHONE_X = 20;

export const getStatusBarHeight = () => {
  if (isEqualsOrLargerThanIphoneX()) {
    return IOS_IPHONE_X_AND_ABOVE;
  }
  if (Platform.OS === 'ios') {
    return IOS_BELOW_IPHONE_X;
  }
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 0;
  }
  return 0;
};
