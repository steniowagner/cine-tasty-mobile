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
