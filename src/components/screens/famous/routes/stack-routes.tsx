import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Reviews, {
  Props as ReviewsExternalParams,
} from 'components/screens/shared/media-detail-screen/reviews/components/Reviews';
import MovieDetail from 'components/screens/shared/media-detail-screen/movie-detail/components/MovieDetail';

import FamousDetail from 'components/screens/shared/famous-detail/components/FamousDetail';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from 'routes/constants';

import Famous from '../components/Famous';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

type Props = {
  theme: DefaultTheme;
};

const FamousStack = ({ theme }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      headerMode="screen"
    >
      <Stack.Screen
        name={LOCAL_ROUTES.FAMOUS.id}
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:tabs:famous'),
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
        name={LOCAL_ROUTES.REVIEWS.id}
        options={({ route }: ReviewsExternalParams) => ({
          ...getDefaultHeaderOptions(),
          headerTitle: route.params.mediaTitle,
        })}
        component={Reviews}
      />
    </Stack.Navigator>
  );
};

export const TabID = LOCAL_ROUTES.FAMOUS.id;

export default withTheme(FamousStack);
