import { SearchNavigationParams } from 'components/screens/shared/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/shared/search/routes/stack-routes';

import { SCREEN_ID as MediaDetailScreenID } from 'components/screens/shared/media-detail-screen/routes/route-names';
import { MediaDetailParams } from 'components/screens/shared/media-detail-screen/routes/route-params-types';

import {
  ExternalProps as MediaSectionViewAllProps,
  SCREEN_ID as MediaSectionViewAllScreenID,
} from '../components/media-section-view-all/MediaSectionViewAll';

export type HomeStackParams = {
  [MediaSectionViewAllScreenID]: MediaSectionViewAllProps;
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  [MediaDetailScreenID]: MediaDetailParams;
  HOME: undefined;
};
