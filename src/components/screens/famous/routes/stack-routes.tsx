import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {DefaultTheme, withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import {TVShowSeasonsStackProps} from '@src/components/screens/common/tv-show-seasons/routes/route-params-types';
import {ImagesGallery} from '@src/components/screens/common/images-gallery/components/images-gallery/ImagesGallery';
import {ReviewsStackProps} from '@src/components/screens/common/media-details/reviews/routes/route-params-types';
import {TVShowDetail} from '@src/components/screens/common/media-details/tv-show-detail/components/TVShowDetail';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
import {TVShowSeasonsDetailStack} from '@src/components/screens/common/tv-show-seasons/routes/stack-routes';
import {FamousDetails} from '@src/components/screens/common/famous-details/components/FamousDetails';
import Reviews from '@src/components/screens/common/media-details/reviews/components/Reviews';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';
import SearchStack from '@src/components/screens/common/search/routes/stack-routes';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';

import {Famous} from '../components/Famous';

const Stack = createStackNavigator();

type FamousStackProps = {
  theme: DefaultTheme;
};

export const FamousStack = withTheme(({theme}: FamousStackProps) => {
  const {t} = useTranslation();

  const TRANSPARENT_HEADER_OPTIONS = getTransparentHeaderOptions(theme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}>
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
        component={FamousDetails}
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
        name={Routes.TVShow.SEASONS}
        options={({route}: TVShowSeasonsStackProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTintColor: theme.colors.buttonText,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
        })}
        component={TVShowSeasonsDetailStack}
      />
      <Stack.Screen
        options={{headerShown: false}}
        component={SearchStack}
        name={Routes.Search.SEARCH_STACK}
      />
    </Stack.Navigator>
  );
});
