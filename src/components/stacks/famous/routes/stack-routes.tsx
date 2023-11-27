import React, { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  defaultHeaderStyle,
  Routes,
  HeaderTitle as CustomHeaderTitle,
  getTransparentHeaderOptions,
} from '@navigation';
import { Translations } from '@i18n/tags';

import {
  FamousDetails,
  ImagesGallery,
  Search,
  TVShowDetails,
} from '../../common-screens';
import { TrendingFamous } from '../screens/trending-famous/TrendingFamous';

const Stack = createStackNavigator();

export const FamousStack = () => {
  const theme = useTheme();

  const transparentHeaderOptions = useMemo(
    () => getTransparentHeaderOptions(theme),
    [theme],
  );

  const HeaderTitle = useCallback(
    () => <CustomHeaderTitle translationTag={Translations.Tabs.TABS_FAMOUS} />,
    [],
  );

  return (
    <Stack.Navigator initialRouteName={Routes.Famous.TV_SHOW_DETAILS}>
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
      <Stack.Screen
        name={Routes.Famous.DETAILS}
        options={{
          ...transparentHeaderOptions,
          ...TransitionPresets.SlideFromRightIOS,
          header: () => null,
        }}
        component={FamousDetails}
      />
      <Stack.Screen
        name={Routes.Famous.IMAGES_GALLERY}
        component={ImagesGallery}
      />
      <Stack.Screen
        name={Routes.Famous.TV_SHOW_DETAILS}
        initialParams={{
          id: 78191,
        }}
        component={TVShowDetails}
      />
    </Stack.Navigator>
  );
};
