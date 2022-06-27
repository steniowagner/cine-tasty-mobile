import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {DefaultTheme, withTheme} from 'styled-components/native';

import {ReviewsStackProps} from '@src/components/screens/common/media-details/reviews/routes/route-params-types';
import {ImagesGallery} from '@src/components/screens/common/images-gallery/components/images-gallery/ImagesGallery';
import {TVShowStack} from '@src/components/screens/common/media-details/tv-show-detail/routes/stack-routes';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
import {FamousDetails} from '@src/components/screens/common/famous-details/components/FamousDetails';
import {Reviews} from '@src/components/screens/common/media-details/reviews/components/Reviews';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';
import SearchStack from '@src/components/screens/common/search/routes/stack-routes';
import {Routes} from '@routes/routes';

import MediaSectionViewAll from '../components/media-section-view-all/MediaSectionViewAll';
import {MediaSectionViewAllStackProps} from './route-params-types';
import {Home} from '../components/Home';

const Stack = createStackNavigator();

type HomeStackProps = {
  theme: DefaultTheme;
};

export const HomeStack = withTheme(({theme}: HomeStackProps) => {
  const TRANSPARENT_HEADER_OPTIONS = getTransparentHeaderOptions(theme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}>
      <Stack.Screen
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
          headerTransparent: true,
        }}
        name={Routes.Home.HOME}
        component={Home}
      />
      <Stack.Screen
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name={Routes.Famous.DETAILS}
        component={FamousDetails}
      />
      <Stack.Screen
        name={Routes.Home.MEDIA_DETAILS_VIEW_ALL}
        options={({route}: MediaSectionViewAllStackProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: route.params.headerTitle,
          headerTitleAlign: 'center',
        })}
        component={MediaSectionViewAll}
      />
      <Stack.Screen
        name={Routes.Movie.DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={MovieDetail}
      />
      <Stack.Screen
        name={Routes.TVShow.DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={TVShowStack}
      />
      <Stack.Screen
        name={Routes.MediaDetail.REVIEWS}
        options={({route}: ReviewsStackProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: route.params.mediaTitle,
          headerTitleAlign: 'center',
        })}
        component={Reviews}
      />
      <Stack.Screen
        name={Routes.ImagesGallery.IMAGES_GALLERY}
        component={ImagesGallery}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        options={{headerShown: false}}
        component={SearchStack}
        name={Routes.Search.SEARCH_STACK}
      />
    </Stack.Navigator>
  );
});
