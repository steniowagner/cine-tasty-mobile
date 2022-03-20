import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const IPHONEX_WIDTH = 375;
const IPHONEX_HEIGHT = 812;

export const isEqualsOrLargestThanIphoneX = (): boolean => {
  const isOrLargestThanIphoneXInPortraitMode =
    height >= IPHONEX_HEIGHT && width >= IPHONEX_WIDTH;
  const isOrLargestThanIphoneXInLandscapeMode =
    height >= IPHONEX_WIDTH && width >= IPHONEX_HEIGHT;

  return (
    Platform.OS === 'ios' &&
    (isOrLargestThanIphoneXInPortraitMode ||
      isOrLargestThanIphoneXInLandscapeMode)
  );
};
