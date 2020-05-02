import React, { Suspense } from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import { Routes as DiscoverRoutes } from 'components/screens/discover/routes/route-names';
import { Routes as SettingsRoutes } from 'components/screens/settings/routes/route-names';
import { Routes as PeopleRoutes } from 'components/screens/people/routes/route-names';
import { Routes as QuizRoutes } from 'components/screens/quiz/routes/route-names';
import { Routes as NewsRoutes } from 'components/screens/news/routes/route-names';
import metrics from 'styles/metrics';

import TabNavigatorItem from './TabNavigatorItem';
import items from './items';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%') + (isEqualsOrLargestThanIphoneX() ? 30 : 0)}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${isEqualsOrLargestThanIphoneX() ? 30 : 0}px;
`;

const ITEM_WIDTH = metrics.width / items.length;

type BlacklistScreens =
  | DiscoverRoutes
  | QuizRoutes
  | NewsRoutes
  | PeopleRoutes
  | SettingsRoutes;

const blacklistScreens: BlacklistScreens[] = ['SETUP_QUESTIONS', 'QUESTIONS'];

const TabNavigator = ({ navigation, state }: BottomTabBarProps) => {
  const { t } = useTranslation();

  const checkShouldShowTabNavigator = (): boolean => {
    const currentTabState = state.routes[state.index].state;

    if (!currentTabState) {
      return true;
    }

    const { routes, index } = currentTabState;

    if (!index && typeof index !== 'number') {
      return false;
    }

    const { name } = routes[index];

    return !blacklistScreens.includes(name as BlacklistScreens);
  };

  const shouldShowTabNavigator = checkShouldShowTabNavigator();

  if (!shouldShowTabNavigator) {
    return null;
  }

  return (
    <Wrapper
      testID="tab-wrapper"
    >
      {items.map((item, index) => (
        <TabNavigatorItem
          onPress={() => navigation.navigate(state.routeNames[index])}
          title={t(`translations:tabs:${item.id.toLowerCase()}`)}
          isSelected={index === state.index}
          inactiveIcon={item.inactiveIcon}
          activeIcon={item.activeIcon}
          width={ITEM_WIDTH}
          key={item.id}
        />
      ))}
    </Wrapper>
  );
};

const TabNavigatorWrapper = (props: any) => (
  <Suspense
    fallback={<View />}
  >
    <TabNavigator
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </Suspense>
);

export default TabNavigatorWrapper;
