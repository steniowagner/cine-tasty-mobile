import {useCallback, useMemo} from 'react';
import {Platform} from 'react-native';
import metrics from '@styles/metrics';

import {DEFAULT_LIST_ITEM_HEIGHT} from './FamousList.styles';
import {NUMBER_OF_COLUMNS} from './FamousList';

type UseFamousListItemMeasures = {
  index: number;
};

export const useFamousListItemMeasures = (props: UseFamousListItemMeasures) => {
  const getWrapperMeasures = useCallback(
    (withMargin: boolean) => ({
      marginHorizontal: withMargin
        ? Platform.select({
            ios: metrics.getWidthFromDP('2.5%'),
            android: metrics.smallSize,
          })
        : 0,
      width: metrics.getWidthFromDP('30%'),
      height: DEFAULT_LIST_ITEM_HEIGHT,
    }),
    [],
  );

  const measures = useMemo(() => {
    const withMargin = props.index % NUMBER_OF_COLUMNS === 1;
    return getWrapperMeasures(withMargin);
  }, [props.index]);

  return {
    measures,
  };
};
