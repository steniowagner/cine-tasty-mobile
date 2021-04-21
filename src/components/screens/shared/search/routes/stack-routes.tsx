import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { withTheme } from 'styled-components';

import { TVShowSeasonsStackProps } from '@components/screens/shared/tv-show-seasons/routes/route-params-types';
import { ReviewsStackProps } from '@components/screens/shared/media-detail/reviews/routes/route-params-types';
import TVShowDetail from '@components/screens/shared/media-detail/tv-show-detail/components/TVShowDetail';
import MovieDetail from '@components/screens/shared/media-detail/movie-detail/components/MovieDetail';
import TVShowSeasonDetail from '@components/screens/shared/tv-show-seasons/routes/stack-routes';
import FamousDetail from '@components/screens/shared/famous-detail/components/FamousDetail';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from '@routes/constants';
import Reviews from '@components/screens/shared/media-detail/reviews/components/Reviews';
import { Routes } from '@routes/routes';

import { SearchStackProps } from './route-params-types';
import Search from '../components/search/Search';

const Stack = createStackNavigator();

const SearchStack = ({ route, theme }: SearchStackProps) => (
  <Stack.Navigator
    headerMode="screen"
  >
    <Stack.Screen
      name={Routes.Search.SEARCH}
      options={{
        header: () => null,
      }}
      initialParams={{
        ...route.params,
      }}
      component={Search}
    />
    <Stack.Screen
      name={Routes.Famous.DETAILS}
      options={{
        ...getTransparentHeaderOptions(theme),
        ...TransitionPresets.SlideFromRightIOS,
      }}
      component={FamousDetail}
    />
    <Stack.Screen
      name={Routes.Movie.DETAILS}
      options={() => ({
        ...getTransparentHeaderOptions(theme),
      })}
      component={MovieDetail}
    />
    <Stack.Screen
      name={Routes.MediaDetail.REVIEWS}
      options={({ route: reviewsRoute }: ReviewsStackProps) => ({
        ...getDefaultHeaderOptions(),
        headerTitle: reviewsRoute.params.mediaTitle,
      })}
      component={Reviews}
    />
    <Stack.Screen
      name={Routes.TVShow.DETAILS}
      options={() => ({
        ...getTransparentHeaderOptions(theme),
      })}
      component={TVShowDetail}
    />
    <Stack.Screen
      name={Routes.TVShow.SEASONS}
      options={({ route: tvShowSeasonsStackProps }: TVShowSeasonsStackProps) => ({
        ...getDefaultHeaderOptions(),
        headerTintColor: theme.colors.buttonText,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitle: tvShowSeasonsStackProps.params.title,
      })}
      component={TVShowSeasonDetail}
    />
  </Stack.Navigator>
);

export default withTheme(SearchStack);
