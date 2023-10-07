import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const getWidthFromDP = (px: string) =>
  PixelRatio.roundToNearestPixel((width * parseFloat(px)) / 100);

const getHeightFromDP = (heightPercentage: string) =>
  PixelRatio.roundToNearestPixel((height * parseFloat(heightPercentage)) / 100);

export default {
  navigationHeaderFontSize: Platform.OS === 'ios' ? 17 : 19,
  extraSmallSize: getWidthFromDP('1'),
  smallSize: getWidthFromDP('2'),
  mediumSize: getWidthFromDP('3'),
  largeSize: getWidthFromDP('4'),
  extraLargeSize: getWidthFromDP('5'),
  getWidthFromDP,
  getHeightFromDP,
  width,
  height,
};
