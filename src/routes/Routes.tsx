import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import DiscoverStack, {
  TabID as DiscoverTabID,
} from 'components/screens/home/routes/stack-routes';

import PeopleStack, {
  TabID as PeopleTabID,
} from 'components/screens/people/routes/stack-routes';

import QuizStack, {
  TabID as QuizTabID,
} from 'components/screens/quiz/routes/stack-routes';

import NewsStack, {
  TabID as NewsTabID,
} from 'components/screens/news/routes/stack-routes';

import TabNavigator from 'components/utils/tab-navigator/TabNavigator';

const Tab = createBottomTabNavigator();

const Routes = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName={QuizTabID}
      tabBar={(props: BottomTabBarProps) => (
        <TabNavigator
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      )}
    >
      <Tab.Screen
        name={DiscoverTabID}
        component={DiscoverStack}
      />
      <Tab.Screen
        name={PeopleTabID}
        component={PeopleStack}
      />
      <Tab.Screen
        name={QuizTabID}
        component={QuizStack}
      />
      <Tab.Screen
        name={NewsTabID}
        component={NewsStack}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Routes;
