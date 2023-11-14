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

import { FamousDetails, ImagesGallery } from '../../common-screens';
import { TrendingFamous } from '../screens/trending-famous/TrendingFamous';
import { Search } from '../../common-screens';

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
        initialParams={{
          images: [
            '/whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg',
            '/lldeQ91GwIVff43JBrpdbAAeYWj.jpg',
            '/dqsoVOHWyK4YfxdY0odIyZxhuDB.jpg',
            '/qrRIGfZ4ikHMMIRbBQAXjPkGPst.jpg',
            '/dyTg1DxmBmTahRw4g0ImwseXS5H.jpg',
          ],
          indexSelected: 0,
        }}
      />
    </Stack.Navigator>
  );
};
