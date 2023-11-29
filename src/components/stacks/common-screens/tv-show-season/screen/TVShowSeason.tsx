import React from 'react';

import { TVShowSeasonProps } from '../routes/route-params-types';
import { useTVShowSeason } from './use-tv-show-season';

export const TVShowSeason = (props: TVShowSeasonProps) => {
  const tvShowSeason = useTVShowSeason(props);

  return <></>;
};
