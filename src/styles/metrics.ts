import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const getWidthFromDP = (px: string) =>
  PixelRatio.roundToNearestPixel((width * parseFloat(px)) / 100);

const getHeightFromDP = (heightPercentage: string) =>
  PixelRatio.roundToNearestPixel((height * parseFloat(heightPercentage)) / 100);

export default {
  navigationHeaderFontSize: Platform.OS === 'ios' ? 17 : 19,
  xs: getWidthFromDP('1'),
  sm: getWidthFromDP('2'),
  md: getWidthFromDP('3'),
  lg: getWidthFromDP('4'),
  xl: getWidthFromDP('5'),
  getWidthFromDP,
  getHeightFromDP,
  width,
  height,
};
