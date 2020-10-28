export type TVShowSeasonsNavigationParams = {
  numberOfSeasons: number;
  title: string;
  id: string;
};

export type TVShowSeasonsInternalParams = {
  season: number;
  id: string;
};

export type TVShowSeasonsStackParams = {
  TV_SHOW_SEASONS: TVShowSeasonsNavigationParams;
  SEASON_DETAIL: TVShowSeasonsInternalParams;
};
