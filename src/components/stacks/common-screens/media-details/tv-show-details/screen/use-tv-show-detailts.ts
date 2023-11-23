import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import gql from 'graphql-tag';

import { useImperativeQuery, useTranslation } from '@hooks';
import {
  TVShowDetailsVariables,
  TVShowDetails_tvShow,
  TVShowDetails,
  ISO6391Language,
} from '@schema-types';

import { scrollWithAnimatedHeaderParams } from '../../common/scroll-with-animated-header-params';
import { useTVShowTranslations } from './use-tv-show-translations';

export const TV_SHOW_DETAILS_QUERY = gql`
  query TVShowDetails(
    $id: Int!
    $language: ISO6391Language
    $includeVoteAverage: Boolean!
    $includeGenres: Boolean!
    $includeVoteCount: Boolean!
  ) {
    tvShow(id: $id, language: $language) {
      genres(language: $language) @include(if: $includeGenres)
      voteAverage @include(if: $includeVoteAverage)
      voteCount @include(if: $includeVoteCount)
      # images(id: $id)
      createdBy {
        profilePath
        name
        id
      }
      episodeRunTime
      firstAirDate
      lastAirDate
      title: name
      id
      originalLanguage
      originalName
      originCountry
      overview
      # videos {
      #   thumbnail {
      #     extraSmall
      #   }
      #   key
      #   id
      # }
      # cast {
      #   profilePath
      #   character
      #   name
      #   id
      # }
      # crew {
      #   profilePath
      #   name
      #   id
      #   job
      # }
      # similar {
      #   voteAverage
      #   posterPath
      #   voteCount
      #   name
      #   id
      # }
      numberOfEpisodes
      numberOfSeasons
      # reviews {
      #   author
      #   content
      #   id
      # }
    }
  }
`;

type UseTVShowDetailsParams = {
  voteAverage?: number | null;
  genres?: string[] | null;
  voteCount?: number | null;
  id?: number | null;
};

export const useTVShowDetails = (params: UseTVShowDetailsParams) => {
  const [details, setDetails] = useState<TVShowDetails_tvShow | undefined>();

  const tvShowTranslations = useTVShowTranslations();
  const translation = useTranslation();
  const theme = useTheme();

  const headerInterpolationValues = useMemo(
    () => scrollWithAnimatedHeaderParams(theme),
    [theme],
  );

  const handleCompleteQuery = useCallback((queryResult: TVShowDetails) => {
    setDetails(queryResult.tvShow);
  }, []);

  const query = useImperativeQuery<TVShowDetails, TVShowDetailsVariables>({
    query: TV_SHOW_DETAILS_QUERY,
    onCompleted: handleCompleteQuery,
    fetchPolicy: 'cache-first',
  });

  const queryTVShowDetails = useCallback(() => {
    if (!params.id) {
      return;
    }
    query.exec({
      language: translation.currentLanguage as ISO6391Language,
      includeVoteAverage: !params.voteAverage,
      includeGenres: !params.genres,
      includeVoteCount: !params.voteCount,
      id: params.id,
    });
  }, [translation.currentLanguage, params]);

  useEffect(() => {
    queryTVShowDetails();
  }, []);

  return {
    texts: tvShowTranslations.texts,
    isLoading: query.isLoading,
    headerInterpolationValues,
    hasError: query.hasError,
    voteCount: params.voteCount || details?.voteCount || 0,
    voteAverage: params.voteAverage || details?.voteAverage || 0,
    shouldShowBackgroundImage: !query.isLoading && !query.hasError && details,
    genres: params.genres || details?.genres || [],
    details,
    theme,
  };
};
