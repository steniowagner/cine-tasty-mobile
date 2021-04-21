import { CustomModalParams } from '@components/screens/shared/customized-modal/routes/route-params-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from '@routes/routes';

type NewsStackParams = {
  [Routes.CustomModal.CUSTOM_MODAL]: CustomModalParams;
  [Routes.News.NEWS]: undefined;
};

export type NewsStackProps = {
  navigation: StackNavigationProp<NewsStackParams, Routes.News.NEWS>;
};
