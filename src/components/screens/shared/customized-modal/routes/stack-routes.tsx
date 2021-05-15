import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from '@routes/routes';

import { CustomModalStackProps } from './route-params-types';
import CustomModal from '../components/CustomizedModal';

const Stack = createStackNavigator();

const CustomModalStack = (props: CustomModalStackProps) => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: 'transparent' },
    }}
  >
    <Stack.Screen
      name={Routes.CustomModal.CUSTOM_MODAL}
      options={{
        header: () => null,
      }}
      component={CustomModal}
      initialParams={{
        ...props.route.params,
      }}
    />
  </Stack.Navigator>
);

export default CustomModalStack;
