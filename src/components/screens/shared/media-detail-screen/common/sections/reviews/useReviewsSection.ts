import { useCallback, useState, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import metrics from 'styles/metrics';

type State = {
  onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  flatListRef: React.MutableRefObject<FlatList<any>>;
  indexReviewSelected: number;
  sectionTitle: string;
};

const useReviewsSection = (): State => {
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
    sectionTitle: t('translations:mediaDetail:sections:reviews'),
    indexReviewSelected,
    onMomentumScrollEnd,
    flatListRef,
  };
};

export default useReviewsSection;
