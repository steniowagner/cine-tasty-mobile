import {DefaultTheme} from 'styled-components/native';

import metrics from '@styles/metrics';

const headerTitleStyle = {
  fontSize: metrics.extraLargeSize,
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

export const checkIsHomeStack = (route: string) => route.match(/HOME/gi);
