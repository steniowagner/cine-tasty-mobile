import { Platform } from 'react-native';
import { DefaultTheme } from 'styled-components';

import metrics from '@styles/metrics';

const headerTitleStyle = {
  fontSize: Platform.select({
    ios: metrics.getWidthFromDP('5.3%'),
    android: metrics.getWidthFromDP('5.3%'),
  }),
  fontFamily: 'CircularStd-Bold',
  fontWeight: undefined,
};

export const DEFAULT_HEADER_OPTIONS = {
  headerTitleStyle,
  headerBackTitleVisible: false,
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
  },
};

export const getTransparentHeaderOptions = (theme: DefaultTheme) => ({
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerTintColor: theme.colors.text,
  title: '',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
  },
});
