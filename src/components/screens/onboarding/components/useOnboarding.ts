import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';

import { Icons } from '@components/common/svg-icon/icons';

import metrics from '@styles/metrics';

type OnboardingItem = {
  description: string;
  onPress: () => void;
  buttonTitle: string;
  title: string;
  icon: Icons;
};

const useOnboarding = () => {
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!flatlistRef) {
      return;
    }

    flatlistRef.current.scrollToIndex({
      index: indexSelected,
      animated: true,
    });
  }, [indexSelected]);

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;

      const isHorizontalSwipeMovement = contentOffset.x > 0;

      const currentPageIndex = isHorizontalSwipeMovement
        ? Math.ceil(contentOffset.x / metrics.width)
        : 0;

      setIndexSelected(currentPageIndex);
    },
    [],
  );

  const items: OnboardingItem[] = useMemo(
    () => [
      {
        title: 'Item 01',
        description: 'Description 01',
        onPress: () => setIndexSelected(1),
        buttonTitle: 'Next',
        icon: 'video-vintage',
      },
      {
        title: 'Item 02',
        description: 'Description 02',
        onPress: () => setIndexSelected(2),
        buttonTitle: 'Next',
        icon: 'famous-active',
      },
      {
        title: 'Item 03',
        description: 'Description 03',
        onPress: () => console.warn('navigate'),
        buttonTitle: "Let's go!",
        icon: 'news-active',
      },
    ],
    [],
  );

  return {
    onMomentumScrollEnd,
    indexSelected,
    flatlistRef,
    items,
  };
};

export default useOnboarding;
