import React, { useMemo } from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import { Routes as FamousRoutes } from 'components/screens/famous/routes/route-names';
import { Routes as HomeRoutes } from 'components/screens/home/routes/route-names';
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
    <Wrapper
      testID="tab-wrapper"
    >
      {items.map((item, index) => (
        <TabNavigatorItem
          onPress={() => navigation.navigate(state.routeNames[index])}
          title={t(`translations:tabs:${item.id.toLowerCase()}`)}
          isSelected={index === state.index}
          width={ITEM_WIDTH}
          icon={item.icon}
          key={item.id}
        />
      ))}
    </Wrapper>
  );
};

export default TabNavigator;
