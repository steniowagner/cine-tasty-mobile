import React from 'react';
import {Platform} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import AndroidNavigationBar from '@components/utils/AndroidNavigationBar.android';
import FamousStack from '@components/screens/famous/routes/stack-routes';
import TabNavigator from '@components/utils/tab-navigator/TabNavigator';
import HomeStack from '@components/screens/home/routes/stack-routes';
import QuizStack from '@components/screens/quiz/routes/stack-routes';
import NewsStack from '@components/screens/news/routes/stack-routes';
import {Routes} from '@routes/routes';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <>
    <Tab.Navigator
      initialRouteName={Routes.Tabs.FAMOUS}
      tabBar={(props: BottomTabBarProps) => (
        <TabNavigator
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen component={HomeStack} name={Routes.Tabs.HOME} />
      <Tab.Screen component={FamousStack} name={Routes.Tabs.FAMOUS} />
      <Tab.Screen component={QuizStack} name={Routes.Tabs.QUIZ} />
      <Tab.Screen component={NewsStack} name={Routes.Tabs.NEWS} />
    </Tab.Navigator>
    {Platform.OS === 'android' && <AndroidNavigationBar />}
  </>
);

export default Tabs;
