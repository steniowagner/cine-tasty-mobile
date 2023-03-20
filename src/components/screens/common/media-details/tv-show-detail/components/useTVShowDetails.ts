import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {GET_TV_SHOW_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import {TVShowDetailNavigationProp} from '../routes/route-params-types';
import {makeTVShowsInfoItems} from './makeTVShowInfoItems';
import {translateTVShowsDetailsTexts} from './translateTVShowsDetailsTexts';

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
    () => translateTVShowsDetailsTexts(translations.translate),
    [translations.translate],
  );

  const infoItems = useMemo(
    () => makeTVShowsInfoItems(query, texts.info),
    [query.data, texts],
  );

  const handlePressSimilarItem = useCallback(
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

  const handlePressReviews = useCallback(() => {
    props.navigation.navigate(Routes.MediaDetail.REVIEWS, {
      mediaTitle: query.data?.tvShow.name,
      reviews: query.data?.tvShow.reviews,
    });
  }, [query.data?.tvShow]);

  const handlePressCrew = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [],
  );

  const handlePressCast = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [],
  );

  const handlePressCreatedBy = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [],
  );

  const handlePressSeeSeasons = useCallback(() => {
    props.navigation.navigate(Routes.TVShow.SEASONS, {
      numberOfSeasons: query.data?.tvShow.numberOfSeasons,
      title: query.data?.tvShow.name,
      id: query.data?.tvShow.id,
    });
  }, [query.data?.tvShow]);

  const handleShowLanguageAlert = useCallback(() => {
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

  useEffect(() => {
    handleShowLanguageAlert();
  }, [query.data?.tvShow, query.loading]);

  return {
    tvShow: query.data?.tvShow,
    isLoading: query.loading,
    hasError: !!query.error,
    onPressSimilarItem: handlePressSimilarItem,
    onPressSeeSeasons: handlePressSeeSeasons,
    onPressCreatedBy: handlePressCreatedBy,
    onPressReviews: handlePressReviews,
    firstAirDate: (query.data?.tvShow?.firstAirDate || '-').split('-')[0],
    onPressCrew: handlePressCrew,
    onPressCast: handlePressCast,
    infoItems,
    texts,
  };
};
