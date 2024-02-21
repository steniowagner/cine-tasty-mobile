import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import gql from 'graphql-tag';

import { useImperativeQuery, useTranslation } from '@/hooks';
import {
  MovieDetails_movie,
  MovieDetailsVariables,
  MovieDetails,
  ISO6391Language,
} from '@/types/schema';

import { scrollWithAnimatedHeaderParams } from '../../../tv-show-season/screen/scroll-with-animated-header-params';
import { MovieDetailsProps as UseMovieDetailsParams } from '../routes/route-params-types';
import { formatCurrency, formatDate } from '@/utils';
import { Translations } from '@/i18n/tags';

export const MOVIE_DETAILS_QUERY = gql`
  query MovieDetails(
    $id: Int!
    $language: ISO6391Language
    $includeVoteAverage: Boolean!
    $includeGenres: Boolean!
    $includeVoteCount: Boolean!
  ) {
    movie(id: $id, language: $language) {
      genres(language: $language) @include(if: $includeGenres)
      voteAverage @include(if: $includeVoteAverage)
      voteCount @include(if: $includeVoteCount)
      images(id: $id)
      backdropPath
      id
      originalTitle
      overview
      title
      releaseDate
      budget
      revenue
      spokenLanguages
      productionCountries
      cast {
        image: profilePath
        subText: character
        name
        id
      }
      crew {
        image: profilePath
        name
        id
        subText: job
      }
      videos(id: $id) {
        thumbnail {
          extraSmall
        }
        key
        id
      }
      similar(id: $id, language: $language) {
        voteAverage
        posterPath
        voteCount
        title
        id
      }
    }
  }
`;

export const useMovieDetails = (params: UseMovieDetailsParams) => {
  const [details, setDetails] = useState<MovieDetails_movie | undefined>();

  const translation = useTranslation();
  const theme = useTheme();

  const headerInterpolationValues = useMemo(
    () => scrollWithAnimatedHeaderParams(theme),
    [theme],
  );

  const texts = useMemo(
    () => ({
      movieTag: translation.translate(Translations.MovieDetails.MOVIE),
      sections: {
        info: {
          originalTitle: translation.translate(
            Translations.MovieDetails.ORIGINAL_TITLE,
          ),
          releaseDate: translation.translate(
            Translations.MovieDetails.RELEASE_DATE,
          ),
          budget: translation.translate(Translations.MovieDetails.BUDGET),
          revenue: translation.translate(Translations.MovieDetails.REVENUE),
          productionCountries: translation.translate(
            Translations.MovieDetails.PRODUCTION_COUNTRIES,
          ),
          spokenLanguages: translation.translate(
            Translations.MovieDetails.SPOKEN_LANGUAGES,
          ),
        },
        crew: translation.translate(Translations.MovieDetails.CREW),
        cast: translation.translate(Translations.MovieDetails.CAST),
        similar: translation.translate(Translations.Miscellaneous.SIMILAR),
        videos: translation.translate(Translations.Miscellaneous.VIDEOS),
      },
      advice: {
        description: translation.translate(
          Translations.Error.ERROR_ADVICE_DESCRIPTION,
        ),
        suggestion: translation.translate(
          Translations.Error.ERROR_ADVICE_SUGGESTION,
        ),
        title: translation.translate(Translations.Error.ERROR_ADVICE_TITLE),
      },
    }),
    [translation.translate],
  );

  const genres = useMemo(
    () => [
      texts.movieTag,
      ...(params.route.params.genres || details?.genres || []),
    ],
    [texts, params.route.params.genres, details],
  );

  const infoItems = useMemo(() => {
    if (!details) {
      return [];
    }
    return [
      {
        value: details.originalTitle || '-',
        title: texts.sections.info.originalTitle,
      },
      {
        value: formatDate(translation.currentLanguage, details.releaseDate),
        title: texts.sections.info.releaseDate,
      },
      {
        value: formatCurrency(details.budget),
        title: texts.sections.info.budget,
      },
      {
        value: formatCurrency(details.revenue),
        title: texts.sections.info.revenue,
      },
      {
        value: details.productionCountries.length
          ? details.productionCountries.join(', ')
          : '-',
        title: texts.sections.info.productionCountries,
      },
      {
        value: details.spokenLanguages.length
          ? details.spokenLanguages.join(', ')
          : '-',
        title: texts.sections.info.spokenLanguages,
      },
    ];
  }, [translation.currentLanguage, details]);

  const handleCompleteQuery = useCallback((queryResult: MovieDetails) => {
    setDetails(queryResult.movie);
  }, []);

  const query = useImperativeQuery<MovieDetails, MovieDetailsVariables>({
    query: MOVIE_DETAILS_QUERY,
    onCompleted: handleCompleteQuery,
    fetchPolicy: 'cache-first',
  });

  const queryMovieDetails = useCallback(() => {
    if (!params.route.params.id) {
      return;
    }
    query.exec({
      language: translation.currentLanguage as ISO6391Language,
      includeVoteAverage: !params.route.params.voteAverage,
      includeGenres: !params.route.params.genres,
      includeVoteCount: !params.route.params.voteCount,
      id: params.route.params.id,
    });
  }, [translation.currentLanguage, params]);

  useEffect(() => {
    queryMovieDetails();
  }, []);

  return {
    shouldShowBackgroundImage: !query.isLoading && !query.hasError && details,
    hasError: query.hasError,
    isLoading: query.isLoading,
    headerInterpolationValues,
    onPressParticipant: () => {},
    details,
    genres,
    infoItems,
    texts,
  };
};
