import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DefaultTheme } from 'styled-components';

import { Routes } from '@routes/routes';

type TVShowSeasonsStackParams = {
  [Routes.TVShow.SEASONS_TABS]: TVShowSeasonsTabsDetailProps;
  [Routes.TVShow.SEASONS]: TVShowSeasonsParams;
};

type TVShowSeasonsTabsDetailProps = {
  season: number;
  id: string;
};

export type TVShowSeasonsParams = {
  numberOfSeasons: number;
  title: string;
  id: string;
};

export type TVShowSeasonsTabsStackProps = {
  route: RouteProp<TVShowSeasonsStackParams, Routes.TVShow.SEASONS_TABS>;
};

export type TVShowSeasonsStackProps = {
  navigation: StackNavigationProp<TVShowSeasonsStackParams, Routes.TVShow.SEASONS>;
  route: RouteProp<TVShowSeasonsStackParams, Routes.TVShow.SEASONS>;
  theme: DefaultTheme;
};
