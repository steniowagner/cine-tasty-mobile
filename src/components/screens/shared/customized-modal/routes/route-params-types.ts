import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@routes/routes';
import * as Types from '@local-types';

export type CustomModalStackParams = {
  [Routes.CustomModal.CUSTOM_MODAL]: CustomModalParams;
};

export type CustomModalParams = {
  type: Types.CustomizedModalChildrenType;
  headerText: string;
  extraData: {
    onPressSelect: (value: any) => void;
    lastItemSelected: any;
    dataset?: any[];
  };
};

export type CustomModalStackProps = {
  navigation: StackNavigationProp<
    CustomModalStackParams,
    Routes.CustomModal.CUSTOM_MODAL
  >;
  route: RouteProp<CustomModalStackParams, Routes.CustomModal.CUSTOM_MODAL>;
};
