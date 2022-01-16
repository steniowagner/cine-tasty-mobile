import { useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { Routes } from '@routes/routes';

import items from './items';

const screensAbleToShowTabNavigator: string[] = [
  Routes.Home.HOME,
  Routes.Famous.FAMOUS,
  Routes.Quiz.QUIZ,
  Routes.News.NEWS,
];

const useTabNavigator = ({ state }: BottomTabBarProps) => {
  const { t } = useTranslation();

  const shouldShowTabNavigator = useMemo(() => {
    const currentTabState = state.routes[state.index].state;

    if (!currentTabState) {
      return true;
    }

    const { routes, index } = currentTabState;

    if (!index && typeof index !== 'number') {
      return false;
    }

    const { name } = routes[index];

    return screensAbleToShowTabNavigator.includes(name);
  }, [state]);

  const tabTitles = useMemo(
    () => items.map((item) => {
      const [, title] = item.id.split('/');
      return title;
    }),
    [items],
  );

  return {
    shouldShowTabNavigator,
    tabTitles,
    t,
  };
};

export default useTabNavigator;
