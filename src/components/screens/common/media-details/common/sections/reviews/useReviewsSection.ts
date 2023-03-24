import {useCallback, useState, useRef, useMemo} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent, FlatList} from 'react-native';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import metrics from '@styles/metrics';

export const REVIEWS_LENGTH = 3;

type UseReviewsSectionProps = {
  reviewsLength: number;
};

export const useReviewsSection = (props: UseReviewsSectionProps) => {
  const [indexReviewSelected, setIndexReviewSelected] = useState(0);
  const flatListRef = useRef<FlatList<any>>();

  const translations = useTranslations();

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const {contentOffset} = event.nativeEvent;
      const isHorizontalSwipeMovement = contentOffset.x > 0;
      const currentReviewIndex = isHorizontalSwipeMovement
        ? Math.ceil(contentOffset.x / metrics.width)
        : 0;
      setIndexReviewSelected(currentReviewIndex);
    },
    [],
  );

  const texts = useMemo(
    () => ({
      section: translations.translate(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_REVIEW,
      ),
    }),
    [translations.translate],
  );

  return {
    paginationDotsLenght: Math.min(props.reviewsLength, REVIEWS_LENGTH),
    indexReviewSelected,
    onMomentumScrollEnd,
    flatListRef,
    texts,
  };
};
