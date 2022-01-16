import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { CustomModalParams } from '@components/screens/shared/customized-modal/routes/route-params-types';
import { Routes } from '@routes/routes';

type NewsStackParams = {
  [Routes.CustomModal.CUSTOM_MODAL]: CustomModalParams;
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
