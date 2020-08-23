import React from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { SearchStackParams } from './route-params-types';
import Search from '../components/search/Search';
import LOCAL_ROUTES from './route-names';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

const Stack = createStackNavigator();

type SearchScreenRouteProp = RouteProp<SearchStackParams, 'SEARCH'>;

type Props = {
  route: SearchScreenRouteProp;
};

const SearchStack = (props: Props) => {
  const { route } = props;

  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export const StackID = LOCAL_ROUTES.SEARCH.id;

export default SearchStack;
