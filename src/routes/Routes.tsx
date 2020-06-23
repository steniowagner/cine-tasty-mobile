import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, withTheme } from 'styled-components';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { ThemeID } from 'types';

import TabNavigator from 'components/utils/tab-navigator/TabNavigator';

import DiscoverStack, {
  TabID as DiscoverTabID,
} from 'components/screens/discover/routes/stack-routes';

import PeopleStack, {
  TabID as PeopleTabID,
} from 'components/screens/people/routes/stack-routes';

import QuizStack, {
  TabID as QuizTabID,
} from 'components/screens/quiz/routes/stack-routes';

import NewsStack, {
  TabID as NewsTabID,
} from 'components/screens/news/routes/stack-routes';

const Tab = createBottomTabNavigator();

type Props = {
  theme: DefaultTheme;
};

const Routes = ({ theme }: Props) => (
  <>
    <StatusBar
      barStyle={theme.id === ThemeID.DARK ? 'light-content' : 'dark-content'}
      backgroundColor={theme.colors.secondary}
      animated
    />
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          background: theme.colors.background,
          card: theme.colors.secondary,
          primary: theme.colors.text,
          border: theme.colors.text,
          text: theme.colors.text,
        },
      }}
    >
      <Tab.Navigator
        initialRouteName={PeopleTabID}
        tabBar={(props: BottomTabBarProps) => (
          <TabNavigator
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )}
      >
        <Tab.Screen
          component={DiscoverStack}
          name={DiscoverTabID}
        />
        <Tab.Screen
          component={PeopleStack}
          name={PeopleTabID}
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
    </NavigationContainer>
  </>
);

export default withTheme(Routes);
