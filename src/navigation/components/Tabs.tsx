import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import * as Stacks from '@/components/stacks';

import { AndroidNavigationBar } from './AndroidNavigationBar.android';
import { TabNavigator } from './tab-navigator/TabNavigator';
import { Routes } from '../routes';
// import { WRAPPER_HEIGHT } from './tab-navigator/TabNavigator.styles';

const Tab = createBottomTabNavigator();

const TabBar = (props: BottomTabBarProps) => <TabNavigator {...props} />;

export const Tabs = () => (
  <>
    <Tab.Navigator
      initialRouteName={Routes.Tabs.QUIZ}
      // sceneContainerStyle={{
      //   paddingBottom: WRAPPER_HEIGHT,
      // }}
      tabBar={TabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen component={Stacks.HomeStack} name={Routes.Tabs.HOME} />
      <Tab.Screen component={Stacks.FamousStack} name={Routes.Tabs.FAMOUS} />
      <Tab.Screen component={Stacks.QuizStack} name={Routes.Tabs.QUIZ} />
      <Tab.Screen component={Stacks.NewsStack} name={Routes.Tabs.NEWS} />
    </Tab.Navigator>
    {Platform.OS === 'android' && <AndroidNavigationBar />}
  </>
);
