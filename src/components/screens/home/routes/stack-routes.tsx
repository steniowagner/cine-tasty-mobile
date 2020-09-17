import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';

import FamousDetail from 'components/screens/shared/famous-detail/components/FamousDetail';
import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { getTransparentHeaderOptions } from 'routes/constants';

import LOCAL_ROUTES from './route-names';
import Home from '../components/Home';

const Stack = createStackNavigator();

type Props = {
  theme: DefaultTheme;
};

const HomeStack = ({ theme }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...getTransparentHeaderOptions(theme),
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
