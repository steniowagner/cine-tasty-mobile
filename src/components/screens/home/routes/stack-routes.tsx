import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useTheme} from 'styled-components/native';

import {ReviewsProps} from '@src/components/screens/common/reviews/routes/route-params-types';
import {ImagesGallery} from '@src/components/screens/common/images-gallery/components/images-gallery/ImagesGallery';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
import {FamousDetails} from '@src/components/screens/common/famous-details/components/FamousDetails';
import {Reviews} from '@src/components/screens/common/reviews/components/Reviews';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';
import SearchStack from '@src/components/screens/common/search/routes/stack-routes';
import {Routes} from '@routes/routes';

import MediaSectionViewAll from '../components/media-section-view-all/components/MediaSectionViewAll';
import {MediaSectionViewAllProps} from '../components/media-section-view-all/routes/route-params-types';
import {Home} from '../components/Home';
import {TVShowDetail} from '../../common/media-details/tv-show-detail/components/TVShowDetail';
import {SeasonsProps} from '../../common/media-details/seasons/routes/route-params-types';
import {SeasonsDetailsTabs} from '../../common/media-details/seasons/components/tabs/SeasonsDetailsTabs';

const Stack = createStackNavigator();

export const HomeStack = () => {
  const theme = useTheme();
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
        name={Routes.Home.FAMOUS_DETAILS}
        component={FamousDetails}
      />
      <Stack.Screen
        name={Routes.Home.MEDIA_DETAILS_VIEW_ALL}
        options={({route}: MediaSectionViewAllProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: route.params.headerTitle,
          headerTitleAlign: 'center',
        })}
        component={MediaSectionViewAll}
      />
      <Stack.Screen
        name={Routes.Home.MOVIE_DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={MovieDetail}
      />
      <Stack.Screen
        name={Routes.Home.TV_SHOW_DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
          header: () => null,
        })}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={Routes.Home.TV_SHOW_SEASONS}
        options={(props: SeasonsProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTintColor: theme.colors.buttonText,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: props.route.params.title,
          headerTitleAlign: 'center',
        })}
        component={SeasonsDetailsTabs}
      />
      <Stack.Screen
        name={Routes.Home.MEDIA_REVIEWS}
        options={({route}: ReviewsProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: route.params.mediaTitle,
          headerTitleAlign: 'center',
        })}
        component={Reviews}
      />
      <Stack.Screen
        name={Routes.Home.IMAGES_GALLERY}
        component={ImagesGallery}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        options={{headerShown: false}}
        component={SearchStack}
        name={Routes.Home.SEARCH}
      />
    </Stack.Navigator>
  );
};
