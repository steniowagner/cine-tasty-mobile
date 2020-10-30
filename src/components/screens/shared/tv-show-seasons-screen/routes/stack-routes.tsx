import React from 'react';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { withTheme, DefaultTheme } from 'styled-components';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import metrics from 'styles/metrics';

import TVShowSeasonsDetailScreen from '../components/tv-show-seasons-detail/TVShowSeasonsDetail';
import { TVShowSeasonsStackParams } from './route-params-types';

const Tab = createMaterialTopTabNavigator();

const getTabStyleWidth = (numberOfSeasons: number): number => {
  if (numberOfSeasons === 2) {
    return metrics.width / 2;
  }

  return metrics.width / 3;
};

export type Props = {
  navigation: StackNavigationProp<TVShowSeasonsStackParams, 'TV_SHOW_SEASONS'>;
  route: RouteProp<TVShowSeasonsStackParams, 'TV_SHOW_SEASONS'>;
  theme: DefaultTheme;
};

const TVShowSeasonsDetail = ({ route, theme }: Props) => {
  const { t } = useTranslation();

  const { numberOfSeasons } = route.params;

  if (numberOfSeasons === 1) {
    return (
      <>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
          animated
        />
        <TVShowSeasonsDetailScreen
          // @ts-ignore
          route={{
            params: {
              id: route.params.id,
              season: 1,
            },
          }}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
        animated
      />
      <Tab.Navigator
        initialLayout={{ width: metrics.width, height: metrics.height }}
        tabBarOptions={{
          activeTintColor: theme.colors.buttonText,
          style: {
            backgroundColor: theme.colors.primary,
          },
          indicatorStyle: {
            backgroundColor: theme.colors.buttonText,
            height: theme.metrics.extraSmallSize,
          },
          labelStyle: {
            fontSize: theme.metrics.mediumSize * 1.2,
            fontFamily: 'CircularStd-Bold',
          },
          tabStyle: {
            width: getTabStyleWidth(numberOfSeasons),
          },
          scrollEnabled: true,
        }}
        lazyPreloadDistance={0}
        lazy
      >
        {Array(numberOfSeasons)
          .fill({})
          .map((_, index) => (
            <Tab.Screen
              component={TVShowSeasonsDetailScreen}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name={`${t(
                'translations:mediaDetail:tvShow:seasonEpisode:season',
              )} ${index + 1}`}
              initialParams={{
                id: route.params.id,
                season: index + 1,
              }}
            />
          ))}
      </Tab.Navigator>
    </>
  );
};

export const SCREEN_ID = 'TV_SHOW_SEASONS';

export default withTheme(TVShowSeasonsDetail);
