import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '@routes/routes';

import CheckingInitialScreen from './checking-initial-screen/CheckingInitialScreen';
import useRouteNavigation from './useRouteNavigation';
import Tabs from '../Tabs';

const RootStack = createStackNavigator();

const RouteNavigation = () => {
  const {onFinishShowOnboarding, currentStack} = useRouteNavigation();

  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        animationEnabled: false,
        headerShown: false,
      }}>
      {currentStack === 'checking-initial-screen' && (
        <RootStack.Screen
          options={{headerShown: false}}
          component={CheckingInitialScreen}
          name={Routes.InitialScreenChecking.INITIAL_SCREEN}
        />
      )}
      {currentStack === 'onboarding' && (
        <RootStack.Screen
          initialParams={{onFinishShowOnboarding}}
          name={Routes.Onboarding.ONBOARDING}
          options={{headerShown: false}}
          component={Tabs}
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
