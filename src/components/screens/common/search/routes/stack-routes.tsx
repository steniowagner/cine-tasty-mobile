import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {withTheme} from 'styled-components/native';

import {TVShowSeasonsStackProps} from '@src/components/screens/common/tv-show-seasons/routes/route-params-types';
import {ReviewsStackProps} from '@src/components/screens/common/media-details/reviews/routes/route-params-types';
import {TVShowDetail} from '@src/components/screens/common/media-details/tv-show-detail/components/TVShowDetail';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
import {TVShowSeasonsDetailStack} from '@src/components/screens/common/tv-show-seasons/routes/stack-routes';
import {FamousDetails} from '@src/components/screens/common/famous-details/components/FamousDetails';
import {Reviews} from '@src/components/screens/common/media-details/reviews/components/Reviews';
import {Search} from '@src/components/screens/common/search/components/search/Search';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';
import {Routes} from '@routes/routes';

import {SearchStackProps} from './route-params-types';

const Stack = createStackNavigator();

const SearchStack = ({route, theme}: SearchStackProps) => {
  const TRANSPARENT_HEADER_OPTIONS = getTransparentHeaderOptions(theme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}>
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
          ...TRANSPARENT_HEADER_OPTIONS,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={FamousDetails}
      />
      <Stack.Screen
        name={Routes.Movie.DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={MovieDetail}
      />
      <Stack.Screen
        name={Routes.MediaDetail.REVIEWS}
        options={({route: reviewsRoute}: ReviewsStackProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: reviewsRoute.params.mediaTitle,
          headerTitleAlign: 'center',
        })}
        component={Reviews}
      />
      <Stack.Screen
        name={Routes.TVShow.DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={Routes.TVShow.SEASONS}
        options={({
          route: tvShowSeasonsStackProps,
        }: TVShowSeasonsStackProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTintColor: theme.colors.buttonText,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: tvShowSeasonsStackProps.params.title,
          headerTitleAlign: 'center',
        })}
        component={TVShowSeasonsDetailStack}
      />
    </Stack.Navigator>
  );
};

export default withTheme(SearchStack);
