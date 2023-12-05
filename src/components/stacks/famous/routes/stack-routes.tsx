import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  defaultHeaderStyle,
  Routes,
  HeaderTitle as CustomHeaderTitle,
} from '@navigation';
import { Translations } from '@i18n/tags';

import {
  FamousDetails,
  ImagesGallery,
  Search,
  TVShowDetails,
  TVShowSeason,
  MovieDetails,
} from '../../common-screens';
import { TrendingFamous } from '../screens/trending-famous/TrendingFamous';

const Stack = createStackNavigator();

export const FamousStack = () => {
  const HeaderTitle = useCallback(
    () => <CustomHeaderTitle translationTag={Translations.Tabs.TABS_FAMOUS} />,
    [],
  );

  return (
    <Stack.Navigator initialRouteName={Routes.Famous.TRENDING_FAMOUS}>
      <Stack.Screen
        options={{
          ...defaultHeaderStyle,
          headerTitle: HeaderTitle,
          headerTitleAlign: 'center',
        }}
        name={Routes.Famous.TRENDING_FAMOUS}
        component={TrendingFamous}
      />
      <Stack.Screen
        name={Routes.Famous.SEARCH_FAMOUS}
        options={{
          header: () => null,
        }}
        component={Search}
      />
      <Stack.Screen name={Routes.Famous.DETAILS} component={FamousDetails} />
      <Stack.Screen
        name={Routes.Famous.IMAGES_GALLERY}
        component={ImagesGallery}
      />
      <Stack.Screen
        name={Routes.Famous.TV_SHOW_DETAILS}
        component={TVShowDetails}
      />
      <Stack.Screen
        name={Routes.Famous.TV_SHOW_SEASON}
        component={TVShowSeason}
      />
      <Stack.Screen
        name={Routes.Famous.MOVIE_DETAILS}
        component={MovieDetails}
      />
    </Stack.Navigator>
  );
};
