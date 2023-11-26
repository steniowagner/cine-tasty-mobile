import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import gql from 'graphql-tag';

import { useImperativeQuery, useTranslation } from '@hooks';
import { formatDate } from '@utils';
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
      images(id: $id)
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
      videos(id: $id) {
        thumbnail {
          extraSmall
        }
        key
        id
      }
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
      similar(id: $id, language: $language) {
        voteAverage
        posterPath
        voteCount
        title: name
        id
      }
      numberOfEpisodes
      numberOfSeasons
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

  const texts = useTVShowTranslations();
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

  const genres = useMemo(
    () => [texts.tvShowTag, ...(params.genres || details?.genres || [])],
    [texts, params.genres, details],
  );

  const infos = useMemo(
    () => [
      {
        title: texts.sections.info.originalTitle,
        value: details?.title || '-',
      },
      {
        title: texts.sections.info.originalLanguage,
        value: details?.originalLanguage || '-',
      },
      {
        title: texts.sections.info.numberOfEpisodes,
        value: details?.numberOfEpisodes
          ? String(details?.numberOfEpisodes)
          : '-',
      },
      {
        title: texts.sections.info.numberOfSeasons,
        value: details?.numberOfSeasons ? String(details.numberOfSeasons) : '-',
      },
      {
        title: texts.sections.info.episodeRuntime,
        value: details?.episodeRunTime.length
          ? details.episodeRunTime.join(', ').concat('min')
          : '-',
      },
      {
        title: texts.sections.info.originalCountry,
        value: details?.originCountry ? details?.originCountry.join(', ') : '-',
      },
      {
        title: texts.sections.info.firstAirDate,
        value: formatDate(translation.currentLanguage, details?.firstAirDate),
      },
      {
        title: texts.sections.info.lastAirDate,
        value: formatDate(translation.currentLanguage, details?.lastAirDate),
      },
    ],
    [translation.currentLanguage, texts, details],
  );

  useEffect(() => {
    queryTVShowDetails();
  }, []);

  return {
    texts,
    isLoading: query.isLoading,
    headerInterpolationValues,
    hasError: query.hasError,
    voteCount: params.voteCount || details?.voteCount || 0,
    voteAverage: params.voteAverage || details?.voteAverage || 0,
    shouldShowBackgroundImage: !query.isLoading && !query.hasError && details,
    genres,
    details,
    theme,
    infos,
  };
};
