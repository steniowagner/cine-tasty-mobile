import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from '@routes/routes';

import Onboarding from '../components/Onboarding';

const Stack = createStackNavigator();

const OnboardingStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={Routes.Onboarding.ONBOARDING}
      component={Onboarding}
    />
  </Stack.Navigator>
);

export default OnboardingStack;
