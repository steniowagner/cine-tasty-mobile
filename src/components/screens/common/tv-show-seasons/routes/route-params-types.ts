import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

import {CustomModalParams} from '@src/components/screens/common/customized-modal/routes/route-params-types';
import {Routes} from '@routes/routes';

type TVShowSeasonsStackParams = {
  [Routes.TVShow.SEASONS_TABS]: TVShowSeasonsTabsDetailProps;
  [Routes.CustomModal.CUSTOM_MODAL_STACK]: CustomModalParams;
  [Routes.TVShow.SEASONS]: TVShowSeasonsParams;
};

type TVShowSeasonsTabsDetailProps = {
  tvShowTitle: string;
  season: number;
  id: string;
};

export type TVShowSeasonsParams = {
  numberOfSeasons: number;
  title: string;
  id: string;
};

/** TVShow-Seasons-Tabs-Stack-Props */
export type TVShowSeasonsTabsNavigationProp = StackNavigationProp<
  TVShowSeasonsStackParams,
  Routes.TVShow.SEASONS_TABS
>;
export type TVShowSeasonsTabsRouteProp = RouteProp<
  TVShowSeasonsStackParams,
  Routes.TVShow.SEASONS_TABS
>;

export type TVShowSeasonsTabsStackProps = {
  navigation: TVShowSeasonsTabsNavigationProp;
  route: TVShowSeasonsTabsRouteProp;
};

/** TVShow-Seasons-Stack-Props */
export type TVShowSeasonsNavigationProp = StackNavigationProp<
  TVShowSeasonsStackParams,
  Routes.TVShow.SEASONS
>;
export type TVShowSeasonsRouteProp = RouteProp<
  TVShowSeasonsStackParams,
  Routes.TVShow.SEASONS
>;

export type TVShowSeasonsStackProps = {
  navigation: TVShowSeasonsNavigationProp;
  route: TVShowSeasonsRouteProp;
  theme: DefaultTheme;
};
