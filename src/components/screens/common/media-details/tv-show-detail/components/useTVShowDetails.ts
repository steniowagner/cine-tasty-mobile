import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {GET_TV_SHOW_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {showLanguageAlert} from '@utils';
import {useTranslations} from '@hooks';

import {useMakeAnimatedHeaderIntepolationParams} from '../../common/useMakeAnimatedHeaderInterpolationParams';
import {
  TVShowDetailsNavigationProp,
  TVShowDetailsRouteProp,
} from '../routes/route-params-types';
import {makeTVShowsInfoItems} from './makeTVShowInfoItems';
import {translateTVShowsDetailsTexts} from './translateTVShowsDetailsTexts';
import {PressItemParams} from '../../common/people-list/PeopleList';
import {getRouteName as getTVShowDetailsRouteName} from '../routes/route-params-types';
import {getRouteName as getReviewsRouteName} from '../../../reviews/routes/route-params-types';
import {getRouteName as getTVShowSeasonsRouteName} from '../../seasons/routes/route-params-types';
import {getRouteName as getFamousRouteName} from '../../../famous-details/routes/route-params-types';
import {ParsedSimilar} from '../../common/sections/similar/useSimilar';

type UseTVShowDetailsProps = {
  navigation: TVShowDetailsNavigationProp;
  route: TVShowDetailsRouteProp;
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
    (similar: ParsedSimilar) => {
      const route = getTVShowDetailsRouteName(
        props.navigation.getState().routes[0].name,
      );
      props.navigation.push(route, {
        voteAverage: similar.voteAverage,
        posterPath: similar.posterPath,
        voteCount: similar.voteCount,
        title: similar.title,
        id: similar.id,
      });
    },
    [props.navigation, query.data?.tvShow],
  );

  const handlePressReviews = useCallback(() => {
    const route = getReviewsRouteName(
      props.navigation.getState().routes[0].name,
    );
    props.navigation.navigate(route, {
      mediaTitle: query.data?.tvShow.name,
      reviews: query.data?.tvShow.reviews,
    });
  }, [props.navigation, query.data?.tvShow]);

  const handlePressFamousItem = useCallback((params: PressItemParams) => {
    const route = getFamousRouteName(
      props.navigation.getState().routes[0].name,
    );
    props.navigation.push(route, {
      profileImage: params.image,
      id: Number(params.id),
      name: params.name,
    });
  }, []);

  const handlePressSeeSeasons = useCallback(() => {
    const route = getTVShowSeasonsRouteName(
      props.navigation.getState().routes[0].name,
    );
    props.navigation.navigate(route, {
      numberOfSeasons: query.data?.tvShow.numberOfSeasons,
      title: query.data?.tvShow.name,
      id: query.data?.tvShow.id,
    });
  }, [props.navigation, query.data?.tvShow]);

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
    onPressCreatedBy: handlePressFamousItem,
    onPressReviews: handlePressReviews,
    onPressCrew: handlePressFamousItem,
    onPressCast: handlePressFamousItem,
    infoItems,
    texts,
  };
};
