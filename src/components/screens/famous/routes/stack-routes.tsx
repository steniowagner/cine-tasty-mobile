import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TVShowSeasonsStackProps } from '@components/screens/shared/tv-show-seasons/routes/route-params-types';
import ImagesGallery from '@components/screens/shared/images-gallery/components/images-gallery/ImagesGallery';
import { ReviewsStackProps } from '@components/screens/shared/media-detail/reviews/routes/route-params-types';
import TVShowDetail from '@components/screens/shared/media-detail/tv-show-detail/components/TVShowDetail';
import MovieDetail from '@components/screens/shared/media-detail/movie-detail/components/MovieDetail';
import TVShowSeasonDetail from '@components/screens/shared/tv-show-seasons/routes/stack-routes';
import FamousDetail from '@components/screens/shared/famous-detail/components/FamousDetail';
import Reviews from '@components/screens/shared/media-detail/reviews/components/Reviews';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from '@routes/constants';
import SearchStack from '@components/screens/shared/search/routes/stack-routes';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import Famous from '../components/Famous';

const Stack = createStackNavigator();

type FamousStackProps = {
  theme: DefaultTheme;
};

const FamousStack = ({ theme }: FamousStackProps) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      headerMode="screen"
    >
      <Stack.Screen
        name={Routes.Famous.FAMOUS}
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t(TRANSLATIONS.TABS_FAMOUS),
        }}
        component={Famous}
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
        options={{
          ...getTransparentHeaderOptions(theme),
        }}
        component={MovieDetail}
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
    </Stack.Navigator>
  );
};

export default withTheme(FamousStack);
