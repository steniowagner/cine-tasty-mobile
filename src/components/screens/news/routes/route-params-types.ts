import { MODAL_ID as CUSTOM_MODAL_ID } from 'components/screens/shared/customized-modal/routes/stack-routes';
import { CustomModalParams } from 'components/screens/shared/customized-modal/routes/route-params-types';

export type NewsStackParams = {
  [CUSTOM_MODAL_ID]: CustomModalParams;
  NEWS: undefined;
};
