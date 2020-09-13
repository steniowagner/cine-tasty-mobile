import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';

import FamousDetail from 'components/screens/shared/famous-detail/components/FamousDetail';
import Home from '../components/Home';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

type Props = {
  theme: DefaultTheme;
};

const HomeStack = ({ theme }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerTitle: () => null,
        headerStyle: {
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
      name={LOCAL_ROUTES.HOME.id}
      component={Home}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={LOCAL_ROUTES.FAMOUS_DETAIL.id}
      component={FamousDetail}
    />
  </Stack.Navigator>
);

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <HomeStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.HOME.id;

export default withTheme(Wrapper);
