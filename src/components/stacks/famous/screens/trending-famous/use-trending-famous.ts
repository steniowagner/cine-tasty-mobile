import { useCallback, useMemo } from 'react';
import { gql } from '@apollo/client';

import { SearchType } from '@/components/stacks/common-screens/search/types';
import { usePagination, useTranslation } from '@/hooks';
import {
  QueryTrendingFamous,
  QueryTrendingFamousVariables,
  QueryTrendingFamous_trendingFamous_items,
} from '@schema-types';
import { Translations } from '@/i18n/tags';
import { Routes } from '@navigation';

import { FamousNavigationProp } from '../../routes/route-params-types';

type UseTrendingFamous = {
  navigation: FamousNavigationProp;
};

export const QUERY_TRENDING_FAMOUS = gql`
  query QueryTrendingFamous($page: Int!) {
    trendingFamous(page: $page) {
      hasMore
      items {
        profilePath
        name
        id
      }
    }
  }
`;

export const useTrendingFamous = (params: UseTrendingFamous) => {
  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      errors: {
        pagination: translation.translate(
          Translations.TrendingFamous.PAGINATION_ERROR,
        ),
        entry: translation.translate(Translations.TrendingFamous.ENTRY_ERROR),
      },
    }),
    [translation.translate],
  );

  const handleGetData = useCallback(
    (result: QueryTrendingFamous) => ({
      hasMore: result?.trendingFamous.hasMore || false,
      dataset: result?.trendingFamous.items || [],
    }),
    [],
  );

  const pagination = usePagination<
    QueryTrendingFamous,
    QueryTrendingFamous_trendingFamous_items,
    QueryTrendingFamousVariables
  >({
    paginationError: texts.errors.pagination,
    entryError: texts.errors.entry,
    onGetData: handleGetData,
    errorMessageIcon: 'alert-box',
    fetchPolicy: 'no-cache',
    skipFirstRun: false,
    query: QUERY_TRENDING_FAMOUS,
  });

  const handleNavigateToSearch = useCallback(() => {
    params.navigation.navigate(Routes.Famous.SEARCH_FAMOUS, {
      type: SearchType.FAMOUS,
    });
  }, [params.navigation.navigate]);

  const handleSelectFamous = useCallback(
    (famous: QueryTrendingFamous_trendingFamous_items) => {
      params.navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: famous.profilePath,
        name: famous.name,
        id: famous.id,
      });
    },
    [params.navigation.navigate],
  );

  return {
    shouldShowTopReloadButton:
      !pagination.dataset.length && !!pagination.error && !pagination.isLoading,
    shouldShowBottomReloadButton:
      !!pagination.dataset.length &&
      (pagination.hasPaginationError || pagination.isPaginating),
    onPressHeaderIconButton: handleNavigateToSearch,
    onPressFamous: handleSelectFamous,
    items: pagination.dataset,
    onPressTopReloadButton: pagination.retryEntryQuery,
    onPressBottomReloadButton: pagination.retryPagination,
    hasPaginationError: pagination.hasPaginationError,
    isPaginating: pagination.isPaginating,
    onEndReached: pagination.paginate,
    isLoading: pagination.isLoading,
  };
};
