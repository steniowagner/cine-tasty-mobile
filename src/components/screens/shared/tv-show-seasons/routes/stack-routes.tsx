import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';
import {Routes} from '@routes/routes';

import TVShowSeasonsDetailScreen from '../components/tv-show-seasons-detail/TVShowSeasonsDetail';
import {TVShowSeasonsStackProps} from './route-params-types';

const Tab = createMaterialTopTabNavigator();

const TVShowSeasonsDetailStack = ({route, theme}: TVShowSeasonsStackProps) => {
  const {t} = useTranslation();

  const {numberOfSeasons} = route.params;

  const tabItemWidth = useMemo(() => {
    if (numberOfSeasons === 2) {
      return metrics.width / 2;
    }

    return metrics.width / 3;
  }, [numberOfSeasons]);

  if (numberOfSeasons === 1) {
    return (
      <>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
          animated
        />
        <TVShowSeasonsDetailScreen
          route={{
            name: Routes.TVShow.SEASONS_TABS,
            key: Routes.TVShow.SEASONS_TABS,
            params: {
              tvShowTitle: route.params.title,
              id: route.params.id,
              season: 1,
            },
          }}
          navigation={{} as any}
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
            width: tabItemWidth,
          },
          lazy: true,
        }}>
        {Array(numberOfSeasons)
          .fill({})
          .map((_, index) => (
            <Tab.Screen
              component={TVShowSeasonsDetailScreen}
              key={index}
              options={{
                tabBarLabel: `${t(
                  TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_SEASON,
                )} ${index + 1}`,
              }}
              name={`${t(
                TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_SEASON,
              )}-${index + 1}`}
              initialParams={{
                tvShowTitle: route.params.title,
                id: route.params.id,
                season: index + 1,
              }}
            />
          ))}
      </Tab.Navigator>
    </>
  );
};

export default withTheme(TVShowSeasonsDetailStack);
