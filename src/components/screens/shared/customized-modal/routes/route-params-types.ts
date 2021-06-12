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

/** Custom-Modal-Stack-Props */
export type CustomModalNavigationProp = StackNavigationProp<
  CustomModalStackParams,
  Routes.CustomModal.CUSTOM_MODAL
>;
export type CustomModalRouteProp = RouteProp<
  CustomModalStackParams,
  Routes.CustomModal.CUSTOM_MODAL
>;

export type CustomModalStackProps = {
  navigation: CustomModalNavigationProp;
  route: CustomModalRouteProp;
};
