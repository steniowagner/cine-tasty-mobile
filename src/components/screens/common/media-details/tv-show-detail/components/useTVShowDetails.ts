import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {GET_TV_SHOW_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import {useMakeAnimatedHeaderIntepolationParams} from '../../common/useMakeAnimatedHeaderInterpolationParams';
import {TVShowDetailNavigationProp} from '../routes/route-params-types';
import {makeTVShowsInfoItems} from './makeTVShowInfoItems';
import {translateTVShowsDetailsTexts} from './translateTVShowsDetailsTexts';
import {PressItemParams} from '../../common/people-list/PeopleList';
import {TVShowDetailRouteProp} from '../routes/route-params-types';

type UseTVShowDetailsProps = {
  navigation: TVShowDetailNavigationProp;
  route: TVShowDetailRouteProp;
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
  const animatedHeaderIntepolationParams =
    useMakeAnimatedHeaderIntepolationParams();

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

  const handlePressSimilarTVShow = useCallback(
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

  const handlePressCrew = useCallback((params: PressItemParams) => {
    props.navigation.push(Routes.Famous.DETAILS, {
      profileImage: params.image,
      id: Number(params.id),
      name: params.name,
    });
  }, []);

  const handlePressCast = useCallback((params: PressItemParams) => {
    props.navigation.push(Routes.Famous.DETAILS, {
      profileImage: params.image,
      id: Number(params.id),
      name: params.name,
    });
  }, []);

  const handlePressCreatedBy = useCallback((params: PressItemParams) => {
    props.navigation.push(Routes.Famous.DETAILS, {
      profileImage: params.image,
      id: Number(params.id),
      name: params.name,
    });
  }, []);

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
    firstAirDate: (query.data?.tvShow?.firstAirDate || '-').split('-')[0],
    tvShow: query.data?.tvShow,
    canShowContent:
      !query.loading && !query.error && query.data && query.data.tvShow,
    isLoading: query.loading,
    hasError: !!query.error,
    votesAverage:
      props.route.params.voteAverage || query.data?.tvShow?.voteAverage || 0,
    voteCount: props.route.params.voteCount || query.data?.tvShow?.voteCount,
    poster: query.data?.tvShow?.posterPath || '',
    tags: props.route.params.genreIds || query.data?.tvShow?.genres || [],
    onPressSimilarTVShow: handlePressSimilarTVShow,
    title: props.route.params?.title,
    animatedHeaderIntepolationParams,
    onPressSeeSeasons: handlePressSeeSeasons,
    onPressCreatedBy: handlePressCreatedBy,
    onPressReviews: handlePressReviews,
    onPressCrew: handlePressCrew,
    onPressCast: handlePressCast,
    infoItems,
    texts,
  };
};
