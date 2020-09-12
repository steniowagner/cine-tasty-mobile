import React from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { withTheme, DefaultTheme } from 'styled-components';
import { RouteProp } from '@react-navigation/native';

import FamousDetail from 'components/screens/shared/famous-detail/components/FamousDetail';
import { getTransparentHeaderOptions } from 'routes/constants';

import { SearchStackParams } from './route-params-types';
import Search from '../components/search/Search';
import LOCAL_ROUTES from './route-names';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

const Stack = createStackNavigator();

type SearchScreenRouteProp = RouteProp<SearchStackParams, 'SEARCH'>;

type Props = {
  route: SearchScreenRouteProp;
  theme: DefaultTheme;
};

const SearchStack = ({ route, theme }: Props) => (
  <Stack.Navigator
    headerMode="screen"
  >
    <Stack.Screen
      name={LOCAL_ROUTES.SEARCH.id}
      options={{
        header: () => null,
      }}
      initialParams={{
        ...route.params,
      }}
      component={Search}
    />
    <Stack.Screen
      name={LOCAL_ROUTES.FAMOUS_DETAIL.id}
      options={{
        ...getTransparentHeaderOptions(theme),
        ...TransitionPresets.SlideFromRightIOS,
      }}
      component={FamousDetail}
    />
  </Stack.Navigator>
);

export const StackID = 'SEARCH';

export default withTheme(SearchStack);
