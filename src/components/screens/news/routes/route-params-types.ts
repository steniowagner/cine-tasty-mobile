import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {CustomModalParams} from '@src/components/screens/common/customized-modal/routes/route-params-types';
import {Routes} from '@routes/routes';

type NewsStackParams = {
  [Routes.CustomModal.CUSTOM_MODAL_STACK]: CustomModalParams;
  [Routes.News.NEWS]: undefined;
};

/**  News-Stack-Props */
export type NewsStackNavigationProp = StackNavigationProp<
  NewsStackParams,
  Routes.News.NEWS
>;
export type NewsStackRouteProp = RouteProp<NewsStackParams, Routes.News.NEWS>;

export type NewsStackProps = {
  navigation: NewsStackNavigationProp;
  route: NewsStackRouteProp;
};
