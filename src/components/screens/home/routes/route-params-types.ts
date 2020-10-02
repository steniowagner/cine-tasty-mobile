import { SearchNavigationParams } from 'components/screens/shared/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/shared/search/routes/stack-routes';

import {
  ExternalProps as MediaSectionViewAllProps,
  SCREEN_ID as MediaSectionViewAllScreenID,
} from '../components/media-section-view-all/MediaSectionViewAll';

export type HomeStackParams = {
  [MediaSectionViewAllScreenID]: MediaSectionViewAllProps;
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  HOME: undefined;
};
