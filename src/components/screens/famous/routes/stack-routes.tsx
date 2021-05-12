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
import { getTransparentHeaderOptions, DEFAULT_HEADER_OPTIONS } from '@routes/constants';
import SearchStack from '@components/screens/shared/search/routes/stack-routes';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import Famous from '../components/Famous';

const Stack = createStackNavigator();

type FamousStackProps = {
  theme: DefaultTheme;
};

const FamousStack = (props: FamousStackProps) => {
  const { t } = useTranslation();

  const TRANSPARENT_HEADER_OPTIONS = getTransparentHeaderOptions(props.theme);

  return (
    <Stack.Navigator
      headerMode="screen"
    >
      <Stack.Screen
        name={Routes.Famous.FAMOUS}
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.TABS_FAMOUS),
          headerTitleAlign: 'center',
        }}
        component={Famous}
      />
      <Stack.Screen
        name={Routes.Famous.DETAILS}
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={FamousDetail}
      />
      <Stack.Screen
        name={Routes.Movie.DETAILS}
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
        }}
        component={MovieDetail}
      />
      <Stack.Screen
        name={Routes.TVShow.DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={Routes.MediaDetail.REVIEWS}
        options={({ route }: ReviewsStackProps) => ({
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
        name={Routes.TVShow.SEASONS}
        options={({ route }: TVShowSeasonsStackProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTintColor: props.theme.colors.buttonText,
          headerStyle: {
            backgroundColor: props.theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
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
