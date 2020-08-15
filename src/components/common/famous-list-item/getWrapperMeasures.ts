import metrics from 'styles/metrics';

export const DEFAULT_LIST_ITEM_HEIGHT = metrics.getWidthFromDP('50%');

const getWrapperMeasures = (withMargin: boolean) => ({
  width: metrics.getWidthFromDP('30%'),
  height: DEFAULT_LIST_ITEM_HEIGHT,
  marginHorizontal: withMargin ? metrics.mediumSize : 0,
});

export default getWrapperMeasures;
