import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import * as Screens from '@screens';

import { AndroidNavigationBar } from './AndroidNavigationBar.android';
import { TabNavigator } from './tab-navigator/TabNavigator';
import { Routes } from '../routes';

const Tab = createBottomTabNavigator();

const TabBar = (props: BottomTabBarProps) => <TabNavigator {...props} />;

export const Tabs = () => (
  <>
    <Tab.Navigator
      initialRouteName={Routes.Tabs.QUIZ}
      tabBar={TabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen component={Screens.HomeStack} name={Routes.Tabs.HOME} />
      <Tab.Screen component={Screens.FamousStack} name={Routes.Tabs.FAMOUS} />
      <Tab.Screen component={Screens.QuizStack} name={Routes.Tabs.QUIZ} />
      <Tab.Screen component={Screens.NewsStack} name={Routes.Tabs.NEWS} />
    </Tab.Navigator>
    {Platform.OS === 'android' && <AndroidNavigationBar />}
  </>
);
