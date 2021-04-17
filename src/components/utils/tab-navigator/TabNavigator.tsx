import React, { useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { Routes as FamousRoutes } from '@components/screens/famous/routes/route-names';
import { Routes as HomeRoutes } from '@components/screens/home/routes/route-names';
import { Routes as QuizRoutes } from '@components/screens/quiz/routes/route-names';
import { Routes as NewsRoutes } from '@components/screens/news/routes/route-names';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import TabNavigatorItem from './tab-navigator-item/TabNavigatorItem';
import * as Styles from './TabNavigator.styles';
import items from './items';

const ITEM_WIDTH = metrics.width / items.length;

type ScreenAbleToShowTabNavigation = HomeRoutes | QuizRoutes | NewsRoutes | FamousRoutes;

const screensAbleToShowTabNavigator: ScreenAbleToShowTabNavigation[] = [
  'HOME',
  'FAMOUS',
  'QUIZ',
  'NEWS',
];

const TabNavigator = ({ navigation, state }: BottomTabBarProps) => {
  const { t } = useTranslation();

  const shouldShowTabNavigator = useMemo((): boolean => {
    const currentTabState = state.routes[state.index].state;

    if (!currentTabState) {
      return true;
    }

    const { routes, index } = currentTabState;

    if (!index && typeof index !== 'number') {
      return false;
    }

    const { name } = routes[index];

    return screensAbleToShowTabNavigator.includes(name as ScreenAbleToShowTabNavigation);
  }, [state]);

  if (!shouldShowTabNavigator) {
    return null;
  }

  return (
    <Styles.Wrapper
      testID="tab-wrapper"
      style={{
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {items.map((item, index) => (
        <TabNavigatorItem
          onPress={() => navigation.navigate(state.routeNames[index])}
          title={t(`${TRANSLATIONS.TABS}:${item.id.toLowerCase()}`)}
          isSelected={index === state.index}
          inactiveIcon={item.inactiveIcon}
          activeIcon={item.activeIcon}
          width={ITEM_WIDTH}
          key={item.id}
        />
      ))}
    </Styles.Wrapper>
  );
};

export default TabNavigator;
