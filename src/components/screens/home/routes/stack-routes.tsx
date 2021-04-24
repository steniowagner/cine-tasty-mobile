import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';

import { TVShowSeasonsStackProps } from '@components/screens/shared/tv-show-seasons/routes/route-params-types';
import { ReviewsStackProps } from '@components/screens/shared/media-detail/reviews/routes/route-params-types';
import ImagesGallery from '@components/screens/shared/images-gallery/components/images-gallery/ImagesGallery';
import TVShowDetail from '@components/screens/shared/media-detail/tv-show-detail/components/TVShowDetail';
import MoviedDetail from '@components/screens/shared/media-detail/movie-detail/components/MovieDetail';
import TVShowSeasonDetail from '@components/screens/shared/tv-show-seasons/routes/stack-routes';
import FamousDetail from '@components/screens/shared/famous-detail/components/FamousDetail';
import Reviews from '@components/screens/shared/media-detail/reviews/components/Reviews';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from '@routes/constants';
import SearchStack from '@components/screens/shared/search/routes/stack-routes';
import { Routes } from '@routes/routes';

import MediaSectionViewAll from '../components/media-section-view-all/MediaSectionViewAll';
import { MediaSectionViewAllStackProps } from './route-params-types';
import SettingsScreen from '../../settings/routes/stack-routes';
import Home from '../components/Home';

const Stack = createStackNavigator();

type HomeStackProps = {
  theme: DefaultTheme;
};

const HomeStack = ({ theme }: HomeStackProps) => (
  <Stack.Navigator
    headerMode="screen"
  >
    <Stack.Screen
      options={{
        ...getTransparentHeaderOptions(theme),
        headerTransparent: true,
      }}
      name={Routes.Home.HOME}
      component={Home}
    />
    <Stack.Screen
      options={{
        ...getTransparentHeaderOptions(theme),
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name={Routes.Famous.DETAILS}
      component={FamousDetail}
    />
    <Stack.Screen
      name={Routes.Home.MEDIA_DETAILS_VIEW_ALL}
      options={({ route }: MediaSectionViewAllStackProps) => ({
        ...getDefaultHeaderOptions(),
        headerTitle: route.params.headerTitle,
      })}
      component={MediaSectionViewAll}
    />
    <Stack.Screen
      name={Routes.Movie.DETAILS}
      options={() => ({
        ...getTransparentHeaderOptions(theme),
      })}
      component={MoviedDetail}
    />
    <Stack.Screen
      name={Routes.TVShow.DETAILS}
      options={() => ({
        ...getTransparentHeaderOptions(theme),
      })}
      component={TVShowDetail}
    />
    <Stack.Screen
      name={Routes.MediaDetail.REVIEWS}
      options={({ route }: ReviewsStackProps) => ({
        ...getDefaultHeaderOptions(),
        headerTitle: route.params.mediaTitle,
      })}
      component={Reviews}
    />
    <Stack.Screen
      name={Routes.ImagesGallery.IMAGES_GALLERY}
      component={ImagesGallery}
      options={() => ({
        ...getDefaultHeaderOptions(),
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={Routes.TVShow.SEASONS}
      options={({ route }: TVShowSeasonsStackProps) => ({
        ...getDefaultHeaderOptions(),
        headerTintColor: theme.colors.buttonText,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitle: route.params.title,
      })}
      component={TVShowSeasonDetail}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      component={SearchStack}
      name={Routes.Search.SEARCH}
    />
    {SettingsScreen(Stack)}
  </Stack.Navigator>
);

export default withTheme(HomeStack);
