import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { withTheme, DefaultTheme } from 'styled-components';
import { RouteProp } from '@react-navigation/native';

import metrics from 'styles/metrics';

import {TVShowSeasonsDetail1, TVShowSeasonsDetail2, TVShowSeasonsDetail3} from '../components/tv-show-seasons-detail/TVShowSeasonsDetail';
import { TVShowSeasonsNavigationParams } from './route-params-types';
import LOCAL_ROUTES from './route-names';

type Props = {
  route: TVShowSeasonsNavigationParams;
  theme: DefaultTheme;
};

const Tab = createMaterialTopTabNavigator();

/* const buildSeasonsTabs = (numberOfSeasons: number) => (
  <Tab.Navigator>
    {Array(numberOfSeasons).fill({}).map((_, index) => (
      <Tab.Screen key={index} name={`TVShowSeason-${index}`} component={TVShowSeasonDetail} />
    ))}
  </Tab.Navigator>
); */

const Stack = createStackNavigator();

const TVShowSeasonsDetail = ({ route, theme }: Props) => {
  //  const SeasonTabs = buildSeasonsTabs(3);
  const numberOfSeasons = 3;
  const SeasonTabs = () => (
    <Tab.Navigator
      initialRouteName="Feed"
      initialLayout={{ width: metrics.width, height: metrics.height }}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={TVShowSeasonsDetail1}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Notifications"
        component={TVShowSeasonsDetail2}
        options={{ tabBarLabel: 'Updates' }}
      />
      <Tab.Screen
        name="Profile"
        component={TVShowSeasonsDetail3}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator
      headerMode="screen"
    >
      <Stack.Screen
        name={LOCAL_ROUTES.TV_SHOW_SEASONS.id}
        component={SeasonTabs}
      />
    </Stack.Navigator>
  )
};

export const SCREEN_ID = 'TV_SHOW_SEASONS';

export default withTheme(TVShowSeasonsDetail);
