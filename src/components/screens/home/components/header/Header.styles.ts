import { TouchableOpacity, Platform, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '@utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import CONSTANTS from '@utils/constants';

export const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    theme.colors.background,
    theme.colors.backgroundAlphax1,
    theme.colors.backgroundAlphax2,
    theme.colors.backgroundAlphax3,
    theme.colors.backgroundAlphax4,
    theme.colors.backgroundAlphax5,
  ],
}))`
  width: 100%;
  height: 15%;
`;

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => Platform.select({
    ios: isEqualsOrLargestThanIphoneX()
      ? theme.metrics.getWidthFromDP('12%')
      : theme.metrics.getWidthFromDP('7%'),
    android: theme.metrics.mediumSize,
  })}px;
  padding-bottom: ${({ theme }) => Platform.select({
    ios: theme.metrics.largeSize,
    android: theme.metrics.mediumSize,
  })}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SettingsButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
