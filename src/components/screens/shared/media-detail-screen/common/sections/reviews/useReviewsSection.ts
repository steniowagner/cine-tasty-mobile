import { useCallback, useState, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

const useReviewsSection = () => {
  const [indexReviewSelected, setIndexReviewSelected] = useState<number>(0);

  const { t } = useTranslation();

  const flatListRef = useRef<FlatList<any>>();

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const { contentOffset } = event.nativeEvent;

      const isHorizontalSwipeMovement = contentOffset.x > 0;

      const currentReviewIndex = isHorizontalSwipeMovement
        ? Math.ceil(contentOffset.x / metrics.width)
        : 0;

      setIndexReviewSelected(currentReviewIndex);
    },
    [],
  );

  return {
    sectionTitle: t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_REVIEW),
    indexReviewSelected,
    onMomentumScrollEnd,
    flatListRef,
  };
};

export default useReviewsSection;
