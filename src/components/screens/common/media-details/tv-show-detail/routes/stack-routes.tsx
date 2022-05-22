import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderBackButton} from '@components';
import {dark as theme} from '@styles/themes';
import {Routes} from '@routes/routes';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';

import {SeasonsDetailsTabs} from '../components/seasons/tabs/SeasonsDetailsTabs';
import {TVShowDetail} from '../components/TVShowDetail';
import {
  SeasonsDetailsStackProps,
  TVShowDetailStackProps,
} from './route-params-types';

const Stack = createStackNavigator();

export const TVShowStack = (props: TVShowDetailStackProps) => {
  const TRANSPARENT_HEADER_OPTIONS = getTransparentHeaderOptions(theme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}>
      <Stack.Screen
        name={Routes.TVShow.DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
          headerLeft: () => (
            <HeaderBackButton onPress={() => props.navigation.goBack()} />
          ),
        })}
        initialParams={{
          ...props.route.params,
        }}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={Routes.TVShow.SEASONS}
        options={(seasonsDetailsStackProps: SeasonsDetailsStackProps) => ({
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
    </Stack.Navigator>
  );
};
