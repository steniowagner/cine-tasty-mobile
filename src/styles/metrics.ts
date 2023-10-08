import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const getWidthFromDP = (dp: string) =>
  PixelRatio.roundToNearestPixel((width * parseFloat(`${dp}%`)) / 100);

const getHeightFromDP = (dp: string) =>
  PixelRatio.roundToNearestPixel((height * parseFloat(`${dp}%`)) / 100);

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
