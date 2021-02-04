import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const getWidthFromDP = (widthPercentage: string): number => {
  const percentageDesired = parseFloat(widthPercentage);

  const widthPercentageToDP = PixelRatio.roundToNearestPixel(
    (width * percentageDesired) / 100,
  );

  return widthPercentageToDP;
};

const getHeightFromDP = (heightPercentage: string): number => {
  const percentageDesired = parseFloat(heightPercentage);

  const heightPercentageToDP = PixelRatio.roundToNearestPixel(
    (height * percentageDesired) / 100,
  );

  return heightPercentageToDP;
};

export default {
  navigationHeaderFontSize: Platform.OS === 'ios' ? 17 : 19,
  extraSmallSize: getWidthFromDP('1%'),
  smallSize: getWidthFromDP('2%'),
  mediumSize: getWidthFromDP('3%'),
  largeSize: getWidthFromDP('4%'),
  extraLargeSize: getWidthFromDP('5%'),
  getWidthFromDP,
  getHeightFromDP,
  width,
  height,
};
