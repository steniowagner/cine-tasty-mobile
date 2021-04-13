import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import TabNavigator from '@components/utils/tab-navigator/TabNavigator';

import HomeStack, {
  TabID as HomeTabID,
} from '@components/screens/home/routes/stack-routes';

import FamousStack, {
  TabID as FamousTabID,
} from '@components/screens/famous/routes/stack-routes';

import QuizStack, {
  TabID as QuizTabID,
} from '@components/screens/quiz/routes/stack-routes';

import NewsStack, {
  TabID as NewsTabID,
} from '@components/screens/news/routes/stack-routes';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName={HomeTabID}
    tabBar={(props: BottomTabBarProps) => (
      <TabNavigator
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )}
  >
    <Tab.Screen
      component={HomeStack}
      name={HomeTabID}
    />
    <Tab.Screen
      component={FamousStack}
      name={FamousTabID}
    />
    <Tab.Screen
      component={QuizStack}
      name={QuizTabID}
    />
    <Tab.Screen
      component={NewsStack}
      name={NewsTabID}
    />
  </Tab.Navigator>
);

export default Tabs;
