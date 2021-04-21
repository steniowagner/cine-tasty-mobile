import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Routes } from '@routes/routes';

import FamousStack from '@components/screens/famous/routes/stack-routes';
import TabNavigator from '@components/utils/tab-navigator/TabNavigator';
import HomeStack from '@components/screens/home/routes/stack-routes';
import QuizStack from '@components/screens/quiz/routes/stack-routes';
import NewsStack from '@components/screens/news/routes/stack-routes';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName={Routes.Home.HOME}
    tabBar={(props: BottomTabBarProps) => (
      <TabNavigator
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )}
  >
    <Tab.Screen
      component={HomeStack}
      name={Routes.Home.HOME}
    />
    <Tab.Screen
      component={FamousStack}
      name={Routes.Famous.FAMOUS}
    />
    <Tab.Screen
      component={QuizStack}
      name={Routes.Quiz.QUIZ}
    />
    <Tab.Screen
      component={NewsStack}
      name={Routes.News.NEWS}
    />
  </Tab.Navigator>
);

export default Tabs;
