import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '@routes/routes';

import CheckingInitialScreen from './checking-initial-screen/CheckingInitialScreen';
import useRouteNavigation from './useRouteNavigation';
import Tabs from '../Tabs';

const RootStack = createStackNavigator();

const RouteNavigation = () => {
  const {currentStack} = useRouteNavigation();

  return (
    <RootStack.Navigator>
      {currentStack === 'checking-initial-screen' && (
        <RootStack.Screen
          options={{headerShown: false}}
          component={CheckingInitialScreen}
          name={Routes.InitialScreenChecking.INITIAL_SCREEN}
        />
      )}
      {currentStack === 'tabs' && (
        <>
          <RootStack.Screen
            options={{headerShown: false}}
            name={Routes.Tabs.TABS}
            component={Tabs}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RouteNavigation;
