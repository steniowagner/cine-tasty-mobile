import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {Routes} from '@routes/routes';
import * as Types from '@local-types';

export type CustomModalStackParams = {
  [Routes.CustomModal.CUSTOM_MODAL_STACK]: CustomModalParams;
};

export type CustomModalParams = {
  type: Types.CustomizedModalChildrenType;
  modalHeight?: number;
  headerText?: string;
  extraData: {
    onPressSelect?: (value: any) => void;
    lastItemSelected?: any;
    dataset?: any[];
  };
};

/** Custom-Modal-Stack-Props */
export type CustomModalNavigationProp = StackNavigationProp<
  CustomModalStackParams,
  Routes.CustomModal.CUSTOM_MODAL_STACK
>;
export type CustomModalRouteProp = RouteProp<
  CustomModalStackParams,
  Routes.CustomModal.CUSTOM_MODAL_STACK
>;

export type CustomModalStackProps = {
  navigation: CustomModalNavigationProp;
  route: CustomModalRouteProp;
};
