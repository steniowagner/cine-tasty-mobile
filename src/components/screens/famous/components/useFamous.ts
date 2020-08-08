import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gql from 'graphql-tag';

import {
  GetPeople_people_items as GetPeoplePeopleItems,
  GetPeopleVariables,
  GetPeople,
} from 'types/schema';
import { usePaginatedQuery } from 'hooks';

type State = {
  onPressTopReloadButton: () => Promise<void>;
  onPressBottomReloadButton: () => void;
  onPullRefreshControl: () => void;
  famous: GetPeoplePeopleItems[];
  hasPaginationError: boolean;
  onEndReached: () => void;
  isPaginating: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string;
};

export const GET_FAMOUS = gql`
  query GetFamous($page: Int!) {
    people(page: $page) {
      hasMore
      items {
        profilePath
        name
        id
      }
    }
  }
`;

export const I18N_ENTRY_QUERY_ERROR_REF = 'translations:famous:i18EntryQueryErrorRef';
export const I18N_QUERY_BY_PAGINATION_ERROR_REF = 'translations:famous:i18nQueryByPaginationErrorRef';

const useFamous = (): State => {
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [famous, setFamous] = useState<GetPeoplePeopleItems[]>([]);
  const [isRefreshing, setIsRefrehing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const handleOnGetData = useCallback((data: GetPeople): boolean => {
    setFamous((previousFamous: GetPeoplePeopleItems[]) => [
      ...previousFamous,
      ...data.people.items,
    ]);

    return data.people.hasMore;
  }, []);

  const {
    onPaginateQuery, onReloadData, isPaginating, isLoading,
  } = usePaginatedQuery<
    GetPeople,
    GetPeopleVariables
  >({
    onPaginationQueryError: () => {
      setError(t(I18N_QUERY_BY_PAGINATION_ERROR_REF));
      setHasPaginationError(true);
    },
    onEntryQueryError: () => {
      setError(t(I18N_ENTRY_QUERY_ERROR_REF));

      if (hasPaginationError) {
        setHasPaginationError(false);
      }
    },
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    query: GET_FAMOUS,
  });

  const handleRefreshQuery = useCallback(async () => {
    if (error) {
      setError('');
    }

    setFamous([]);

    await onReloadData();

    setIsRefrehing(false);
  }, [onReloadData, error]);

  const onPressTopReloadButton = useCallback(async (): Promise<void> => {
    setHasPaginationError(false);

    setError('');

    await onReloadData();
  }, []);

  const onPressBottomReloadButton = useCallback(() => {
    setHasPaginationError(false);

    setError('');

    onPaginateQuery();
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      handleRefreshQuery();
    }
  }, [isRefreshing]);

  return {
    onPullRefreshControl: () => setIsRefrehing(true),
    onEndReached: onPaginateQuery,
    onPressBottomReloadButton,
    onPressTopReloadButton,
    hasPaginationError,
    isRefreshing,
    isPaginating,
    isLoading,
    famous,
    error,
  };
};

export default useFamous;
