import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, withTheme } from 'styled-components';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import SearchStack, {
  StackID as SearchStackID,
} from 'components/screens/shared/search/routes/stack-routes';

import ImagesGalleryModal, {
  MODAL_ID as IMAGES_GALLERY_MODAL_ID,
} from 'components/screens/shared/images-gallery/routes/stack-routes';

import TabNavigator from 'components/utils/tab-navigator/TabNavigator';
import { ThemeID } from 'types';

import DiscoverStack, {
  TabID as DiscoverTabID,
} from 'components/screens/discover/routes/stack-routes';

import FamousStack, {
  TabID as FamousTabID,
} from 'components/screens/famous/routes/stack-routes';

import QuizStack, {
  TabID as QuizTabID,
} from 'components/screens/quiz/routes/stack-routes';

import NewsStack, {
  TabID as NewsTabID,
} from 'components/screens/news/routes/stack-routes';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName={FamousTabID}
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

const RootStack = createStackNavigator();

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
      <RootStack.Navigator
        screenOptions={{ animationEnabled: false }}
        mode="modal"
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          component={Tabs}
          name="Tabs"
        />
        <RootStack.Screen
          options={{ headerShown: false, animationEnabled: true }}
          component={SearchStack}
          name={SearchStackID}
        />
        <RootStack.Screen
          options={{ headerShown: false, animationEnabled: true }}
          component={ImagesGalleryModal}
          name={IMAGES_GALLERY_MODAL_ID}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </>
);

export default withTheme(Routes);
