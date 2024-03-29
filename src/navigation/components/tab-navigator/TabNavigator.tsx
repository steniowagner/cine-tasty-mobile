import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabNavigatorItem } from './tab-navigator-item/TabNavigatorItem';
import * as Styles from './TabNavigator.styles';
import { useTabNavigator } from './use-tab-navigator';

export const TabNavigator = (props: BottomTabBarProps) => {
  const tabNavigator = useTabNavigator(props);

  return (
    <Styles.Wrapper testID="tab-wrapper" style={tabNavigator.animatedStyle}>
      {tabNavigator.tabs.map((item, index) => (
        <TabNavigatorItem
          onPress={() =>
            props.navigation.navigate(props.state.routeNames[index])
          }
          title={item.title}
          isSelected={index === props.state.index}
          inactiveIcon={item.inactiveIcon}
          activeIcon={item.activeIcon}
          key={item.id}
        />
      ))}
    </Styles.Wrapper>
  );
};
