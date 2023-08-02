import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import {TabNavigatorItem} from './tab-navigator-item/TabNavigatorItem';
import * as Styles from './TabNavigator.styles';
import useTabNavigator from './useTabNavigator';
import items from './items';

const ITEM_WIDTH = metrics.width / items.length;

const TabNavigator = (props: BottomTabBarProps) => {
  const {shouldShowTabNavigator, tabTitles, t} = useTabNavigator(props);

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
      }}>
      {items.map((item, index) => (
        <TabNavigatorItem
          onPress={() =>
            props.navigation.navigate(props.state.routeNames[index])
          }
          title={t(`${TRANSLATIONS.TABS}:${tabTitles[index].toLowerCase()}`)}
          isSelected={index === props.state.index}
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
