import { SearchNavigationParams } from 'components/screens/search/routes/route-params-types';
import { StackID } from 'components/screens/search/routes/stack-routes';

export type FamousStackParams = {
  FAMOUS: {
    headerTitle: string;
  };
  [StackID]: SearchNavigationParams;
};
