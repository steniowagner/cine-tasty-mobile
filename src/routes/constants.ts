import { DefaultTheme } from 'styled-components';

import metrics from 'styles/metrics';

export const getDefaultHeaderOptions = (theme: DefaultTheme) => ({
  headerTitleStyle: {
    fontSize: metrics.getWidthFromDP('5.5%'),
    fontFamily: 'CircularStd-Bold',
    fontWeight: undefined,
  },
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.text,
  headerStyle: {
    backgroundColor: theme.colors.secondary,
    shadowColor: 'transparent',
    elevation: 0,
  },
});
