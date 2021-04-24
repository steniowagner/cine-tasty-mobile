import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CustomModal from '@components/screens/shared/customized-modal/routes/stack-routes';
import { Routes } from '@routes/routes';

import Tabs from './Tabs';

const RootStack = createStackNavigator();

const RouteNavigation = () => (
  <RootStack.Navigator
    screenOptions={{
      cardStyleInterpolator: ({ current: { progress } }) => ({
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
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
      animationEnabled: false,
      headerShown: false,
    }}
    mode="modal"
  >
    <RootStack.Screen
      options={{ headerShown: false }}
      component={Tabs}
      name="Tabs"
    />
    <RootStack.Screen
      options={{ headerShown: false, animationEnabled: true }}
      component={CustomModal}
      name={Routes.CustomModal.CUSTOM_MODAL}
    />
  </RootStack.Navigator>
);

export default RouteNavigation;
