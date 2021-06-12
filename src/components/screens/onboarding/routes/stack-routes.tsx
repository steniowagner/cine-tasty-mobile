import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from '@routes/routes';

import { OnboardingStackProps } from './route-params-types';
import Onboarding from '../components/Onboarding';

const Stack = createStackNavigator();

const OnboardingStack = ({ route }: OnboardingStackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={Routes.Onboarding.ONBOARDING}
      component={Onboarding}
      initialParams={{
        ...route.params,
      }}
    />
  </Stack.Navigator>
);

export default OnboardingStack;
