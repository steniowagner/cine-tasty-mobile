import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import TVShowDetail from '@components/screens/shared/media-detail-screen/tv-show-detail/components/TVShowDetail';
import TVShowSeasonDetail, {
  TVShowSeasonsDetailProps,
} from '@components/screens/shared/tv-show-seasons-screen/routes/stack-routes';
import MovieDetail from '@components/screens/shared/media-detail-screen/movie-detail/components/MovieDetail';
import Reviews, {
  ReviewsExternalParams,
} from '@components/screens/shared/media-detail-screen/reviews/components/Reviews';
import FamousDetail from '@components/screens/shared/famous-detail/components/FamousDetail';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from '@routes/constants';
import * as TRANSLATIONS from '@i18n/tags';

import Famous from '../components/Famous';
import LOCAL_ROUTES from './route-names';

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
        name={LOCAL_ROUTES.FAMOUS.id}
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t(TRANSLATIONS.TABS_FAMOUS),
        }}
        component={Famous}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.FAMOUS_DETAIL.id}
        options={{
          ...getTransparentHeaderOptions(theme),
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={FamousDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.MOVIE_DETAIL.id}
        options={{
          ...getTransparentHeaderOptions(theme),
        }}
        component={MovieDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.TV_SHOW_DETAIL.id}
        options={() => ({
          ...getTransparentHeaderOptions(theme),
        })}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.REVIEWS.id}
        options={({ route }: ReviewsExternalParams) => ({
          ...getDefaultHeaderOptions(),
          headerTitle: route.params.mediaTitle,
        })}
        component={Reviews}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.TV_SHOW_SEASONS.id}
        options={({ route }: TVShowSeasonsDetailProps) => ({
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
    </Stack.Navigator>
  );
};

export const TabID = LOCAL_ROUTES.FAMOUS.id;

export default withTheme(FamousStack);
