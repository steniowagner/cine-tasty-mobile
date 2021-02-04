import { CustomizedModalChildrenType } from 'types';

export type CustomModalParams = {
  type: CustomizedModalChildrenType;
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
