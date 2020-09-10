import { DefaultTheme } from 'styled-components';

import metrics from 'styles/metrics';

export const getDefaultHeaderOptions = () => ({
  headerTitleStyle: {
    fontSize: metrics.getWidthFromDP('5.5%'),
    fontFamily: 'CircularStd-Bold',
    fontWeight: undefined,
  },
  headerBackTitleVisible: false,
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
  },
});

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
