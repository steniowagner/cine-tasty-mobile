import { SearchNavigationParams } from 'components/screens/shared/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/shared/search/routes/stack-routes';

export type HomeStackParams = {
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  HOME: undefined;
};
