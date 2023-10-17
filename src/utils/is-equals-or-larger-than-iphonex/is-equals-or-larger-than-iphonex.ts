import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const IPHONEX_WIDTH = 375;
const IPHONEX_HEIGHT = 812;

export const isEqualsOrLargerThanIphoneX = () => {
  const isLargestThanIphoneXInPortraitMode =
    height >= IPHONEX_HEIGHT && width >= IPHONEX_WIDTH;
  const isLargestThanIphoneXInLandscapeMode =
    height >= IPHONEX_WIDTH && width >= IPHONEX_HEIGHT;
  return (
    Platform.OS === 'ios' &&
    (isLargestThanIphoneXInPortraitMode || isLargestThanIphoneXInLandscapeMode)
  );
};
