import { useEffect, useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Extrapolate,
} from 'react-native-reanimated';

import { useTranslation } from '@hooks';
import { Translations } from '@i18n/tags';

import { WRAPPER_HEIGHT } from './TabNavigator.styles';
import { Routes } from '../../routes';
import items from './tabs';

export const ANIMATION_DURATION = 250;

export const useTabNavigator = (props: BottomTabBarProps) => {
  const tabNavigatorPosition = useSharedValue(1);
  const translations = useTranslation();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          tabNavigatorPosition.value,
          [0, 1],
          [WRAPPER_HEIGHT, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const shouldShowTabNavigator = useMemo(() => {
    const screensAbleToShowTabNavigator: string[] = [
      Routes.Home.HOME,
      Routes.Famous.FAMOUS,
      Routes.Quiz.QUIZ,
      Routes.News.NEWS,
    ];
    const currentTabState = props.state.routes[props.state.index].state;
    if (!currentTabState) {
      return true;
    }
    if (!currentTabState.index && typeof currentTabState.index !== 'number') {
      return false;
    }
    const { name } = currentTabState.routes[currentTabState.index];
    return screensAbleToShowTabNavigator.includes(name);
  }, [props.state]);

  const tabs = useMemo(() => {
    const tabTitles = items.map(item => {
      const [, , title] = item.id.split('/');
      return title;
    });
    return items.map((item, index) => ({
      ...item,
      title: translations.translate(
        `${Translations.Tabs}:${tabTitles[
          index
        ].toLowerCase()}` as Translations.Tabs,
      ),
    }));
  }, []);

  useEffect(() => {
    tabNavigatorPosition.value = withTiming(Number(shouldShowTabNavigator), {
      duration: ANIMATION_DURATION,
    });
  }, [shouldShowTabNavigator]);

  return {
    shouldShowTabNavigator,
    animatedStyle,
    tabs,
  };
};
