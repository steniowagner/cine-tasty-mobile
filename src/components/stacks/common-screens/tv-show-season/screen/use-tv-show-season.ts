import gql from 'graphql-tag';

import { TVShowSeasonProps as UseTVShowSeasonParams } from '../routes/route-params-types';

export const TV_SHOW_DETAILS_QUERY = gql`
  query TvShowSeason($input: TVShowSeasonInput!) {
    tvShowSeason(input: $input) {
      episodes {
        airDate
        id
        name
        overview
        stillPath
        voteAverage
        voteCount
      }
      name
      overview
      posterPath
      voteAverage
    }
  }
`;

export const useTVShowSeason = (params: UseTVShowSeasonParams) => {
  return {};
};
