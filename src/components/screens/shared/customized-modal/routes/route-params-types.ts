import * as Types from '@local-types';

export type CustomModalParams = {
  type: Types.CustomizedModalChildrenType;
  headerText: string;
  extraData: {
    onPressSelect: (value: any) => void;
    lastItemSelected: any;
    dataset?: any[];
  };
};

export type CustomModalStackParams = {
  CUSTOM_MODAL: CustomModalParams;
};
