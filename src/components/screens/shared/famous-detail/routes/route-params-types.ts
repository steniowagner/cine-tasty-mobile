import { SCREEN_ID as MediaDetailScreenID } from 'components/screens/shared/media-detail-screen/routes/route-names';
import { MediaDetailParams } from 'components/screens/shared/media-detail-screen/routes/route-params-types';

export type FamousDetailParams = {
  [MediaDetailScreenID]: MediaDetailParams;
  id: number;
};
