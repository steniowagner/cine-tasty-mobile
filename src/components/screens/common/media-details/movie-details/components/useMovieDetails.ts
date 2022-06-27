import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {showLanguageAlert, formatCurrency, formatDate} from '@utils';
import {GET_MOVIE_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import {MovieDetailNavigationProp} from '../routes/route-params-types';

type UseMovieDetailsProps = {
  navigation: MovieDetailNavigationProp;
  hasVoteAverage: boolean;
  hasGenresIds: boolean;
  hasVoteCount: boolean;
  id: number;
};

export const useMovieDetails = (props: UseMovieDetailsProps) => {
  const translations = useTranslations();

  const query = useQuery<
    SchemaTypes.MovieDetail,
    SchemaTypes.MovieDetailVariables
  >(GET_MOVIE_DETAIL, {
    variables: {
      withVoteAverage: !props.hasVoteAverage,
      withGenresIds: !props.hasGenresIds,
      withVoteCount: !props.hasVoteCount,
      language: translations.language,
      id: String(props.id),
    },
    fetchPolicy: 'cache-first',
  });

  const releaseDate = useMemo(
    (): string => (query.data?.movie?.releaseDate || '-').split('-')[0],
    [query.data],
  );

  const texts = useMemo(
    () => ({
      movieTag: translations.translate(
        Translations.Tags.MEDIA_DETAIL_MOVIE_TITLE,
      ),
      sections: {
        cast: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CAST,
        ),
        crew: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CREW,
        ),
        images: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_IMAGES,
        ),
        videos: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS,
        ),
        productionCompanies: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
        ),
      },
      info: {
        originalTitle: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        ),
        releaseDate: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_RELEASE_DATE,
        ),
        budget: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_BUDGET,
        ),
        revenue: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_REVENUE,
        ),
        productionCountries: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES,
        ),
        spokenLanguages: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES,
        ),
      },
      languageAlert: {
        description: translations.translate(
          Translations.Tags.LANGUAGE_WARNING_MEDIA_DESCRIPTION,
        ),
        positiveActionTitle: translations.translate(
          Translations.Tags.LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION,
        ),
        title: translations.translate(
          Translations.Tags.LANGUAGE_WARNING_MEDIA_TITLE,
        ),
      },
    }),
    [translations.translate],
  );

  const infoItems = useMemo(
    () => [
      {
        value: query.data?.movie?.originalTitle || '-',
        title: texts.info.originalTitle,
      },
      {
        value: formatDate(query.data?.movie?.releaseDate),
        title: texts.info.releaseDate,
      },
      {
        value: formatCurrency(query.data?.movie?.budget),
        title: texts.info.budget,
      },
      {
        value: formatCurrency(query.data?.movie?.revenue),
        title: texts.info.revenue,
      },
      {
        value: query.data?.movie?.productionCountries.length
          ? query.data?.movie?.productionCountries.join(', ')
          : '-',
        title: texts.info.productionCountries,
      },
      {
        value: query.data?.movie?.spokenLanguages.length
          ? query.data?.movie?.spokenLanguages.join(', ')
          : '-',
        title: texts.info.spokenLanguages,
      },
    ],
    [query.data, texts],
  );

  const onPressSimilarItem = useCallback(
    (similar: SchemaTypes.MovieDetail_movie_similar) => {
      props.navigation.push(Routes.Movie.DETAILS, {
        voteAverage: similar.voteAverage,
        posterPath: similar.posterPath,
        voteCount: similar.voteCount,
        title: similar.title,
        id: similar.id,
      });
    },
    [props.navigation],
  );

  const onPressCast = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [props.navigation],
  );

  const onPressCrew = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [props.navigation],
  );

  const onPressReviews = useCallback(
    (movie: SchemaTypes.MovieDetail_movie) => {
      props.navigation.navigate(Routes.MediaDetail.REVIEWS, {
        mediaTitle: movie.title,
        reviews: movie.reviews,
      });
    },
    [props.navigation],
  );

  useEffect(() => {
    const shouldShowLanguageAlert =
      !query.loading && query.data?.movie && !query.data?.movie.overview;
    if (shouldShowLanguageAlert) {
      showLanguageAlert({
        description: texts.languageAlert.description,
        positiveActionTitle: texts.languageAlert.positiveActionTitle,
        title: texts.languageAlert.title,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [query.loading, query.data?.movie]);

  return {
    movie: query.data?.movie,
    isLoading: query.loading,
    hasError: !!query.error,
    onPressSimilarItem,
    onPressReviews,
    onPressCrew,
    onPressCast,
    releaseDate,
    infoItems,
    texts,
  };
};
