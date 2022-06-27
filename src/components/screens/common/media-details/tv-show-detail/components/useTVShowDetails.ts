import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {GET_TV_SHOW_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';
import {formatDate} from '@utils';

import {TVShowDetailNavigationProp} from '../routes/route-params-types';

type UseTVShowDetailsProps = {
  navigation: TVShowDetailNavigationProp;
  hasVoteAverage: boolean;
  hasGenresIds: boolean;
  hasVoteCount: boolean;
  id: number;
};

type Directives = {
  withVoteAverage: boolean;
  withGenresIds: boolean;
  withVoteCount: boolean;
};

type Variables = Directives & SchemaTypes.TVShowDetailVariables;

export const useTVShowDetails = (props: UseTVShowDetailsProps) => {
  const translations = useTranslations();

  const query = useQuery<SchemaTypes.TVShowDetail, Variables>(
    GET_TV_SHOW_DETAIL,
    {
      variables: {
        language: translations.language,
        withVoteAverage: !props.hasVoteAverage,
        withGenresIds: !props.hasGenresIds,
        withVoteCount: !props.hasVoteCount,
        id: String(props.id),
      },
      fetchPolicy: 'cache-first',
    },
  );

  const texts = useMemo(
    () => ({
      tvTag: translations.translate(
        Translations.Tags.MEDIA_DETAIL_TV_SHOWS_TITLE,
      ),
      seeSeasons: translations.translate(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_SEASONS,
      ),
      sections: {
        createdBy: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CREATED_BY,
        ),
        cast: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CAST,
        ),
        crew: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_CREW,
        ),
        images: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_IMAGES,
        ),
        networks: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NETWORKS,
        ),
        productionCompanies: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES,
        ),
      },
      info: {
        originalTitle: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE,
        ),
        originalLanguage: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE,
        ),
        numberOfEpisodes: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES,
        ),
        numberOfSeasons: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS,
        ),
        episodeRuntime: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME,
        ),
        originalCountry: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY,
        ),
        firstAirDate: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE,
        ),
        lastAirDate: translations.translate(
          Translations.Tags.MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE,
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
        title: texts.info.originalTitle,
        value: query.data?.tvShow?.name || '-',
      },
      {
        value: query.data?.tvShow?.originalLanguage || '-',
        title: texts.info.originalLanguage,
      },
      {
        title: texts.info.numberOfEpisodes,
        value: query.data?.tvShow?.numberOfEpisodes
          ? String(query.data?.tvShow?.numberOfEpisodes)
          : '-',
      },
      {
        title: texts.info.numberOfSeasons,
        value: query.data?.tvShow.numberOfSeasons
          ? String(query.data?.tvShow.numberOfSeasons)
          : '-',
      },
      {
        title: texts.info.episodeRuntime,
        value: query.data?.tvShow.episodeRunTime.length
          ? query.data?.tvShow.episodeRunTime.join(', ').concat('min')
          : '-',
      },
      {
        title: texts.info.originalCountry,
        value: query.data?.tvShow?.originCountry
          ? query.data?.tvShow?.originCountry.join(', ')
          : '-',
      },
      {
        title: texts.info.firstAirDate,
        value: formatDate(query.data?.tvShow?.firstAirDate) || '-',
      },
      {
        title: texts.info.lastAirDate,
        value: formatDate(query.data?.tvShow?.lastAirDate) || '-',
      },
    ],
    [query.data, texts],
  );

  const onPressSimilarItem = useCallback(
    (similar: SchemaTypes.TVShowDetail_tvShow_similar) => {
      props.navigation.push(Routes.TVShow.DETAILS, {
        voteAverage: similar.voteAverage,
        posterPath: similar.posterPath,
        voteCount: similar.voteCount,
        title: similar.name,
        id: similar.id,
      });
    },
    [query.data?.tvShow],
  );

  const onPressReviews = useCallback(() => {
    props.navigation.navigate(Routes.MediaDetail.REVIEWS, {
      mediaTitle: query.data?.tvShow.name,
      reviews: query.data?.tvShow.reviews,
    });
  }, [query.data?.tvShow]);

  const onPressCrew = useCallback((id: string, name: string, image: string) => {
    props.navigation.push(Routes.Famous.DETAILS, {
      profileImage: image,
      id: Number(id),
      name,
    });
  }, []);

  const onPressCast = useCallback((id: string, name: string, image: string) => {
    props.navigation.push(Routes.Famous.DETAILS, {
      profileImage: image,
      id: Number(id),
      name,
    });
  }, []);

  const onPressCreatedBy = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [],
  );

  const onPressSeeSeasons = useCallback(() => {
    props.navigation.navigate(Routes.TVShow.SEASONS, {
      numberOfSeasons: query.data?.tvShow.numberOfSeasons,
      title: query.data?.tvShow.name,
      id: query.data?.tvShow.id,
    });
  }, [query.data?.tvShow]);

  const firstAirDate = useMemo(
    (): string => (query.data?.tvShow?.firstAirDate || '-').split('-')[0],
    [query.data?.tvShow],
  );

  useEffect(() => {
    const shouldShowLanguageAlert =
      !query.loading && query.data?.tvShow && !query.data?.tvShow?.overview;
    if (shouldShowLanguageAlert) {
      showLanguageAlert({
        description: texts.languageAlert.description,
        positiveActionTitle: texts.languageAlert.positiveActionTitle,
        title: texts.languageAlert.title,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [query.data?.tvShow, query.loading]);

  return {
    tvShow: query.data?.tvShow,
    isLoading: query.loading,
    hasError: !!query.error,
    onPressSimilarItem,
    onPressSeeSeasons,
    onPressCreatedBy,
    onPressReviews,
    firstAirDate,
    onPressCrew,
    onPressCast,
    infoItems,
    texts,
  };
};
