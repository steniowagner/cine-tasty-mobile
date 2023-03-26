import React from 'react';
import {StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {dark as theme} from '@styles/themes';
import metrics from '@styles/metrics';

import {TVShowSeasonsProps} from '../../routes/route-params-types';
import {useSeasonsDetailsTabs} from './useSeasonsDetailsTabs';
import {SeasonsDetails} from '../SeasonsDetails';

const Tab = createMaterialTopTabNavigator();

export const SeasonsDetailsTabs = (props: TVShowSeasonsProps) => {
  const seasonsDetailsTabs = useSeasonsDetailsTabs(props.route.params);

  if (props.route.params.numberOfSeasons === 1) {
    return (
      <>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
          animated
        />
        <SeasonsDetails
          season={1}
          id={props.route.params.id}
          tvShowTitle={props.route.params.title}
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
        initialLayout={{width: metrics.width, height: metrics.height}}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.buttonText,
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.buttonText,
            height: theme.metrics.extraSmallSize,
          },
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            fontSize: theme.metrics.mediumSize * 1.05,
            fontFamily: 'CircularStd-Bold',
          },
          tabBarItemStyle: {
            width: seasonsDetailsTabs.tabItemWidth,
          },
          lazy: true,
        }}>
        {Array(props.route.params.numberOfSeasons)
          .fill({})
          .map((_, index) => (
            <Tab.Screen
              key={index}
              options={{
                tabBarLabel: `${seasonsDetailsTabs.texts.tabBarLabel} ${
                  index + 1
                }`,
              }}
              name={`${seasonsDetailsTabs.texts.tabBarLabel}-${index + 1}`}
              initialParams={{
                tvShowTitle: props.route.params.title,
                id: props.route.params.id,
                season: index + 1,
              }}>
              {() => (
                <SeasonsDetails
                  tvShowTitle={props.route.params.title}
                  season={index + 1}
                  id={props.route.params.id}
                />
              )}
            </Tab.Screen>
          ))}
      </Tab.Navigator>
    </>
  );
};
