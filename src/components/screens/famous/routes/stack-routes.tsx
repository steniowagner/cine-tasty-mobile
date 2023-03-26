import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useTheme} from 'styled-components/native';

import {ImagesGallery} from '@src/components/screens/common/images-gallery/components/images-gallery/ImagesGallery';
import {ReviewsNavigationProps} from '@src/components/screens/common/reviews/routes/route-params-types';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
import {FamousDetails} from '@src/components/screens/common/famous-details/components/FamousDetails';
import {Reviews} from '@src/components/screens/common/reviews/components/Reviews';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import {useTranslations} from '@hooks';

import {SeasonsDetailsTabs} from '../../common/media-details/seasons/components/tabs/SeasonsDetailsTabs';
import {TVShowDetail} from '../../common/media-details/tv-show-detail/components/TVShowDetail';
import {SeasonsProps} from '../../common/media-details/seasons/routes/route-params-types';
import {Famous} from '../components/Famous';

const Stack = createStackNavigator();

export const FamousStack = () => {
  const translations = useTranslations();
  const theme = useTheme();

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
          headerTitle: translations.translate(Translations.Tags.TABS_FAMOUS),
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
        name={Routes.Famous.MOVIE_DETAILS}
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
        }}
        component={MovieDetail}
      />
      <Stack.Screen
        name={Routes.Famous.TV_SHOW_DETAILS_DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
          header: () => null,
        })}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={Routes.Famous.TV_SHOW_SEASONS}
        options={(seasonsDetailsStackProps: SeasonsProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTintColor: theme.colors.buttonText,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: seasonsDetailsStackProps.route.params.title,
          headerTitleAlign: 'center',
        })}
        component={SeasonsDetailsTabs}
      />
      <Stack.Screen
        name={Routes.Famous.MEDIA_REVIEWS}
        options={({route}: ReviewsNavigationProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: route.params.mediaTitle,
          headerTitleAlign: 'center',
        })}
        component={Reviews}
      />
      <Stack.Screen
        name={Routes.Famous.IMAGES_GALLERY}
        component={ImagesGallery}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
        })}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        component={SearchStack}
        name={Routes.Search.SEARCH_STACK}
      /> */}
    </Stack.Navigator>
  );
};
