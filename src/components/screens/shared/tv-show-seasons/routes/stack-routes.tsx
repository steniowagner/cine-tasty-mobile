import React from 'react';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import TVShowSeasonsDetailScreen from '../components/tv-show-seasons-detail/TVShowSeasonsDetail';
import { TVShowSeasonsStackProps } from './route-params-types';

const Tab = createMaterialTopTabNavigator();

const getTabStyleWidth = (numberOfSeasons: number): number => {
  if (numberOfSeasons === 2) {
    return metrics.width / 2;
  }

  return metrics.width / 3;
};

const TVShowSeasonsDetailStack = (props: TVShowSeasonsStackProps) => {
  const { t } = useTranslation();

  if (props.route.params.numberOfSeasons === 1) {
    return (
      <>
        <StatusBar
          backgroundColor={props.theme.colors.primary}
          barStyle="dark-content"
          animated
        />
        <TVShowSeasonsDetailScreen
          // @ts-ignore
          route={{
            params: {
              id: props.route.params.id,
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
        backgroundColor={props.theme.colors.primary}
        barStyle="dark-content"
        animated
      />
      <Tab.Navigator
        initialLayout={{ width: metrics.width, height: metrics.height }}
        tabBarOptions={{
          activeTintColor: props.theme.colors.buttonText,
          style: {
            backgroundColor: props.theme.colors.primary,
          },
          indicatorStyle: {
            backgroundColor: props.theme.colors.buttonText,
            height: props.theme.metrics.extraSmallSize,
          },
          labelStyle: {
            fontSize: props.theme.metrics.mediumSize * 1.2,
            fontFamily: 'CircularStd-Bold',
          },
          tabStyle: {
            width: getTabStyleWidth(props.route.params.numberOfSeasons),
          },
          scrollEnabled: true,
        }}
        lazyPreloadDistance={0}
        lazy
      >
        {Array(props.route.params.numberOfSeasons)
          .fill({})
          .map((_, index) => (
            <Tab.Screen
              component={TVShowSeasonsDetailScreen}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name={`${t(
                TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_SEASON,
              )} ${index + 1}`}
              initialParams={{
                id: props.route.params.id,
                season: index + 1,
              }}
            />
          ))}
      </Tab.Navigator>
    </>
  );
};

export default withTheme(TVShowSeasonsDetailStack);
