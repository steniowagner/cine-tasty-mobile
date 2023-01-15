import {StackNavigationProp} from '@react-navigation/stack';

import {Routes} from '@routes/routes';

type NewsStackParams = {
  [Routes.News.NEWS]: undefined;
};

/**  News-Stack-Props */
export type NewsStackNavigationProp = StackNavigationProp<
  NewsStackParams,
  Routes.News.NEWS
>;
export type NewsStackProps = {
  navigation: NewsStackNavigationProp;
};
