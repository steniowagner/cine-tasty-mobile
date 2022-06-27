import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {withTheme} from 'styled-components/native';

import {ReviewsStackProps} from '@src/components/screens/common/media-details/reviews/routes/route-params-types';
import {TVShowStack} from '@src/components/screens/common/media-details/tv-show-detail/routes/stack-routes';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
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
        options={{headerShown: false}}
        component={TVShowStack}
      />
    </Stack.Navigator>
  );
};

export default withTheme(SearchStack);
