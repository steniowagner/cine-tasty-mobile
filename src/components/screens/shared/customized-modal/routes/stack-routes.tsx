import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { CustomModalStackParams } from './route-params-types';
import CustomModal from '../components/CustomizedModal';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

type CustomModalRouteProp = RouteProp<CustomModalStackParams, 'CUSTOM_MODAL'>;

type Props = {
  route: CustomModalRouteProp;
};

const CustomizedModalStack = ({ route }: Props) => (
  <Stack.Navigator>
    <Stack.Screen
      name={LOCAL_ROUTES.CUSTOM_MODAL.id}
      options={{
        header: () => null,
      }}
      component={CustomModal}
      initialParams={{
        ...route.params,
      }}
    />
  </Stack.Navigator>
);

export const MODAL_ID = LOCAL_ROUTES.CUSTOM_MODAL.id;

export default CustomizedModalStack;
