import {useCallback, useState, useMemo} from 'react';

import {useTranslations, usePagination} from '@hooks';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {MediaSectionViewAllNavigationProp} from '../routes/route-params-types';
import {MediaSectionViewAllData, MediaTrendingItem} from './on-get-data/types';
import {getTrendingQuery} from './get-trending-query/getTrendingQuery';
import {handleOnGetData} from './on-get-data/handleOnGetData';

type Variables = {
  language?: SchemaTypes.ISO6391Language | null;
};

type UseMediaSectionViewAllProps = {
  navigation: MediaSectionViewAllNavigationProp;
  trendingMediaItemKey: Types.TrendingMediaItemKey;
  initialMediaItems: Types.SimplifiedMedia[];
  isMovie: boolean;
};

export const useMediaSectionViewAll = (props: UseMediaSectionViewAllProps) => {
  const [hasPaginationError, setHasPaginationError] = useState(false);

  const translations = useTranslations();

  const query = useMemo(
    () => getTrendingQuery(props.trendingMediaItemKey, props.isMovie),
    [props.trendingMediaItemKey, props.isMovie],
  );

  const onGetData = useCallback(
    (data: MediaSectionViewAllData) =>
      handleOnGetData({
        trendingMediaItemKey: props.trendingMediaItemKey,
        isMovie: props.isMovie,
        data,
      }),
    [props.trendingMediaItemKey, props.isMovie],
  );

  const texts = useMemo(
    () => ({
      paginationError: props.isMovie
        ? translations.translate(Translations.Tags.HOME_MOVIES_PAGINATION_ERROR)
        : translations.translate(
            Translations.Tags.HOME_TV_SHOWS_PAGINATION_ERROR,
          ),
    }),
    [props.isMovie, translations.translate],
  );

  const variables = useMemo(
    () => ({
      language: translations.language,
    }),
    [translations.language],
  );

  const pagination = usePagination<
    MediaSectionViewAllData,
    MediaTrendingItem,
    Variables
  >({
    initialDataset: props.initialMediaItems as MediaTrendingItem[],
    paginationError: texts.paginationError,
    skipFirstRun: false,
    entryQueryError: '',
    variables,
    onGetData,
    query,
  });

  const onPressBottomReloadButton = useCallback(() => {
    setHasPaginationError(false);
    pagination.paginate();
  }, [pagination.paginate]);

  const onPressItem = useCallback(
    (item: Types.SimplifiedMedia) => {
      const nextRoute = props.isMovie
        ? Routes.Home.MOVIE_DETAILS
        : Routes.Home.TV_SHOW_DETAILS;
      props.navigation.navigate(nextRoute, {
        genreIds: item.genreIds || [],
        voteAverage: item.voteAverage,
        posterPath: item.posterPath,
        voteCount: item.voteCount,
        title: item.title,
        id: item.id,
      });
    },
    [props.isMovie, props.navigation],
  );

  return {
    shouldShowListBottomReloadButton:
      !!pagination.dataset.length &&
      (pagination.hasPaginationError || pagination.isPaginating),
    onEndReached: pagination.paginate,
    onPressBottomReloadButton,
    dataset: pagination.dataset,
    hasPaginationError,
    isPaginating: pagination.isPaginating,
    onPressItem,
  };
};
