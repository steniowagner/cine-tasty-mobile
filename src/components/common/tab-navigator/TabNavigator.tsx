import React, { Suspense } from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../../utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';
import TabNavigatorItem from './TabNavigatorItem';
import metrics from '../../../styles/metrics';
import items from './items';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%') + (isEqualsOrLargestThanIphoneX() ? 30 : 0)}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: ${isEqualsOrLargestThanIphoneX() ? 30 : 0}px;
`;

const ITEM_WIDTH = metrics.width / items.length;

const TabNavigator = ({ navigation, state }: BottomTabBarProps) => {
  const { t } = useTranslation();

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
