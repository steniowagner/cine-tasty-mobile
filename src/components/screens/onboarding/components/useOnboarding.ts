import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  FlatList,
} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { Icons } from '@components/common/svg-icon/icons';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import { OnboardingStackRouteProp } from '../routes/route-params-types';

type OnboardingItem = {
  description: string;
  onPress: () => void;
  buttonTitle: string;
  title: string;
  icon: Icons;
};

type UseOnboardingProps = {
  route: OnboardingStackRouteProp;
};

const useOnboarding = ({ route }: UseOnboardingProps) => {
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const flatlistRef = useRef<FlatList>(null);

  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor(theme.colors.primary, true, true);
    }
  }, []);

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
        buttonTitle: t(TRANSLATIONS.ONBOARDING_NEXT),
        description: t(TRANSLATIONS.ONBOARDING_CINEMA_DESCRIPTION),
        title: t(TRANSLATIONS.ONBOARDING_CINEMA_TITLE),
        onPress: () => setIndexSelected(1),
        icon: 'video-vintage',
      },
      {
        buttonTitle: t(TRANSLATIONS.ONBOARDING_NEXT),
        description: t(TRANSLATIONS.ONBOARDING_FAMOUS_DESCRIPTION),
        title: t(TRANSLATIONS.ONBOARDING_FAMOUS_TITLE),
        onPress: () => setIndexSelected(2),
        icon: 'famous-active',
      },
      {
        buttonTitle: t(TRANSLATIONS.ONBOARDING_NEXT),
        description: t(TRANSLATIONS.ONBOARDING_QUIZ_DESCRIPTION),
        title: t(TRANSLATIONS.ONBOARDING_QUIZ_TITLE),
        onPress: () => setIndexSelected(3),
        icon: 'quiz-active',
      },
      {
        buttonTitle: t(TRANSLATIONS.ONBOARDING_START),
        description: t(TRANSLATIONS.ONBOARDING_NEWS_DESCRIPTION),
        title: t(TRANSLATIONS.ONBOARDING_NEWS_TITLE),
        onPress: () => route.params.onFinishShowOnboarding(),
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
